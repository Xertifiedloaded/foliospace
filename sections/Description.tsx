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
    title: "Dynamic Skill Mapping",
    description:
      "Transform complex skills into visual, interactive narratives.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: RiLightbulbLine,
    title: "AI-Powered Insights",
    description:
      "Intelligent recommendations to elevate your professional brand.",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: RiStackLine,
    title: "Comprehensive Portfolio",
    description:
      "Curate and showcase your achievements with precision and creativity.",
    gradient: "from-green-500 to-emerald-500",
  },
];

const ProfessionalBrandSection: React.FC = () => {
  return (
    <section className=" wrapper py-16 grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-neutral-100 rounded-3xl blur-2xl opacity-50"></div>
        <div className="relative z-10 bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 space-y-6">
            {PROFESSIONAL_HIGHLIGHTS.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-5 group">
                <div
                  className={`
                  p-3 rounded-xl bg-gradient-to-br ${highlight.gradient} 
                  text-white transition-transform group-hover:scale-105
                `}
                >
                  <highlight.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold  text-neutral-900 group-hover:text-blue-600 transition">
                    {highlight.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-neutral-50 border-t border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-neutral-300 rounded-full border-2 border-white"
                  ></div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600">
                  100+ Professionals Onboarded
                </p>
                <div className="flex items-center justify-end mt-1">
                  <RiCheckboxCircleLine className="mr-2 text-blue-600" />
                  <span className="text-xs text-neutral-500">
                    Verified Network
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 ">
        <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          Professional Branding Ecosystem
        </div>

        <h2 className="lg:text-4xl text-4xl font-bold text-neutral-900 leading-tight">
          Architect Your Digital Professional Identity
        </h2>

        <div className="space-y-5">
          <p className="lg:text-lg text-sm text-neutral-600 leading-relaxed">
            In today's competitive landscape, your digital presence is your most
            powerful career accelerator. Creatify transforms your professional
            journey into a strategic, compelling narrative that opens doors to
            unprecedented opportunities.
          </p>
          <p className="lg:text-lg text-sm text-neutral-600 leading-relaxed">
            We transcend traditional portfolios—creating a dynamic platform that
            amplifies your unique professional story, celebrates your
            achievements, and positions you as an exceptional candidate.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:justify-start">
            <Button
              size="lg"
              className="bg-blue-600 w-full hover:bg-blue-700 text-white group flex items-center px-6 py-3 rounded-lg"
            >
              <RiPresentationLine className="mr-2 text-lg" />
              Start Your Journey
              <RiArrowRightLine className="ml-2 opacity-0 group-hover:opacity-100 transition" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 w-full text-blue-600 hover:bg-blue-50 group flex items-center px-6 py-3 rounded-lg"
            >
              <RiBookmarkLine className="mr-2 text-lg" />
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBrandSection;
