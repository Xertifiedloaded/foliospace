"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useAuth } from "@/hooks/use-auth";

interface PageViewItem {
  period: string;
  views: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const pageViews: PageViewItem[] = [
    { period: "Today", views: 0 },
    { period: "Yesterday", views: 0 },
    { period: "This Week", views: 0 },
    { period: "Last Week", views: 0 },
    { period: "Last Month", views: 0 },
    { period: "Total", views: 0 },
  ];

  const skills: string[] = ["React", "Next.js", "TypeScript", "Node.js"];

  return (
    <div>
      <div className="my-3">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="my-2">
          Welcome to your dashboard {user && user.username}
        </p>
      </div>
      <div className="space-y-6">
        <Card>
          <CardContent className="py-2">
            <div className="text-gray-700 py-4 space-y-4">
              <small className="text-muted-foreground block">
                Your site: {" "}
                <a
                  href="https://creatify.com/certifiedolaitan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  https://creatify.com/certifiedolaitan
                </a>
              </small>
              <small className="text-muted-foreground block">
                Your resume: {" "}
                <a
                  href="https://creatify.com/certifiedolaitan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  https://creatify.com/certifiedolaitan
                </a>
              </small>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Profile Details
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-semibold">NickName</p>
                <p>Makinde Olaitan</p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Tagline</p>
                <p>Innovative Software Developer</p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Skills</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
      </div>
    </div>
  );
};

export default Dashboard;
