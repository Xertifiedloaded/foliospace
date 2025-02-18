"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SkeletalLoader from "../../../components/SkeletalLoader";
import { BriefcaseIcon } from "lucide-react";

export default function ResumePage() {
  const router = useRouter();
  const { username } = router.query;
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/portfolio/${username}`);
        if (!response.ok) {
          throw new Error("Resume not found");
        }
        const data = await response.json();
        setResume(data);
      } catch (error) {
        console.error("Resume fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPortfolio();
    }
  }, [username]);

  if (loading) {
    return <SkeletalLoader />;
  }

  if (!resume) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-black dark:text-white">
        <Card className="w-[400px] border-0 text-center">
          <CardHeader>
            <CardTitle>Resume Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We couldn't find any data for the user.</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/">Go Back</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { profile, socials, name, email, education, experiences, skills } =
    resume || {};

  return (
    <div className="h-screen">
      <Card className="w-full border-0 mb-8 shadow-lg">
        <div className="bg-gradient-to-r from-primary to-secondary text-white text-center p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
          {profile?.tagline && (
            <p className="text-base md:text-lg text-white/80 mb-4">
              {profile?.tagline}
            </p>
          )}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <span className="text-sm md:text-base">{email}</span>
            {profile?.phoneNumber && (
              <span className="text-sm md:text-base">
                {profile?.phoneNumber}
              </span>
            )}
            {profile?.address && (
              <span className="text-sm md:text-base">{profile?.address}</span>
            )}
          </div>
        </div>
      </Card>

      <div className="md:grid container mx-auto max-w-7xl px-4 lg:px-6 grid-cols-1 md:grid-cols-3 gap-6">
  <div className="col-span-2 space-y-6">
    {profile?.bio && (
      <section>
        <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
        <p className="text-sm md:text-base text-muted-foreground dark:text-gray-300">
          {profile.bio}
        </p>
      </section>
    )}

    {experiences && experiences.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BriefcaseIcon className="h-5 w-5 text-primary" />
          Professional Experience
        </h2>
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp?.id}
              className="p-4 border-0 rounded-md shadow-sm dark:bg-gray-800"
            >
              <h3 className="text-lg font-bold">{exp?.position}</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {exp?.company}
              </p>
              <Badge variant="secondary" className="mt-2">
                {new Date(exp?.startDate).getFullYear()} -{" "}
                {exp.endDate ? new Date(exp?.endDate).getFullYear() : "Present"}
              </Badge>
              <ul className="mt-2 list-disc pl-6 text-sm">
                {exp?.description?.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>

  <div className="space-y-6">
    {skills && skills.length > 0 && (
      <section className="lg:mt-0 mt-3">
        <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 mr-2 bg-gray-100 text-black rounded-full text-xs dark:bg-gray-700 dark:text-white"
            >
              <span className="font-bold mr-2 text-gray-700 dark:text-gray-300">
                {skill?.name}
              </span>
              <span className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                {skill?.level}
              </span>
            </span>
          ))}
        </div>
      </section>
    )}

    {education && education.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu?.id}
              className="p-4 border-0 rounded-md shadow-sm dark:bg-gray-800"
            >
              <h3 className="text-lg font-bold">{edu?.institution}</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {edu?.degree}
              </p>
              <Badge variant="secondary" className="mt-2">
                {new Date(edu?.startDate).getFullYear()} -{" "}
                {edu?.endDate ? new Date(edu?.endDate).getFullYear() : "Present"}
              </Badge>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
</div>

      <footer className="mt-8 mb-4 text-center">
        <small className="text-gray-500 dark:text-gray-400 font-light flex items-center justify-center gap-1">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-700 dark:text-white hover:text-blue-600 transition-colors">
          {name}
          </span>
          <span className="text-gray-400">•</span> All rights reserved
        </small>
      </footer>
    </div>
  );
}
