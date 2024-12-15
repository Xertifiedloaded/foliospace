import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  EducationSection,
  ExperienceSection,
  PortfolioLink,
  PortfolioProjectSections,
} from "../../../sections/ProjectSection";
import { PortfolioProfileCard } from "../../../components/UserProfileCard";

const ProfileHeader = ({ portfolio }) => (
  <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-2xl overflow-hidden">
    <div className="absolute top-0 right-0 opacity-20">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="250" cy="50" r="200" fill="white" fillOpacity="0.1" />
      </svg>
    </div>
    <div className="p-8 relative z-10 flex items-center">
      <div className="bg-white/20 p-1 rounded-full mr-6">
        <User className="w-24 h-24 text-white" />
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-2">{portfolio.name}</h1>
        <p className="text-xl opacity-80">{portfolio.headline}</p>
      </div>
    </div>
  </div>
);

const PortfolioPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/portfolio/${username}`);
        if (!response.ok) {
          throw new Error("Portfolio not found");
        }
        const data = await response.json();
        console.log(data);
        setPortfolio(data);
      } catch (error) {
        console.error("Portfolio fetch error:", error);
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

  if (!portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[400px] text-center">
          <CardHeader>
            <CardTitle>Portfolio Not Found</CardTitle>
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      <PortfolioProfileCard portfolio={portfolio} />
      {(portfolio.links?.length || portfolio.socials?.length) && (
        <PortfolioLink links={portfolio.links} socials={portfolio.socials} />
      )}

      {portfolio.experiences?.length > 0 && (
        <ExperienceSection experiences={portfolio.experiences} />
      )}

      {portfolio.education?.length > 0 && (
        <EducationSection education={portfolio.education} />
      )}

      {portfolio.projects?.length > 0 && (
        <PortfolioProjectSections projects={portfolio.projects} />
      )}
    </div>
  );
};

export default PortfolioPage;
