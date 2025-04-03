import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface Profile {
  name: string;
  tagline: string;
  picture: string;
  username: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: string;
}

const ProfileCard: React.FC<Profile> = ({
  name,
  tagline,
  picture,
  username,
  skills,
}) => {
  return (
    <Link
      href={`/portfolio/${username}`}
      className="group relative  bg-card border border-border  rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-700 hover:-translate-y-2"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage className="object-cover" src={picture} alt={name} />
            <AvatarFallback className="text-4xl">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <RotatingSkills skills={skills} />
        </div>
      </div>
    </Link>
  );
};

const ProfileSection: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/api/portfolio/users");
        setProfiles(response.data);
      } catch (err) {
        setError("Failed to load profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400">{error}</div>;
  }

  return (
    <section className="wrapper relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-5 text-white">
      <div className="">
        <div className="flex flex-col items-center justify-center md:text-left max-w-3xl mx-auto">
          <Button
            variant="outline"
            className="px-8 py-4 bg-border   text-xs bold rounded-xl  border-2 border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
          >
            <span className="relative z-10  flex items-center gap-2">
              Browse Template
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>

            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent border-b-2 border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
              <span className="absolute left-0 w-0 h-[2px] bg-blue-500/40 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              <span className="absolute right-0 w-0 h-[2px] bg-blue-500/40 group-hover:w-full group-hover:right-0 transition-all duration-300"></span>
            </span>
          </Button>
          <h1 className="text-3xl mt-5 md:text-5xl font-bold text-center mb-6 bg-clip-text text-heading bg-gradient-to-r from-white via-gray-100 to-gray-300">
            Meet a few of our Registered Users
          </h1>
          <p className="text-lg text-center text-praragraph mb-6">
            Showcase your work, update anytime, and attract global opportunities
            with ease. Start with a professional template that suits your style,
            no coding required.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-6">
          {profiles.map((profile, index) => (
            <ProfileCard key={index} {...profile} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;

const SkeletonLoader: React.FC = () => (
  <div className="grid  my-10 sm:grid-cols-2 md:grid-cols-3  gap-6">
    {Array(6)
      .fill(null)
      .map((_, index) => (
        <div key={index} className="animate-pulse flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
          </div>
        </div>
      ))}
  </div>
);

// @ts-ignore
function RotatingSkills({ skills }) {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 3) % Math.max(skills.length, 1));
    }, 60000);

    return () => clearInterval(interval);
  }, [skills.length]);

  const visibleSkills =
    skills.length > 0
      ? [...skills.slice(startIndex), ...skills.slice(0, startIndex)].slice(
          0,
          3
        )
      : [];
  // @ts-ignore
  const handleNextClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setStartIndex((startIndex + 3) % Math.max(skills.length, 1));
  };

  return (
    <div className="skill-container" onClick={(e) => e.stopPropagation()}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-20 rounded-full -mr-10 -mt-10"></div>
      <h3 className="text-lg font-bold mb-4 relative z-10">Technical Skills</h3>

      {visibleSkills.length > 0 ? (
        <div className="flex flex-wrap gap-2 relative z-10">
          {visibleSkills.map((skill, index) => (
            <div key={`${skill.name}-${index}`} className="group relative">
              <div className="max-w-[120px] px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-md border border-white/20 hover:bg-white/20 transition-all">
                <p className="text-sm font-medium truncate" title={skill.name}>
                  {skill.name.length > 12
                    ? `${skill.name.substring(0, 12)}...`
                    : skill.name}
                </p>
              </div>
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold">
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-300 italic relative z-10">
          No skills available
        </p>
      )}

      <div className="flex justify-between items-center mt-4 relative z-10">
        <span className="text-xs text-gray-400">
          {Math.ceil(startIndex / 3) + 1} of {Math.ceil(skills.length / 3)}
        </span>
        <div className="h-1 flex-1 mx-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{
              width: `${
                (startIndex / 3 / Math.ceil(skills.length / 3)) * 100
              }%`,
            }}
          ></div>
        </div>
        <button
          onClick={handleNextClick}
          className="text-xs bg-indigo-600 hover:bg-indigo-700 py-1 px-2 rounded transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
