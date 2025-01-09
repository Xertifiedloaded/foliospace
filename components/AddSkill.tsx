
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      <Card className="mt-6 mb-3 dark:bg-black dark:text-white">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmitSkills} className="space-y-4 rounded-lg">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium "
          >
            Skill Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full "
            required
          />
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Skill Level
          </label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="mt-1 w-full dark:border-gray-600">
              <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BEGINNER">Beginner</SelectItem>
              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
              <SelectItem value="ADVANCED">Advanced</SelectItem>
              <SelectItem value="EXPERT">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full ">
          Add Skill
        </Button>
      </form>
    </>
  );
}
