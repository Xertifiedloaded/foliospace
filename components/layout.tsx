"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Github, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "@/hooks/use-toast";
import SkeletalLoader from "./SkeletalLoader";

const ProfileLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading } = useAuth();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session) {
      toast({
        title: "Unauthorized",
        description: "You must be logged in to access this page.",
        variant: "destructive",
      });
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (isLoading || status === "loading") {
    return <SkeletalLoader />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Header />
      {children}
    </div>
  );
};

export default ProfileLayout;

{
  /* <div className="bg-gray-50 min-h-screen">

<div className="container mx-auto py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="space-y-6">{children}</div>
    <div className="relative">
      <div className="sticky  top-2">
        <MobilePreview />
      </div>
    </div>
  </div>
</div>
</div> */
}
