"use client";
import React, { ReactNode, useEffect } from "react";
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
    <div className="space-y-6 wrapper">
      <Header />
      {children}
    </div>
  );
};

export default ProfileLayout;
