

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import SkeletalLoader from "../../../components/SkeletalLoader";
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

  <PortfolioDesign portfolio={portfolio}/>
</div>
  );
};

export default PortfolioPage;

