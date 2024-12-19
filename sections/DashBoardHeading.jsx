'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import axios from "axios";

const DashBoardHeading = () => {
  const [totalViews, setTotalViews] = useState(0); 
  const { data: session } = useSession();
  const username = session?.user?.username;

  useEffect(() => {
    const fetchPageViews = async () => {
      try {
        if (!username) throw new Error("Username is undefined");
        const response = await axios.get(
          `/api/portfolio/view?username=${username}`
        );
        setTotalViews(response?.data?.totalViews); 
      } catch (err) {
        console.error("Page views fetch error:", err);
      }
    };

    if (username) {
      fetchPageViews();
    }
  }, [username]);

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-8">
        <div className="border-b border-gray-100 pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                {username || "Guest"}'s Dashboard
              </p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {username ? username[0].toUpperCase() : "G"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-500">
              Portfolio Views
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {totalViews}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-500">
              Profile Status
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">Active</p>
          </div>
        </div>


        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-lg p-4 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Portfolio Site
                </h3>
                <a
                  href={`${window.location.origin}/portfolio/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  {window.location.origin}/portfolio/{username}
                </a>
              </div>
              <div className="bg-blue-50 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-4 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Resume</h3>
                <a
                  href={`${window.location.origin}/resume/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  {window.location.origin}/resume/{username}
                </a>
              </div>
              <div className="bg-blue-50 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashBoardHeading;
