import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, GithubIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";

const SocialIcon = ({ type }) => {
  const icons = {
    linkedin: LinkedinIcon,
    github: GithubIcon,
    twitter: TwitterIcon,
  };

  const Icon = icons[type.toLowerCase()] || null;
  return Icon ? <Icon className="w-5 h-5" /> : null;
};

export const PortfolioProfileCard = ({ portfolio }) => {
  const { profile, socials, name, email, username } = portfolio || {};
  const socialColors = {
    linkedin: "text-blue-600 hover:text-blue-700",
    github: "text-gray-800 hover:text-gray-900",
    twitter: "text-sky-500 hover:text-sky-600",
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 p-6">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={profile?.picture || "/default-avatar.png"}
            height={100}
            width={100}
            alt={username || "User"}
            className="rounded-full border-2 border-blue-500"
          />
          <CardTitle className="text-xl font-semibold text-gray-800">
            {name || "Your Name"}
          </CardTitle>
          {username && <p className="text-gray-600">@{username}</p>}
          {email && (
            <Badge variant="secondary" className="text-xs">
              {email}
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6 space-y-6">
        {/* Tagline */}
        {profile?.tagline && (
          <div className="italic text-center text-lg text-gray-700 border-l-4 border-blue-500 pl-4">
            "{profile.tagline}"
          </div>
        )}

        {/* Bio */}
        {profile?.bio && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">About Me</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {profile.bio}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {profile?.hobbies?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Hobbies
              </h4>
              <ul className="space-y-1 flex items-center gap-2 flex-wrap  text-sm text-gray-600">
                {profile.hobbies.map((hobby, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 text-blue-500">•</span>
                    {hobby}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {profile?.languages?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Languages
              </h4>
              <ul className="space-y-1 flex items-center gap-2 flex-wrap  text-sm text-gray-600">
                {profile.languages.map((language, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 text-blue-500">•</span>
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {socials?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-4">
              Connect with Me
            </h4>
            <div className="flex justify-center space-x-4">
              {socials.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${
                    socialColors[social.name.toLowerCase()] ||
                    "text-gray-500 hover:text-gray-600"
                  }`}
                  onClick={() => window.open(social.url, "_blank")}
                >
                  <SocialIcon type={social.name} />
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>


    </Card>
  );
};

export default PortfolioProfileCard;
