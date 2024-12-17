import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from '../../../../lib/NextOption';


const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const userId = session.userId;
  const { type } = req.query; 

  if (!type || (type !== 'skill' && type !== 'stack')) {
    return res.status(400).json({ error: 'Invalid type. Must be "skill" or "stack"' });
  }

  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      try {
        const model = type === 'skill' ? 'skill' : 'stack';
        const result = await prisma[model].findUnique({
          where: { id },
        });

        if (!result || result.userId !== userId) {
          return res.status(404).json({ error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found or unauthorized` });
        }

        res.status(200).json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error fetching ${type}` });
      }
    } else {
      // Get all records for the user
      try {
        const model = type === 'skill' ? 'skill' : 'stack';
        const results = await prisma[model].findMany({
          where: { userId },
        });
        res.status(200).json(results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error fetching ${type}s` });
      }
    }
  } else if (req.method === 'POST') {
    const { name, level } = req.body;

    try {
      const model = type === 'skill' ? 'skill' : 'stack';
      const newRecord = await prisma[model].create({
        data: {
          name,
          level: type === 'skill' ? level : undefined, // Add level only for skills
          userId,
        },
      });
      res.status(201).json(newRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error creating ${type}` });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const model = type === 'skill' ? 'skill' : 'stack';
      const record = await prisma[model].findUnique({
        where: { id },
      });

      if (!record || record.userId !== userId) {
        return res.status(404).json({ error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found or unauthorized` });
      }

      const deletedRecord = await prisma[model].delete({
        where: { id },
      });

      res.status(200).json(deletedRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error deleting ${type}` });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
