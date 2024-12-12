"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PageView from "@/sections/PageView";
import DashBoardHeading from "@/sections/DashBoardHeading";
import DashBoardSkills from "@/sections/DashBoardSkills";
import { useAuth } from "@/hooks/use-auth";
import ProfileLayout from "@/components/layout";

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = user?.id || "";
        const response = await fetch(`/api/portfolio/profile?userId=${userId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setProfile(null);
          } else {
            throw new Error("Failed to fetch profile");
          }
        } else {
          const data = await response.json();
          setProfile(data);
        }
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const excludedFields = ["id", "userId", "createdAt", "updatedAt", "picture"];

  const isValueEmpty = (value: any) =>
    value === undefined ||
    value === null ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "string" && value.trim() === "");

  return (
    <ProfileLayout>
      <div className="space-y-6">
        <DashBoardHeading />
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Profile Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-700">
              {profile === null ? (
                <div className="text-center text-gray-500">
                  <p>
                    No profile found for this user. Please complete your
                    profile.
                  </p>
                </div>
              ) : (
                Object?.keys(profile)
                  .filter((key) => !excludedFields.includes(key))
                  .map((key) => (
                    <React.Fragment key={key}>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold capitalize flex-grow">
                          {key.replace(/([A-Z])/g, " $1")}
                        </p>
                        <Link href="/profile/details">
                          <ExternalLink
                            className={`w-5 h-5 ${
                              isValueEmpty(profile[key])
                                ? "text-red-500 hover:text-red-600"
                                : "text-green-500 hover:text-green-600"
                            } transition-colors duration-200`}
                          />
                        </Link>
                      </div>
                      <div>
                        {key === "hobbies" || key === "languages" ? (
                          <div className="flex flex-wrap gap-2">
                            {profile[key].map((item: string, index: number) => (
                              <button
                                key={index}
                                className="
                                px-3 py-1 bg-gray-100 duration-200 transition-colors 
                                text-gray-700 rounded-full hover:bg-gray-200 text-sm
                              "
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        ) : Array.isArray(profile[key]) ? (
                          <ul className="list-disc list-inside">
                            {profile[key].map((item: any, index: number) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{profile[key] || "Not specified"}</p>
                        )}
                      </div>
                      <Separator className="my-3" />
                    </React.Fragment>
                  ))
              )}
              <DashBoardSkills />
            </div>
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
};

export default Dashboard;
