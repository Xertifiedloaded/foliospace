"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRight, Eye, LogIn, UserPlus } from "lucide-react";
import BrandVideoSection from "@/sections/Description";
import Features from "@/sections/Features";
import Profile from "@/sections/Profile";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
const navigationItems = [
  "Links",
  "Resume",
  "Skills",
  "Testimonials",
  "Hobbies",
  "Stacks",
];

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <>
      <section>
        {user && (
          <header className="p-4 bg-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={user?.profileImage ?? "/images/user.jpg"}
                  alt={`${user?.name}'s profile`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-semibold text-gray-800 hidden sm:block">
                  Welcome, {user.name}!
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <small
                  onClick={() => router.push("/profile/dashboard")}
                  className="text-sm px-4 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  View Hub
                </small>
                <small className="text-sm px-4 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Logout
                </small>
              </div>
            </div>
          </header>
        )}

        <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div
                style={{
                  background: "linear-gradient(to right, #00FFA3, #DC1FFF)",
                }}
                className="inline-block w-auto p-0.5 shadow rounded-full animate-gradient animate-fade animate-once animate-delay-100 animate-ease-in-out"
              >
                <p className="w-auto h-full px-4 py-2 bg-slate-50 dark:bg-neutral-900 dark:text-white font-medium text-sm tracking-wide text-blue-600 rounded-full text-slate-800/90 uppercase">
                  Welcome to Creatify
                </p>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Where Your Digital Presence Comes to Life
              </h1>

              <p className="text-gray-600 text-lg">
                Creatify is your ultimate platform to effortlessly build and
                showcase your unique personal brand. Design, customize, and
                share your professional journey with ease and creativity.
              </p>

              <div className="flex flex-col items-start space-y-6 text-start">
                <div className="flex flex-wrap  gap-4">
                  {!user && (
                    <>
                      <Button
                        onClick={() => router.push("/auth/login")}
                        className="flex items-center px-10 py-3 gap-2 font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
                      >
                        <LogIn className="w-5 h-5" />
                        Login
                      </Button>
                      <Button
                        onClick={() => router.push("/auth/register")}
                        variant="outline"
                        className="flex items-center px-10 py-3 gap-2 font-medium text-gray-700 border-gray-300 rounded-lg shadow-sm hover:border-gray-400 hover:bg-gray-50 transition"
                      >
                        <UserPlus className="w-5 h-5" />
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {navigationItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    className="text-sm font-medium"
                  >
                    {item}
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full rounded-md max-w-sm">
                <Image
                  src="/images/hero.png"
                  alt="Folllio Digital Showcase"
                  width={500}
                  height={500}
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        <BrandVideoSection />
        <Features />
        <Profile />
      </section>
    </>
  );
}
