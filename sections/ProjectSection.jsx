


import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Briefcase,
  GraduationCap,
  User,
  ArrowRight
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { 

  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
export const PortfolioProjectSections = ({ projects }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-sm" /> Featured Projects
        </CardTitle>
      </CardHeader>
      <CardContent>
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="border-b pb-4 last:border-b-0 group transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <h3 className="font-semibold lg:text-lg text-sm">{project.title}</h3>
                <p className="text-gray-600 mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies?.map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
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
              </div>
            </div>
          </div>
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
  


  export const  PortfolioLink = ({ links, socials }) => {
    const [selectedLink, setSelectedLink] = useState(null);
  
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <ExternalLink className="mr-2 w-5 h-5" />
              Links & Connections
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {links?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 lg:text-lg text-sm">Personal Links</h3>
                {links.map((link) => (
                  <Dialog key={link.id}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-sm justify-between mb-2"
                        onClick={() => setSelectedLink(link)}
                      >
                        {link.text}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle >{link.text}</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col items-center space-y-4">
                        <p>You are about to navigate to:</p>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {link.url}
                        </a>
                        <Button asChild>
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
                ))}
              </div>
            )}
  
            {socials?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 lg:text-lg text-sm">Social Profiles</h3>
                {socials.map((social) => (
                  <Dialog key={social.id}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-sm justify-between mb-2"
                        onClick={() => setSelectedLink(social)}
                      >
                        {social.name}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{social.name}</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col items-center space-y-4">
                        <p>You are about to navigate to:</p>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {social.url}
                        </a>
                        <Button asChild>
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
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  