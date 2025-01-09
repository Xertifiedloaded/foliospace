"use client";
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

const FEATURE_SECTIONS = [
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-teal-600 dark:from-slate-900 dark:to-slate-800">
      <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <RiCheckboxCircleLine className="lg:text-3xl text-2xl text-primary" />
            <span className="lg:text-xl font-extrabold tracking-tight">
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

          <h1 className="text-3xl lg:text-6xl font-extrabold text-white dark:text-slate-100 leading-tight">
            Architect Your Professional Legacy
          </h1>

          <p className="lg:text-xl text-sm text-white/80 dark:text-slate-300 leading-relaxed max-w-2xl">
            Beyond traditional portfolios, we provide a dynamic platform that
            transforms your professional journey into a compelling, strategic
            narrative that resonates with global opportunities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {FEATURE_SECTIONS.map((feature, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className={`mb-4 ${feature.gradient} text-white rounded-full w-12 h-12 flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
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
              >
                <RiLoginBoxLine className="mr-2" />
                Login
              </Button>
              <Button
                onClick={() => router.push("/auth/register")}
              >
                <RiUserAddLine className="mr-2" />
                Sign Up
              </Button>
            </div>
          )}
        </div>

        <div className="hidden lg:flex justify-center items-center">
          <Card className="w-full max-w-md">
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
                <span className="text-sm text-muted-foreground">
                  Profile Completeness
                </span>
                <span className="text-sm font-semibold text-primary">85%</span>
              </div>
              <Progress value={85} className="w-full" />
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-sm font-semibold">12</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold">7</div>
                  <div className="text-xs text-muted-foreground">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold">3</div>
                  <div className="text-xs text-muted-foreground">Certifications</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}