"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  bio: string;
}

const leadDeveloper: TeamMember = {
  name: "Makinde Olaitan",
  role: "Lead Developer (Fullstack Developer)",
  image: "/images/olaitan.jpg",
  github: "https://github.com/xertifiedloaded",
  linkedin: "hhttps://www.linkedin.com/in/makinde-olaitan-43177a290",
  email: "makindeolaitan01@gmail.com",
  bio: "Full-stack developer with expertise in React and Node.js. Leading the technical development of Foliospace and ensuring seamless user experiences. Passionate about building scalable applications and mentoring upcoming developers.",
};

const teamMembers: TeamMember[] = [
  {
    name: "Dada Taslim",
    role: "Junior Frontend Developer",
    image: "/images/teslim.webp",
    github: "https://github.com/tescomeme",
    linkedin: "https://linkedin.com/in/tescomeme",
    email: "taslimayomide@gmail.com",
    bio: "Frontend developer specializing in responsive UI design and interactive web experiences. Passionate about learning and growing in the field of web development.",
  },
  {
    name: "Balogun Comfort",
    role: "UI/UX Designer",
    image: "/images/comfort.jpg",
    linkedin: "https://linkedin.com/in",
    email: "baloguncomfort5@gmail.com",
    bio: "Innovative UI/UX designer dedicated to crafting intuitive and visually appealing digital experiences. Passionate about user-centered design and usability.",
  },
  {
    name: "Abdusalam Ibrahim",
    role: "Junior Frontend Developer",
    image: "/images/abana.jpg",
    github: "https://github.com/tobiloba48",
    linkedin: "https://linkedin.com/in/tobiloba48",
    email: "tobisalam48@gmail.com",
    bio: "Dedicated frontend developer with a keen eye for detail and a focus on writing clean, maintainable code. Enthusiastic about modern web technologies.",
  },
  {
    name: "Adeniran Tomiwa",
    role: "Junior Frontend Developer",
    image: "/images/tommy.jpg",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "adenirantomiwa01@gmail.com",
    bio: "Creative frontend developer with a strong understanding of HTML, CSS, and JavaScript. Loves to turn ideas into reality with elegant and user-friendly interfaces.",
  },
  {
    name: "Olusanya Oluwaseun",
    role: "Content Writer",
    image: "/images/hera.jpg",
    github: "https://github.com/oluwaseun",
    linkedin: "https://www.linkedin.com/in/oluwaseun-olusanya-475125287",
    email: "oluwaseuno603@gmail.com",
    bio: "Creative content writer with a passion for crafting engaging and informative content. Skilled in turning complex ideas into clear and compelling written pieces.",
  },
];

export default function Developers() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Developers Behind Foliospace
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            A community of talented developers working together to create and
            continuously improve Foliospace, empowering professionals to
            showcase their work and build their digital presence.
          </p>
        </motion.div>

        {/* Lead Developer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Card className="shadow-lg p-8 text-center max-w-3xl mx-auto">
            <div className="relative w-40 h-40 mx-auto mb-6">
              <Image
                src={leadDeveloper.image}
                alt={leadDeveloper.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              {leadDeveloper.name}
            </h3>
            <p className="text-muted-foreground mb-4">{leadDeveloper.role}</p>
            <p className="text-sm mb-4">{leadDeveloper.bio}</p>
            <div className="flex justify-center space-x-4">
              {leadDeveloper.github && (
                <a
                  href={leadDeveloper.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Github className="h-3 w-3"  />
                </a>
              )}
              {leadDeveloper.linkedin && (
                <a
                  href={leadDeveloper.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-3 w-3"  />
                </a>
              )}
              {leadDeveloper.email && (
                <a
                  href={`mailto:${leadDeveloper.email}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Mail className="h-3 w-3"  />
                </a>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-center mb-4">
                      {member.role}
                    </p>
                    <p className="text-sm text-center mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-4">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Github className="h-3 w-3"  />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Linkedin className="h-3 w-3" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Mail className="h-3 w-3"  />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
