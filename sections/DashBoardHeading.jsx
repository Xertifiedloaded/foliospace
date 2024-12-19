import React from "react";
import { useSession } from "next-auth/react";
import { Copy, Share } from "lucide-react";
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
          variant: "success",
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
          variant: "success",
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
    <div className="text-gray-700 py-4 space-y-4">
      <div className="flex items-center space-x-4">
        <small className="text-muted-foreground">
          Your site:{" "}
          <a
            href={getUserLink(username)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-bold hover:text-blue-800 hover:underline"
          >
            {getUserLink(username)}
          </a>
        </small>
        <button
          onClick={() => copyToClipboard(getUserLink(username))}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <Copy className="w-4 h-4 mr-1" />
        </button>
        <button
          onClick={() => shareLink(getUserLink(username))}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <Share className="w-4 h-4 mr-1" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <small className="text-muted-foreground">
          Your resume:{" "}
          <a
            href={getUserLinkCv(username)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-bold hover:text-blue-800 hover:underline"
          >
            {getUserLinkCv(username)}
          </a>
        </small>
        <button
          onClick={() => copyToClipboard(getUserLinkCv(username))}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <Copy className="w-4 h-4 mr-1" />
        </button>
        <button
          onClick={() => shareLink(getUserLinkCv(username))}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <Share className="w-4 h-4 mr-1" />
        </button>
      </div>
    </div>
  );
};
