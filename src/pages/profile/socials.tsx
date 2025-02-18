"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, ExternalLink } from "lucide-react"
import ProfileLayout from "@/components/layout"
import { IPhoneFrame } from "@/components/Preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"


interface SocialMediaData {
  id: string
  name: string
  link: string
  isVisible: boolean
}

export default function SocialMediaSection() {
  const [socials, setSocials] = useState<SocialMediaData[]>([])
  const { data: session, status } = useSession()
  const [newSocial, setNewSocial] = useState<Omit<SocialMediaData, "isVisible" | "id">>({
    name: "",
    link: "",
  })
  const [loading, setLoading] = useState<boolean>(false)

  const userId = session?.user?.id

  useEffect(() => {
    const fetchSocials = async () => {
      if (!userId) return
      setLoading(true)
      try {
        const response = await fetch(`/api/portfolio/socials?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setSocials(data.socials || [])
        } else {
          throw new Error("Failed to fetch social media links.")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load social media links. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchSocials()
    }
  }, [status, userId])

  const addSocial = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSocial.name.trim() || !newSocial.link.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please complete all fields with valid data.",
        variant: "destructive",
      })
      return
    }

    const formattedSocial: Omit<SocialMediaData, "id"> = {
      ...newSocial,
      isVisible: true,
      link: newSocial.link.startsWith("http") ? newSocial.link : `https://${newSocial.link}`,
    }

    setLoading(true)
    try {
      const res = await fetch("/api/portfolio/socials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...formattedSocial }),
      })
      const data = await res.json()
      if (data.success) {
        setSocials((prev) => [...prev, { id: data.id, ...formattedSocial }])
        setNewSocial({ name: "", link: "" })
        toast({
          title: "Success",
          description: "Social media link added successfully.",
        })
      } else {
        throw new Error("Failed to add social media link.")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add social media link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const removeSocial = async (id: string) => {
    if (!userId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/portfolio/socials?id=${id}&userId=${userId}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        setSocials((prev) => prev.filter((social) => social.id !== id))
        toast({
          title: "Success",
          description: "Social media link removed successfully.",
        })
      } else {
        throw new Error("Failed to remove social media link.")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove social media link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleVisibility = async (id: string) => {
    const social = socials.find((item) => item.id === id)
    if (!social || !userId) return

    setLoading(true)
    try {
      const res = await fetch(`/api/portfolio/socials`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: social.name,
          link: social.link,
          isVisible: !social.isVisible,
          userId: userId,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSocials((prev) => prev.map((item) => (item.id === id ? { ...item, isVisible: !item.isVisible } : item)))
        toast({
          title: "Success",
          description: `Social media link visibility ${!social.isVisible ? "enabled" : "disabled"}.`,
        })
      } else {
        throw new Error("Failed to update visibility.")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProfileLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Manage Social Media Links</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Social Link</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={addSocial} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Platform Name</Label>
                    <Input
                      id="name"
                      value={newSocial.name}
                      onChange={(e) => setNewSocial((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Twitter, LinkedIn"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link">Profile Link</Label>
                    <Input
                      id="link"
                      value={newSocial.link}
                      onChange={(e) => setNewSocial((prev) => ({ ...prev, link: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <Button  variant='default' type="submit" className="w-full" disabled={loading}>
                    {loading ? "Adding..." : "Add Social Link"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Social Links</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 bg-gray-200 animate-pulse rounded" />
                    ))}
                  </div>
                ) : socials.length === 0 ? (
                  <p className="text-center text-muted-foreground">No social links added yet</p>
                ) : (
                  <ul className="space-y-2">
                    {socials.map((social) => (
                      <li key={social.id} className="flex items-center justify-between p-2 bg-accent rounded">
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{social.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={social.isVisible}
                            onCheckedChange={() => toggleVisibility(social.id)}
                            disabled={loading}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSocial(social.id)}
                            disabled={loading}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-4">
              <IPhoneFrame>
                      <div className="p-4 space-y-4">
                        <h2 className="text-xl font-bold">My Social Links</h2>
                        {socials
                          .filter((s) => s.isVisible)
                          .map((social) => (
                            <a
                              key={social.id}
                              href={social.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-2 bg-accent rounded hover:bg-accent/80 transition-colors"
                            >
                              {social.name}
                            </a>
                          ))}
                      </div>
                    </IPhoneFrame>
              </TabsContent>
              <TabsContent value="code" className="mt-4">
              <pre className="p-4 bg-accent rounded-md overflow-x-auto">
                      <code>{`
// Example code to display social links
function SocialLinks({ links }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">My Social Links</h2>
      {links.map((social) => (
        <a
          key={social.id}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-2 bg-accent rounded hover:bg-accent/80 transition-colors"
        >
          {social.name}
        </a>
      ))}
    </div>
  );
}
                      `}</code>
                    </pre>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProfileLayout>
  )
}

