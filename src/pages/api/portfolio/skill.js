import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth'; 
import { authOptions } from '../../../../lib/NextOption';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions); 

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const skills = await prisma.skill.findMany({
        where: { userId: session.user.id },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
            },
          },
        },
      });

      return res.status(200).json(skills);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch skills' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, level } = req.body;

      const validLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

      if (!name || !level) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      if (!validLevels.includes(level)) {
        return res.status(400).json({ message: 'Invalid skill level' });
      }

      const newSkill = await prisma.skill.create({
        data: {
          name,
          level,  
          userId: session.user.id,
        },
      });

      return res.status(201).json(newSkill);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to add skill' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'Skill ID is required' });
      }

      const skill = await prisma.skill.findUnique({
        where: { id },
      });

      if (!skill || skill.userId !== session.user.id) {
        return res.status(404).json({ message: 'Skill not found or not authorized to delete' });
      }

      await prisma.skill.delete({
        where: { id },
      });

      return res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to delete skill' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
