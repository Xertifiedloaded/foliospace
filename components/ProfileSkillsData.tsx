"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus } from "lucide-react"

interface ProfileSkillsData {
 skills: string[]
 stacks: string[]
 hobbies: string[]
 languages: string[]
}

export default function SkillsSection() {
 const [formData, setFormData] = useState<ProfileSkillsData>({
   skills: [],
   stacks: [],
   hobbies: [],
   languages: []
 })

 const addItem = (key: keyof ProfileSkillsData, newItem: string) => {
   if (newItem.trim() && !formData[key].includes(newItem.trim())) {
     setFormData(prev => ({
       ...prev,
       [key]: [...prev[key], newItem.trim()]
     }))
   }
 }

 const removeItem = (key: keyof ProfileSkillsData, itemToRemove: string) => {
   setFormData(prev => ({
     ...prev,
     [key]: prev[key].filter(item => item !== itemToRemove)
   }))
 }

 const renderDynamicSection = (
   key: keyof ProfileSkillsData, 
   placeholder: string
 ) => {
   const [currentInput, setCurrentInput] = useState("")

   return (
     <div>
       <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
       <div className="flex gap-2 mb-2">
         <Input
           value={currentInput}
           onChange={(e) => setCurrentInput(e.target.value)}
           placeholder={placeholder}
           onKeyDown={(e) => {
             if (e.key === 'Enter') {
               e.preventDefault()
               addItem(key, currentInput)
               setCurrentInput("")
             }
           }}
         />
         <Button 
           type="button" 
           variant="outline" 
           size="icon"
           onClick={() => {
             addItem(key, currentInput)
             setCurrentInput("")
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
   )
 }

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
   try {
     const response = await fetch('/api/profile/skills', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(formData)
     })

     if (response.ok) {
       console.log('Profile skills updated')
     } else {
       console.error('Update failed')
     }
   } catch (error) {
     console.error('Submission error', error)
   }
 }

 return (
   <Card>
     <CardHeader>
       <CardTitle>Skills & Interests</CardTitle>
     </CardHeader>
     <CardContent>
       <form onSubmit={handleSubmit} className="space-y-4">
         {renderDynamicSection('skills', 'Add a skill')}
         {renderDynamicSection('stacks', 'Add a tech stack')}
         {renderDynamicSection('hobbies', 'Add a hobby')}
         {renderDynamicSection('languages', 'Add a language')}
         
         <Button type="submit" className="w-full mt-4">
           Save Skills & Interests
         </Button>
       </form>
     </CardContent>
   </Card>
 )
}