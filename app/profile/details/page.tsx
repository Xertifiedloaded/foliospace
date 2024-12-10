"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import SkillsSection from "@/components/ProfileSkillsData"
import { useAuth } from "@/hooks/use-auth"

interface ProfileData {
  userId: string
  tagline: string
  bio: string
  hobbies: string
  languages: string
  picture: File | null
}

export default function Details() {
  const { user } = useAuth()
  const [formData, setFormData] = useState<ProfileData>({
    userId: "", 
    tagline: "",
    bio: "",
    hobbies: "",
    languages: "",
    picture: null
  })

  useEffect(() => {
    if (user?.id) {
      setFormData(prev => ({ ...prev, userId: user?.id }))
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    Object.keys(formData).forEach(key => {
      const value = formData[key as keyof ProfileData]
      if (value !== null) {
        formDataToSend.append(key, value as string | Blob)
      }
    })

    try {
      const response = await fetch('/api/portfolio/details', {
        method: 'PATCH',
        body: formDataToSend
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Profile updated:', result)
      } else {
        console.error('Submission failed')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Enter your tagline"
                  required
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                />
              </div>

              <div>
                <Label htmlFor="hobbies">Hobbies</Label>
                <Input
                  id="hobbies"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  placeholder="Enter your hobbies"
                />
              </div>

              <div>
                <Label htmlFor="languages">Languages</Label>
                <Input
                  id="languages"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  placeholder="Enter the languages you speak"
                />
              </div>

              <div>
                <Label htmlFor="picture">Profile Image</Label>
                <Input
                  id="picture"
                  name="picture"
                  type="file"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>

              <Button type="submit" className="w-full">
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <section>
        <SkillsSection />
      </section>
    </div>
  )
}
