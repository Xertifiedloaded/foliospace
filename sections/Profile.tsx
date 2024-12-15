import React from "react";
import { 
  RiVerifiedBadgeLine, 
  RiCodeSSlashLine, 
  RiPaletteLine, 
  RiServerLine 
} from "react-icons/ri";

interface Profile {
  image: string;
  name: string;
  profession: string;
  skills: string[];
  verified?: boolean;
}

const profileSample: Profile[] = [
  {
    image: "/images/user.jpg",
    name: "John Doe",
    profession: "Full Stack Developer",
    skills: ["React", "Node.js", "MongoDB"],
    verified: true
  },
  {
    image: "/images/user.jpg",
    name: "Jane Smith",
    profession: "Software Engineer",
    skills: ["Python", "Django", "AWS"],
    verified: true
  },
  {
    image: "/images/user.jpg",
    name: "Alice Brown",
    profession: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "Sketch"],
    verified: false
  },
  {
    image: "/images/user.jpg",
    name: "Bob White",
    profession: "Backend Developer",
    skills: ["Java", "Spring Boot", "Kubernetes"],
    verified: true
  },
  {
    image: "/images/user.jpg",
    name: "Charlie Green",
    profession: "Data Scientist",
    skills: ["Python", "TensorFlow", "ML"],
    verified: false
  },
  {
    image: "/images/user.jpg",
    name: "Dana Black",
    profession: "Cloud Architect",
    skills: ["Azure", "Terraform", "DevOps"],
    verified: true
  },
  {
    image: "/images/user.jpg",
    name: "Eva Gray",
    profession: "Product Manager",
    skills: ["Agile", "Product Strategy", "UX Research"],
    verified: false
  }
];

const SKILL_ICONS = {
  "Frontend": RiPaletteLine,
  "Backend": RiServerLine,
  "Full Stack": RiCodeSSlashLine
};

const ProfileCard: React.FC<Profile> = ({ 
  image, 
  name, 
  profession, 
  skills, 
  verified 
}) => {
  const primarySkillCategory = skills.length > 0 
    ? (profession.includes("Full Stack") ? "Full Stack" 
      : profession.includes("Frontend") ? "Frontend" 
      : profession.includes("Backend") ? "Backend" 
      : "Other")
    : "Other";

  const SkillIcon = SKILL_ICONS[primarySkillCategory] || RiCodeSSlashLine;

  return (
    <div className="group relative bg-white border border-neutral-200 rounded-2xl 
      overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="absolute top-4 right-4 z-10">
        {verified && (
          <RiVerifiedBadgeLine className="text-blue-600 w-6 h-6" />
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-full border-3 border-neutral-200 
              group-hover:scale-110 transition-transform"
            />
            <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md">
              <SkillIcon className="w-5 h-5 text-neutral-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900 flex items-center">
              {name}
            </h3>
            <p className="text-sm text-neutral-600">{profession}</p>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-neutral-100 text-neutral-700 
                text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSection: React.FC = () => {
  return (
    <section className=" bg-neutral-50 py-16">
      <div className=" px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 
            rounded-full text-sm font-medium mb-4">
            Professional Community
          </div>
          <h2 className="lg:text-4xl text-xl font-bold text-neutral-900 mb-4">
            Meet Our Innovative Professionals
          </h2>
          <p className="lg:text-xl text-sm text-neutral-600 max-w-2xl mx-auto">
            Discover the diverse talents driving innovation across 
            technology and design landscapes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {profileSample.map((profile, index) => (
            <ProfileCard key={index} {...profile} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;