

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import SkeletalLoader from "../../../components/SkeletalLoader";
import Basic from "../../../components/templates/Basic";
import ProfessionalTemplate from "../../../components/templates/Professional";
import MinimalTemplate from "../../../components/templates/Minimal";
import ModernTemplate from "../../../components/templates/Modern";
import Hero from "../../../sections/Hero";
import Link from "next/link";
import PortfolioDesign from "../../../components/portfolio/PortfolioDesign";

const PortfolioPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!username) return;

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

    fetchPortfolio();
  }, [username]);

  useEffect(() => {
    const logVisit = async () => {
      if (username && !loading && portfolio) {
        try {
          const response = await fetch('/api/analytics/post-visitor-analytics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ portfolioOwner: username }),
          });
          if (!response.ok) {
            throw new Error('Failed to log visit');
          }
        } catch (error) {
          console.error('Failed to log visit:', error);
        }
      }
    };

    logVisit();
  }, [username, loading, portfolio]);

  const renderTemplateContent = () => {
    switch (portfolio?.template) {
      case "PROFESSIONAL":
        return <ProfessionalTemplate portfolio={portfolio} />;
      case "MINIMAL":
        return <MinimalTemplate portfolio={portfolio} />;
      case "MODERN":
        return <ModernTemplate portfolio={portfolio} />;
      case "BASIC":
      default:
        return <Basic portfolio={portfolio} />;
    }
  };

  if (loading) {
    return <SkeletalLoader />;
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
<div className="min-h-screen bg-white dark:bg-gray-900">
  {/* <div className="max-w-6xl container mx-auto px-2 sm:px-6 lg:px-8">
    <Hero portfolio={portfolio} template={portfolio?.template} />
    {renderTemplateContent()}
  </div> */}
  <PortfolioDesign portfolio={portfolio}/>
</div>
  );
};

export default PortfolioPage;

