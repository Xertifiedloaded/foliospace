import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  // GET request - fetch all awards
  if (req.method === "GET") {
    try {
      const awards = await prisma.award.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          date: "desc",
        },
      })

      return res.status(200).json(awards)
    } catch (error) {
      console.error("Error fetching awards:", error)
      return res.status(500).json({ error: "Failed to fetch awards" })
    }
  }

  // POST request - create a new award
  if (req.method === "POST") {
    try {
      const data = req.body

      // Validate required fields
      if (!data.title || !data.issuer || !data.date) {
        return res.status(400).json({ error: "Missing required fields" })
      }

      const award = await prisma.award.create({
        data: {
          ...data,
          date: new Date(data.date),
          userId: session.user.id,
        },
      })

      return res.status(201).json(award)
    } catch (error) {
      console.error("Error creating award:", error)
      return res.status(500).json({ error: "Failed to create award" })
    }
  }

  // Return 405 for other methods
  return res.status(405).json({ error: "Method not allowed" })
}

