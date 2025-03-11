"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Briefcase, GraduationCap, Plus, X, Edit } from "lucide-react"
import ProfileLayout from "@/components/layout"
import { IPhoneFrame } from "@/components/Preview"
import { toast } from "@/hooks/use-toast"

export default function ResumeSection() {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [activeTab, setActiveTab] = useState("experience")
  const [experiences, setExperiences] = useState([])
  const [education, setEducation] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [newItem, setNewItem] = useState({
    isCurrentRole: false,
    description: "",
  })

  const validateDates = (startDate, endDate) => {
    if (!startDate) return false
    if (endDate && new Date(startDate) > new Date(endDate)) return false
    return true
  }

  useEffect(() => {
    if (userId) {
      fetchExperiences()
      fetchEducation()
    }
  }, [userId])

  const fetchExperiences = async () => {
    try {
      const response = await fetch(`/api/portfolio/experience?userId=${userId}`)
      const data = await response.json()
      setExperiences(data)
    } catch (error) {
      console.error("Failed to fetch experiences:", error)
      toast({
        title: "Error",
        description: "Failed to load experiences",
        variant: "destructive",
      })
    }
  }

  const fetchEducation = async () => {
    try {
      const response = await fetch(`/api/portfolio/education?userId=${userId}`)
      const data = await response.json()
      setEducation(data)
    } catch (error) {
      console.error("Failed to fetch education:", error)
      toast({
        title: "Error",
        description: "Failed to load education",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateDates(newItem.startDate, newItem.endDate)) {
      toast({
        title: "Error",
        description: "Invalid date range",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const endpoint = activeTab === "experience" ? "/api/portfolio/experience" : "/api/portfolio/education"
      const method = editItem ? "PATCH" : "POST"
      const itemId = editItem
        ? {
            [`${activeTab}Id`]: editItem.id,
          }
        : {}

      const body = JSON.stringify({
        ...itemId,
        ...newItem,
        userId,
      })

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      })

      if (!response.ok) throw new Error("Failed to save")

      const savedItem = await response.json()

      if (activeTab === "experience") {
        setExperiences((prev) =>
          editItem ? prev.map((item) => (item.id === savedItem.id ? savedItem : item)) : [...prev, savedItem],
        )
      } else {
        setEducation((prev) =>
          editItem ? prev.map((item) => (item.id === savedItem.id ? savedItem : item)) : [...prev, savedItem],
        )
      }

      setIsDialogOpen(false)
      setNewItem({
        isCurrentRole: false,
        description: "",
      })
      setEditItem(null)
      toast({
        title: "Success",
        description: `${editItem ? "Updated" : "Added"} successfully`,
      })
    } catch (error) {
      console.error("Error saving:", error)
      toast({
        title: "Error",
        description: "Failed to save. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setIsLoading(true)
    try {
      const endpoint =
        activeTab === "experience"
          ? `/api/portfolio/experience?experienceId=${id}&userId=${userId}`
          : `/api/portfolio/education?educationId=${id}&userId=${userId}`

      const response = await fetch(endpoint, { method: "DELETE" })

      if (!response.ok) throw new Error("Failed to delete")

      if (activeTab === "experience") {
        setExperiences((prev) => prev.filter((item) => item.id !== id))
      } else {
        setEducation((prev) => prev.filter((item) => item.id !== id))
      }

      toast({ title: "Success", description: "Deleted successfully" })
    } catch (error) {
      console.error("Error deleting:", error)
      toast({
        title: "Error",
        description: "Failed to delete. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderLoadingState = () => (
    <div className="space-y-4">
      <div className="animate-pulse flex space-x-4">
        <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  )

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={activeTab === "experience" ? "company" : "institution"}>
            {activeTab === "experience" ? "Company" : "Institution"}
          </Label>
          <Input
            id={activeTab === "experience" ? "company" : "institution"}
            value={newItem[activeTab === "experience" ? "company" : "institution"] || ""}
            onChange={(e) => setNewItem({ ...newItem, [e.target.id]: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={activeTab === "experience" ? "position" : "degree"}>
            {activeTab === "experience" ? "Position" : "Degree"}
          </Label>
          <Input
            id={activeTab === "experience" ? "position" : "degree"}
            value={newItem[activeTab === "experience" ? "position" : "degree"] || ""}
            onChange={(e) => setNewItem({ ...newItem, [e.target.id]: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={newItem.startDate ? format(new Date(newItem.startDate), "yyyy-MM-dd") : ""}
            onChange={(e) => setNewItem({ ...newItem, startDate: new Date(e.target.value) })}
            required
          />
        </div>
        {!newItem.isCurrentRole && (
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={newItem.endDate ? format(new Date(newItem.endDate), "yyyy-MM-dd") : ""}
              onChange={(e) => setNewItem({ ...newItem, endDate: new Date(e.target.value) })}
            />
          </div>
        )}
      </div>
      {activeTab === "experience" && (
        <div className="flex items-center space-x-2">
          <input
            id="isCurrentRole"
            type="checkbox"
            checked={newItem.isCurrentRole || false}
            onChange={(e) =>
              setNewItem((prev) => ({
                ...prev,
                isCurrentRole: e.target.checked,
                endDate: e.target.checked ? null : prev.endDate,
              }))
            }
            className="mr-2"
          />
          <Label htmlFor="isCurrentRole">Current Role</Label>
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={newItem.description || ""}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
      </div>
      <Button variant="default" type="submit" disabled={isLoading}>
        {editItem ? "Update" : "Add"} {activeTab === "experience" ? "Experience" : "Education"}
      </Button>
    </form>
  )

  const renderList = (items) => (
    <ScrollArea className="h-[400px]">
      {isLoading
        ? renderLoadingState()
        : items.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="text-sm md:text-base line-clamp-1">
                    {activeTab === "experience" ? item.position : item.degree}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setEditItem(item)
                        setNewItem(item)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="default" size="sm" onClick={() => handleDelete(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                  {activeTab === "experience" ? item.company : item.institution}
                </p>
                <p className="text-xs md:text-sm">
                  {format(new Date(item.startDate), "MMM yyyy")} -{" "}
                  {item.endDate ? format(new Date(item.endDate), "MMM yyyy") : "Present"}
                </p>
                <p className="mt-2 text-xs md:text-sm line-clamp-2">{item.description}</p>
              </CardContent>
            </Card>
          ))}
    </ScrollArea>
  )

  return (
    <ProfileLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Resume</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Manage Resume</span>
                <Dialog
                  open={isDialogOpen}
                  onOpenChange={(open) => {
                    console.log("Dialog state changed:", open)
                    setIsDialogOpen(open)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setEditItem(null)
                        setNewItem({
                          isCurrentRole: false,
                          description: "",
                        })
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add {activeTab === "experience" ? "Experience" : "Education"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editItem ? "Edit" : "Add"} {activeTab === "experience" ? "Experience" : "Education"}
                      </DialogTitle>
                    </DialogHeader>
                    {renderForm()}
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue={activeTab}
                value={activeTab}
                onValueChange={(value) => {
                  console.log("Tab changed to:", value)
                  setActiveTab(value)
                }}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="experience">
                    <Briefcase className="mr-2 h-4 w-4" /> Experience
                  </TabsTrigger>
                  <TabsTrigger value="education">
                    <GraduationCap className="mr-2 h-4 w-4" /> Education
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="experience" forceMount={activeTab === "experience"}>
                  {renderList(experiences)}
                </TabsContent>
                <TabsContent value="education" forceMount={activeTab === "education"}>
                  {renderList(education)}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <IPhoneFrame>
                <ScrollArea className="h-[600px] p-4">
                  <h2 className="text-xl font-semibold mb-4">Experience</h2>
                  {experiences.map((exp) => (
                    <div key={exp.id} className="mb-4">
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-sm">
                        {format(new Date(exp.startDate), "MMM yyyy")} -{" "}
                        {exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "Present"}
                      </p>
                      <p className="mt-1 text-sm">{exp.description}</p>
                    </div>
                  ))}
                  <h2 className="text-xl font-semibold mt-6 mb-4">Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-4">
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm">
                        {format(new Date(edu.startDate), "MMM yyyy")} -{" "}
                        {edu.endDate ? format(new Date(edu.endDate), "MMM yyyy") : "Present"}
                      </p>
                      {edu.description && <p className="mt-1 text-sm">{edu.description}</p>}
                    </div>
                  ))}
                </ScrollArea>
              </IPhoneFrame>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProfileLayout>
  )
}

