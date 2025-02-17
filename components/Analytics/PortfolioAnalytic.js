import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCardData } from "../../utils/index";
import { Activity } from "lucide-react";

const PortfolioAnalytic = ({ userName }) => {
  const { status } = useSession();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        if (!userName) {
          console.error("Username is required to fetch analytics data.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `/api/analytics/analytics?username=${userName}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch analytics data: ${response.statusText}`
          );
        }

        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [status, userName]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse w-1/4 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="container mx-auto p-4 text-red-600 dark:text-red-400">
        Failed to load analytics data.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 rounded-2xl shadow-2xl">
      <AnalyticsCard analyticsData={analyticsData} />
      <Card className="bg-white border-0 dark:bg-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            Recent Visits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y dark:divide-gray-700">
            {analyticsData.recentLogs.map((log) => (
              <li
                key={log.id}
                className="py-3 hover:bg-gray-70 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:justify-between">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {log.userAgent}
                  </p>
                </div>
                <p className="text-gray-800 dark:text-gray-200 mt-2 text-sm font-medium">
                  Accessed on {new Date(log.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioAnalytic;

const AnalyticsCard = ({ analyticsData }) => {
  const cardData = getCardData(analyticsData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {cardData.map(
        ({
          id,
          title,
          icon,
          value,
          description,
          percentageChange,
          changeClass,
          arrowIcon,
          className,
          subClass,
        }) => (
          <Card key={id} className={`${className} border-0`}>
            {percentageChange && (
              <div className="absolute top-0 right-0 p-2">
                <div className={`flex items-center ${changeClass}`}>
                  {arrowIcon}
                  <span className="text-sm">{percentageChange}</span>
                </div>
              </div>
            )}
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-4xl dark:text-white font-bold ${subClass}`}>
                {value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};
