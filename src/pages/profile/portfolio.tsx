"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Loader2,
  Edit,
  Trash2,
  ExternalLink,
  Github,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ProfileLayout from "@/components/layout";
import { IPhoneFrame } from "@/components/Preview";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PortfolioProject {
  id: string;
  title?: string;
  description?: string;
  link?: string;
  githubLink?: string;
  image?: File | string;
}

export default function PortfolioSection() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [newProject, setNewProject] = useState<Partial<PortfolioProject>>({});
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    if (!userId) {
      setLoadingProjects(false);
      return;
    }

    try {
      setError(null);
      const response = await fetch(`/api/portfolio/projects?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError('Failed to fetch projects. Please try again.');
      toast({
        title: "Error",
        description: "Failed to fetch projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    console.log('Session Status:', status);
    console.log('Session:', session);
    console.log('UserId:', userId);

    if (status === 'loading') {
      return;
    }

    fetchProjects();
  }, [status, userId]);

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to add projects",
        variant: "destructive",
      });
      return;
    }

    if (!newProject.title || !newProject.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(newProject).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
      });
      formData.append('userId', userId);

      const response = await fetch("/api/portfolio/projects", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { id } = await response.json();
      const newProjectComplete: PortfolioProject = {
        ...newProject,
        id,
      } as PortfolioProject;

      setProjects((prevProjects) => [...prevProjects, newProjectComplete]);
      setNewProject({});
      setIsDialogOpen(false);

      toast({
        title: "Success",
        description: "Project added successfully",
      });
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error adding project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.id || !userId) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(editingProject).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
      });
      formData.append('userId', userId);

      const response = await fetch(`/api/portfolio/projects?id=${editingProject.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { updatedProject } = await response.json();

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editingProject.id ? updatedProject : project
        )
      );

      setEditingProject(null);
      setIsDialogOpen(false);

      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEditing: boolean
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isEditing && editingProject) {
        setEditingProject((prev) => {
          if (!prev) return null;
          return { ...prev, image: file } as PortfolioProject;
        });
      } else {
        setNewProject((prev) => ({ ...prev, image: file }));
      }
    }
  };

  const deleteProject = async (project: PortfolioProject) => {
    if (!project.id || !userId) return;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/portfolio/projects?id=${project.id}&userId=${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects((prevProjects) =>
          prevProjects.filter((p) => p.id !== project.id)
        );
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <ProfileLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </ProfileLayout>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <ProfileLayout>
        <div className="container mx-auto py-8 px-4">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-4">Please Log In</h2>
              <p className="text-center text-muted-foreground">
                You need to be logged in to view and manage your portfolio projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Manage Portfolio Projects</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Your Projects</span>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant='default' 
                        className=" border "
                        onClick={() => setEditingProject(null)}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          {editingProject ? "Edit Project" : "Add New Project"}
                        </DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={editingProject ? handleProjectEdit : handleProjectSubmit}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="title">Project Title *</Label>
                          <Input
                            id="title"
                            value={editingProject?.title || newProject.title || ""}
                            onChange={(e) =>
                              editingProject
                                ? setEditingProject({
                                    ...editingProject,
                                    title: e.target.value,
                                  })
                                : setNewProject({
                                    ...newProject,
                                    title: e.target.value,
                                  })
                            }
                            placeholder="Project Name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Project Description *</Label>
                          <Textarea
                            id="description"
                            value={editingProject?.description || newProject.description || ""}
                            onChange={(e) =>
                              editingProject
                                ? setEditingProject({
                                    ...editingProject,
                                    description: e.target.value,
                                  })
                                : setNewProject({
                                    ...newProject,
                                    description: e.target.value,
                                  })
                            }
                            placeholder="Describe your project"
                            rows={4}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="link">Project Link</Label>
                          <Input
                            id="link"
                            value={editingProject?.link || newProject.link || ""}
                            onChange={(e) =>
                              editingProject
                                ? setEditingProject({
                                    ...editingProject,
                                    link: e.target.value,
                                  })
                                : setNewProject({
                                    ...newProject,
                                    link: e.target.value,
                                  })
                            }
                            placeholder="Live project URL"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="githubLink">GitHub Link</Label>
                          <Input
                            id="githubLink"
                            value={editingProject?.githubLink || newProject.githubLink || ""}
                            onChange={(e) =>
                              editingProject
                                ? setEditingProject({
                                    ...editingProject,
                                    githubLink: e.target.value,
                                  })
                                : setNewProject({
                                    ...newProject,
                                    githubLink: e.target.value,
                                  })
                            }
                            placeholder="GitHub repository URL"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image">Project Image</Label>
                          <Input
                            id="image"
                            type="file"
                            onChange={(e) => handleImageUpload(e, !!editingProject)}
                            accept="image/*"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : editingProject ? (
                            "Save Changes"
                          ) : (
                            "Add Project"
                          )}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {loadingProjects ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} className="h-20 w-full" />
                      ))}
                    </div>
                  ) : projects.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      No projects added yet
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <Card key={project.id}>
                          <CardContent className="flex items-center justify-between p-4">
                            <div>
                              <h3 className="font-semibold">{project.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {project.description?.substring(0, 50)}...
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setEditingProject(project);
                                  setIsDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteProject(project)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div>
            <Tabs defaultValue="preview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-4">
              <IPhoneFrame>
                      <ScrollArea className="h-[500px]">
                        <div className="p-4 space-y-6">
                          <h2 className="text-2xl font-bold">My Projects</h2>
                          {projects.map((project) => (
                            <Card key={project.id} className="overflow-hidden">
                              {project.image && (
                                <img
                                  src={
                                    typeof project.image === "string"
                                      ? project.image
                                      : URL.createObjectURL(project.image)
                                  }
                                  alt={project.title}
                                  className="w-full h-40 object-cover"
                                />
                              )}
                              <CardContent className="p-4">
                                <h3 className="font-semibold mb-2">
                                  {project.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                  {project.description}
                                </p>
                                <div className="flex space-x-2">
                                  {project.link && (
                                    <Button size="sm" variant="outline" asChild>
                                      <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink className="mr-2 h-4 w-4" />{" "}
                                        View Project
                                      </a>
                                    </Button>
                                  )}
                                  {project.githubLink && (
                                    <Button size="sm" variant="outline" asChild>
                                      <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Github className="mr-2 h-4 w-4" />{" "}
                                        GitHub
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </IPhoneFrame>
              </TabsContent>
              <TabsContent value="code" className="mt-4">
                <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                  <code>{`
// Example code to display projects
function ProjectList({ projects }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Projects</h2>
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          {project.image && (
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-40 object-cover"
            />
          )}
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {project.description}
            </p>
            <div className="flex space-x-2">
              {project.link && (
                <Button size="sm" variant="outline" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> View Project
                  </a>
                </Button>
              )}
              {project.githubLink && (
                <Button size="sm" variant="outline" asChild>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
                      `}</code>
                </pre>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
