import Experience from "@/components/Experience";
import Education from "@/components/Education";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap } from "lucide-react";
import ProfileLayout from "@/components/layout";
import { IPhoneFrame } from "@/components/Preview";

export default function ResumeSection() {
  return (
    <ProfileLayout>
      <Card>
        <CardContent>
          <Tabs defaultValue="experience" className="w-full  pt-3">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="experience"
                className="flex items-center gap-2"
              >
                <Briefcase className="h-4 w-4" /> Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="flex items-center gap-2"
              >
                <GraduationCap className="h-4 w-4" /> Education
              </TabsTrigger>
            </TabsList>
            <TabsContent value="experience" className="mt-4">
              <Experience />
            </TabsContent>
            <TabsContent value="education" className="mt-4">
              <Education />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>


    </ProfileLayout>
  );
}
