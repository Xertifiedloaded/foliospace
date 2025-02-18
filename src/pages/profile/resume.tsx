"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, GraduationCap, Plus, X, Edit } from "lucide-react";
import ProfileLayout from "@/components/layout";
import { IPhoneFrame } from "@/components/Preview";
import { toast } from "@/hooks/use-toast";

interface Experience {
  id: string;
  userId: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
}

interface Education {
  id: string;
  userId: string;
  institution: string;
  degree: string;
  startDate: Date;
  endDate: Date | null;
  description?: string;
}

interface NewExperience {
  company?: string;
  position?: string;
  startDate?: Date;
  endDate?: Date | null;
  description?: string;
}

interface NewEducation {
  institution?: string;
  degree?: string;
  startDate?: Date;
  endDate?: Date | null;
  description?: string;
}

type NewItem =
  | { type: "experience"; data: NewExperience }
  | { type: "education"; data: NewEducation };

type EditItem = Experience | Education | null;

export default function ResumeSection() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    "experience"
  );
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<EditItem>(null);
  const [newItem, setNewItem] = useState<NewItem>({
    type: "experience",
    data: {},
  });

  useEffect(() => {
    if (userId) {
      fetchExperiences();
      fetchEducation();
    }
  }, [userId]);

  const fetchExperiences = async () => {
    try {
      const response = await fetch(
        `/api/portfolio/experience?userId=${userId}`
      );
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
      toast({
        title: "Error",
        description: "Failed to load experiences",
        variant: "destructive",
      });
    }
  };

  const fetchEducation = async () => {
    try {
      const response = await fetch(`/api/portfolio/education?userId=${userId}`);
      const data = await response.json();
      setEducation(data);
    } catch (error) {
      console.error("Failed to fetch education:", error);
      toast({
        title: "Error",
        description: "Failed to load education",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint =
        activeTab === "experience"
          ? "/api/portfolio/experience"
          : "/api/portfolio/education";

      const method = editItem ? "PATCH" : "POST";
      const body = JSON.stringify({
        ...newItem.data,
        userId,
        ...(editItem && { id: editItem.id }),
      });

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) throw new Error("Failed to save");

      const savedItem = await response.json();

      if (activeTab === "experience") {
        setExperiences((prev) =>
          editItem
            ? prev.map((item) => (item.id === savedItem.id ? savedItem : item))
            : [...prev, savedItem]
        );
      } else {
        setEducation((prev) =>
          editItem
            ? prev.map((item) => (item.id === savedItem.id ? savedItem : item))
            : [...prev, savedItem]
        );
      }

      setIsDialogOpen(false);
      setNewItem({ type: activeTab, data: {} });
      setEditItem(null);
      toast({
        title: "Success",
        description: `${editItem ? "Updated" : "Added"} successfully`,
      });
    } catch (error) {
      console.error("Error saving:", error);
      toast({
        title: "Error",
        description: "Failed to save. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const endpoint =
        activeTab === "experience"
          ? `/api/portfolio/experience?experienceId=${id}&userId=${userId}`
          : `/api/portfolio/education?educationId=${id}&userId=${userId}`;

      const response = await fetch(endpoint, { method: "DELETE" });

      if (!response.ok) throw new Error("Failed to delete");

      if (activeTab === "experience") {
        setExperiences((prev) => prev.filter((item) => item.id !== id));
      } else {
        setEducation((prev) => prev.filter((item) => item.id !== id));
      }

      toast({ title: "Success", description: "Deleted successfully" });
    } catch (error) {
      console.error("Error deleting:", error);
      toast({
        title: "Error",
        description: "Failed to delete. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "experience" | "education");
    setNewItem({
      type: value as "experience" | "education",
      data: {},
    });
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor={activeTab === "experience" ? "company" : "institution"}
          >
            {activeTab === "experience" ? "Company" : "Institution"}
          </Label>
          <Input
            id={activeTab === "experience" ? "company" : "institution"}
            value={
              activeTab === "experience"
                ? newItem.type === "experience"
                  ? newItem.data.company || ""
                  : ""
                : newItem.type === "education"
                ? newItem.data.institution || ""
                : ""
            }
            onChange={(e) => {
              if (activeTab === "experience") {
                setNewItem({
                  type: "experience",
                  data: {
                    ...(newItem.type === "experience" ? newItem.data : {}),
                    company: e.target.value,
                  },
                });
              } else {
                setNewItem({
                  type: "education",
                  data: {
                    ...(newItem.type === "education" ? newItem.data : {}),
                    institution: e.target.value,
                  },
                });
              }
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={activeTab === "experience" ? "position" : "degree"}>
            {activeTab === "experience" ? "Position" : "Degree"}
          </Label>
          <Input
            id={activeTab === "experience" ? "position" : "degree"}
            value={
              activeTab === "experience"
                ? newItem.type === "experience"
                  ? newItem.data.position || ""
                  : ""
                : newItem.type === "education"
                ? newItem.data.degree || ""
                : ""
            }
            onChange={(e) => {
              if (activeTab === "experience") {
                setNewItem({
                  type: "experience",
                  data: {
                    ...(newItem.type === "experience" ? newItem.data : {}),
                    position: e.target.value,
                  },
                });
              } else {
                setNewItem({
                  type: "education",
                  data: {
                    ...(newItem.type === "education" ? newItem.data : {}),
                    degree: e.target.value,
                  },
                });
              }
            }}
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
            value={
              newItem.data.startDate
                ? format(new Date(newItem.data.startDate), "yyyy-MM-dd")
                : ""
            }
            onChange={(e) =>
              setNewItem({
                ...newItem,
                data: { ...newItem.data, startDate: new Date(e.target.value) },
              })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={
              newItem.data.endDate
                ? format(new Date(newItem.data.endDate), "yyyy-MM-dd")
                : ""
            }
            onChange={(e) =>
              setNewItem({
                ...newItem,
                data: { ...newItem.data, endDate: new Date(e.target.value) },
              })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={newItem.data.description || ""}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              data: { ...newItem.data, description: e.target.value },
            })
          }
        />
      </div>
      <Button variant="default" type="submit" disabled={isLoading}>
        {editItem ? "Update" : "Add"}{" "}
        {activeTab === "experience" ? "Experience" : "Education"}
      </Button>
    </form>
  );

  const renderList = (items: (Experience | Education)[]) => (
    <ScrollArea className="h-[700px]">
      {items.map((item) => (
        <Card key={item.id} className="mb-4">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>
                {activeTab === "experience"
                  ? (item as Experience).position
                  : (item as Education).degree}
              </span>
              <div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setEditItem(item);
                    setNewItem({
                      type: activeTab,
                      data: { ...item },
                    });
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <X className="h-4 text-heading w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {activeTab === "experience"
                ? (item as Experience).company
                : (item as Education).institution}
            </p>
            <p className="text-sm">
              {format(new Date(item.startDate), "MMM yyyy")} -{" "}
              {item.endDate
                ? format(new Date(item.endDate), "MMM yyyy")
                : "Present"}
            </p>
            <p className="mt-2 text-sm">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );

  return (
    <ProfileLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Resume</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Manage Resume</span>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      className="text-black"
                      onClick={() => {
                        setEditItem(null);
                        setNewItem({ type: activeTab, data: {} });
                      }}
                    >
                      <Plus className="mr-2 text-black h-4 w-4" /> Add{" "}
                      {activeTab === "experience" ? "Experience" : "Education"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editItem ? "Edit" : "Add"}{" "}
                        {activeTab === "experience"
                          ? "Experience"
                          : "Education"}
                      </DialogTitle>
                    </DialogHeader>
                    {renderForm()}
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="experience">
                    <Briefcase className="mr-2 h-4 w-4" /> Experience
                  </TabsTrigger>
                  <TabsTrigger value="education">
                    <GraduationCap className="mr-2 h-4 w-4" /> Education
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="experience">
                  {isLoading ? <p>Loading...</p> : renderList(experiences)}
                </TabsContent>
                <TabsContent value="education">
                  {isLoading ? <p>Loading...</p> : renderList(education)}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div>
            <IPhoneFrame>
              <ScrollArea className="h-[700px] p-4">
                <h2 className="text-xl font-semibold mb-4">Experience</h2>
                {experiences.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company}
                    </p>
                    <p className="text-sm">
                      {format(new Date(exp.startDate), "MMM yyyy")} -{" "}
                      {exp.endDate
                        ? format(new Date(exp.endDate), "MMM yyyy")
                        : "Present"}
                    </p>
                    <p className="mt-1 text-sm">{exp.description}</p>
                  </div>
                ))}
                <h2 className="text-xl font-semibold mt-6 mb-4">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution}
                    </p>
                    <p className="text-sm">
                      {format(new Date(edu.startDate), "MMM yyyy")} -{" "}
                      {edu.endDate
                        ? format(new Date(edu.endDate), "MMM yyyy")
                        : "Present"}
                    </p>
                    {edu.description && (
                      <p className="mt-1 text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </IPhoneFrame>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
