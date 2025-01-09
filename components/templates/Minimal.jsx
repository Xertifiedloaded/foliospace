import React from 'react';
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

const MinimalTemplate = ({ portfolio }) => {
  const { projects, education, experiences, links, socials, profile } = portfolio;
  
  return (
    <div className="bg-white min-h-screen">

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-4 mb-12">
            <FolderCode className="w-8 h-8 text-gray-400" />
            <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {projects?.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
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

      {/* Experience Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-12">
            <Briefcase className="w-8 h-8 text-gray-400" />
            <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            {experiences?.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-[7px] top-2" />
                <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(exp.startDate).getFullYear()} -{" "}
                  {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                </p>
                {exp.responsibilities && (
                  <ul className="text-gray-600 space-y-2">
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-12">
            <GraduationCap className="w-8 h-8 text-gray-400" />
            <h2 className="text-3xl font-bold text-gray-900">Education</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            {education?.map((edu) => (
              <div key={edu.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(edu.startDate).getFullYear()} -{" "}
                  {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                </p>
                {edu.description && (
                  <p className="text-gray-600">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links & Profile Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-12">
              <Link2 className="w-8 h-8 text-gray-400" />
              <h2 className="text-3xl font-bold text-gray-900">Connect</h2>
            </div>
            
            <div className="flex justify-center gap-6 mb-12">
              {socials?.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  {social.icon && React.createElement(social.icon, { className: "w-6 h-6" })}
                </a>
              ))}
            </div>

            {links && (
              <div className="grid md:grid-cols-2 gap-4">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{link.text}</span>
                    <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      <footer className="mt-8  text-center">
        <small className="text-gray-500 font-light flex items-center justify-center gap-1">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Makinde Olaitan
          </span>
          <span className="text-gray-400">•</span> All rights reserved
        </small>
      </footer>
    </div>
  );
};

export default MinimalTemplate;