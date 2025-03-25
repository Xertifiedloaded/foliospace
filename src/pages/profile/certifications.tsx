"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { Calendar, Edit, ExternalLink, Plus, Trash2, FileCheck } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import Layout from "@/components/layout" // Import Layout from your components folder

interface CertificationType {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string | null
  credentialId?: string | null
  url?: string | null
  image?: string | null
}

export default function CertificationsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [certifications, setCertifications] = useState<CertificationType[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingCertification, setEditingCertification] = useState<CertificationType | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    url: "",
    image: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    } else if (status === "authenticated") {
      fetchCertifications()
    }
  }, [status, router])

  const fetchCertifications = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/certifications/certification")
      if (!response.ok) throw new Error("Failed to fetch certifications")
      const data = await response.json()
      setCertifications(data)
    } catch (error) {
      console.error("Error fetching certifications:", error)
      toast({
        title: "Error",
        description: "Failed to load certifications",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingCertification ? `/api/certification/${editingCertification.id}` : "/api/certifications"
      const method = editingCertification ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save certification")

      toast({
        title: "Success",
        description: `Certification ${editingCertification ? "updated" : "created"} successfully`,
      })

      setOpen(false)
      resetForm()
      fetchCertifications()
    } catch (error) {
      console.error("Error saving certification:", error)
      toast({
        title: "Error",
        description: `Failed to ${editingCertification ? "update" : "create"} certification`,
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return

    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete certification")

      toast({
        title: "Success",
        description: "Certification deleted successfully",
      })

      fetchCertifications()
    } catch (error) {
      console.error("Error deleting certification:", error)
      toast({
        title: "Error",
        description: "Failed to delete certification",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (certification: CertificationType) => {
    setEditingCertification(certification)
    setFormData({
      title: certification.title,
      issuer: certification.issuer,
      issueDate: certification.issueDate.split("T")[0], // Format date for input
      expiryDate: certification.expiryDate ? certification.expiryDate.split("T")[0] : "",
      credentialId: certification.credentialId || "",
      url: certification.url || "",
      image: certification.image || "",
    })
    setOpen(true)
  }

  const resetForm = () => {
    setEditingCertification(null)
    setFormData({
      title: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      url: "",
      image: "",
    })
  }

  const isExpired = (expiryDate: string | null | undefined) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
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
        <title>Certifications | Your Portfolio</title>
      </Head>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Certifications</h1>
            <p className="text-muted-foreground">Manage your professional certifications</p>
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
                Add Certification
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCertification ? "Edit Certification" : "Add New Certification"}</DialogTitle>
                <DialogDescription>
                  {editingCertification
                    ? "Update your certification details below"
                    : "Enter the details of your professional certification"}
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
                      placeholder="Certification title"
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
                      placeholder="Organization that issued the certification"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issueDate">Issue Date *</Label>
                    <Input
                      id="issueDate"
                      name="issueDate"
                      type="date"
                      value={formData.issueDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="credentialId">Credential ID</Label>
                    <Input
                      id="credentialId"
                      name="credentialId"
                      value={formData.credentialId}
                      onChange={handleInputChange}
                      placeholder="Unique credential identifier"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="Link to verify the certification"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="URL to certification image or badge"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingCertification ? "Update" : "Save"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-12">
            <FileCheck className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No certifications yet</h3>
            <p className="mt-1 text-muted-foreground">Add your professional certifications to showcase your skills</p>
            <Button variant="outline" className="mt-4" onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add your first certification
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certification) => (
              <Card key={certification.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2">{certification.title}</CardTitle>
                      <CardDescription>{certification.issuer}</CardDescription>
                    </div>
                    {certification.image && (
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={certification.image || "/placeholder.svg"}
                          alt={certification.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-1 h-4 w-4" />
                    {format(new Date(certification.issueDate), "MMMM yyyy")}
                    {certification.expiryDate && (
                      <span className="ml-2">- {format(new Date(certification.expiryDate), "MMMM yyyy")}</span>
                    )}
                  </div>

                  {certification.credentialId && (
                    <div className="text-sm mb-2">
                      <span className="font-medium">Credential ID:</span> {certification.credentialId}
                    </div>
                  )}

                  {certification.expiryDate && (
                    <Badge variant={isExpired(certification.expiryDate) ? "destructive" : "outline"} className="mb-2">
                      {isExpired(certification.expiryDate) ? "Expired" : "Active"}
                    </Badge>
                  )}

                  {certification.url && (
                    <a
                      href={certification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center mt-2"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Verify certification
                    </a>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(certification)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(certification.id)}
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

