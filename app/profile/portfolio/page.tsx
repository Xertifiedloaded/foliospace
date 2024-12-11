"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

interface PortfolioProject {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  image?: string;
}

export default function PortfolioSection() {
  const { user } = useAuth();
  const userId = user?.id;
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [newProject, setNewProject] = useState<Partial<PortfolioProject>>({
    technologies: [],
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const fetchProjects = async () => {
    if (userId) {
      try {
        const response = await fetch(`/api/portfolio/projects?userId=${userId}`);
        const data = await response.json();
        if (data.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.title && newProject.description && userId) {
      const projectToAdd = { 
        ...newProject, 
        userId 
      };
  
      setIsLoading(true);
  
      try {
        const response = await fetch("/api/portfolio/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectToAdd),
        });
  
        if (response.ok) {
          const addedProject = await response.json();
          const fullProject: PortfolioProject = {
            id: addedProject.id,
            title: projectToAdd.title ,
            description: projectToAdd.description,
            technologies: projectToAdd.technologies || [],
            link: projectToAdd.link || '',
            githubLink: projectToAdd.githubLink || '',
            image: projectToAdd.image || ''
          };
  
          setProjects(prevProjects => [...prevProjects, fullProject]);
          setNewProject({ technologies: [] }); 
          toast({ description: "Project added successfully", variant: "default"}); 
        } else {
          console.error("Failed to add project");
          toast({ description: "Failed to add project", variant: "destructive" }); 
        }
      } catch (error) {
        console.error("Error adding project:", error);
        toast({ description: "Error adding project", variant: "destructive" }); 
      } finally {
        setIsLoading(false); 
      }
    }
  };

  const editProject = (projectId: string) => {
    const projectToEdit = projects.find(p => p.id === projectId);
    if (projectToEdit) {
      setEditIndex(projects.indexOf(projectToEdit));
      setNewProject({ ...projectToEdit });
    }
  };
  
  const saveEditedProject = async () => {
    if (editIndex !== null && newProject.id) {
      if (!newProject.title || !newProject.description) {
        toast({
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
  
      const updatedProject = {
        ...newProject,
        userId
      };
  
      try {
        const response = await fetch(`/api/portfolio/projects?id=${newProject.id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProject),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to update project");
        }
  
        const data = await response.json();
  
        const updatedProjects = projects.map(p =>
          p.id === newProject.id ? { ...data.updatedProject } : p
        );
  
        setProjects(updatedProjects);
        setEditIndex(null);
        setNewProject({ technologies: [] });
  
        toast({
          description: "Project updated successfully",
          variant: "default"
        });
  
      } catch (error) {
        console.error("Error updating project:", error);
        
        const errorMessage = error instanceof Error 
          ? error.message 
          : String(error);
  
        toast({
          description: errorMessage || "Failed to update project",
          variant: "destructive"
        });
      }
    }
  };
  const deleteProject = async (project: PortfolioProject) => {
    if (!project.id) return;
    setIsLoading(true);
  
    const updatedProjects = projects.filter(p => p.id !== project.id);
    setProjects(updatedProjects);
  
    try {
      const response = await fetch(`/api/portfolio/projects?id=${project.id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        toast({ description: "Project deleted successfully", variant: "default"});
      } else {
        setProjects(projects);
        console.error("Failed to delete project");
        toast({ description: "Failed to delete project", variant: "destructive" });
      }
    } catch (error) {
      setProjects(projects);
      console.error("Error deleting project:", error);
      toast({ description: "Error deleting project", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const addTechnology = () => {
    const techInput = document.getElementById("techInput") as HTMLInputElement;
    const tech = techInput.value.trim();
    if (tech && !newProject.technologies?.includes(tech)) {
      setNewProject((prev) => ({
        ...prev,
        technologies: [...(prev.technologies || []), tech],
      }));
      techInput.value = "";
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setNewProject((prev) => ({
            ...prev,
            image: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
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
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Project Title</Label>
              <Input
                value={newProject.title || ""}
                onChange={(e) =>
                  setNewProject((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Project Name"
              />
            </div>
            <div>
              <Label>Project Link</Label>
              <Input
                value={newProject.link || ""}
                onChange={(e) =>
                  setNewProject((prev) => ({ ...prev, link: e.target.value }))
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
            <Label>Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                id="techInput"
                value={
                  newProject.technologies?.[
                    newProject.technologies.length - 1
                  ] || ""
                }
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    technologies: prev.technologies
                      ? [...prev.technologies.slice(0, -1), e.target.value]
                      : [e.target.value],
                  }))
                }
                placeholder="Add technology"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTechnology}
                disabled={isLoading}
              >
                <Plus className="mr-2" /> Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newProject.technologies?.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center"
                >
                  {tech}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 h-5 w-5"
                    onClick={() =>
                      setNewProject((prev) => ({
                        ...prev,
                        technologies: prev.technologies?.filter(
                          (t) => t !== tech
                        ),
                      }))
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Project Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
            />
            {newProject.image && (
              <div className="mt-2">
                <img
                  src={newProject.image}
                  alt="Project preview"
                  className="w-32 h-32 object-cover"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            <Plus className="mr-2" />{" "}
            {editIndex === null ? "Add Project" : "Save Changes"}
          </Button>
        </form>

        {projects.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Current Projects</h2>
            {projects.map((project) => (
              <Card key={project.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies?.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => editProject(project.id)}
                        disabled={isLoading}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => deleteProject(project)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
