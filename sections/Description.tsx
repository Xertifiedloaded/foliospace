"use client";
import React from "react";
import {
  RiPlayFill,
  RiBookmarkLine,
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiPresentationLine,
  RiCodeSSlashLine,
  RiLightbulbLine,
  RiStackLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";

const PROFESSIONAL_HIGHLIGHTS = [
  {
    icon: RiCodeSSlashLine,
    title: "Portfolio Architect",
    description:
      "Create and customize your portfolio and resume without needing any coding skills. Edit instantly on the go.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: RiLightbulbLine,
    title: "Expertise Mapping",
    description:
      "Easily transform your skills into visually compelling storytelling, no technical expertise required",
    gradient: "from-purple-500 to-indigo-500",
  },

];

const ProfessionalBrandSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 px-4 lg:px-16 bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative rounded-xl bg-white shadow-xl p-8 space-y-6">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 to-blue-400 opacity-20 rounded-xl blur-xl"></div>
          <div className="space-y-6">
            {PROFESSIONAL_HIGHLIGHTS.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center space-x-6 group hover:bg-blue-50 p-4 rounded-lg transition duration-300"
              >
                <div
                  className={`p-4 rounded-full bg-gradient-to-br ${highlight.gradient} text-white transition-transform transform group-hover:scale-110`}
                >
                  <highlight.icon className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-blue-600 transition duration-300">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:flex  justify-between items-center border-t border-neutral-200 pt-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className="w-12 h-12 bg-neutral-300 rounded-full border-4 border-white shadow-md"
                ></div>
              ))}
            </div>
            <div className="lg:text-right">
              <p className="text-sm text-neutral-600">100+ Professionals Onboarded</p>
              <div className="flex items-center lg:justify-end mt-1">
                <RiCheckboxCircleLine className="mr-2 text-blue-600" />
                <span className="text-xs text-neutral-500">Verified Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Branding Message */}
        <div className="space-y-8">
          <div className="inline-block bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-sm font-medium">
            Professional Branding Ecosystem
          </div>

          <h2 className="lg:text-5xl text-3xl font-extrabold text-neutral-900 leading-tight">
            Architect Your Digital Professional Identity
          </h2>

          <div className="space-y-5 text-sm text-neutral-700">
            <p className="leading-relaxed">
              In today's competitive landscape, your digital presence is your most
              powerful career accelerator. FolioSpace transforms your professional
              journey into a strategic, compelling narrative that opens doors to
              unprecedented opportunities.
            </p>
            <p className="leading-relaxed">
              We transcend traditional portfolios—creating a dynamic platform that
              amplifies your unique professional story, celebrates your achievements,
              and positions you as an exceptional candidate.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6 lg:gap-8 lg:flex-nowrap flex-wrap justify-start">
              <Button
                size="lg"
                className="bg-blue-600 w-full hover:bg-blue-700 text-white group flex items-center px-6 py-3 rounded-lg transition duration-300"
              >
                <RiPresentationLine className="mr-3 text-sm" />
                Start Your Journey
                <RiArrowRightLine className="ml-3 opacity-0 group-hover:opacity-100 transition" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 w-full text-blue-600 hover:bg-blue-50 group flex items-center px-6 py-3 rounded-lg transition duration-300"
              >
                <RiBookmarkLine className="mr-3 text-sm" />
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBrandSection;
