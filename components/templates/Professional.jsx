import React from "react";
import {
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const ProfessionalTemplate = ({ portfolio }) => {
  const { projects, education, experiences, links, socials, profile } = portfolio;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      <section className="bg-gray-900  text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{profile.name}</h1>
            <p className="text-xl text-gray-300 dark:text-gray-400 mb-8">{profile.title}</p>
            <div className="flex justify-center gap-4">
              {socials?.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition-colors"
                >
                  {social.icon && React.createElement(social.icon, { className: "w-6 h-6" })}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className=" font-bold mb-12 text-center">Professional Experience</h2>
          <div className="space-y-12">
            {experiences?.map((exp) => (
              <div key={exp.id} className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold">{exp.position}</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(exp.startDate).getFullYear()} -{" "}
                    {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                  </p>
                </div>
                <div className="md:w-2/3">
                  {exp.responsibilities && (
                    <ul className="space-y-3">
                      {exp.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{resp}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech, index) => (
                        <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 text-sm rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className=" font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects?.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                {project.image && (
                  <div className="relative h-64">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      View Project
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900  text-white py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col items-center">
            <div className="flex gap-6 mb-8">
              {links?.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
            <p className="text-gray-400">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalTemplate;
