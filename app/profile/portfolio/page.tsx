"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Image } from "lucide-react"

interface PortfolioProject {
 title: string
 description: string
 technologies: string[]
 link?: string
 githubLink?: string
 images?: File[]
}

export default function PortfolioSection() {
 const [projects, setProjects] = useState<PortfolioProject[]>([])
 const [newProject, setNewProject] = useState<Partial<PortfolioProject>>({
   technologies: []
 })

 const addProject = (e: React.FormEvent) => {
   e.preventDefault()
   if (newProject.title && newProject.description) {
     setProjects([...projects, newProject as PortfolioProject])
     setNewProject({ technologies: [] })
   }
 }

 const addTechnology = () => {
   const tech = newProject.technologies?.length ? newProject.technologies[newProject.technologies.length - 1] : ""
   if (tech && !newProject.technologies?.includes(tech)) {
     setNewProject(prev => ({
       ...prev,
       technologies: [...(prev.technologies || []), tech]
     }))
   }
 }

 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
   const files = e.target.files
   if (files) {
     setNewProject(prev => ({
       ...prev,
       images: Array.from(files)
     }))
   }
 }

 const handleSubmit = async () => {
   const formData = new FormData()
   projects.forEach((project, index) => {
     formData.append(`project[${index}][title]`, project.title)
     formData.append(`project[${index}][description]`, project.description)
     project.technologies?.forEach((tech, techIndex) => {
       formData.append(`project[${index}][technologies][${techIndex}]`, tech)
     })
     project.images?.forEach((image, imageIndex) => {
       formData.append(`project[${index}][images][${imageIndex}]`, image)
     })
   })

   try {
     const response = await fetch('/api/portfolio/projects', {
       method: 'POST',
       body: formData
     })

     if (response.ok) {
       console.log('Projects saved successfully')
     } else {
       console.error('Failed to save projects')
     }
   } catch (error) {
     console.error('Submission error', error)
   }
 }

 return (
   <Card>
     <CardHeader>
       <CardTitle>Portfolio Projects</CardTitle>
     </CardHeader>
     <CardContent className="space-y-6">
       <form onSubmit={addProject} className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
           <div>
             <Label>Project Title</Label>
             <Input
               value={newProject.title || ""}
               onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
               placeholder="Project Name"
             />
           </div>
           <div>
             <Label>Project Link</Label>
             <Input
               value={newProject.link || ""}
               onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
               placeholder="Live project URL"
             />
           </div>
         </div>

         <div>
           <Label>Project Description</Label>
           <Textarea
             value={newProject.description || ""}
             onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
             placeholder="Describe your project"
             rows={4}
           />
         </div>

         <div>
           <Label>Technologies Used</Label>
           <div className="flex gap-2">
             <Input
               value={newProject.technologies?.[newProject.technologies.length - 1] || ""}
               onChange={(e) => setNewProject(prev => ({
                 ...prev,
                 technologies: prev.technologies 
                   ? [...prev.technologies.slice(0, -1), e.target.value]
                   : [e.target.value]
               }))}
               placeholder="Add technology"
             />
             <Button 
               type="button" 
               variant="outline" 
               onClick={addTechnology}
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
                   onClick={() => setNewProject(prev => ({
                     ...prev,
                     technologies: prev.technologies?.filter(t => t !== tech)
                   }))}
                 >
                   <X className="h-4 w-4" />
                 </Button>
               </div>
             ))}
           </div>
         </div>

         <div>
           <Label>Project Images</Label>
           <Input
             type="file"
             multiple
             accept="image/*"
             onChange={handleImageUpload}
             className="mt-2"
           />
         </div>

         <Button type="submit" variant="outline" className="w-full">
           <Plus className="mr-2" /> Add Project
         </Button>
       </form>

       {projects.length > 0 && (
         <div className="mt-6">
           <h2 className="text-lg font-semibold mb-4">Current Projects</h2>
           {projects.map((project, index) => (
             <Card key={index} className="mb-4">
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
                   <Button 
                     variant="destructive" 
                     size="sm"
                     onClick={() => setProjects(projects.filter((_, i) => i !== index))}
                   >
                     Remove
                   </Button>
                 </div>
               </CardContent>
             </Card>
           ))}

           <Button onClick={handleSubmit} className="w-full mt-4">
             Save Portfolio
           </Button>
         </div>
       )}
     </CardContent>
   </Card>
 )
}