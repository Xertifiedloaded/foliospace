"use client"

import type React from "react"
import { useState, useEffect, useMemo, useRef } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users2,
  X,
  Globe2,
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  ChevronDown,
  SortAsc,
  SortDesc,
  Eye,
  Moon,
  Sun,
  Sparkles,
  TrendingUp,
  Award,
  ExternalLink,
  Code2,
} from "lucide-react"
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
} from "react-icons/fa"

interface User {
  id: string
  name: string
  tagline?: string
  skills: { id: string; name: string }[]
  socials: { id: string; name: string; link: string }[]
  profile?: {
    levelOfExperience: string
    yearsOfExperience?: number
  }
}

const TeamDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLevel, setSelectedLevel] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"name" | "experience" | "skills">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [showFilters, setShowFilters] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const queryParams = selectedSkills.length ? `?skills=${selectedSkills.join(",")}` : ""
      const response = await axios.get(`/api/user/userskills${queryParams}`)
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [selectedSkills])

  const allSkills = useMemo(() => {
    const skillSet = new Set<string>()
    users.forEach((user) => {
      if (user.skills && user.skills.length > 0) {
        user.skills.forEach((skill) => skillSet.add(skill.name))
      }
    })
    return Array.from(skillSet).sort()
  }, [users])

  const filteredAndSortedUsers = useMemo(() => {
    // First, exclude users with no skills completely
    const usersWithSkills = users.filter((user) => user.skills && user.skills.length > 0)

    // Then apply other filters
    const filtered = usersWithSkills.filter((user) => {
      const searchMatch =
        searchTerm === "" ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.tagline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))

      const levelMatch =
        !selectedLevel || selectedLevel === "all" || (user.profile && user.profile.levelOfExperience === selectedLevel)

      return searchMatch && levelMatch
    })

    // Sort users
    return [...filtered].sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "experience":
          aValue = a.profile?.yearsOfExperience || 0
          bValue = b.profile?.yearsOfExperience || 0
          break
        case "skills":
          aValue = a.skills.length
          bValue = b.skills.length
          break
        default:
          return 0
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  }, [searchTerm, selectedLevel, users, sortBy, sortOrder])

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const toggleFavorite = (userId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSkills([])
    setSelectedLevel("")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const getSocialIcon = (platform: string) => {
    const iconClass = "h-4 w-4"
    const icons: { [key: string]: React.ReactNode } = {
      github: <FaGithub className={iconClass} />,
      linkedin: <FaLinkedin className={iconClass} />,
      twitter: <FaTwitter className={iconClass} />,
      instagram: <FaInstagram className={iconClass} />,
      facebook: <FaFacebook className={iconClass} />,
      dribbble: <FaDribbble className={iconClass} />,
      behance: <FaBehance className={iconClass} />,
      medium: <FaMedium className={iconClass} />,
      youtube: <FaYoutube className={iconClass} />,
      tiktok: <FaTiktok className={iconClass} />,
      default: <Globe2 className={iconClass} />,
    }
    return icons[platform.toLowerCase()] || icons.default
  }

  const getExperienceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "junior":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200"
      case "mid":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200"
      case "senior":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-200"
    }
  }

  const getExperienceIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "junior":
        return <Sparkles className="h-3 w-3" />
      case "mid":
        return <TrendingUp className="h-3 w-3" />
      case "senior":
        return <Award className="h-3 w-3" />
      default:
        return null
    }
  }

  const SocialLinks: React.FC<{ socials: User["socials"] }> = ({ socials }) => {
    if (!socials || socials.length === 0) return null

    const visibleSocials = socials.slice(0, 3)
    const remainingSocials = socials.slice(3)

    return (
      <div className="flex items-center space-x-1">
        {visibleSocials.map((social) => (
          <TooltipProvider key={social.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                >
                  <a href={social.link} target="_blank" rel="noopener noreferrer">
                    {getSocialIcon(social.name)}
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="capitalize">{social.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        {remainingSocials.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-2 text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                +{remainingSocials.length}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {remainingSocials.map((social) => (
                <DropdownMenuItem key={social.id} asChild>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {getSocialIcon(social.name)}
                    <span className="capitalize">{social.name}</span>
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    )
  }

  // Redesigned Skills Component
  const SkillsDisplay: React.FC<{ skills: { id: string; name: string }[]; limit?: number; showCount?: boolean }> = ({
    skills,
    limit = 4,
    showCount = true,
  }) => {
    if (!skills || skills.length === 0) return null

    const visibleSkills = skills.slice(0, limit)
    const remainingCount = skills.length - limit

    return (
      <div className="space-y-3">
        {showCount && (
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center">
              <Code2 className="h-3.5 w-3.5 mr-1.5 text-primary" />
              Skills & Expertise
            </h4>
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              {skills.length}
            </Badge>
          </div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {visibleSkills.map((skill) => (
            <Badge
              key={skill.id}
              variant="outline"
              className="bg-primary/5 hover:bg-primary/10 text-xs py-1 px-2.5 rounded-md  transition-colors duration-200"
            >
              {skill.name}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge
              variant="outline"
              className="bg-muted/50 hover:bg-muted text-xs py-1 px-2.5 rounded-md transition-colors duration-200"
            >
              +{remainingCount} more
            </Badge>
          )}
        </div>
      </div>
    )
  }

  const UserCard: React.FC<{ user: User }> = ({ user }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/30 shadow-md bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg truncate group-hover:text-primary transition-colors duration-200">
                  {user.name}
                </CardTitle>
                {user.profile?.yearsOfExperience && (
                  <p className="text-xs text-muted-foreground">{user.profile.yearsOfExperience} years experience</p>
                )}
              </div>
            </div>
            {user.tagline && (
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{user.tagline}</p>
            )}
          </div>

          <div className="flex flex-col items-end space-y-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => toggleFavorite(user.id, e)}
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
            >
              <Heart
                className={`h-4 w-4 transition-all duration-200 ${favorites.includes(user.id) ? "fill-red-500 text-red-500 scale-110" : "hover:text-red-500"}`}
              />
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xl">{user.name}</div>
                      {user.tagline && <div className="text-sm font-normal text-muted-foreground">{user.tagline}</div>}
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {user.profile && (
                    <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {getExperienceIcon(user.profile.levelOfExperience)}
                        <Badge className={`${getExperienceColor(user.profile.levelOfExperience)} font-medium`}>
                          {user.profile.levelOfExperience}
                        </Badge>
                      </div>
                      {user.profile.yearsOfExperience && (
                        <div className="text-sm text-muted-foreground">
                          {user.profile.yearsOfExperience} years of experience
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <SkillsDisplay skills={user.skills} limit={20} showCount={true} />
                  </div>

                  {user.socials && user.socials.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Connect & Follow</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {user.socials.map((social) => (
                          <Button
                            key={social.id}
                            variant="outline"
                            size="sm"
                            asChild
                            className="justify-start hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                          >
                            <a
                              href={social.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2"
                            >
                              {getSocialIcon(social.name)}
                              <span className="capitalize">{social.name}</span>
                              <ExternalLink className="h-3 w-3 ml-auto" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        {user.profile?.levelOfExperience && (
          <div className="flex items-center space-x-2">
            <Badge
              className={`${getExperienceColor(user.profile.levelOfExperience)} text-xs font-medium flex items-center space-x-1`}
            >
              {getExperienceIcon(user.profile.levelOfExperience)}
              <span>{user.profile.levelOfExperience}</span>
            </Badge>
          </div>
        )}

        <SkillsDisplay skills={user.skills} />

        {user.socials && user.socials.length > 0 && (
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Connect</span>
              <SocialLinks socials={user.socials} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const UserListItem: React.FC<{ user: User }> = ({ user }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border border-border/30 shadow-md bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold truncate hover:text-primary transition-colors duration-200">
                  {user.name}
                </h3>
                {user.tagline && <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{user.tagline}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => toggleFavorite(user.id, e)}
                  className="h-9 w-9 hover:scale-110 transition-all duration-200"
                >
                  <Heart
                    className={`h-4 w-4 ${favorites.includes(user.id) ? "fill-red-500 text-red-500" : "hover:text-red-500"}`}
                  />
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-xl">{user.name}</div>
                          {user.tagline && (
                            <div className="text-sm font-normal text-muted-foreground">{user.tagline}</div>
                          )}
                        </div>
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      {user.profile && (
                        <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            {getExperienceIcon(user.profile.levelOfExperience)}
                            <Badge className={`${getExperienceColor(user.profile.levelOfExperience)} font-medium`}>
                              {user.profile.levelOfExperience}
                            </Badge>
                          </div>
                          {user.profile.yearsOfExperience && (
                            <div className="text-sm text-muted-foreground">
                              {user.profile.yearsOfExperience} years of experience
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <SkillsDisplay skills={user.skills} limit={20} showCount={true} />
                      </div>

                      {user.socials && user.socials.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3">Connect & Follow</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {user.socials.map((social) => (
                              <Button
                                key={social.id}
                                variant="outline"
                                size="sm"
                                asChild
                                className="justify-start hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                              >
                                <a
                                  href={social.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2"
                                >
                                  {getSocialIcon(social.name)}
                                  <span className="capitalize">{social.name}</span>
                                  <ExternalLink className="h-3 w-3 ml-auto" />
                                </a>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user.profile?.levelOfExperience && (
                <Badge
                  className={`${getExperienceColor(user.profile.levelOfExperience)} text-xs font-medium flex items-center space-x-1`}
                >
                  {getExperienceIcon(user.profile.levelOfExperience)}
                  <span>{user.profile.levelOfExperience}</span>
                </Badge>
              )}
              {user.profile?.yearsOfExperience && (
                <span className="text-sm text-muted-foreground">{user.profile.yearsOfExperience} years experience</span>
              )}
            </div>

            <SkillsDisplay skills={user.skills} limit={6} />

            {user.socials && user.socials.length > 0 && (
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Connect:</span>
                <SocialLinks socials={user.socials} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
        <div className="container mx-auto p-6 space-y-8">
          {/* Enhanced Header */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Skill Connect
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Discover and connect with professionals who share your skills or work in similar fields. Expand your
                  network, collaborate on projects, and grow your career.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="hover:scale-110 transition-all duration-200"
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Enhanced Search and Controls */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, skills, or tagline..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  ref={searchInputRef}
                  className="pl-12 h-12 text-lg border-2 focus:border-primary transition-all duration-200"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 h-12 px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                  />
                </Button>

                <Select value={sortBy} onValueChange={(value: "name" | "experience" | "skills") => setSortBy(value)}>
                  <SelectTrigger className="w-[160px] h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                    <SelectItem value="skills">Skills Count</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="h-12 w-12 hover:scale-110 transition-all duration-200"
                >
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </Button>

                <div className="flex border-2 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none h-12 w-12 transition-all duration-200"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-none h-12 w-12 transition-all duration-200"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Filters */}
            {showFilters && (
              <Card className="p-6 border-2 shadow-lg bg-gradient-to-r from-background to-muted/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Experience Level</Label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Mid">Mid</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">Skills Filter</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                        className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Clear All
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-muted/30 rounded-lg">
                      {allSkills.map((skill) => (
                        <Button
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          variant={selectedSkills.includes(skill) ? "default" : "outline"}
                          size="sm"
                          className={`text-xs transition-all duration-200 hover:scale-105 ${
                            selectedSkills.includes(skill)
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/5 hover:bg-primary/10 text-foreground"
                          }`}
                        >
                          {skill}
                        </Button>
                      ))}
                      {allSkills.length === 0 && (
                        <p className="text-sm text-muted-foreground p-2">No skills available to filter</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Enhanced Results Summary */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  Showing <span className="text-primary font-bold">{filteredAndSortedUsers.length}</span> of{" "}
                  <span className="font-bold">{users.filter((u) => u.skills && u.skills.length > 0).length}</span>{" "}
                  professionals
                </span>
                {(searchTerm || selectedSkills.length > 0 || selectedLevel) && (
                  <Badge variant="secondary" className="text-xs">
                    Filtered
                  </Badge>
                )}
              </div>
              {favorites.length > 0 && (
                <div className="flex items-center space-x-2 text-sm">
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  <span className="font-medium">{favorites.length} favorites</span>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced User Grid/List */}
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <Users2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-medium text-muted-foreground">Loading professionals...</p>
            </div>
          ) : filteredAndSortedUsers.length === 0 ? (
            <Card className="p-12 text-center border-2 border-dashed">
              <Users2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No professionals found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchTerm || selectedSkills.length > 0 || selectedLevel
                  ? "Try adjusting your search criteria or filters to find professionals"
                  : "No professionals with skills found in the database."}
              </p>
              {(searchTerm || selectedSkills.length > 0 || selectedLevel) && (
                <Button onClick={clearFilters} size="lg" className="hover:scale-105 transition-all duration-200">
                  <X className="h-4 w-4 mr-2" />
                  Clear all filters
                </Button>
              )}
            </Card>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAndSortedUsers.map((user) =>
                viewMode === "grid" ? (
                  <UserCard key={user.id} user={user} />
                ) : (
                  <UserListItem key={user.id} user={user} />
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamDirectory
