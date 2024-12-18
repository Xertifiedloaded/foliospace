"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[400px] text-center">
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
    <div className="">
      <Card className="w-full mb-8 shadow-lg">
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
                {profile.phoneNumber}
              </span>
            )}
            {profile?.address && (
              <span className="text-sm md:text-base">{profile.address}</span>
            )}
          </div>
        </div>
      </Card>

      <div className=" md:grid container mx-auto max-w-7xl px-4 lg:px-6 grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {profile.bio && (
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Professional Summary
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                {profile?.bio}
              </p>
            </section>
          )}

          {experiences && (
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-primary" />
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-4 border rounded-md shadow-sm">
                    <h3 className="text-lg font-bold">{exp.position}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {new Date(exp.startDate).getFullYear()} -{" "}
                      {exp.endDate
                        ? new Date(exp.endDate).getFullYear()
                        : "Present"}
                    </Badge>
                    <ul className="mt-2 list-disc pl-6 text-sm">
                      {exp.description.split("\n").map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {skills && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills?.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {education && (
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 border rounded-md shadow-sm">
                    <h3 className="text-lg font-bold">{edu.institution}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {new Date(edu.startDate).getFullYear()} -{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).getFullYear()
                        : "Present"}
                    </Badge>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
