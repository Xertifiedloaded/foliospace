"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  Github,
  ExternalLink,
  AlertCircle,
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
} from "lucide-react";
import { FaDiscord, FaTiktok, FaTwitch } from "react-icons/fa";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showEducation, setShowEducation] = useState(false);
  const {
    profile,
    email,
    links,
    socials,
    projects,
    skills,
    name,
    username,
    education,
  } = portfolio || {};
  console.log(portfolio);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-8"
        >
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            {profile?.picture && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Image
                  src={profile?.picture || "/placeholder.svg"}
                  alt={username}
                  width={60}
                  height={60}
                  className="object-cover w-20 h-20 rounded-full"
                />
              </motion.div>
            )}

            <div>
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl font-mono"
              >
                {name}
              </motion.h1>
              {profile?.tagline && (
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-gray-400"
                >
                  {profile?.tagline}
                </motion.span>
              )}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                <p>Level: {profile?.levelOfExperience}</p>
                <p>Experience: {profile?.yearsOfExperience} years</p>
              </motion.div>
            </div>
          </div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-6"
          >
            {profile?.bio && (
              <p className="text-gray-300 text-lg leading-relaxed">
                {profile?.bio}
              </p>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="default"
                className="rounded-2xl text-xs font-bold"
              >
                <Link href={`${window.location.origin}/resume/${username}`}>
                  Download CV
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {Array.isArray(socials) && socials.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-4"
            >
              {socials.map((social, index) => {
                 console.log(`Social ${social.name} has URL: ${social.link}`);
                return(
                  <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full ${
                    socialColors[social?.name?.toLowerCase()] ||
                    "text-gray-500 hover:text-gray-600"
                  } transition-colors duration-200`}
                  title={social.name || "Social Link"}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  
                  <SocialIcon type={social.name} className="w-4 h-4" />
                </motion.a>
                )
              })}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-8"
        >
          {/* Projects Section */}
          {projects.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-mono">
                    {showAllProjects ? "All Projects" : "Featured Projects"}
                  </h2>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="default"
                      onClick={() => setShowAllProjects((prev) => !prev)}
                    >
                      {showAllProjects ? "Show Featured" : "View All"}
                    </Button>
                  </motion.div>
                </div>
                <ProjectDisclaimer />
              </div>

              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <AnimatePresence>
                  {(showAllProjects ? projects : projects.slice(0, 6)).map(
                    (project) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden group"
                        onMouseEnter={() => setActiveProject(project.id)}
                        onMouseLeave={() => setActiveProject(null)}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-opacity group-hover:opacity-30"
                        />
                        <AnimatePresence>
                          {activeProject === project.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.2 }}
                              className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-75 text-white"
                            >
                              <h3 className="text-xl font-semibold mb-2">
                                {project.title}
                              </h3>
                              <p className="text-sm text-center mb-4">
                                {project.description}
                              </p>
                              <div className="flex space-x-4">
                                <motion.a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full px-4 py-2 transition-colors"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Github size={16} />
                                  <span>GitHub</span>
                                </motion.a>
                                <motion.a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full px-4 py-2 transition-colors"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <ExternalLink size={16} />
                                  <span>Preview</span>
                                </motion.a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.section>
          )}

          {education.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={`${
                showEducation ? "bg-gray-800" : "bg-blue-600"
              } rounded-xl p-4`}
            >
              <div className="flex justify-between">
                <p className="text-lg px-4">
                  {showEducation ? "Educational Journey" : "My Skills"}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    onClick={() => setShowEducation((prev) => !prev)}
                    className="duration-300 transition-all"
                  >
                    {showEducation ? "View My Skills" : "Educational Journey"}
                  </Button>
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {showEducation ? (
                  <motion.section
                    key="education"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl p-4 text-white"
                  >
                    <div>
                      {education.map((edu) => (
                        <motion.div
                          key={edu.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="rounded-lg hover:bg-gray-800 transition-all duration-300 group"
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
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                ) : (
                  <motion.section
                    key="skills"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-xl"
                  >
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          className="bg-gray-200 text-black text-xs rounded-full px-3 py-1"
                        >
                          {skill.name}
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.section>
          )}

          {/* Contact and Clients Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Contact Section */}
            <motion.section
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-mono mb-6 text-white">Contact</h2>
              <div className="space-y-4">
                {profile?.phoneNumber && (
                  <motion.a
                    href={`tel:${profile.phoneNumber}`}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    <span className="text-sm md:text-base">
                      {profile.phoneNumber}
                    </span>
                  </motion.a>
                )}
                {email && (
                  <motion.a
                    href={`mailto:${email}`}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    <span className="text-sm md:text-base">{email}</span>
                  </motion.a>
                )}
                {profile?.address && (
                  <motion.div
                    className="flex items-start text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MapPin className="w-5 h-5 mr-3 mt-1" />
                    <span className="text-sm md:text-base">
                      {profile.address}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.section>
            {links?.length > 0 && (
              <motion.section
                className="bg-gray-900 rounded-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-mono mb-6 text-white">Links</h2>
                <div className="space-y-4">
                  {links.map((link, index) => (
                    <motion.a
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className=" overflow-hidden  gap-2 md:text-base">
                        <p className="capitalize  flex items-center gap-1">
                          {" "}
                          <Globe size={15} />
                          {link.text}
                        </p>
                        <span className="text-blue-500 text-xs italic">
                          {link.url}
                        </span>
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.section>
            )}
          </motion.div>
        </motion.div>
      </div>
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 mb-4 text-center"
      >
        <small className="text-gray-500 dark:text-gray-400 font-light flex items-center justify-center gap-1">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-700 dark:text-white hover:text-blue-600 transition-colors">
            {name}
          </span>
          <span className="text-gray-400">•</span> All rights reserved
        </small>
      </motion.footer>
    </motion.div>
  );
}

const ProjectDisclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 border my-4 border-gray-700 rounded-lg p-4 mt-6 shadow-lg"
    >
      <div className="flex items-start space-x-3">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex-shrink-0"
        >
          <AlertCircle className="h-6 w-6 text-yellow-400" />
        </motion.div>

        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg font-medium text-white"
          >
            Private Projects Disclaimer
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-2 text-sm text-gray-300"
          >
            Some of my projects are not included here because they are either
            private, protected by Non-Disclosure Agreements (NDAs), or still
            ongoing. Please reach out if you'd like to discuss specific details
            or explore similar projects.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
