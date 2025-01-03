import React, { useEffect, useState } from "react";
import {
  ExternalLink,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Globe,
  FolderCode,
  CompassIcon,
  Link2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

export const PortfolioProjectSections = ({ projects }) => (
  <div className="w-full  bg-gray-900  text-white">
    <div className="w-full  py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6">
          <FolderCode className="w-10 md:w-12 h-10 md:h-12 text-gray-400 animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center flex items-center gap-4">
            Projects
          </h1>
          <FolderCode className="w-10 md:w-12 h-10 md:h-12 text-gray-400 animate-pulse" />
        </div>
      </div>
    </div>
    {projects.map((project) => (
      <div key={project.id} className="w-full">
        {project.image && (
          <div className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover absolute inset-0 brightness-50"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {project.title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project Information */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Project Overview
              </h3>
              <p className="text-gray-300 mb-6">{project.description}</p>

              {/* Project Links */}
              <div className="flex space-x-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                  >
                    View Project
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition"
                  >
                    GitHub Repository
                  </a>
                )}
              </div>
            </div>

            {project.image && (
              <div className="hidden md:block">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full rounded-lg shadow-lg object-cover aspect-video"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const EducationSection = ({ education }) => (
  <div className="w-full bg-gray-900  text-white">
    <div className="container mx-auto  py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-4">
          <GraduationCap className="w-6 md:w-8 h-6 md:h-8 text-gray-400" />
          Academic Journey
        </h2>

        <div className="space-y-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-5 md:p-6 shadow-lg hover:bg-gray-800 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="mb-2 md:mb-0">
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-400 transition">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-400 text-sm">{edu.institution}</p>
                </div>

                <Badge className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                  {new Date(edu.startDate).getFullYear()} -{" "}
                  {edu.endDate
                    ? new Date(edu.endDate).getFullYear()
                    : "Present"}
                </Badge>
              </div>

              {edu.description && (
                <p className="text-gray-300 text-sm mb-4">{edu.description}</p>
              )}

              {edu.achievements && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-200 mb-2">
                    Key Achievements
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2 list-disc pl-4">
                    {edu.achievements.slice(0, 3).map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {edu.relevantCourses && (
                <div className="flex flex-wrap gap-2">
                  {edu.relevantCourses.map((course, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const ExperienceSection = ({ experiences }) => (
  <div className="w-full bg-gray-900  text-white">
    <div className="container mx-auto  py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-4">
          <Briefcase className="w-6 md:w-8 h-6 md:h-8 text-gray-400" />
          Professional Journey
        </h2>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className=" border border-gray-800   rounded-lg p-5 md:p-6 shadow-lg hover:bg-gray-800 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="mb-2 md:mb-0">
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-400 transition">
                    {exp.position}
                  </h3>
                  <p className="text-gray-400 text-sm">{exp.company}</p>
                </div>

                <Badge className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                  {new Date(exp.startDate).getFullYear()} -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).getFullYear()
                    : "Present"}
                </Badge>
              </div>

              {exp.responsibilities && (
                <ul className="text-gray-300 text-sm space-y-2 list-disc pl-4 mb-4">
                  {exp.responsibilities.slice(0, 3).map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              )}

              {exp.technologies && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);



export const PortfolioLink = ({ links, socials, profile }) => {
  const [activeTab, setActiveTab] = useState("links");

  const renderIcon = (type) => {
    const iconMap = {
      links: <Link2 className="w-6 h-6 text-blue-400" />,
      hobbies: <CompassIcon className="w-6 h-6 text-green-400" />,
      languages: <Globe className="w-6 h-6 text-purple-400" />
    };
    return iconMap[type];
  };

  return (
    <div className="w-full bg-black text-white">
      <div className="">
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <ExternalLink className="w-6 h-6 text-gray-400" />
              <h2 className="text-xl font-semibold text-white">
                Profile Connections
              </h2>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              {socials?.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  {social.icon && React.createElement(social.icon, { className: "w-5 h-5" })}
                </a>
              ))}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-800">
            {["links", "hobbies", "languages"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center py-4 space-x-2 
                  ${activeTab === tab 
                    ? "bg-gray-800 text-white" 
                    : "text-gray-500 hover:bg-gray-700"}
                  transition-all duration-300`}
              >
                {renderIcon(tab)}
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "links" && (
              <div className="space-y-4">
                {links?.length > 0 ? (
                  links.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition"
                    >
                      <div className="flex items-center space-x-4">
                        <Globe className="w-6 h-6 text-blue-400" />
                        <div>
                          <h3 className="text-white font-medium">{link.text}</h3>
                          <p className="text-gray-400 text-sm truncate max-w-xs">
                            {link.url}
                          </p>
                        </div>
                      </div>

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No links available</p>
                )}
              </div>
            )}

            {activeTab === "hobbies" && (
              <div className="flex flex-wrap gap-3">
                {profile?.hobbies?.length > 0 ? (
                  profile.hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <CompassIcon className="w-4 h-4 text-green-400" />
                      <span>{hobby}</span>
                    </span>
                  ))
                ) : (
                  <p className="text-center text-gray-500 w-full">
                    No hobbies listed
                  </p>
                )}
              </div>
            )}

            {activeTab === "languages" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profile?.languages?.length > 0 ? (
                  profile.languages.map((language, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-lg p-3 flex items-center space-x-3"
                    >
                      <Globe className="w-6 h-6 text-purple-400" />
                      <span className="text-white">{language}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    No languages listed
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};