"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

interface Experience {
  id: string;
  userId: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
  isCurrentRole: boolean;
}

export default function Experience() {
  const { data: session } = useSession(); 
  const userId = session?.user?.id;
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    isCurrentRole: false,
  });
  const [editExperience, setEditExperience] =
    useState<Partial<Experience> | null>(null);

  const fetchExperiences = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `/api/portfolio/experience?userId=${userId}`
      );
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    }
  };

  const addExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newExperience.company &&
      newExperience.position &&
      newExperience.startDate &&
      userId
    ) {
      const newExp = {
        ...newExperience,
        userId,
      };

      try {
        const response = await fetch("/api/portfolio/experience", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExp),
        });

        if (response.ok) {
          const addedExperience = await response.json();
          setExperiences([...experiences, addedExperience]);
          setNewExperience({ isCurrentRole: false });
        } else {
          console.error("Failed to add experience");
        }
      } catch (error) {
        console.error("Error saving experience:", error);
      }
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const response = await fetch(
        `/api/portfolio/experience?experienceId=${id}&userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setExperiences(experiences.filter((exp) => exp.id !== id));
      } else {
        console.error("Failed to delete experience");
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const updateExperience = async (
    id: string,
    updatedData: Partial<Experience>
  ) => {
    try {
      const response = await fetch(`/api/portfolio/experience`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId: id,
          ...updatedData,
          userId,
        }),
      });

      if (response.ok) {
        const updatedExperience = await response.json();
        setExperiences(
          experiences.map((exp) => (exp.id === id ? updatedExperience : exp))
        );
        setEditExperience(null);
      } else {
        console.error("Failed to update experience");
      }
    } catch (error) {
      console.error("Update error", error);
    }
  };

  const handleEditClick = (exp: Experience) => {
    setEditExperience(exp);
  };

  const handleEditCancel = () => {
    setEditExperience(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editExperience && editExperience.id) {
      await updateExperience(editExperience.id, editExperience);
    }
  };

  useEffect(() => {
    if (userId) fetchExperiences();
  }, [userId]);

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Briefcase className="mr-2" /> Work Experience
      </h2>

      {editExperience ? (
        <form onSubmit={handleEditSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={editExperience.company || ""}
              onChange={(e) =>
                setEditExperience((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
              placeholder="Company Name"
              required
            />
            <Input
              value={editExperience.position || ""}
              onChange={(e) =>
                setEditExperience((prev) => ({
                  ...prev,
                  position: e.target.value,
                }))
              }
              placeholder="Job Title"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="date"
              value={
                editExperience.startDate
                  ? format(new Date(editExperience.startDate), "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) =>
                setEditExperience((prev) => ({
                  ...prev,
                  startDate: new Date(e.target.value),
                }))
              }
              required
            />
            {!editExperience.isCurrentRole && (
              <Input
                type="date"
                value={
                  editExperience.endDate
                    ? format(new Date(editExperience.endDate), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) =>
                  setEditExperience((prev) => ({
                    ...prev,
                    endDate: new Date(e.target.value),
                  }))
                }
              />
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={editExperience.isCurrentRole || false}
                onChange={(e) =>
                  setEditExperience((prev) => ({
                    ...prev,
                    isCurrentRole: e.target.checked,
                    endDate: e.target.checked ? null : prev?.endDate,
                  }))
                }
                className="mr-2"
              />
              <Label>Current Role</Label>
            </div>
          </div>
          <Textarea
            value={editExperience.description || ""}
            onChange={(e) =>
              setEditExperience((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Job Description"
          />
          <div className="flex space-x-4">
            <Button type="submit" variant="outline" className="w-full">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleEditCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={addExperience} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={newExperience.company || ""}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
              placeholder="Company Name"
              required
            />
            <Input
              value={newExperience.position || ""}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  position: e.target.value,
                }))
              }
              placeholder="Job Title"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="date"
              value={
                newExperience.startDate
                  ? format(new Date(newExperience.startDate), "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  startDate: new Date(e.target.value),
                }))
              }
              required
            />
            {!newExperience.isCurrentRole && (
              <Input
                type="date"
                value={
                  newExperience.endDate
                    ? format(new Date(newExperience.endDate), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) =>
                  setNewExperience((prev) => ({
                    ...prev,
                    endDate: new Date(e.target.value),
                  }))
                }
              />
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newExperience.isCurrentRole}
                onChange={(e) =>
                  setNewExperience((prev) => ({
                    ...prev,
                    isCurrentRole: e.target.checked,
                    endDate: e.target.checked ? null : prev.endDate,
                  }))
                }
                className="mr-2"
              />
              <Label>Current Role</Label>
            </div>
          </div>
          <Textarea
            value={newExperience.description || ""}
            onChange={(e) =>
              setNewExperience((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Job Description"
          />
          <Button type="submit" variant="outline" className="w-full">
            <Plus className="mr-2" /> Add Experience
          </Button>
        </form>
      )}

      <div className="space-y-6 mt-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {exp.company}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium">
                    {exp.position}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(exp.startDate), "MMM yyyy")} -{" "}
                  {exp.endDate
                    ? format(new Date(exp.endDate), "MMM yyyy")
                    : "Present"}
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="text-gray-700 mb-4">{exp.description}</p>
              <div className="flex  items-center space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => deleteExperience(exp.id)}
                >
                  <X className="mr-2" /> Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleEditClick(exp)}
                >
                  <Plus className="mr-2" /> Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
