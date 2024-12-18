import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export const PageViewStats = () => {
  const { data: session } = useSession();
  const username = session?.user?.username;
  const [pageViews, setPageViews] = useState({
    pageViews: [
      { period: "Today", views: 0 },
      { period: "Yesterday", views: 0 },
      { period: "This Week", views: 0 },
      { period: "Last Week", views: 0 },
      { period: "Last Month", views: 0 },
    ],
    totalViews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageViews = async () => {
      try {
        setIsLoading(true);
        if (!username) throw new Error("Username is undefined");
        const response = await axios.get(
          `/api/portfolio/view?username=${username}`
        );
        setPageViews(response?.data);
      } catch (err) {
        setError("Failed to fetch page views");
        console.error("Page views fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (username) {
      fetchPageViews();
    }
  }, [username]);
  

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-red-100 text-red-700 rounded-lg text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full  bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Page Views</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {pageViews?.pageViews?.map((view) => (
            <div
              key={view?.period}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
            >
              <span className="text-sm font-medium text-gray-600">
                {view?.period}
              </span>
              <span className="text-base font-bold text-blue-600">
                {view?.views}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center border-t pt-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Total Views:</span>{" "}
            <span className="text-lg font-bold text-blue-700">
              {pageViews?.totalViews}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
