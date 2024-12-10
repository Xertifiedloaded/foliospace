import React from 'react'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface PageViewItem {
    period: string;
    views: number;
  }
export default function PageView() {
    const pageViews: PageViewItem[] = [
        { period: "Today", views: 0 },
        { period: "Yesterday", views: 0 },
        { period: "This Week", views: 0 },
        { period: "Last Week", views: 0 },
        { period: "Last Month", views: 0 },
        { period: "Total", views: 0 },
      ];
  return (
    <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Page Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {pageViews.map((item) => (
                <div key={item.period} className="text-center">
                  <p className="text-sm font-medium text-gray-600">
                    {item.period}
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-lg font-bold mt-1 px-4 py-2"
                  >
                    {item.views}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
  )
}
