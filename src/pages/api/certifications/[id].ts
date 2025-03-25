import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const { id } = req.query

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid certification ID" })
  }

  // GET request - fetch a single certification
  if (req.method === "GET") {
    try {
      const certification = await prisma.certification.findUnique({
        where: {
          id,
        },
      })

      if (!certification) {
        return res.status(404).json({ error: "Certification not found" })
      }

      if (certification.userId !== session.user.id) {
        return res.status(403).json({ error: "Unauthorized" })
      }

      return res.status(200).json(certification)
    } catch (error) {
      console.error("Error fetching certification:", error)
      return res.status(500).json({ error: "Failed to fetch certification" })
    }
  }

  // PUT request - update a certification
  if (req.method === "PUT") {
    try {
      const data = req.body

      // Check if certification exists and belongs to user
      const existingCertification = await prisma.certification.findUnique({
        where: {
          id,
        },
      })

      if (!existingCertification) {
        return res.status(404).json({ error: "Certification not found" })
      }

      if (existingCertification.userId !== session.user.id) {
        return res.status(403).json({ error: "Unauthorized" })
      }

      // Update certification
      const certification = await prisma.certification.update({
        where: {
          id,
        },
        data: {
          ...data,
          issueDate: data.issueDate ? new Date(data.issueDate) : undefined,
          expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        },
      })

      return res.status(200).json(certification)
    } catch (error) {
      console.error("Error updating certification:", error)
      return res.status(500).json({ error: "Failed to update certification" })
    }
  }

  // DELETE request - delete a certification
  if (req.method === "DELETE") {
    try {
      // Check if certification exists and belongs to user
      const existingCertification = await prisma.certification.findUnique({
        where: {
          id,
        },
      })

      if (!existingCertification) {
        return res.status(404).json({ error: "Certification not found" })
      }

      if (existingCertification.userId !== session.user.id) {
        return res.status(403).json({ error: "Unauthorized" })
      }

      // Delete certification
      await prisma.certification.delete({
        where: {
          id,
        },
      })

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error("Error deleting certification:", error)
      return res.status(500).json({ error: "Failed to delete certification" })
    }
  }

  // Return 405 for other methods
  return res.status(405).json({ error: "Method not allowed" })
}

