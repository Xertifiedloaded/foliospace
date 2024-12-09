"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Calendar, Briefcase } from "lucide-react"
import { format } from "date-fns"

interface Experience {
 company: string
 position: string
 startDate: Date
 endDate: Date | null
 description: string
 isCurrentRole: boolean
}

interface Education {
 institution: string
 degree: string
 startDate: Date
 endDate: Date | null
 description?: string
}

export default function ResumeSection() {
 const [experiences, setExperiences] = useState<Experience[]>([])
 const [education, setEducation] = useState<Education[]>([])
 const [skills, setSkills] = useState<string[]>([])

 const [newExperience, setNewExperience] = useState<Partial<Experience>>({
   isCurrentRole: false
 })
 const [newEducation, setNewEducation] = useState<Partial<Education>>({})
 const [newSkill, setNewSkill] = useState("")

 const addExperience = (e: React.FormEvent) => {
   e.preventDefault()
   if (newExperience.company && newExperience.position && newExperience.startDate) {
     setExperiences([...experiences, newExperience as Experience])
     setNewExperience({ isCurrentRole: false })
   }
 }

 const addEducation = (e: React.FormEvent) => {
   e.preventDefault()
   if (newEducation.institution && newEducation.degree && newEducation.startDate) {
     setEducation([...education, newEducation as Education])
     setNewEducation({})
   }
 }

 const addSkill = () => {
   if (newSkill && !skills.includes(newSkill)) {
     setSkills([...skills, newSkill])
     setNewSkill("")
   }
 }

 const handleSubmit = async () => {
   try {
     const response = await fetch('/api/profile/resume', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ experiences, education, skills })
     })

     if (response.ok) {
       console.log('Resume updated successfully')
     } else {
       console.error('Failed to update resume')
     }
   } catch (error) {
     console.error('Submission error', error)
   }
 }

 return (
   <Card>
     <CardHeader>
       <CardTitle>Professional Resume</CardTitle>
     </CardHeader>
     <CardContent className="space-y-6">
       {/* Work Experience Section */}
       <section>
         <h2 className="text-lg font-semibold mb-4 flex items-center">
           <Briefcase className="mr-2" /> Work Experience
         </h2>
         <form onSubmit={addExperience} className="space-y-3">
           <div className="grid grid-cols-2 gap-2">
             <Input
               value={newExperience.company || ""}
               onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
               placeholder="Company Name"
             />
             <Input
               value={newExperience.position || ""}
               onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
               placeholder="Job Title"
             />
           </div>
           <div className="grid grid-cols-3 gap-2">
             <Input
               type="date"
               value={newExperience.startDate ? format(newExperience.startDate, 'yyyy-MM-dd') : ""}
               onChange={(e) => setNewExperience(prev => ({ 
                 ...prev, 
                 startDate: new Date(e.target.value) 
               }))}
             />
             {!newExperience.isCurrentRole && (
               <Input
                 type="date"
                 value={newExperience.endDate ? format(newExperience.endDate, 'yyyy-MM-dd') : ""}
                 onChange={(e) => setNewExperience(prev => ({ 
                   ...prev, 
                   endDate: new Date(e.target.value) 
                 }))}
               />
             )}
             <div className="flex items-center">
               <input
                 type="checkbox"
                 checked={newExperience.isCurrentRole}
                 onChange={(e) => setNewExperience(prev => ({ 
                   ...prev, 
                   isCurrentRole: e.target.checked,
                   endDate: null 
                 }))}
                 className="mr-2"
               />
               <Label>Current Role</Label>
             </div>
           </div>
           <Textarea
             value={newExperience.description || ""}
             onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
             placeholder="Job Description"
           />
           <Button type="submit" variant="outline" className="w-full">
             <Plus className="mr-2" /> Add Experience
           </Button>
         </form>
       </section>

       {/* Education Section */}
       <section>
         <h2 className="text-lg font-semibold mb-4 flex items-center">
           <Calendar className="mr-2" /> Education
         </h2>
         <form onSubmit={addEducation} className="space-y-3">
           <div className="grid grid-cols-2 gap-2">
             <Input
               value={newEducation.institution || ""}
               onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
               placeholder="Institution Name"
             />
             <Input
               value={newEducation.degree || ""}
               onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
               placeholder="Degree"
             />
           </div>
           <div className="grid grid-cols-2 gap-2">
             <Input
               type="date"
               value={newEducation.startDate ? format(newEducation.startDate, 'yyyy-MM-dd') : ""}
               onChange={(e) => setNewEducation(prev => ({ 
                 ...prev, 
                 startDate: new Date(e.target.value) 
               }))}
             />
             <Input
               type="date"
               value={newEducation.endDate ? format(newEducation.endDate, 'yyyy-MM-dd') : ""}
               onChange={(e) => setNewEducation(prev => ({ 
                 ...prev, 
                 endDate: new Date(e.target.value) 
               }))}
             />
           </div>
           <Button type="submit" variant="outline" className="w-full">
             <Plus className="mr-2" /> Add Education
           </Button>
         </form>
       </section>

       {/* Skills Section */}
       <section>
         <h2 className="text-lg font-semibold mb-4">Professional Skills</h2>
         <div className="flex gap-2 mb-4">
           <Input
             value={newSkill}
             onChange={(e) => setNewSkill(e.target.value)}
             placeholder="Add a skill"
             onKeyDown={(e) => e.key === 'Enter' && addSkill()}
           />
           <Button onClick={addSkill} variant="outline">
             <Plus className="mr-2" /> Add
           </Button>
         </div>
         <div className="flex flex-wrap gap-2">
           {skills.map((skill, index) => (
             <div 
               key={index} 
               className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center"
             >
               {skill}
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className="ml-2 h-5 w-5"
                 onClick={() => setSkills(skills.filter(s => s !== skill))}
               >
                 <X className="h-4 w-4" />
               </Button>
             </div>
           ))}
         </div>
       </section>

       {(experiences.length > 0 || education.length > 0 || skills.length > 0) && (
         <Button onClick={handleSubmit} className="w-full mt-4">
           Save Resume
         </Button>
       )}
     </CardContent>
   </Card>
 )
}