"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[400px] text-center">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
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

  const { profile, socials, name, email, education, experiences } =
    resume || {};

  return (
    <div className="container mx-auto max-w-6xl px-2 sm:px-4 md:px-6 ">
      <Card className="w-full">
        <div className="bg-primary text-primary-foreground text-center p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            {name}
          </h1>
          {profile.tagline && (
            <p className="text-sm sm:text-base text-primary-foreground/80 mb-2">
              {profile?.tagline}
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-xs sm:text-sm">{email}</span>
            <Separator
              orientation="horizontal"
              className="w-16 sm:hidden my-1"
            />
            {profile.phoneNumber && (
              <>
                <Separator
                  orientation="vertical"
                  className="h-4 hidden sm:block"
                />
                <span className="text-xs sm:text-sm">
                  {profile?.phoneNumber}
                </span>
              </>
            )}

            <Separator
              orientation="horizontal"
              className="w-16 sm:hidden my-1"
            />

            {profile.address && (
              <>
                <Separator
                  orientation="vertical"
                  className="h-4 hidden sm:block"
                />
                <span className="text-xs sm:text-sm">
                  {profile?.address || "San Francisco, CA"}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-4">
                Professional Summary
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {profile?.bio}
              </p>
            </section>

            {/* Professional Experience */}
            <section>
              {experiences && experiences.length > 0 && (
                <h2 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-4">
                  Professional Experience
                </h2>
              )}
              <div className="space-y-6">
                {experiences &&
                  experiences.map(
                    ({
                      id,
                      company,
                      endDate,
                      startDate,
                      position,
                      description,
                    }) => (
                      <div key={id}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                          <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-0">
                            {position}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="text-xs sm:text-sm"
                          >
                            {new Date(startDate).getFullYear()} -{" "}
                            {endDate
                              ? new Date(endDate).getFullYear()
                              : "Present"}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                          {company}
                        </p>
                        <div className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm text-muted-foreground space-y-1">
                          {description}
                        </div>
                      </div>
                    )
                  )}
              </div>
            </section>
          </div>

          <div>
            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-4">
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile?.skills &&
                  profile.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs sm:text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-4">
                Education
              </h2>
              {education &&
                education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-sm sm:text-base">
                      {edu.institution}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {edu.degree}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-2 text-xs sm:text-sm"
                    >
                      {new Date(edu.startDate).getFullYear()} -{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).getFullYear()
                        : "Present"}
                    </Badge>
                  </div>
                ))}
            </section>
          </div>
        </div>
      </Card>
    </div>
  );
}
