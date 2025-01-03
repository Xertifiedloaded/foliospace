import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface UploadSkillFormProps {
  handleSubmitSkills: (e: React.FormEvent) => void;
  skills: Array<{ name: string; level: string }>;
  setName: (value: string) => void;
  name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  setLevel: (value: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT") => void;
}

export default function UploadSkillForm({
  handleSubmitSkills,
  skills,
  setName,
  name,
  level,
  setLevel,
}: UploadSkillFormProps) {
  

  return (
    <>
      <Card className="mt-6 mb-3">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmitSkills} className="space-y-4 rounded-lg">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Skill Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700"
          >
            Skill Level
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) =>
              setLevel(
                e.target.value as
                  | "BEGINNER"
                  | "INTERMEDIATE"
                  | "ADVANCED"
                  | "EXPERT"
              )
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
            <option value="EXPERT">Expert</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          Add Skill
        </Button>
      </form>
    </>
  );
}
