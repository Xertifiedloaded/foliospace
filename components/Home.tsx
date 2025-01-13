"use client";

import React from "react";
import {
  RiLoginBoxLine,
  RiUserAddLine,
  RiDashboardLine,
  RiCodeSSlashLine,
  RiLightbulbLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserNavigation } from "./UserNavigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from './ThemeToggle';

interface FeatureSection {
  name: string;
  icon: React.ElementType;
  description: string;
  gradient: string;
}

const FEATURE_SECTIONS: FeatureSection[] = [
  {
    name: "Portfolio Architect",
    icon: RiDashboardLine,
    description:
      "Create, edit, and customize your portfolio effortlessly, without any coding expertise.",
    gradient: "bg-gradient-to-r from-cyan-500 to-blue-600",
  },
  {
    name: "Expertise Mapping",
    icon: RiCodeSSlashLine,
    description:
      "Turn your skills into visually compelling narratives, all without the need for coding.",
    gradient: "bg-gradient-to-r from-emerald-500 to-green-600",
  },
];

export default function ProfessionalHomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-100 dark:from-slate-900 transition-colors duration-200">
      <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <RiCheckboxCircleLine className="lg:text-3xl text-2xl text-primary dark:text-primary" />
            <span className="lg:text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              FolioSpace
            </span>
          </div>
          <nav className="flex items-center space-x-6">
            <ThemeToggle />
            {user && <UserNavigation />}
          </nav>
        </div>
      </header>

      <main className="wrapper px-8 pt-32 grid gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold tracking-wider">
            Professional Portfolio Ecosystem
          </div>

          <h1 className="text-3xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Architect Your Professional Legacy
          </h1>

          <p className="lg:text-xl text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
            Beyond traditional portfolios, we provide a dynamic platform that
            transforms your professional journey into a compelling, strategic
            narrative that resonates with global opportunities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {FEATURE_SECTIONS.map((feature, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800"
              >
                <CardHeader>
                  <div className={`mb-4 ${feature.gradient} text-white rounded-full w-12 h-12 flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {!user && (
            <div className="flex space-x-4">
              <Button
                onClick={() => router.push("/auth/login")}
                variant="outline"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RiLoginBoxLine className="mr-2" />
                Login
              </Button>
              <Button
                onClick={() => router.push("/auth/register")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
              >
                <RiUserAddLine className="mr-2" />
                Sign Up
              </Button>
            </div>
          )}
        </div>

        <div className="hidden lg:flex justify-center items-center">
          <Card className="w-full max-w-md bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Portfolio Dashboard</h2>
                <span className="text-sm bg-white/30 px-3 py-1 rounded-full">
                  Pro
                </span>
              </div>
              <div className="mt-4 flex items-center">
                <div className="w-12 h-12 bg-white/30 rounded-full mr-4"></div>
                <div>
                  <div className="text-sm font-semibold">Makinde Olaitan</div>
                  <div className="text-xs opacity-75">Software Engineer</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Profile Completeness
                </span>
                <span className="text-sm font-semibold text-primary dark:text-primary">85%</span>
              </div>
              <Progress value={85} className="w-full" />
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">12</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">7</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">3</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Certifications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

