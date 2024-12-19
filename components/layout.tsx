"use client";

import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { toast } from "@/hooks/use-toast";
import SkeletalLoader from "./SkeletalLoader";
import { IPhoneFrame } from "./Preview";

const MobilePreview: React.FC = () => {
  const router = useRouter();

  const renderPreviewContent = () => {
    switch (router.pathname) {
      case "/profile/dashboard":
        return <ProfilePreview />;
      case "/profile/details":
        return <SettingsPreview />;
      case "/profile/links":
        return <MessagesPreview />;
      case "/profile/resume":
        return <MessagesPreview />;
      case "/profile/portfolio":
        return <MessagesPreview />;
      case "/profile/socials":
        return <MessagesPreview />;
      case "/profile/page-view":
        return <MessagesPreview />;
      default:
        return <DefaultPreview />;
    }
  };

  return <IPhoneFrame>{renderPreviewContent()}</IPhoneFrame>;
};

const DefaultPreview: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Mobile Preview</h2>
    <p className="text-gray-600">
      Realistic representation of your site on an iPhone 15 Pro Max
    </p>
  </div>
);

const ProfilePreview: React.FC = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Profile Preview</h2>
    {/* Add your profile preview content here */}
  </div>
);

const SettingsPreview: React.FC = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Settings Preview</h2>
    {/* Add your settings preview content here */}
  </div>
);

const MessagesPreview: React.FC = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Messages Preview</h2>
    {/* Add your messages preview content here */}
  </div>
);

const ProfileLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading } = useAuth();
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
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
    return <SkeletalLoader />;
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
export { MobilePreview };
