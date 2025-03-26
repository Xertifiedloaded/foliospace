import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  User,
  Briefcase,
  Globe,
  Heart,
  TrendingUp,
  Award,
  Edit,
  Camera,
  MapPin,
  Mail,
  Layers,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import DashBoardSkills from "@/sections/DashBoardSkills";
import ProfileLayout from "@/components/layout";
import ProfileCompleteness from "@/components/ProfileCompleteness";
import PortfolioAnalytic from "@/components/Analytics/PortfolioAnalytic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserBackupButton from "../../../components/UserDownloadButton";

interface Profile {
  id: string;
  userId: string;
  name?: string;
  email?: string;
  hobbies?: string[];
  languages?: string[];
  skills?: string[];
  createdAt?: string;
  updatedAt?: string;
  picture?: string;
  tagline?: string;
  location?: string;
  profession?: string;
  [key: string]: any;
}

const ProfileSection = ({ 
  icon: Icon, 
  title, 
  children, 
  editLink 
}: { 
  icon: React.ElementType, 
  title: string, 
  children: React.ReactNode, 
  editLink?: string 
}) => (
  <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Icon className="w-6 h-6 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {editLink && (
        <Link href={editLink}>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </Link>
      )}
    </div>
    <Separator className="my-4" />
    {children}
  </div>
);

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!session?.user?.id) return;
        const response = await fetch(
          `/api/portfolio/profile?userId=${session.user.id}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            setProfile(null);
          } else {
            throw new Error("Failed to fetch profile");
          }
        } else {
          const data: Profile = await response.json();
          setProfile(data);
        }
      } catch (err) {
        setError((err as Error).message || "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session?.user?.id]);

  const renderProfileDetails = () => {
    const excludedFields: string[] = [
      "id", "userId", "createdAt", "updatedAt", 
      "picture", "name", "email", "tagline",
      "hobbies", "languages", "skills"
    ];

    return Object.keys(profile || {})
      .filter((key) => !excludedFields.includes(key))
      .map((key) => {
        const value = profile?.[key];
        if (!value) return null;

        return (
          <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
            <span className="text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            <span className="text-gray-800 font-medium">
              {Array.isArray(value) ? value.join(", ") : value}
            </span>
          </div>
        );
      });
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <ProfileLayout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Card className="overflow-hidden border-0 shadow-xl rounded-xl">
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage
                      src={profile?.picture}
                      alt={session?.user?.name || "User"}
                    />
                    <AvatarFallback className="bg-indigo-100">
                      <User className="h-12 w-12 text-indigo-400" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white shadow-md"
                  >
                    <Camera className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {session?.user?.name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {profile?.tagline || "Professional Profile"}
                  </p>
                  <div className="flex items-center space-x-2 mt-2 text-gray-500">
                    {profile?.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {session?.user?.email && (
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{session.user.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button 
                  variant="default" 
                  className="bg-indigo-600 hover:bg-indigo-700"
                  asChild
                >
                  <Link href="/profile/details">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
                <UserBackupButton />
              </div>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="p-6">
              <ProfileCompleteness profile={profile} />
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  key: 'hobbies', 
                  icon: Heart, 
                  title: 'Hobbies',
                  editLink: '/profile/details' 
                },
                { 
                  key: 'languages', 
                  icon: Globe, 
                  title: 'Languages',
                  editLink: '/profile/details' 
                },
     
              ].map(({ key, icon, title, editLink }) => (
                <ProfileSection 
                  key={key} 
                  icon={icon} 
                  title={title}
                  editLink={editLink}
                >
                  {profile?.[key]?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {profile[key].map((item: string, index: number) => (
                        <span 
                          key={index} 
                          className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No {title.toLowerCase()} added</p>
                  )}
                </ProfileSection>
              ))}
            </div>

            <ProfileSection icon={Layers} title="Additional Details" editLink="/profile/details">
              <div className="space-y-2">
                {renderProfileDetails()}
              </div>
            </ProfileSection>

            <div className="bg-white text-black shadow-md rounded-xl p-6">
              <DashBoardSkills />
            </div>
          </div>

          <div className="space-y-8">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  <span>Portfolio Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PortfolioAnalytic userName={session?.user.username} />
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="overflow-hidden shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-indigo-600" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    { title: "Top Contributor", color: "text-yellow-500" },
                    { title: "Skill Master", color: "text-blue-500" },
                    { title: "Project Completer", color: "text-green-500" }
                  ].map(({ title, color }, index) => (
                    <li 
                      key={index} 
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Award className={`h-5 w-5 ${color}`} />
                        <span className="text-gray-700">{title}</span>
                      </div>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        Verified
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

// Loading and Error States
const LoadingState = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="animate-pulse">
      <User className="w-16 h-16 text-gray-300" />
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center min-h-screen bg-red-50 text-red-600">
    <p>{message}</p>
  </div>
);

export default Dashboard;