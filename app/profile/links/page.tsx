"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus, Link as LinkIcon } from "lucide-react"

interface LinkData {
 url: string
 title: string
}

export default function LinksSection() {
 const [links, setLinks] = useState<LinkData[]>([])
 const [newLink, setNewLink] = useState<LinkData>({ url: '', title: '' })

 const addLink = (e: React.FormEvent) => {
   e.preventDefault()
   if (newLink.url && newLink.title) {
     const formattedLink = {
       url: newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`,
       title: newLink.title
     }
     setLinks([...links, formattedLink])
     setNewLink({ url: '', title: '' })
   }
 }

 const removeLink = (linkToRemove: LinkData) => {
   setLinks(links.filter(link => link !== linkToRemove))
 }

 const handleSubmit = async () => {
   try {
     const response = await fetch('/api/profile/links', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(links)
     })

     if (response.ok) {
       console.log('Links updated successfully')
     } else {
       console.error('Failed to update links')
     }
   } catch (error) {
     console.error('Submission error', error)
   }
 }

 return (
   <Card>
     <CardHeader>
       <CardTitle>Important Links</CardTitle>
     </CardHeader>
     <CardContent>
       <form onSubmit={addLink} className="space-y-4">
         <div className="grid grid-cols-2 gap-2">
           <div>
             <Label>URL</Label>
             <Input 
               value={newLink.url}
               onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
               placeholder="Enter website URL"
             />
           </div>
           <div>
             <Label>Title</Label>
             <Input 
               value={newLink.title}
               onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
               placeholder="Link title"
             />
           </div>
         </div>
         <Button type="submit" variant="outline" className="w-full">
           <Plus className="mr-2 h-4 w-4" /> Add Link
         </Button>
       </form>

       {links.length > 0 && (
         <div className="mt-4 space-y-2">
           <h3 className="text-sm font-medium">Current Links</h3>
           {links.map((link, index) => (
             <div 
               key={index} 
               className="flex justify-between items-center bg-gray-100 p-2 rounded"
             >
               <div className="flex items-center space-x-2">
                 <LinkIcon className="h-4 w-4 text-gray-500" />
                 <div>
                   <p className="text-sm font-medium">{link.title}</p>
                   <a 
                     href={link.url} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-xs text-blue-600 hover:underline"
                   >
                     {link.url}
                   </a>
                 </div>
               </div>
               <Button 
                 variant="ghost" 
                 size="icon" 
                 onClick={() => removeLink(link)}
               >
                 <X className="h-4 w-4" />
               </Button>
             </div>
           ))}
         </div>
       )}

       {links.length > 0 && (
         <Button 
           onClick={handleSubmit} 
           className="w-full mt-4"
         >
           Save Links
         </Button>
       )}
     </CardContent>
   </Card>
 )
}