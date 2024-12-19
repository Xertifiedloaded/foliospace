import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export const DashBoardHeading = () => {
  const { data: session } = useSession();

  const username = session?.user?.username;

  const getUserLink = (username) => {
    if (typeof window === "undefined" || !username) return "#";
    return `${window.location.origin}/portfolio/${username}`;
  };
  const getUserLinkCv = (username) => {
    if (typeof window === "undefined" || !username) return "#";
    return `${window.location.origin}/resume/${username}`;
  };

  return (
    <Card>
      <CardContent className="py-2">
        <div className="text-gray-700 py-4 space-y-4">
          <small className="text-muted-foreground block">
            Your site:{" "}
            <a
              href={getUserLink(username)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 bold hover:text-blue-800 hover:underline"
            >
              {getUserLink(username)}
            </a>
          </small>
          <small className="text-muted-foreground block">
            Your resume:{" "}
            <a
              href={getUserLinkCv(username)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 bold hover:text-blue-800 hover:underline"
            >
              {getUserLinkCv(username)}
            </a>
          </small>
        </div>
      </CardContent>
    </Card>
  );
};


