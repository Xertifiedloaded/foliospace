"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus } from "lucide-react"
import { 
 FaTwitter, FaLinkedin, FaGithub, FaInstagram, 
 FaFacebook, FaDribbble, FaBehance 
} from "react-icons/fa"

interface SocialMediaData {
 platform: string
 username: string
 link: string
 isVisible: boolean
}

const socialPlatforms = [
 { name: 'Twitter', icon: FaTwitter },
 { name: 'LinkedIn', icon: FaLinkedin },
 { name: 'GitHub', icon: FaGithub },
 { name: 'Instagram', icon: FaInstagram },
 { name: 'Facebook', icon: FaFacebook },
 { name: 'Dribbble', icon: FaDribbble },
 { name: 'Behance', icon: FaBehance }
]

export default function SocialMediaSection() {
 const [socials, setSocials] = useState<SocialMediaData[]>([])
 const [newSocial, setNewSocial] = useState<Omit<SocialMediaData, 'isVisible'>>({
   platform: '',
   username: '',
   link: ''
 })

 const addSocial = (e: React.FormEvent) => {
   e.preventDefault()
   if (newSocial.platform && newSocial.link) {
     const formattedSocial = {
       ...newSocial,
       isVisible: true,
       link: newSocial.link.startsWith('http') 
         ? newSocial.link 
         : `https://${newSocial.platform.toLowerCase()}.com/${newSocial.username}`
     }
     setSocials([...socials, formattedSocial])
     setNewSocial({ platform: '', username: '', link: '' })
   }
 }

 const removeSocial = (socialToRemove: SocialMediaData) => {
   setSocials(socials.filter(social => social !== socialToRemove))
 }

 const toggleVisibility = (social: SocialMediaData) => {
   setSocials(socials.map(s => 
     s === social ? { ...s, isVisible: !s.isVisible } : s
   ))
 }

 const handleSubmit = async () => {
   try {
     const response = await fetch('/api/profile/socials', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(socials)
     })

     if (response.ok) {
       console.log('Social media links updated')
     } else {
       console.error('Failed to update socials')
     }
   } catch (error) {
     console.error('Submission error', error)
   }
 }

 return (
   <Card>
     <CardHeader>
       <CardTitle>Social Media</CardTitle>
     </CardHeader>
     <CardContent>
       <form onSubmit={addSocial} className="space-y-4">
         <div className="grid grid-cols-3 gap-2">
           <div>
             <Label>Platform</Label>
             <select
               value={newSocial.platform}
               onChange={(e) => setNewSocial(prev => ({ 
                 ...prev, 
                 platform: e.target.value 
               }))}
               className="w-full p-2 border rounded"
             >
               <option value="">Select Platform</option>
               {socialPlatforms.map(platform => (
                 <option key={platform.name} value={platform.name}>
                   {platform.name}
                 </option>
               ))}
             </select>
           </div>
           <div>
             <Label>Username</Label>
             <Input 
               value={newSocial.username}
               onChange={(e) => setNewSocial(prev => ({ 
                 ...prev, 
                 username: e.target.value 
               }))}
               placeholder="Enter username"
             />
           </div>
           <div>
             <Label>Profile Link</Label>
             <Input 
               value={newSocial.link}
               onChange={(e) => setNewSocial(prev => ({ 
                 ...prev, 
                 link: e.target.value 
               }))}
               placeholder="Full profile URL"
             />
           </div>
         </div>
         <Button type="submit" variant="outline" className="w-full">
           <Plus className="mr-2 h-4 w-4" /> Add Social Link
         </Button>
       </form>

       {socials.length > 0 && (
         <div className="mt-4 space-y-2">
           <h3 className="text-sm font-medium">Current Social Links</h3>
           {socials.map((social, index) => {
             const PlatformIcon = socialPlatforms.find(p => p.name === social.platform)?.icon

             return (
               <div 
                 key={index} 
                 className="flex justify-between items-center bg-gray-100 p-2 rounded"
               >
                 <div className="flex items-center space-x-2">
                   {PlatformIcon && <PlatformIcon className="h-5 w-5" />}
                   <div>
                     <p className="text-sm font-medium">{social.platform}</p>
                     <a 
                       href={social.link} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-xs text-blue-600 hover:underline"
                     >
                       {social.username}
                     </a>
                   </div>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Button 
                     variant={social.isVisible ? "default" : "outline"}
                     size="sm"
                     onClick={() => toggleVisibility(social)}
                   >
                     {social.isVisible ? "Visible" : "Hidden"}
                   </Button>
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     onClick={() => removeSocial(social)}
                   >
                     <X className="h-4 w-4" />
                   </Button>
                 </div>
               </div>
             )
           })}
         </div>
       )}

       {socials.length > 0 && (
         <Button 
           onClick={handleSubmit} 
           className="w-full mt-4"
         >
           Save Social Links
         </Button>
       )}
     </CardContent>
   </Card>
 )
}