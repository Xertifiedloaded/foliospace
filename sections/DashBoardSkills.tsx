import { Badge } from "@/components/ui/badge";
export default function DashBoardSkills() {
  const skills: string[] = ["React", "Next.js", "TypeScript", "Node.js"];

  return (
    <div>
      <p className="font-semibold">Skills</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
