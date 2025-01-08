import React, { useState } from 'react';
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

const ModernTemplate = ({ portfolio }) => {
  const { projects, education, experiences, links, socials, profile } = portfolio;
  
  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-16">
            <FolderCode className="w-8 h-8 text-purple-300" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Projects
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <div key={project.id} className="group relative bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                {project.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-purple-200 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-gradient-to-b from-transparent to-purple-900/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-16">
            <Briefcase className="w-8 h-8 text-purple-300" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Experience
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {experiences?.map((exp) => (
              <div key={exp.id} className="group relative pl-8 border-l-2 border-purple-500/30 hover:border-purple-400 transition-colors">
                <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-2 group-hover:bg-purple-400 transition-colors" />
                <div className="bg-white/5 backdrop-blur-lg p-6 rounded-lg hover:bg-white/10 transition-colors">
                  <h3 className="text-2xl font-bold text-white">{exp.position}</h3>
                  <p className="text-purple-200">{exp.company}</p>
                  <p className="text-sm text-purple-300 mb-4">
                    {new Date(exp.startDate).getFullYear()} -{" "}
                    {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                  </p>
                  {exp.responsibilities && (
                    <ul className="text-purple-200 space-y-2">
                      {exp.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 mt-1 text-purple-400" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-16">
            <GraduationCap className="w-8 h-8 text-purple-300" />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Education
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {education?.map((edu) => (
              <div key={edu.id} className="group bg-white/5 backdrop-blur-lg p-6 rounded-xl hover:bg-white/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                <p className="text-purple-200">{edu.institution}</p>
                <p className="text-sm text-purple-300 mb-4">
                  {new Date(edu.startDate).getFullYear()} -{" "}
                  {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                </p>
                {edu.description && (
                  <p className="text-purple-200">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-indigo-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-16">
              <Link2 className="w-8 h-8 text-purple-300" />
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Connect
              </h2>
            </div>
            
            <div className="flex justify-center gap-8 mb-16">
              {socials?.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-white transform hover:scale-110 transition-all"
                >
                  {social.icon && React.createElement(social.icon, { className: "w-8 h-8" })}
                </a>
              ))}
            </div>

            {links && (
              <div className="grid md:grid-cols-2 gap-6">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 bg-white/5 backdrop-blur-lg rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <Globe className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
                    <span className="text-purple-200 group-hover:text-white transition-colors">{link.text}</span>
                    <ArrowRight className="w-4 h-4 ml-auto text-purple-300 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernTemplate;