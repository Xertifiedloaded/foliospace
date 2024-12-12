"use client";

import Image from "next/image";
import BrandVideoSection from "@/sections/Description";
import Features from "@/sections/Features";
import Profile from "@/sections/Profile";

import ProfessionalHomePage from "@/components/Home";

export default function Home() {

  return (
    <>
   <ProfessionalHomePage/>
      <BrandVideoSection />
      <Features />
      <Profile />
    </>
  );
}
