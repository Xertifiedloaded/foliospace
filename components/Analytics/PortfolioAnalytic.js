import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Users, 
    UserCheck, 
    Calendar, 
    Clock,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    BarChart2,
    Activity
  } from 'lucide-react';
const PortfolioAnalytic = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchSessionAndAnalytics = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user?.username) {
          console.error("No user session found or username not available");
          setLoading(false);
          return;
        }

        setUsername(session.user.username);

        const response = await fetch(`/api/analytics/analytics?username=${session?.user?.username}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch analytics data: ${response.statusText}`);
        }

        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="animate-pulse mb-8">
            <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {Array(6).fill().map((_, index) => (
              <div key={index} className="animate-pulse bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
   
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            
                <div className="space-y-3">
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (!analyticsData || !username) {
    return <div className="container mx-auto p-4 text-red-600">Failed to load analytics data.</div>;
  }

  return (
    <div className="container mx-auto p-6 lg:p-0 bg-gray-50">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Total Visits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{analyticsData.totalVisits}</p>
          <p className="text-sm opacity-80">All time visitors</p>
        </CardContent>
      </Card>


      <Card className="border-l-4 border-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-blue-500">
            <UserCheck className="h-5 w-5" />
            Unique Visitors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-gray-800">{analyticsData.uniqueVisits}</p>
          <p className="text-sm text-gray-500">Distinct users</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2">
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="h-4 w-4" />
            <span className="text-sm">+12%</span>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-500" />
            Today's Visits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-gray-800">{analyticsData.todayVisits}</p>
          <p className="text-sm text-gray-500">Last 24 hours</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2">
          <div className="flex items-center text-red-500">
            <ArrowDownRight className="h-4 w-4" />
            <span className="text-sm">-5%</span>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-500" />
            Yesterday
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-gray-800">{analyticsData.yesterdayVisits}</p>
          <p className="text-sm text-gray-500">Previous day</p>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-200">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <BarChart2 className="h-5 w-5" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-gray-800">{analyticsData.thisWeekVisits}</p>
          <p className="text-sm text-gray-500">Current week stats</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Last Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{analyticsData.lastWeekVisits}</p>
          <p className="text-sm opacity-80">Previous week</p>
        </CardContent>
      </Card>
      <Card className="border-2 border-indigo-200 bg-indigo-50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-indigo-600">
            <TrendingUp className="h-5 w-5" />
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-gray-800">{analyticsData.thisMonthVisits}</p>
          <p className="text-sm text-gray-500">Current month</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-pink-500 to-rose-500 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Last Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{analyticsData.lastMonthVisits}</p>
          <p className="text-sm opacity-80">Previous month total</p>
        </CardContent>
      </Card>
    </div>

    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-gray-600" />
          Recent Visits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {analyticsData.recentLogs.map((log) => (
            <li key={log.id} className="py-3 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between">
                <p className="text-gray-800 font-medium">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">{log.userAgent}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </div>
  );
};

export default PortfolioAnalytic;
