"use client";
Badge;
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LinkedinIcon,
  GithubIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkIcon,
  Github,
  ExternalLink,
} from "lucide-react";
import { FaDiscord, FaTiktok, FaTwitch } from "react-icons/fa";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
const SocialIcon = ({ type }) => {
  const icons = {
    linkedin: LinkedinIcon,
    github: GithubIcon,
    twitter: TwitterIcon,
    facebook: FacebookIcon,
    twitch: FaTwitch,
    discord: FaDiscord,
    tiktok: FaTiktok,
    instagram: InstagramIcon,
    youtube: YoutubeIcon,
  };

  const Icon = icons[type?.toLowerCase()] || LinkIcon;
  return <Icon className="w-5 h-5" />;
};

// Shared social colors
const socialColors = {
  linkedin: "text-[#0077B5] hover:text-[#004d77]",
  github: "text-gray-300 hover:text-gray-900",
  twitter: "text-[#1DA1F2] hover:text-[#0d8bda]",
  facebook: "text-[#1877F2] hover:text-[#0d65d9]",
  twitch: "text-[#9146FF] hover:text-[#7a29ff]",
  discord: "text-[#5865F2] hover:text-[#4752c4]",
  tiktok: "text-[#000000] hover:text-gray-700",
  instagram: "text-[#E4405F] hover:text-[#d81c3f]",
  youtube: "text-[#FF0000] hover:text-[#cc0000]",
};
export default function PortfolioDesign({ portfolio }) {
  const [activeProject, setActiveProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const {
    profile,
    email,
    links,
    experiences,
    socials,
    projects,
    skills,
    name,
    username,
    education,
  } = portfolio || {};
  console.log(email);
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            {profile?.picture && (
              <Image
                src={profile?.picture}
                alt={username}
                width={60}
                height={60}
                className=" object-cover w-14 h-14  rounded-full"
              />
            )}

            <div>
              <h1 className="text-2xl font-mono">{name}</h1>
              {profile?.tagline && (
                <span className="text-gray-400">{profile?.tagline}</span>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            {profile?.bio && (
              <p className="text-gray-300 text-lg leading-relaxed">
                {profile?.bio}
              </p>
            )}

            <Button variant="outline" className="rounded-full">
              <Link href={`${window.location.origin}/resume/${username}`}>
                Download CV
              </Link>
            </Button>
          </div>

          {Array.isArray(socials) && socials.length > 0 && (
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full ${
                    socialColors[social?.name?.toLowerCase()] ||
                    "text-gray-500 hover:text-gray-600"
                  } transition-colors duration-200`}
                  title={social.name || "Social Link"}
                >
                  <SocialIcon type={social.name} className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Projects Section */}
          {projects.length > 0 && (
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-mono">
                  {showAllProjects ? "All Projects" : "Feature  Project"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAllProjects((prev) => !prev)}
                >
                  <span className="sr-only">
                    {showAllProjects ? "Go Back" : "View All Projects"}
                  </span>
                  →
                </Button>
              </div>

              {showAllProjects ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden group"
                      onMouseEnter={() => setActiveProject(project.id)}
                      onMouseLeave={() => setActiveProject(null)}
                      onClick={() =>
                        setActiveProject(
                          activeProject === project.id ? null : project.id
                        )
                      }
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-opacity group-hover:opacity-30"
                      />
                      {(activeProject === project.id ||
                        activeProject === null) && (
                        <div className="absolute transition-all duration-300 ease-linear inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100">
                          <h3 className="text-xl font-semibold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-center mb-4">
                            {project.description}
                          </p>
                          <div className="flex space-x-4">
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full px-4 py-2 transition-colors"
                            >
                              <Github size={16} />
                              <span>GitHub</span>
                            </a>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full px-4 py-2 transition-colors"
                            >
                              <ExternalLink size={16} />
                              <span>Preview</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {projects.slice(0, 6).map((project) => (
                    <div
                      key={project.id}
                      className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden group"
                      onMouseEnter={() => setActiveProject(project.id)}
                      onMouseLeave={() => setActiveProject(null)}
                      onClick={() =>
                        setActiveProject(
                          activeProject === project.id ? null : project.id
                        )
                      }
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-opacity group-hover:opacity-30"
                      />
                      {(activeProject === project.id ||
                        activeProject === null) && (
                        <div className="absolute transition-all duration-300 ease-linear inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100">
                          <h3 className="text-xl font-semibold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-center mb-4">
                            {project.description}
                          </p>
                          <div className="flex space-x-4">
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full px-4 py-2 transition-colors"
                            >
                              <Github size={16} />
                              <span>GitHub</span>
                            </a>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full px-4 py-2 transition-colors"
                            >
                              <ExternalLink size={16} />
                              <span>Preview</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

{
    education.length>0 &&(
        <section
        className={`${
          showExperience ? "bg-gray-800" : "bg-blue-600"
        } rounded-xl  p-4`}
      >
        <div className="flex  justify-between">
          <p className="text-lg px-4 ">
            {showExperience ? "My Education" : "My Stack"}
          </p>
          <button
            onClick={() => setShowExperience(!showExperience)}
            className="px-4   text-white text-xs rounded-lg transition-all"
          >
            <p className="">
              {showExperience ? "View My Stack" : "View Education"}
            </p>
          </button>
        </div>

        {/* My Stack Section */}
        {!showExperience ? (
          <section className="p-6 rounded-xl ">
            <div className="flex   flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-200  text-black text-xs rounded-full px-3 py-1"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Experience Section */
          <section className=" rounded-xl  p-4 text-white">
            <div>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="   rounded-lg    hover:bg-gray-800 transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="mb-2 md:mb-0">
                      <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-400 transition">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {edu.institution}
                      </p>
                    </div>

                    <Badge className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                      {new Date(edu.startDate).getFullYear()} -{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).getFullYear()
                        : "Present"}
                    </Badge>
                  </div>

                  {edu.description && (
                    <p className="text-gray-300 text-sm mb-4">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    )
}

          {/* Contact and Clients Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Section */}
            <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-lg">
              <h2 className="text-2xl font-mono mb-6 text-white">Contact</h2>
              <div className="space-y-4">
                {profile?.phoneNumber && (
                  <a
                    href={`tel:${profile.phoneNumber}`}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    <span className="text-sm md:text-base">
                      {profile.phoneNumber}
                    </span>
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    <span className="text-sm md:text-base">{email}</span>
                  </a>
                )}
                {profile?.address && (
                  <div className="flex items-start text-gray-300">
                    <MapPin className="w-5 h-5 mr-3 mt-1" />
                    <span className="text-sm md:text-base">
                      {profile.address}
                    </span>
                  </div>
                )}
              </div>
            </section>
            {links?.length > 0 && (
              <section className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-2xl font-mono mb-6 text-white">Contact</h2>
                <div className="space-y-4">
                  {links.map((link, index) => {
                    return (
                      <a
                        key={index}
                        href={link.url}
                        className="flex gap-2 items-center text-gray-300 hover:text-white transition-colors"
                        target={
                          link.type !== "phone" && link.type !== "email"
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          link.type !== "phone" && link.type !== "email"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        <Globe size={15} />
                        <span className="text-sm flex justify-between gap-2 md:text-base">
                          <p className="capitalize"> {link.text} </p>
                          <a className="text-blue-500 italic" href={link.url}>
                            {link.url}
                          </a>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      <footer className="mt-8 mb-4 text-center">
        <small className="text-gray-500 dark:text-gray-400 font-light flex items-center justify-center gap-1">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-700 dark:text-white hover:text-blue-600 transition-colors">
            Makinde Olaitan
          </span>
          <span className="text-gray-400">•</span> All rights reserved
        </small>
      </footer>
    </div>
  );
}
