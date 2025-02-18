"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users2, X, Globe2 } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaDribbble,
  FaBehance,
  FaMedium,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import ProfileLayout from "@/components/layout";

interface User {
  id: string;
  name: string;
  tagline?: string;
  skills: { id: string; name: string }[];
  socials: { id: string; name: string; link: string }[];
  profile?: {
    levelOfExperience: string;
    yearsOfExperience?: number;
  };
}

const TeamDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const queryParams = selectedSkills.length
        ? `?skills=${selectedSkills.join(",")}`
        : "";
      const response = await axios.get(`/api/user/userskills${queryParams}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedSkills]);

  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    users.forEach((user) =>
      user.skills.forEach((skill) => skillSet.add(skill.name))
    );
    return Array.from(skillSet).sort();
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.tagline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills.some((skill) =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const levelMatch =
        !selectedLevel ||
        (user.profile && user.profile.levelOfExperience === selectedLevel);

      return searchMatch && levelMatch;
    });
  }, [searchTerm, selectedLevel, users]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSkills([]);
    setSelectedLevel("");
  };

  const getSocialIcon = (platform: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      github: <FaGithub className="h-4 w-4" />,
      linkedin: <FaLinkedin className="h-4 w-4" />,
      twitter: <FaTwitter className="h-4 w-4" />,
      instagram: <FaInstagram className="h-4 w-4" />,
      facebook: <FaFacebook className="h-4 w-4" />,
      dribbble: <FaDribbble className="h-4 w-4" />,
      behance: <FaBehance className="h-4 w-4" />,
      medium: <FaMedium className="h-4 w-4" />,
      youtube: <FaYoutube className="h-4 w-4" />,
      tiktok: <FaTiktok className="h-4 w-4" />,
      default: <Globe2 className="h-4 w-4" />,
    };
    return icons[platform.toLowerCase()] || icons.default;
  };

  const SocialLinks: React.FC<{ socials: User["socials"] }> = ({ socials }) => {
    const visibleSocials = socials.slice(0, 2);
    const remainingSocials = socials.slice(2);

    return (
      <>
        {visibleSocials.map((social) => (
          <TooltipProvider key={social.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {getSocialIcon(social.name)}
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{social.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        {remainingSocials.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="px-2 text-xs font-medium"
              >
                +{remainingSocials.length}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-0" align="end">
              {remainingSocials.map((social) => (
                <DropdownMenuItem key={social.id} asChild>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <span className="h-4 w-4">
                      {getSocialIcon(social.name)}
                    </span>
                    {social.name}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </>
    );
  };

  return (
    <ProfileLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-4xl font-bold mb-4">Skill Connect</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover and connect with professionals who share your skills or
                work in similar fields. Expand your network, collaborate on
                projects, and grow your career by finding like-minded
                individuals.
              </p>
            </div>
            <Button
              variant="default"
              onClick={clearFilters}
              disabled={!searchTerm && !selectedSkills.length && !selectedLevel}
            >
              <X className="h-4 w-4 mr-2" /> Reset Filters
            </Button>
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid">Mid</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <Button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                variant={
                  selectedSkills.includes(skill) ? "secondary" : "default"
                }
                size="sm"
                className={`rounded-full ${
                  selectedSkills.includes(skill)
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Users2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                  {user.tagline && (
                    <p className="text-sm text-muted-foreground">
                      {user.tagline}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.profile?.levelOfExperience && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {user.profile.levelOfExperience}
                      </Badge>
                      {user.profile.yearsOfExperience && (
                        <span className="text-sm text-muted-foreground">
                          {user.profile.yearsOfExperience} years experience
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {user.skills.map((skill) => (
                      <Badge key={skill.id} variant="outline">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <SocialLinks socials={user.socials} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default TeamDirectory;
