import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { skills } = req.query; 

      let users;
      if (skills) {
        const skillList = skills.split(','); 
        users = await prisma.user.findMany({
          where: {
            skills: {
              some: {
                name: {
                  in: skillList, 
                },
              },
            },
          },
          include: {
            profile: true, 
            skills: true, 
          },
        });
      } else {
        users = await prisma.user.findMany({
          include: {
            profile: true,
            skills: true,
          },
        });
      }

      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
