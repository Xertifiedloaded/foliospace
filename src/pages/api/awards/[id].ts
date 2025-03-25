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
    return res.status(400).json({ error: "Invalid award ID" })
  }

  // GET request - fetch a single award
  if (req.method === "GET") {
    try {
      const award = await prisma.award.findUnique({
        where: {
          id,
        },
      })

      if (!award) {
        return res.status(404).json({ error: "Award not found" })
      }

      if (award.userId !== session.user.id) {
        return res.status(403).json({ error: "Unauthorized" })
      }

      return res.status(200).json(award)
    } catch (error) {
      console.error("Error fetching award:", error)
      return res.status(500).json({ error: "Failed to fetch award" })
    }
  }

  // PUT request - update an award
  if (req.method === "PUT") {
    try {
      const data = req.body

      // Check if award exists and belongs to user
      const existingAward = await prisma.award.findUnique({
        where: {
          id,
        },
      })

      if (!existingAward) {
        return res.status(404).json({ error: "Award not found" })
      }

      if (existingAward.userId !== session.user.id) {
        return res.status(403).json({ error: "Unauthorized" })
      }

      // Update award
      const award = await prisma.award.update({
        where: {
          id,
        },
        data: {
          ...data,
          date: data.date ? new Date(data.date) : undefined,
        },
      })

      return res.status(200).json(award)
    } catch (error) {
      console.error("Error updating award:", error)
      return res.status(500).json({ error: "Failed to update award" })
    }
  }

  // DELETE request - delete an award
  if (req.method === "DELETE") {
    try {
      // Check if award exists and belongs to user
      const existingAward = await prisma.award.findUnique({
        where: {
          id,
        },
      })

      if (!existingAward) {
        return res.status(404).json({ error: "Award not found" })
      }

      if (existingAward.userId !== session.user.id) {
        return res.status(403).json({ error: "Unauthorized" })
      }

      // Delete award
      await prisma.award.delete({
        where: {
          id,
        },
      })

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error("Error deleting award:", error)
      return res.status(500).json({ error: "Failed to delete award" })
    }
  }

  // Return 405 for other methods
  return res.status(405).json({ error: "Method not allowed" })
}

