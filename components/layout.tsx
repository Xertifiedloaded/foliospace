'use client';
import Header from "@/components/Header";
import { MobilePreview } from "@/components/Preview";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "@/hooks/use-toast"; 

interface ProfileLayoutProps {
  children: ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const { isLoading } = useAuth(); 
  const { data: session, status } = useSession(); 
  const router = useRouter(); 

  useEffect(() => {
    if (status === "loading") return; 
    if (!session) {
      toast({
        title: "Unauthorized",
        description: "You must be logged in to access this page.",
        variant: "destructive",
      });
      router.push("/auth/login");
    }
  }, [session, status, router]); 

  if (isLoading || status === "loading") {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="space-y-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
            <div className="h-full bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; 
  }

  return (
    <SessionProvider session={session}>
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">{children}</div>
            <MobilePreview />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default ProfileLayout;
