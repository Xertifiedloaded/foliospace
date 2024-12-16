import React, { useEffect, useState } from "react";
import {
  ExternalLink,
  LinkIcon,
  Share2Icon,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Globe,
  PlayIcon,
  LanguagesIcon,
} from "lucide-react";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const PortfolioProjectSections = ({ projects }) => (
  <Card className="w-full bg-black text-white">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <Briefcase className="w-5 h-5 text-sm text-white" /> Featured Projects
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {projects.map((project) => (
        <Dialog key={project.id}>
          <div className="border border-gray-800 rounded-lg p-4 hover:bg-gray-900 transition-all group">
            <div className="grid grid-cols-12 gap-4 items-center">
              {project.image && (
                <div className="col-span-3 md:col-span-2 lg:col-span-2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                </div>
              )}

              <div
                className={`${
                  project.image
                    ? "col-span-9 md:col-span-10 lg:col-span-10"
                    : "col-span-12"
                } space-y-2`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow pr-4">
                    <h3 className="font-bold text-lg truncate text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-400"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-400"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    )}
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-2 text-white hover:bg-gray-800">
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs bg-gray-900 text-white border-gray-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogContent className="max-w-2xl bg-black text-white border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">{project.title}</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-video object-cover rounded-md"
                />
              )}
              <div>
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-gray-800 text-white"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  {project.link && (
                    <Button 
                      asChild 
                      className="bg-gray-800 text-white hover:bg-gray-700"
                    >
                      <Link href={project.link} target="_blank">
                        View Project
                      </Link>
                    </Button>
                  )}
                  {project.githubLink && (
                    <Button 
                      variant="outline" 
                      asChild 
                      className="bg-black text-white border-gray-700 hover:bg-gray-900"
                    >
                      <Link href={project.githubLink} target="_blank">
                        GitHub Repository
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </CardContent>
  </Card>
);

export const EducationSection = ({ education }) => (
  <Card className="bg-black text-white">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <GraduationCap className="w-5 h-5 text-sm text-white" /> Academic Background
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="border-b border-gray-800 pb-4 last:border-b-0 group transition-all"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold lg:text-lg text-sm text-white">
                  {edu.degree}
                </h3>
                <p className="text-gray-400 text-sm">{edu.institution}</p>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-gray-800 text-white text-sm"
              >
                {new Date(edu.startDate).getFullYear()} -{" "}
                {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const ExperienceSection = ({ experiences }) => (
  <Card className="bg-black text-white">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <Briefcase className="w-5 h-5 text-white" /> Professional Experience
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="border-b border-gray-800 pb-4 last:border-b-0 group transition-all"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-white">{exp.position}</h3>
                <p className="text-gray-400">{exp.company}</p>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-gray-800 text-white"
              >
                {new Date(exp.startDate).getFullYear()} -{" "}
                {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const PortfolioLink = ({ links, socials, profile }) => {
  const [activeTab, setActiveTab] = useState("links");

  return (
    <Card className="w-full bg-black text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <ExternalLink className="w-6 h-6 text-white" />
          Profile Connections
        </CardTitle>
      </CardHeader>

      <Tabs
        defaultValue="links"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 mb-4 bg-gray-900">
          <TabsTrigger 
            value="links" 
            className="flex items-center text-white hover:bg-gray-800 data-[state=active]:bg-gray-700"
          >
            <LinkIcon className="mr-2 w-4 h-4" />
            Links
          </TabsTrigger>
          <TabsTrigger 
            value="socials" 
            className="flex items-center text-white hover:bg-gray-800 data-[state=active]:bg-gray-700"
          >
            <Share2Icon className="mr-2 w-4 h-4" />
            Socials
          </TabsTrigger>
          <TabsTrigger 
            value="hobbies" 
            className="flex items-center text-white hover:bg-gray-800 data-[state=active]:bg-gray-700"
          >
            <PlayIcon className="mr-2 w-4 h-4" />
            Hobbies
          </TabsTrigger>
          <TabsTrigger 
            value="languages" 
            className="flex items-center text-white hover:bg-gray-800 data-[state=active]:bg-gray-700"
          >
            <LanguagesIcon className="mr-2 w-4 h-4" />
            Languages
          </TabsTrigger>
        </TabsList>

        <CardContent>
          {/* Links Tab */}
          <TabsContent value="links">
            <div className="space-y-3">
              {links?.length > 0 ? (
                links.map((link) => (
                  <Button
                    key={link.id}
                    variant="outline"
                    className="w-full justify-between mb-2 bg-gray-900 text-white border-gray-700 hover:bg-gray-800"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <div className="flex items-center">
                      <Globe className="mr-3 w-5 h-5 text-gray-400" />
                      {link.text}
                    </div>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Button>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  No personal links available
                </p>
              )}
            </div>
          </TabsContent>

          {/* Socials Tab */}
          <TabsContent value="socials">
            <div className="space-y-3">
              {socials?.length > 0 ? (
                socials.map((social) => (
                  <Button
                    key={social.id}
                    variant="outline"
                    className="w-full justify-between mb-2 bg-gray-900 text-white border-gray-700 hover:bg-gray-800"
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <div className="flex items-center">
                      <Share2Icon className="mr-3 w-5 h-5 text-gray-400" />
                      {social.name}
                    </div>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Button>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  No social profiles available
                </p>
              )}
            </div>
          </TabsContent>

          {/* Hobbies Tab */}
          <TabsContent value="hobbies">
            <div className="space-y-3">
              {profile?.hobbies?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.hobbies.map((hobby, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="px-3 py-1 bg-gray-900 text-white border-gray-700"
                    >
                      {hobby}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">
                  No hobbies listed
                </p>
              )}
            </div>
          </TabsContent>

          {/* Languages Tab */}
          <TabsContent value="languages">
            <div className="space-y-3">
              {profile?.languages?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((language, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="px-3 py-1 bg-gray-800 text-white"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">
                  No languages listed
                </p>
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};