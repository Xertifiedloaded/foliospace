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

const ProfessionalTemplate = ({ portfolio }) => {
  const { projects, education, experiences, links, socials, profile } = portfolio;
  
  return (
    <div className="bg-white text-gray-900">
      <section className="py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6 text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Professional Experience</h2>
          </div>
          
          <div className="space-y-8">
            {experiences?.map((exp) => (
              <div key={exp.id} className="border-l-4 border-gray-900 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-900 rounded-full -left-[7px] top-2" />
                <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-600 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(exp.startDate).getFullYear()} -{" "}
                  {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                </p>
                {exp.responsibilities && (
                  <ul className="text-gray-600 space-y-2">
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 mt-1 text-gray-400" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                )}
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <FolderCode className="w-6 h-6 text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Featured Projects</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <div key={project.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-3">
                  <h3 className=" font-semibold text-lg text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
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

      {/* Education Section */}
      <section className="py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-6 h-6 text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {education?.map((edu) => (
              <div key={edu.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600 font-medium">{edu.institution}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(edu.startDate).getFullYear()} -{" "}
                  {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                </p>
                {edu.description && (
                  <p className="text-gray-600">{edu.description}</p>
                )}
                {edu.relevantCourses && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Relevant Coursework:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 text-sm rounded">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Links */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Link2 className="w-6 h-6 text-gray-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Professional Links</h2>
            </div>
            
            <div className="flex justify-center gap-6 mb-8">
              {socials?.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
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
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Globe className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900 font-medium">{link.text}</span>
                    <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
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

export default ProfessionalTemplate;