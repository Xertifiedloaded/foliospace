"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  RiLoginBoxLine,
  RiUserAddLine,
  RiDashboardLine,
  RiCodeSSlashLine,
  RiLightbulbLine,
} from "react-icons/ri";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserNavigation } from "./UserNavigation";

const FEATURE_SECTIONS = [
  {
    name: "Portfolio Builder",
    icon: RiDashboardLine,
    description:
      "Create stunning, professional portfolios with intuitive drag-and-drop tools.",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    name: "Skill Showcase",
    icon: RiCodeSSlashLine,
    description:
      "Visualize your expertise through interactive skill graphs and project displays.",
    gradient: "from-green-500 to-green-700",
  },
  {
    name: "Career Insights",
    icon: RiLightbulbLine,
    description:
      "Receive AI-powered recommendations to amplify your professional brand.",
    gradient: "from-purple-500 to-purple-700",
  },
];

export default function ProfessionalHomePage() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="lg:min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className=" font-bold  wrapper py-3 flex justify-between items-center">
          <div className="">Creatify</div>

          <nav className="flex items-center space-x-4">
            {user ? (
              <UserNavigation />
            ) : (
              <div className="flex space-x-3">
                <Button
                  onClick={() => router.push("/auth/login")}
                  variant="outline"
                  className="hover:bg-blue-50 transition-colors"
                >
                  <RiLoginBoxLine className="mr-2" />
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/auth/register")}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <RiUserAddLine className="mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="wrapper px-4 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
            Professional Portfolio Platform
          </div>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Transform Your Professional Narrative
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            Elevate your career with a compelling digital portfolio that
            showcases your unique skills, achievements, and potential to global
            opportunities.
          </p>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {FEATURE_SECTIONS.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${feature.gradient} text-white rounded-lg p-5 
                  transform transition-all duration-300 hover:shadow-xl`}
              >
                <div className="mb-3">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">{feature.name}</h3>
                <p className="text-sm opacity-80">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex space-x-4 pt-6">
            <Button
              onClick={() => router.push("/auth/register")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex justify-center items-center"
        >
          <Image
            src="/images/hero.png"
            alt="Professional Portfolio Illustration"
            width={500}
            height={500}
            className="max-w-full h-auto"
          />
        </motion.div>
      </main>
    </div>
  );
}
