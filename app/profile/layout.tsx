'use client'
import Header from "@/components/Header";
import { MobilePreview } from "@/components/Preview";


import React, { ReactNode } from "react";
interface ProfileLayoutProps {
    children: ReactNode;
  }
  
  
  const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
    
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
  
  