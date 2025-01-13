import React from "react";
import { useSession } from "next-auth/react";
import { Copy, Share, LinkIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const DashBoardHeading = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const username = session?.user?.username;

  const getUserLink = (username) => {
    if (typeof window === "undefined" || !username) return "#";
    return `${window.location.origin}/portfolio/${username}`;
  };

  const getUserLinkCv = (username) => {
    if (typeof window === "undefined" || !username) return "#";
    return `${window.location.origin}/resume/${username}`;
  };

  const copyToClipboard = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The link has been copied to your clipboard.",
       variant:"default"
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy the link.",
          variant: "destructive",
        });
      });
  };

  const shareLink = async (link) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          url: link,
        });
        toast({
          title: "Link shared!",
          description: "The link has been shared successfully.",
       variant:"default"
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser does not support the sharing feature.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-6  transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Your Public Links
      </h2>

      <div className="space-y-4">
        {/* Portfolio Card */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <LinkIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="font-medium text-gray-700 dark:text-white">
                Portfolio
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => copyToClipboard(getUserLink(username))}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                title="Copy link"
              >
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={() => shareLink(getUserLink(username))}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                title="Share link"
              >
                <Share className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
          <a
            href={getUserLink(username)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 break-all transition-colors duration-200"
          >
            {getUserLink(username)}
          </a>
        </div>

        {/* Resume Card */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <LinkIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="font-medium text-gray-700 dark:text-white">
                Resume
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => copyToClipboard(getUserLinkCv(username))}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                title="Copy link"
              >
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={() => shareLink(getUserLinkCv(username))}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                title="Share link"
              >
                <Share className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
          <a
            href={getUserLinkCv(username)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 break-all transition-colors duration-200"
          >
            {getUserLinkCv(username)}
          </a>
        </div>
      </div>
    </div>
  );
};

