import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRight, LogIn, UserPlus } from "lucide-react";
import BrandVideoSection from "@/sections/Description";
import Features from "@/sections/Features";
import Profile from "@/sections/Profile";

const navigationItems = [
  "Links",
  "Resume",
  "Skills",
  "Testimonials",
  "Hobbies",
  "Stacks",
];

export default function Home() {
  return (
    <>
      <section>
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

              <div className="flex space-x-5">
                <Button
                  variant="outline"
                  className="flex items-center w-[40%] gap-2 font-semibold"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Button>

                <Button className="flex w-[40%] items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-5 h-5" />
                  Register
                </Button>
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
