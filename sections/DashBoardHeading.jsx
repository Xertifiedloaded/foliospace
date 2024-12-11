import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
export default function DashBoardHeading() {
  const { user } = useAuth();
  return (
    <Card>
      <CardContent className="py-2">
        <div className="my-3">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="my-2">
            Welcome to your dashboard {user && user?.username}
          </p>
        </div>
        <div className="text-gray-700 py-4 space-y-4">
          <small className="text-muted-foreground block">
            Your site:{" "}
            <a
              href={`${window.location.origin}/portfolio/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 bold hover:text-blue-800 hover:underline"
            >
              {`${window.location.origin}/portfolio/${user.username}`}
            </a>
          </small>
          <small className="text-muted-foreground block">
            Your resume:{" "}
            <a
              href={`${window.location.origin}/portfolio/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 bold hover:text-blue-800 hover:underline"
            >
              {`${window.location.origin}/portfolio/${user.username}`}
            </a>
          </small>
        </div>
      </CardContent>
    </Card>
  );
}
