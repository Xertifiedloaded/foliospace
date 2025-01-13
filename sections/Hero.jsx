import React from "react";
import Image from "next/image";
import {
  LinkedinIcon,
  GithubIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkIcon,
} from "lucide-react";
import { FaDiscord, FaTiktok, FaTwitch } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// Shared SocialIcon component
const SocialIcon = ({ type }) => {
  const icons = {
    linkedin: LinkedinIcon,
    github: GithubIcon,
    twitter: TwitterIcon,
    facebook: FacebookIcon,
    twitch: FaTwitch,
    discord: FaDiscord,
    tiktok: FaTiktok,
    instagram: InstagramIcon,
    youtube: YoutubeIcon,
  };

  const Icon = icons[type?.toLowerCase()] || LinkIcon;
  return <Icon className="w-5 h-5" />;
};

// Shared social colors
const socialColors = {
  linkedin: "text-[#0077B5] hover:text-[#004d77]",
  github: "text-gray-800 hover:text-gray-900",
  twitter: "text-[#1DA1F2] hover:text-[#0d8bda]",
  facebook: "text-[#1877F2] hover:text-[#0d65d9]",
  twitch: "text-[#9146FF] hover:text-[#7a29ff]",
  discord: "text-[#5865F2] hover:text-[#4752c4]",
  tiktok: "text-[#000000] hover:text-gray-700",
  instagram: "text-[#E4405F] hover:text-[#d81c3f]",
  youtube: "text-[#FF0000] hover:text-[#cc0000]",
};

