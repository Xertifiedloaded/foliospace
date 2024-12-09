"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import SkillsSection from "@/components/ProfileSkillsData"

interface ProfileData {
  nickname: string
  fullName: string
  email: string
  bio: string
  location: string
  profileImage: File | null
}

export default function Details() {
  const [formData, setFormData] = useState<ProfileData>({
    nickname: "",
    fullName: "",
    email: "",
    bio: "",
    location: "",
    profileImage: null
  })

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
        formDataToSend.append(key, value)
      }
    })

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
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
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
              <small className="text-muted-foreground">
                Your URL will look like: https://folll.io/{formData.nickname}
              </small>
            </div>

            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                id="profileImage"
                name="profileImage"
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
      <SkillsSection/>
    </section>
</div>
  )
}