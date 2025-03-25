import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserNavigation } from "@/components/UserNavigation";
import { FAQ } from "@/components/Faq";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileSection from "@/sections/Profile";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";

import Newsletter from "@/components/Newsletter";

interface SubmitEmailResponse {
  success: boolean;
  message: string;
}

const features = [
  {
    title: "Easy Customization",
    description:
      "Drag and drop to design a portfolio that reflects you. Edit layout, fonts, colors, and background images with ease.",
    icon: "🎨",
  },
  {
    title: "Instant Updates",
    description:
      "Make changes anytime, no coding required. Add new projects, update your resume, or refresh the design in real-time.",
    icon: "⚡",
  },
  {
    title: "Mobile Friendly",
    description:
      "Your portfolio looks great on any device. Publish instantly to make your work accessible everywhere.",
    icon: "📱",
  },
  {
    title: "Professional Templates",
    description:
      "Choose from a wide range of professionally designed templates to kickstart your portfolio creation.",
    icon: "🏆",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <main>
        <Hero />
        <Features />
        <VideoSection />
        <Templates />
        <FAQ />
        <ProfileSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}



const Hero = () => {
  const { data: session } = useSession();
  return (
    <section className="container mx-auto px-4 py-20 md:py-32 text-center">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Architect your
        <br />
        Professional Legacy
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Transform your professional journey into a compelling, strategic
        narrative aligned with global opportunities.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div>
          {session ? (
            <Button
              size="lg"
              variant="default"
              className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <Link href="/profile/dashboard">Dashboard</Link>
              <ChevronRight className="ml-2 text-white h-4 w-4" />
            </Button>
          ) : (
            <div className="space-x-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  variant="default"
                  className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="default"
                  className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  Log In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Powerful Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <span className="text-4xl mr-4">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Templates = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          100+ Beautiful, Responsive Portfolio Templates
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Showcase your work, update anytime, and attract global opportunities
          with ease. Start with a professional template that suits your style,
          no coding required.
        </p>
        <Button size="lg" variant="default" className="rounded-full">
          Browse Templates <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/images/gallery.svg"
          alt="Template Gallery"
          width={1200}
          height={600}
          className="w-full rounded-lg shadow-2xl"
        />
      </motion.div>
    </section>
  );
};
interface SubmitEmailResponse {
  success: boolean;
  message: string;
}
const submitEmail = async (email: string): Promise<SubmitEmailResponse> => {
  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to subscribe");
    }

    return {
      success: true,
      message:
        data.message || "You've successfully subscribed to our newsletter!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while subscribing",
    };
  }
};

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            videoRef.current.play(); 
          }
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex justify-center items-center py-10">
      <video
        ref={videoRef}
        className="w-full max-w-5xl rounded-lg shadow-lg"
        preload="none"
        poster="/images/foliospace.png"
        controls
        playsInline
        muted
      >
        <source src="/video/foliospace.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};