// Modern Hero
export const ModernHero = ({ portfolio }) => {
  const { profile, socials, name, username } = portfolio || {};

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white dark:text-gray-100">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center space-y-8">
          {profile?.picture && (
            <div className="flex justify-center">
              <Image
                src={profile?.picture || "/default-avatar.png"}
                height={100}
                width={100}
                alt={username || "User"}
                className="duration-300 object-cover w-[200px] transform rounded-full h-[200px] hover:shadow-2xl animate-jump-in animate-duration-[300ms] animate-ease-in-out"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
            {name}
            {profile?.tagline && (
              <span className="block text-2xl md:text-3xl text-purple-300 mt-2">
                {profile.tagline}
              </span>
            )}
          </h1>

          {profile?.bio && (
            <p className="max-w-2xl text-center text-purple-200 text-lg dark:text-gray-400">
              {profile.bio}
            </p>
          )}

          {portfolio?.skills?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {portfolio.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg text-purple-200 hover:bg-white/20 transition-all duration-300 dark:text-gray-400 dark:bg-white/20"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}

          {Array.isArray(socials) && socials.length > 0 && (
            <div className="flex justify-center gap-4 mt-8">
              {socials.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
                >
                  <SocialIcon type={social.name} />
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProfessionalHero = ({ portfolio }) => {
  const { profile, socials, name, username } = portfolio || {};

  return (
    <div className="text-black dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row  items-center gap-12">
            {profile?.picture && (
              <div className="flex justify-center">
                <Image
                  src={profile?.picture || "/default-avatar.png"}
                  height={100}
                  width={100}
                  alt={username || "User"}
                  className="duration-300 object-cover w-[200px] transform rounded-full h-[200px] hover:shadow-2xl animate-jump-in animate-duration-[300ms] animate-ease-in-out"
                />
              </div>
            )}

            <div className="flex-1 text-center md:text-start">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {name}
                {profile?.tagline && (
                  <span className="block text-xl mt-2 font-normal">
                    {profile.tagline}
                  </span>
                )}
              </h1>

              {profile?.bio && (
                <p className=" mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                  {profile.bio}
                </p>
              )}

              {portfolio?.skills?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {portfolio.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded bg-gray-800 text-gray-300 dark:bg-gray-600 dark:text-gray-200"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {Array.isArray(socials) && socials.length > 0 && (
                <div className="flex gap-3">
                  {socials.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="rounded-md border-gray-700 hover:bg-gray-800 dark:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <SocialIcon type={social.name} />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const MinimalHero = ({ portfolio }) => {
  const { profile, socials, name, username } = portfolio || {};

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center space-y-6 max-w-3xl mx-auto">
          {profile?.picture && (
            <div className="flex justify-center">
              <Image
                src={profile?.picture || "/default-avatar.png"}
                height={100}
                width={100}
                alt={username || "User"}
                className="duration-300 object-cover w-[200px] transform rounded-full h-[200px] hover:shadow-2xl animate-jump-in animate-duration-[300ms] animate-ease-in-out"
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center">
            {name}
            {profile?.tagline && (
              <span className="block text-xl text-gray-500 dark:text-gray-400 mt-2 font-normal">
                {profile.tagline}
              </span>
            )}
          </h1>

          {profile?.bio && (
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl">
              {profile.bio}
            </p>
          )}

          {portfolio?.skills?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {portfolio.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}

          {Array.isArray(socials) && socials.length > 0 && (
            <div className="flex justify-center gap-3">
              {socials.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={`${
                    socialColors[social?.name?.toLowerCase()] || "text-gray-400"
                  }`}
                >
                  <SocialIcon type={social.name} />
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Basic Hero
export const BasicHero = ({ portfolio }) => {
  const { profile, socials, name, username } = portfolio || {};

  return (
    <div className="flex flex-col  bg-gray-900 text-white items-center justify-center max-w-6xl px-6 py-20 mx-auto space-y-8 sm:flex-row sm:space-y-0">
      <div>
        {profile?.picture && (
          <div className="flex justify-center">
            <Image
              src={profile?.picture || "/default-avatar.png"}
              height={100}
              width={100}
              alt={username || "User"}
              className="duration-300 object-cover w-[200px] transform rounded-full h-[200px] hover:shadow-2xl animate-jump-in animate-duration-[300ms] animate-ease-in-out"
            />
          </div>
        )}
        <div className="flex justify-center">
          <div className="max-w-2xl mt-8 text-3xl lg:text-6xl font-bold text-center text-transparent animate-fade-up bg-gradient-to-r from-indigo-500 to-orange-500 bg-clip-text">
            {name},{" "}
            {profile?.tagline && (
              <span className="text-gray-400">{profile?.tagline}</span>
            )}
          </div>
        </div>
        {/* Skills */}
        {portfolio?.skills?.length > 0 && (
          <section className="my-8">
            <div className="flex justify-center flex-wrap gap-2 max-w-2xl mx-auto px-4">
              {portfolio?.skills?.map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center bg-gray-100/80 hover:bg-gray-200/80
      text-gray-800 rounded-full px-3 py-1.5 transition-all duration-200
      max-w-[200px] group"
                >
                  <span
                    className="text-sm font-medium truncate"
                    title={skill?.name}
                  >
                    {skill?.name}
                  </span>
                  {skill?.name?.length > 20 && (
                    <div
                      className="hidden group-hover:block absolute mt-8 bg-gray-800
        text-white text-xs rounded-md py-1 px-2 z-10"
                    >
                      {skill?.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        {profile?.bio && (
          <div className="text-sm my-10 text-center text-gray-300 animate-fade-up animate-once animate-delay-300">
            {profile?.bio}
          </div>
        )}

        <div className="flex items-center justify-center w-full">
          <a
            href={`${window.location.origin}/resume/${username}`}
            className="p-3 px-6 duration-200 rounded-full transform bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-gray-100 animate-fade-up hover:ring-2 ring-offset-2 animate-once animate-delay-[400ms] hover:scale-105"
          >
            Show My Resume
          </a>
        </div>

        {Array.isArray(socials) && socials.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-center space-x-4 flex-wrap gap-y-2">
              {socials.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${
                    socialColors[social?.name?.toLowerCase()] ||
                    "text-gray-500 hover:text-gray-600"
                  } transition-colors duration-200`}
                  onClick={() => handleSocialClick(social.url)}
                  title={social.name || "Social Link"}
                >
                  <SocialIcon type={social.name} />
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Hero component that selects the appropriate variant
const Hero = ({ portfolio, template }) => {
  switch (template) {
    case "MODERN":
      return <ModernHero portfolio={portfolio} />;
    case "PROFESSIONAL":
      return <ProfessionalHero portfolio={portfolio} />;
    case "MINIMAL":
      return <MinimalHero portfolio={portfolio} />;
    case "BASIC":
      return <BasicHero portfolio={portfolio} />;
    default:
      return <MinimalHero portfolio={portfolio} />;
  }
};

export default Hero;
