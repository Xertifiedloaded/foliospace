"use client";
import {
  RiLoginBoxLine,
  RiUserAddLine,
  RiDashboardLine,
  RiCodeSSlashLine,
  RiLightbulbLine,
  RiCheckboxCircleLine
} from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserNavigation } from "./UserNavigation";
import { useSession } from "next-auth/react";

const FEATURE_SECTIONS = [
  {
    name: "Portfolio Architect",
    icon: RiDashboardLine,
    description: "Precision-engineered design tools to craft your professional narrative.",
    gradient: "from-cyan-500 to-blue-600",
    iconColor: "text-cyan-600"
  },
  {
    name: "Expertise Mapping",
    icon: RiCodeSSlashLine,
    description: "Transform complex skills into compelling visual storytelling.",
    gradient: "from-emerald-500 to-green-600",
    iconColor: "text-emerald-600"
  },
  {
    name: "Career Intelligence",
    icon: RiLightbulbLine,
    description: "AI-powered insights to strategically elevate your professional brand.",
    gradient: "from-indigo-500 to-purple-600",
    iconColor: "text-indigo-600"
  }
];

export default function ProfessionalHomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <header className="fixed w-full top-0 z-50 bg-white/85 backdrop-blur-md border-b border-neutral-200 shadow-sm">
        <div className=" px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <RiCheckboxCircleLine className="mr-2 text-2xl text-blue-600" />
            <span className="lg:text-2xl text-sm  font-black text-neutral-900 tracking-tight">FolioSpace</span>
          </div>
          <nav className="flex items-center space-x-4">
            {user ? (
              <UserNavigation />
            ) : (
              <div className="flex space-x-3">
                <Button
                  onClick={() => router.push("/auth/login")}
                  variant="outline"
                  className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                >
                  <RiLoginBoxLine className="mr-2" />
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/auth/register")}
                  className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <RiUserAddLine className="mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="wrapper px-6 pt-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium tracking-wide">
            Professional Portfolio Ecosystem
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-neutral-900 leading-tight">
            Architect Your Professional Legacy
          </h1>

          <p className="lg:text-lg text-sm text-neutral-600 leading-relaxed">
            Beyond traditional portfolios—we provide a dynamic platform that transforms 
            your professional journey into a compelling, strategic narrative that resonates 
            with global opportunities.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {FEATURE_SECTIONS.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white border-l-4 ${feature.gradient} 
                  p-5 rounded-lg shadow-subtle transition-all duration-300 
                  hover:shadow-md hover:translate-x-1`}
              >
                <div className={`mb-3 ${feature.iconColor}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2 text-neutral-900">{feature.name}</h3>
                <p className="text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={() => router.push("/auth/register")}
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Begin Your Journey
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Discover More
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Portfolio Dashboard</h2>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Pro</span>
              </div>
              <div className="mt-4 flex items-center">
                <div className="w-12 h-12 bg-white/30 rounded-full mr-4"></div>
                <div>
                  <div className="text-sm font-semibold">Makinde Olaitan</div>
                  <div className="text-xs opacity-75">Software Engineer</div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Profile Completeness</span>
                <span className="text-sm font-semibold text-blue-600">85%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-blue-600 rounded-full h-2 w-5/6"></div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-sm font-semibold text-neutral-700">12</div>
                  <div className="text-xs text-neutral-500">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-neutral-700">7</div>
                  <div className="text-xs text-neutral-500">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-neutral-700">3</div>
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