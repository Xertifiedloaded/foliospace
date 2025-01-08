import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { portfolioOwner } = req.body
    if (!portfolioOwner) {
      return res.status(400).json({ error: 'Portfolio owner username is required' })
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    try {
      const visit = await prisma.visitLog.create({
        data: {
          portfolioOwner,
          userAgent: req.headers['user-agent'] || 'Unknown',
          ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress || 'Unknown',
        }
      })

      console.log(`Visit logged for ${portfolioOwner}'s portfolio`)
      return res.status(200).json({ message: 'Visit logged successfully', visit })
    } catch (error) {
      console.error('Error logging visit:', error)
      return res.status(500).json({ error: 'Failed to log visit' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

