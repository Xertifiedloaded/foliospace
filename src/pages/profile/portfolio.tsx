"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import ProfileLayout from "@/components/layout";
import { IPhoneFrame } from "@/components/Preview";
import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioProject {
  id: string;
  title?: string;
  description?: string;
  link?: string;
  githubLink?: string;
  image?: File;
}

export default function PortfolioSection() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [newProject, setNewProject] = useState<Partial<PortfolioProject>>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);

  const fetchProjects = async () => {
    if (userId) {
      try {
        const response = await fetch(
          `/api/portfolio/projects?userId=${userId}`
        );
        const data = await response.json();
        console.log(data);

        if (data.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoadingProjects(false); 
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.title && newProject.description && userId) {
      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("title", newProject.title);
        formData.append("description", newProject.description);
        if (newProject.link) formData.append("link", newProject.link);
        if (newProject.githubLink)
          formData.append("githubLink", newProject.githubLink);
        if (newProject.image) formData.append("image", newProject.image);

        const response = await fetch("/api/portfolio/projects", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const { id } = await response.json();

        const newProjectComplete: PortfolioProject = {
          id,
          title: newProject.title,
          description: newProject.description,
          link: newProject.link,
          githubLink: newProject.githubLink,
          image: newProject.image,
        };

        setProjects((prevProjects) => [...prevProjects, newProjectComplete]);
        setNewProject({});

        toast({
          description: "Project added successfully",
          variant: "default",
        });
      } catch (error) {
        console.error("Error adding project:", error);
        toast({
          description:
            error instanceof Error ? error.message : "Error adding project",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const saveEditedProject = async () => {
    if (editIndex !== null && newProject.id) {
      if (!newProject.title || !newProject.description) {
        toast({
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("title", newProject.title);
        formData.append("description", newProject.description);
        if (newProject.link) formData.append("link", newProject.link);
        if (newProject.githubLink)
          formData.append("githubLink", newProject.githubLink);
        if (newProject.image) formData.append("image", newProject.image);

        const response = await fetch(
          `/api/portfolio/projects?id=${newProject.id}`,
          {
            method: "PATCH",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const { updatedProject } = await response.json();

        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === newProject.id ? updatedProject : project
          )
        );

        setEditIndex(null);
        setNewProject({});

        toast({
          description: "Project updated successfully",
          variant: "default",
        });
      } catch (error) {
        console.error("Error updating project:", error);
        toast({
          description:
            error instanceof Error ? error.message : "Failed to update project",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const editProject = (projectId: string) => {
    const projectToEdit = projects.find((p) => p.id === projectId);
    if (projectToEdit) {
      setEditIndex(projects.indexOf(projectToEdit));
      setNewProject({ ...projectToEdit });
    }
  };

  const deleteProject = async (project: PortfolioProject) => {
    if (!project.id) return;
    setIsLoading(true);

    const updatedProjects = projects.filter((p) => p.id !== project.id);
    setProjects(updatedProjects);

    try {
      const response = await fetch(`/api/portfolio/projects?id=${project.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          description: "Project deleted successfully",
          variant: "default",
        });
      } else {
        setProjects(projects);
        console.error("Failed to delete project");
        toast({
          description: "Failed to delete project",
          variant: "destructive",
        });
      }
    } catch (error) {
      setProjects(projects);
      console.error("Error deleting project:", error);
      toast({ description: "Error deleting project", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProject((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      saveEditedProject();
    } else {
      addProject(e);
    }
  };

  return (
    <ProfileLayout>
      <div className=" min-h-screen transition-colors duration-200">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-0">
                <CardHeader>
                  <CardTitle>Portfolio Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid lg:grid-cols-2 gap-4">
                      <div>
                        <Label>Project Title</Label>
                        <Input
                          value={newProject.title || ""}
                          onChange={(e) =>
                            setNewProject((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="Project Name"
                        />
                      </div>
                      <div>
                        <Label>Project Link</Label>
                        <Input
                          value={newProject.link || ""}
                          onChange={(e) =>
                            setNewProject((prev) => ({
                              ...prev,
                              link: e.target.value,
                            }))
                          }
                          placeholder="Live project URL"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Project Description</Label>
                      <Textarea
                        value={newProject.description || ""}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe your project"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Project Image (optional)</Label>
                      <Input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button variant='destructive' className="text-black" type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : editIndex !== null ? (
                          "Save Changes"
                        ) : (
                          "Add Project"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <IPhoneFrame>
              <div className="space-y-6">
                {loadingProjects ? (
                  // Skeleton loader while fetching projects
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 rounded-md p-4"
                      >
                        <Skeleton className="h-6 w-full mb-4" />
                        <Skeleton className="h-4 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  // Render actual projects
                  projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-300 rounded-md p-4"
                    >
                      <div className="">
                        <h3 className="text-lg font-semibold sm:text-base">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-xs my-2">
                        {project.description}
                      </p>
                      <div className="space-x-2">
                        <Button
                          onClick={() => editProject(project.id)}
                          size="icon"
                          variant="ghost"
                        >
                          <Plus />
                        </Button>
                        <Button
                        className="text-black"
                          onClick={() => deleteProject(project)}
                          size="icon"
                          variant="ghost"
                        >
                          <X />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </IPhoneFrame>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
