import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Search,
  Users2,
  X,
  Mail,
  Phone,
  ExternalLink,
  Globe2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ProfileLayout from "../../../components/layout";

const UserSkillsDisplay = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSocialIcon = (platform) => {
    const icons = {
      github: <FaGithub className="h-2 w-2" />,
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

    const platformLower = platform?.toLowerCase();
    return icons[platformLower] || icons.default;
  };

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
    const skillSet = new Set();
    users.forEach((user) => {
      user.skills.forEach((skill) => skillSet.add(skill.name));
    });
    return Array.from(skillSet).sort();
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const name = user.name || "";
      const role = user.tagline || "";
      const skills = user.skills || [];

      const searchMatch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skills.some((skill) =>
          (skill.name || "").toLowerCase().includes(searchTerm.toLowerCase())
        );

      const levelMatch =
        !selectedLevel ||
        (user.profile && user.profile.levelOfExperience === selectedLevel);

      return searchMatch && levelMatch;
    });
  }, [searchTerm, selectedLevel, users]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSkills([]);
    setSelectedLevel("");
  };

  return (
    <ProfileLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Team Directory
              </h1>
              <p className="text-muted-foreground mt-1">
                Browse and connect with team members based on their skills and
                expertise
              </p>
            </div>
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={!searchTerm && !selectedSkills.length && !selectedLevel}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, role, or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All Levels</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid">Mid-Level</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium">Filter by Skills</h2>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <Button
                  key={skill}
                  variant={
                    selectedSkills.includes(skill) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleSkillToggle(skill)}
                  className="rounded-full"
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="space-y-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
              <p className="text-muted-foreground">Loading team members...</p>
            </div>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <Card
                key={user.id}
                className="group hover:shadow-lg transition-all"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <img
                      src={user?.profile?.picture ?? "/images/user.jpg"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription>
                        {user?.profile?.tagline ?? "No Tagline"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user?.profile?.levelOfExperience && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {user.profile.levelOfExperience}
                      </Badge>
                      {user?.profile?.yearsOfExperience && (
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
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3 text-sm">
                    <TooltipProvider>
                      {user?.email && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              className="h-8 w-8"
                            >
                              <a href={`mailto:${user.email}`}>
                                <Mail className="h-4 w-4" />
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Send email</TooltipContent>
                        </Tooltip>
                      )}

                      {user?.profile?.phoneNumber && (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="h-8 w-8 text-green-600"
                              >
                                <a
                                  href={`https://wa.me/${user.profile.phoneNumber}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FaWhatsapp className="h-4 w-4" />
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>WhatsApp</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="h-8 w-8"
                              >
                                <a href={`tel:${user.profile.phoneNumber}`}>
                                  <Phone className="h-4 w-4" />
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Call</TooltipContent>
                          </Tooltip>
                        </>
                      )}

                      {user.socials.length > 0 &&
                        user?.socials.map((social) => (
                          <Tooltip key={social.id}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="h-8 w-8"
                              >
                                <a
                                  href={social?.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {getSocialIcon(social?.name)}
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{social.name}</TooltipContent>
                          </Tooltip>
                        ))}
                    </TooltipProvider>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No users found</p>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default UserSkillsDisplay;
