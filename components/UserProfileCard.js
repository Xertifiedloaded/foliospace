import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, LinkedinIcon, GithubIcon, TwitterIcon } from "lucide-react";
import Image from 'next/image';
const SocialIcon = ({ type }) => {
  const icons = {
    linkedin: LinkedinIcon,
    github: GithubIcon,
    twitter: TwitterIcon,
    default: ExternalLink
  };

  const Icon = icons[type.toLowerCase()] || icons.default;
  return <Icon className="w-5 h-5" />;
};

export const PortfolioProfileCard = ({ portfolio }) => {
  const { profile, socials, name, email, username } = portfolio || {};
console.log(profile);
  const socialPlatforms = {
    linkedin: "text-blue-600",
    github: "text-gray-800",
    twitter: "text-sky-500"
  };

  return (
    <Card className=" shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-4">
        <div className="">
          <Image src={profile?.picture} height={100} width={100} alt={username}/>
          <div>
            <Image/>
            <CardTitle className="text-xl font-bold text-gray-800">
              {name || "Professional Portfolio"}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {username && `@${username}`}
            </p>
            {email && (
            <Badge variant="secondary" className="text-xs">
              {email}
            </Badge>
          )}
          </div>
        
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {profile?.tagline && (
          <div className="italic lg:text-lg text-base text-gray-700 border-l-4 border-blue-500 pl-4">
            "{profile.tagline}"
          </div>
        )}

        {profile?.bio && (
          <div>
            <h3 className="lg:text-lg text-base font-semibold mb-2 text-gray-800 border-b pb-1">
              About Me
            </h3>
            <p className="text-gray-600 text-sm">{profile.bio}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {profile?.hobbies?.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Hobbies</h4>
              <ul className="space-y-1 flex items-center flex-wrap lg:flex-nowrap gap-2 text-sm text-gray-600">
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
              <h4 className="font-medium text-gray-700 mb-2">Languages</h4>
              <ul className="space-y-1 flex items-center flex-wrap gap-2  lg:flex-nowrap text-sm text-gray-600">
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
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-600 mb-3">Connect</h4>
            <div className="flex space-x-3">
              {socials.map((social, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="icon" 
                  className={`${socialPlatforms[social.name.toLowerCase()] || 'text-gray-500'} hover:bg-gray-50`}
                  onClick={() => window.open(social.url, '_blank')}
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