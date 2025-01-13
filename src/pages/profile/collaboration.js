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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Users2,
  X,
  Mail,
  Phone,
  ExternalLink,
  Globe2,
} from "lucide-react";
import ProfileLayout from "../../../components/layout";

const UserSkillsDisplay = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSocialIcon = (platform) => {
    const icons = {
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
    return icons[platform?.toLowerCase()] || icons.default;
  };

  const SocialLinks = ({ socials }) => {
    const visibleSocials = socials.slice(0, 2);
    const remainingSocials = socials.slice(2);
    return (
      <>
        {visibleSocials.map((social) => (
          <TooltipProvider key={social.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon"  asChild className="h-8 dark:text-white w-8">
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
          <DropdownMenu className="flex items-center">
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 text-xs font-medium"
              >
                +{remainingSocials.length}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
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
    users.forEach((user) =>
      user.skills.forEach((skill) => skillSet.add(skill.name))
    );
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
            <h1 className="text-3xl font-bold">Team Directory</h1>
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={!searchTerm && !selectedSkills.length && !selectedLevel}
            >
              <X className="h-4 w-4 " /> Reset Filters
            </Button>
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid">Mid</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            {allSkills.slice(0, 5).map((skill) => (
              <Button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {skill}
              </Button>
            ))}

            {allSkills.length > 5 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full">
                    +{allSkills.length - 5} more
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {allSkills.slice(5).map((skill) => (
                    <DropdownMenuItem
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {filteredUsers.map((user) => (
              <Card key={user.id} className="mb-4">
                <CardHeader>{user.name}</CardHeader>
                <CardContent className="space-y-4">
                  {user?.profile?.levelOfExperience && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {user.profile.levelOfExperience}
                      </Badge>
                      {user?.profile?.yearsOfExperience &&
                        user.profile.yearsOfExperience > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {user.profile.yearsOfExperience} years experience
                          </span>
                        )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {user.skills.slice(0, 5).map((skill) => (
                      <Badge key={skill.id} variant="outline">
                        {skill.name}
                      </Badge>
                    ))}

                    {user.skills.length > 5 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-muted"
                          >
                            +{user.skills.length - 5} more
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {user.skills.slice(5).map((skill) => (
                            <DropdownMenuItem key={skill.id}>
                              {skill.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </CardContent>
                <CardContent>
                  <SocialLinks socials={user.socials} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default UserSkillsDisplay;
