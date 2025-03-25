"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { Calendar, Edit, Plus, Trash2, Trophy } from "lucide-react"
import { format } from "date-fns"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import Layout from "@/components/layout" 
import { toast } from "@/hooks/use-toast"

interface AwardType {
  id: string
  title: string
  issuer: string
  date: string
  description?: string
  url?: string
  image?: string
}

export default function AwardsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [awards, setAwards] = useState<AwardType[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingAward, setEditingAward] = useState<AwardType | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
    url: "",
    image: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    } else if (status === "authenticated") {
      fetchAwards()
    }
  }, [status, router])

  const fetchAwards = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/awards")
      if (!response.ok) throw new Error("Failed to fetch awards")
      const data = await response.json()
      setAwards(data)
    } catch (error) {
      console.error("Error fetching awards:", error)
      toast({
        title: "Error",
        description: "Failed to load awards",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingAward ? `/api/awards/${editingAward.id}` : "/api/awards"
      const method = editingAward ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save award")

      toast({
        title: "Success",
        description: `Award ${editingAward ? "updated" : "created"} successfully`,
      })

      setOpen(false)
      resetForm()
      fetchAwards()
    } catch (error) {
      console.error("Error saving award:", error)
      toast({
        title: "Error",
        description: `Failed to ${editingAward ? "update" : "create"} award`,
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this award?")) return

    try {
      const response = await fetch(`/api/awards/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete award")

      toast({
        title: "Success",
        description: "Award deleted successfully",
      })

      fetchAwards()
    } catch (error) {
      console.error("Error deleting award:", error)
      toast({
        title: "Error",
        description: "Failed to delete award",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (award: AwardType) => {
    setEditingAward(award)
    setFormData({
      title: award.title,
      issuer: award.issuer,
      date: award.date.split("T")[0], 
      description: award.description || "",
      url: award.url || "",
      image: award.image || "",
    })
    setOpen(true)
  }

  const resetForm = () => {
    setEditingAward(null)
    setFormData({
      title: "",
      issuer: "",
      date: "",
      description: "",
      url: "",
      image: "",
    })
  }

  if (status === "loading" || loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Awards & Achievements | Your Portfolio</title>
      </Head>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Awards & Achievements</h1>
            <p className="text-muted-foreground">Manage your awards and achievements</p>
          </div>
          <Dialog
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen)
              if (!isOpen) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Award
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingAward ? "Edit Award" : "Add New Award"}</DialogTitle>
                <DialogDescription>
                  {editingAward ? "Update your award details below" : "Enter the details of your award or achievement"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Award or achievement title"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issuer">Issuer *</Label>
                    <Input
                      id="issuer"
                      name="issuer"
                      value={formData.issuer}
                      onChange={handleInputChange}
                      placeholder="Organization that issued the award"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date Received *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Brief description of the award"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="Link to award details or certificate"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="URL to award image or badge"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingAward ? "Update" : "Save"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {awards.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No awards yet</h3>
            <p className="mt-1 text-muted-foreground">Add your achievements to showcase your accomplishments</p>
            <Button variant="outline" className="mt-4" onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add your first award
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {awards.map((award) => (
              <Card key={award.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2">{award.title}</CardTitle>
                      <CardDescription>{award.issuer}</CardDescription>
                    </div>
                    {award.image && (
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={award.image || "/placeholder.svg"}
                          alt={award.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-1 h-4 w-4" />
                    {format(new Date(award.date), "MMMM yyyy")}
                  </div>
                  {award.description && <p className="text-sm line-clamp-3">{award.description}</p>}
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(award)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(award.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

// @ts-ignore
export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

