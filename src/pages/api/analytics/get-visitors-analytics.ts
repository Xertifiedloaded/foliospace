import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const logs = await prisma.visitLog.findMany({
        orderBy: { timestamp: 'desc' },
        take: 100 
      })
      return res.status(200).json(logs)
    } catch (error) {
      console.error('Error fetching visit logs:', error)
      return res.status(500).json({ error: 'Failed to fetch visit logs' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

