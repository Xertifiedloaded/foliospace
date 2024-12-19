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

const FEATURE_SECTIONS = [
  {
    name: "Portfolio Architect",
    icon: RiDashboardLine,
    description:
      "Create, edit, and customize your portfolio effortlessly, without any coding expertise.",
    gradient: "from-cyan-500 to-blue-600",
    iconColor: "text-cyan-600",
  },
  {
    name: "Expertise Mapping",
    icon: RiCodeSSlashLine,
    description:
      "Turn your skills into visually compelling narratives, all without the need for coding.",
    gradient: "from-emerald-500 to-green-600",
    iconColor: "text-emerald-600",
  },
];

export default function ProfessionalHomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-teal-600 pb-10 text-white">
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-lg">
        <div className="px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <RiCheckboxCircleLine className="lg:text-3xl text-2xl  text-blue-600" />
            <span className="lg:text-xl font-extrabold tracking-tight text-neutral-900">
              FolioSpace
            </span>
          </div>
          <nav className="flex items-center space-x-6">
            {user && <UserNavigation />}
          </nav>
        </div>
      </header>

      <main className="wrapper px-8 pt-32 grid gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wider">
            Professional Portfolio Ecosystem
          </div>

          <h1 className="text-3xl lg:text-6xl font-extrabold text-neutral-100 leading-tight">
            Architect Your Professional Legacy
          </h1>

          <p className="lg:text-xl text-sm text-neutral-300 leading-relaxed max-w-2xl">
            Beyond traditional portfolios, we provide a dynamic platform that
            transforms your professional journey into a compelling, strategic
            narrative that resonates with global opportunities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mt-8">
            {FEATURE_SECTIONS.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white rounded-lg shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${feature.gradient}`}
              >
                <div className={`mb-4 ${feature.iconColor}`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {feature.name}
                </h3>
                <p className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          {!user && (
            <div className="flex space-x-4">
              <Button
                onClick={() => router.push("/auth/login")}
                variant="outline"
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-200 transition-all"
              >
                <RiLoginBoxLine className="mr-2" />
                Login
              </Button>
              <Button
                onClick={() => router.push("/auth/register")}
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                <RiUserAddLine className="mr-2" />
                Sign Up
              </Button>
            </div>
          )}
        </div>

        <div className="hidden lg:flex justify-center items-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
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
            </div>
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">
                  Profile Completeness
                </span>
                <span className="text-sm font-semibold text-blue-600">85%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-blue-600 rounded-full h-2 w-5/6"></div>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-sm font-semibold text-neutral-700">
                    12
                  </div>
                  <div className="text-xs text-neutral-500">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-neutral-700">
                    7
                  </div>
                  <div className="text-xs text-neutral-500">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-neutral-700">
                    3
                  </div>
                  <div className="text-xs text-neutral-500">Certifications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
