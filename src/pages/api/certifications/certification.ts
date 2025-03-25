import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  if (req.method === "GET") {
    try {
      const certifications = await prisma.certification.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          issueDate: "desc",
        },
      })

      return res.status(200).json(certifications)
    } catch (error) {
      console.error("Error fetching certifications:", error)
      return res.status(500).json({ error: "Failed to fetch certifications" })
    }
  }

  // POST request - create a new certification
  if (req.method === "POST") {
    try {
      const data = req.body

      // Validate required fields
      if (!data.title || !data.issuer || !data.issueDate) {
        return res.status(400).json({ error: "Missing required fields" })
      }

      const certification = await prisma.certification.create({
        data: {
          ...data,
          issueDate: new Date(data.issueDate),
          expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
          userId: session.user.id,
        },
      })

      return res.status(201).json(certification)
    } catch (error) {
      console.error("Error creating certification:", error)
      return res.status(500).json({ error: "Failed to create certification" })
    }
  }

  // Return 405 for other methods
  return res.status(405).json({ error: "Method not allowed" })
}

