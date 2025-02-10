import { FAQ } from "@/components/Faq";
import { UserNavigation } from "@/components/UserNavigation";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProfileSection from "@/sections/Profile";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const data = [
  {
    title: "Easy Customization",
    paragraph:
      "Drag and drop to design a portfolio that reflects you. You can also edit the layout and design elements like fonts, colors, and background images.",
  },
  {
    title: "Instant Updates",
    paragraph:
      "Make changes anytime, no coding required. You can make changes, add new projects, update your resume, or refresh the design whenever they want.",
  },
  {
    title: "Mobile Friendly",
    paragraph:
      "Your portfolio looks great on any device. Once you are happy with the portfolio, you can hit Publish to make it live.",
  },
  {
    title: "Professional Templates",
    paragraph:
      "Make changes anytime, no coding required. You can make changes, add new projects, update your resume, or refresh the design whenever they want.",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <Hero />
        <Customization />
        <Beautiful />
        <FAQ />
        <ProfileSection />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

const Header = () => {
  return (
    <>
      <header className=" pt-3 flex justify-between  items-center">

        <Link href="/" className="">
        <Image
          src="/images/logo.svg"
          alt="gallery"
          width={500}
          height={250}
          className="object-cover w-[400px] inline-block"
        />
        </Link>
        <UserNavigation />
      </header>
    </>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 h-screen flex flex-col justify-center items-center relative">
        <h1 className="text-3xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-heading bg-gradient-to-r from-white via-gray-100 to-gray-300">
          Architect your
          <span className="block mt-2">Professional Legacy</span>
        </h1>

        <p className="text-lg md:text-xl text-paragraph max-w-2xl text-center mb-8 leading-relaxed">
          Beyond traditional portfolios, we provide a dynamic platform that
          transforms your professional journey into a compelling, strategic
          narrative aligned with global opportunities.
        </p>

        <Button
          variant="outline"
          className="px-8 py-6 text-lg rounded-xl bg-transparent border-2 border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Create Portfolio
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>

          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent border-b-2 border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
            <span className="absolute left-0 w-0 h-[2px] bg-blue-500/40 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            <span className="absolute right-0 w-0 h-[2px] bg-blue-500/40 group-hover:w-full group-hover:right-0 transition-all duration-300"></span>
          </span>
        </Button>
      </div>
    </section>
  );
};

const Customization = () => {
  return (
    <section className="grid grid-cols-1  gap-10 md:grid-cols-2">
      {data.map(({ title, paragraph }, idx) => (
        <Card
          key={idx}
          className=" border-0 bg-transparent  flex flex-col  justify-center items-start  px-6 py-10 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold text-heading">{title}</h3>
          <p className="mt-2 text-paragraph">{paragraph}</p>
        </Card>
      ))}
    </section>
  );
};

const Beautiful = () => {
  return (
    <section className="mt-28">
      <div className="flex flex-col items-center justify-center md:text-left max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-heading bg-gradient-to-r from-white via-gray-100 to-gray-300">
          100+ beautiful, responsive portfolio templates
        </h1>
        <p className="text-lg text-center text-praragraph mb-6">
          Showcase your work, update anytime, and attract global opportunities
          with ease. Start with a professional template that suits your style,
          no coding required.
        </p>

        <Button
          variant="outline"
          className="px-8 py-4  text-lg rounded-xl bg-transparent border-2 border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Browse Template
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>

          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent border-b-2 border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
            <span className="absolute left-0 w-0 h-[2px] bg-blue-500/40 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            <span className="absolute right-0 w-0 h-[2px] bg-blue-500/40 group-hover:w-full group-hover:right-0 transition-all duration-300"></span>
          </span>
        </Button>
      </div>

      <div className="">
        <Image
          src="/images/gallery.svg"
          alt="gallery"
          width={250}
          height={250}
          className="object-cover w-full"
        />
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section className="my-10 max-w-5xl mx-auto bg-white text-foreground p-14 rounded-3xl flex flex-col items-center justify-center">
      <h1 className="text-black lg:text-4xl text-center text-xl mb-5">
        Create your portfolio today. Showcase what you do.{" "}
      </h1>
      <Button
        className="border bg-background text-foreground
       border-black"
      >
        Get Started Now
      </Button>
    </section>
  );
};
