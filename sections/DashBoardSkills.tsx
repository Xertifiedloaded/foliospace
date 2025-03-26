import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Skill {
  id: string;
  name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
}

export default function DashBoardSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch("/api/portfolio/skill");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data: Skill[] = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  if (loading) {
    return <p>Loading skills...</p>;
  }

  if (skills.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="font-semibold">Skills</p>
      <div className="  mt-2">
        {skills.map((skill) => (
          <Badge className="text-black p-2 block mt-4" key={skill.id} variant="outline">
            {skill.name} 
          </Badge>
        ))}
      </div>
    </div>
  );
}
