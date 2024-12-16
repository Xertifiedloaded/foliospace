import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  EducationSection,
  ExperienceSection,
  PortfolioLink,
  PortfolioProjectSections,
} from "../../../sections/ProjectSection";
import { PortfolioProfileCard } from "../../../components/UserProfileCard";
import Hero from "../../../sections/Hero";

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
    <div className=" px-4 bg-black text-white py-8 max-w-4xl container mx-auto space-y-6">
      {/* <PortfolioProfileCard portfolio={portfolio} /> */}
      <Hero portfolio={portfolio}/>
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

      <div className="flex justify-center items-center">
        <Button>
          <a
            href={`${window.location.origin}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Create your Portfolio
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PortfolioPage;
