"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus } from "lucide-react"
import { useState } from "react";

interface ProfileSkillsData {
  skills: string[];
  stacks: string[];

}

export default function SkillsSection() {
  const [formData, setFormData] = useState<ProfileSkillsData>({
    skills: [],
    stacks: [],

  });

  const [currentInputs, setCurrentInputs] = useState<Record<string, string>>({
    skills: "",
    stacks: "",
  });

  const addItem = (key: keyof ProfileSkillsData, newItem: string) => {
    if (newItem.trim() && !formData[key].includes(newItem.trim())) {
      setFormData((prev) => ({
        ...prev,
        [key]: [...prev[key], newItem.trim()],
      }));
    }
  };

  const removeItem = (key: keyof ProfileSkillsData, itemToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item !== itemToRemove),
    }));
  };

  const handleInputChange = (key: keyof ProfileSkillsData, value: string) => {
    setCurrentInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderDynamicSection = (key: keyof ProfileSkillsData, placeholder: string) => (
    <div>
      <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
      <div className="flex gap-2 mb-2">
        <Input
          value={currentInputs[key]}
          onChange={(e) => handleInputChange(key, e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem(key, currentInputs[key]);
              handleInputChange(key, "");
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => {
            addItem(key, currentInputs[key]);
            handleInputChange(key, "");
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData[key].map((item) => (
          <div
            key={item}
            className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
          >
            {item}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-5 w-5"
              onClick={() => removeItem(key, item)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Profile skills updated");
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Interests</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderDynamicSection("skills", "Add a skill")}
          {renderDynamicSection("stacks", "Add a tech stack")}

          <Button type="submit" className="w-full mt-4">
            Save Skills & Interests
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
