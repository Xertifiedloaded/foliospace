import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Link,
  FileText,
  Star,
  MessageCircle,
  Gamepad,
  Layers,
  LucideIcon,
} from "lucide-react";

interface Feature {
  title: string;
  paragraph: string;
}

interface FeatureIcons {
  [key: string]: LucideIcon;
}

const featureIcons: FeatureIcons = {
  Links: Link,
  Resume: FileText,
  "Skills:": Star,
  "Testimonials:": MessageCircle,
  "Hobbies:": Gamepad,
  "Stack:": Layers,
};

const Features: React.FC = () => {
  const featureData: Feature[] = [
    {
      title: "Links",
      paragraph:
        "Seamlessly integrate all your essential links. From your latest project to your must-read blog, they're all just one click away",
    },
    {
      title: "Resume",
      paragraph:
        "Showcase your journey, skills, and experience. Let your resume be the story that propels your career forward.",
    },
    {
      title: "Skills:",
      paragraph:
        "Highlight what you do best. From coding prowess to design flair, your unique talents take center stage.",
    },
    {
      title: "Testimonials:",
      paragraph:
        "Let others speak for you. Display glowing endorsements that reinforce your expertise and character.",
    },
    {
      title: "Hobbies:",
      paragraph:
        "Share what fuels you beyond work. Because who you are is as important as what you do.",
    },
    {
      title: "Stack:",
      paragraph:
        "Developers, creatives, educators — whatever your stack, flaunt the tools that make your magic happen.",
    },
  ];

  return (
    <section className=" wrapper bg-gray-50">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-4">
            Your Digital Brand, Fully Expressed
          </h2>
          <p className="lg:text-lg text-sm text-gray-600 max-w-2xl mx-auto">
            Creatify transforms how you present your professional identity,
            offering a comprehensive platform to showcase every dimension of
            your potential.
          </p>
        </div>

        <div className="grid  sm:grid-cols-2 md:grid-cols-3  gap-6">
          {featureData.map((feature, index) => {
            const IconComponent = featureIcons[feature.title];

            return (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 
                  group overflow-hidden border-2 border-transparent 
                  hover:border-blue-500"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    {IconComponent && (
                      <div className="bg-blue-50 p-3 rounded-full">
                        <IconComponent
                          className="w-6 h-6 text-blue-600 
                          group-hover:rotate-[360deg] transition-transform"
                        />
                      </div>
                    )}
                    <CardTitle className="lg:text-xl text-base font-semibold text-gray-800">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.paragraph}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
