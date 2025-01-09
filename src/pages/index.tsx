"use client";

import ProfessionalHomePage from "@/components/Home";
import ProfileSection from "@/sections/Profile";
import Footer from "@/components/ui/Footer";
import { FAQ } from "@/components/Faq";

export default function Home() {
  return (
    <>
      <ProfessionalHomePage />
      <FAQ />
      <ProfileSection />

      <Footer />
    </>
  );
}
