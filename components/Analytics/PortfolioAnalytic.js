"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCardData } from "../../utils/index"
import { Activity, TrendingUp, TrendingDown } from "lucide-react"

const PortfolioAnalytic = ({ userName }) => {
  const { status } = useSession()
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        if (!userName) {
          console.error("Username is required to fetch analytics data.")
          setLoading(false)
          return
        }

        const response = await fetch(`/api/analytics/analytics?username=${userName}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch analytics data: ${response.statusText}`)
        }

        const data = await response.json()
        setAnalyticsData(data)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userName) {
      fetchAnalytics()
    }
  }, [status, userName])

  if (loading) {
    return <AnalyticsLoader />
  }

  if (!analyticsData) {
    return (
      <Card className="p-4">
        <CardContent>
          <p className="text-red-600 dark:text-red-400">Failed to load analytics data.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <AnalyticsCard analyticsData={analyticsData} />
      <RecentVisits analyticsData={analyticsData} />
    </div>
  )
}

const AnalyticsLoader = () => (
  <div className="space-y-4">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    <div className="grid grid-cols-2 gap-4">
      {Array(4)
        .fill()
        .map((_, index) => (
          <Card key={index} className="p-4">
            <CardContent>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
    </div>
  </div>
)

const AnalyticsCard = ({ analyticsData }) => {
  const cardData = getCardData(analyticsData)

  return (
    <div className="grid grid-cols-2 gap-4">
      {cardData.map(({ id, title, icon, value, description, percentageChange, changeClass }) => (
        <Card key={id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{value}</p>
              {icon}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
            {percentageChange && (
              <div className={`flex items-center mt-2 text-xs ${changeClass}`}>
                {Number.parseFloat(percentageChange) > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span>{percentageChange}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const RecentVisits = ({ analyticsData }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Activity className="h-5 w-5 text-primary" />
        <span>Recent Visits</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        {analyticsData.recentLogs.map((log) => (
          <li key={log.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <p className="text-sm text-muted-foreground">{log.userAgent}</p>
            <p className="text-sm font-medium mt-1">Accessed on {new Date(log.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

export default PortfolioAnalytic

