


import React, { useEffect, useState } from "react";
import { ExternalLink, LinkIcon, Share2Icon,Briefcase,GraduationCap, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-sm" /> Featured Projects
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {projects.map((project) => (
        <Dialog key={project.id}>
          <div className="border rounded-lg p-4 hover:shadow-sm transition-all group">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Project Image */}
              {project.image && (
                <div className="col-span-3 md:col-span-2 lg:col-span-2">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                </div>
              )}

              {/* Project Details */}
              <div className={
                `${project.image ? 'col-span-9 md:col-span-10 lg:col-span-10' : 'col-span-12'} space-y-2`
              }>
                <div className="flex justify-between items-start">
                  <div className="flex-grow pr-4">
                    <h3 className="font-bold text-lg truncate">{project.title}</h3>
                    <p className="text-muted-foreground mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Links and Dialog Trigger */}
                  <div className="flex items-center space-x-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Project Dialog */}
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
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
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  {project.link && (
                    <Button asChild>
                      <Link href={project.link} target="_blank">
                        View Project
                      </Link>
                    </Button>
                  )}
                  {project.githubLink && (
                    <Button variant="outline" asChild>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-sm" /> Academic Background
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {education.map((edu) => (
            <div 
              key={edu.id} 
              className="border-b pb-4 last:border-b-0 group transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold lg:text-lg text-sm">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                </div>
                <Badge variant="secondary text-sm">
                  {new Date(edu.startDate).getFullYear()} - {edu.endDate 
                    ? new Date(edu.endDate).getFullYear() 
                    : 'Present'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
  

  export const ExperienceSection = ({ experiences }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" /> Professional Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="border-b pb-4 last:border-b-0 group transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <Badge variant="secondary">
                  {new Date(exp.startDate).getFullYear()} - {exp.endDate 
                    ? new Date(exp.endDate).getFullYear() 
                    : 'Present'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
  


  export const PortfolioLink = ({ links, socials }) => {
    const [activeTab, setActiveTab] = useState('links');
  
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <ExternalLink className="w-6 h-6" />
            Links & Connections
          </CardTitle>
        </CardHeader>
  
        <Tabs 
          defaultValue="links" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="links">
              <LinkIcon className="mr-2 w-4 h-4" />
              Personal Links
            </TabsTrigger>
            <TabsTrigger value="socials">
              <Share2Icon className="mr-2 w-4 h-4" />
              Social Profiles
            </TabsTrigger>
          </TabsList>
  
          <CardContent>
            {/* Links Tab */}
            <TabsContent value="links">
              <div className="space-y-3">
                {links?.length > 0 ? (
                  links.map((link) => (
                    <Dialog key={link.id}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          <div className="flex items-center">
                            <Globe className="mr-3 w-5 h-5 text-muted-foreground" />
                            {link.text}
                          </div>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{link.text}</DialogTitle>
                          <DialogDescription>
                            You are about to navigate to an external link
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-4">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            {link.url}
                          </a>
                          <Button asChild className="w-full">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Open Link
                            </a>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">
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
                    <Dialog key={social.id}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          <div className="flex items-center">
                            <Share2Icon className="mr-3 w-5 h-5 text-muted-foreground" />
                            {social.name}
                          </div>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{social.name}</DialogTitle>
                          <DialogDescription>
                            You are about to open a social profile
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-4">
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            {social.url}
                          </a>
                          <Button asChild className="w-full">
                            <a
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Open Profile
                            </a>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">
                    No social profiles available
                  </p>
                )}
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    );
  };
  