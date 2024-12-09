'use client'
import Header from "@/components/Header";
import { MobilePreview } from "@/components/Preview";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";


import React, { ReactNode } from "react";
interface ProfileLayoutProps {
    children: ReactNode;
  }
  
  
  const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
    const { isLoading } = useAuth();
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin" />
            <p className="mt-2 text-sm text-gray-600">Loading your session...</p>
          </div>
        </div>
      )
    }
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">{children}</div>
            <MobilePreview />
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileLayout;
  
  