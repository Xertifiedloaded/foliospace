"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { IPhoneFrame } from "./Preview";

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-3 p-2">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-gray-200 rounded-lg p-4">
        <div className="h-4 bg-gray-300 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 mt-2 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

interface Education {
  id: string;
  userId: string;
  institution: string;
  degree: string;
  startDate: Date;
  endDate: Date | null;
  description?: string;
}

export default function Education() {
  const { data: session } = useSession();
  const [education, setEducation] = useState<Education[]>([]);
  const [newEducation, setNewEducation] = useState<Partial<Education>>({});
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  const userId = session?.user?.id;

  useEffect(() => {
    const fetchEducation = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `/api/portfolio/education?userId=${userId}`
          );
          const data = await response.json();
          setEducation(data);
          setLoading(false); 
        } catch (error) {
          console.error("Error fetching education records:", error);
          setLoading(false); 
        }
      }
    };

    fetchEducation();
  }, [userId]);

  const addEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newEducation.institution &&
      newEducation.degree &&
      newEducation.startDate &&
      userId
    ) {
      const newEdu = {
        ...newEducation,
        userId,
        id: Date.now().toString(),
      } as Education;
      setEducation([...education, newEdu]);
      setNewEducation({});
      try {
        const response = await fetch("/api/portfolio/education", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEdu),
        });

        if (response.ok) {
          console.log("Education added to database");
        } else {
          console.error("Failed to add education");
        }
      } catch (error) {
        console.error("Error saving education:", error);
      }
    }
  };

  const deleteEducation = async (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));

    try {
      const response = await fetch(
        `/api/portfolio/education?educationId=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.error("Failed to delete education");
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const updateEducation = async (
    id: string,
    updatedData: Partial<Education>
  ) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, ...updatedData } : edu))
    );

    try {
      const response = await fetch(`/api/portfolio/education`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          educationId: id,
          ...updatedData,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update education");
      }
    } catch (error) {
      console.error("Update error", error);
    }
  };

  const handleSave = () => {
    if (
      isEditing &&
      newEducation.institution &&
      newEducation.degree &&
      newEducation.startDate
    ) {
      updateEducation(isEditing, newEducation as Education);
      setIsEditing(null);
      setNewEducation({});
    }
  };

  return (
    <section>
      <div className="bg-gray-50 container mx-auto min-h-screen">
        <div className=" py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="mr-2" /> Education
              </h2>
              <form onSubmit={addEducation} className="space-y-3">
                <div className="grid lg:grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="institution">Institution Name</label>
                    <Input
                      id="institution"
                      value={newEducation.institution || ""}
                      onChange={(e) =>
                        setNewEducation((prev) => ({
                          ...prev,
                          institution: e.target.value,
                        }))
                      }
                      placeholder="Institution Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="degree">Degree</label>
                    <Input
                      id="degree"
                      value={newEducation.degree || ""}
                      onChange={(e) =>
                        setNewEducation((prev) => ({
                          ...prev,
                          degree: e.target.value,
                        }))
                      }
                      placeholder="Degree"
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="start-date">Start Date</label>
                    <Input
                      id="start-date"
                      type="date"
                      value={
                        newEducation.startDate
                          ? format(
                              new Date(newEducation.startDate),
                              "yyyy-MM-dd"
                            )
                          : ""
                      }
                      onChange={(e) =>
                        setNewEducation((prev) => ({
                          ...prev,
                          startDate: new Date(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="end-date">End Date</label>
                    <Input
                      id="end-date"
                      type="date"
                      value={
                        newEducation.endDate
                          ? format(new Date(newEducation.endDate), "yyyy-MM-dd")
                          : ""
                      }
                      onChange={(e) =>
                        setNewEducation((prev) => ({
                          ...prev,
                          endDate: new Date(e.target.value),
                        }))
                      }
                    />
                  </div>
                </div>
                <Button type="submit" variant="outline" className="w-full">
                  <Plus className="mr-2" /> Add Education
                </Button>
              </form>

              {isEditing && (
                <div className="mt-4">
                  <Button onClick={handleSave} className="w-full">
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
            <div className="relative">
              <div className="">
                <IPhoneFrame>
                  {loading ? (
                    <SkeletonLoader /> 
                  ) : (
                    <div className="space-y-3 p-2">
                      {education?.map((edu) => (
                        <div
                          key={edu?.id}
                          className="bg-white rounded-lg border border-gray-100 overflow-hidden"
                        >
                          <div className="p-3">
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex-1">
                                <h3 className="text-sm font-medium line-clamp-1">
                                  {edu?.institution}
                                </h3>
                                <p className="text-xs text-gray-600 line-clamp-1">
                                  {edu.degree}
                                </p>
                              </div>
                              <div className="text-[10px] text-gray-500 flex-shrink-0 ml-2">
                                {format(new Date(edu.startDate), "MM/yy")} -{" "}
                                {edu.endDate
                                  ? format(new Date(edu.endDate), "MM/yy")
                                  : "Present"}
                              </div>
                            </div>

                            <div className="flex gap-1.5 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs px-2 flex-1 text-blue-600 hover:bg-blue-50 border-blue-200"
                                onClick={() => {
                                  setIsEditing(edu.id);
                                  setNewEducation({ ...edu });
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => deleteEducation(edu.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </IPhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
