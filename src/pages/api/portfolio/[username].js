import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { username } = req.query;

    try {
      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          profile: true,
          socials: true,
          links: true,
          experiences: { 
            orderBy: { startDate: 'desc' } 
          },
          projects: true,
          education: { 
            orderBy: { startDate: 'desc' } 
          },
          skills: true, 
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { password, ...safeUserData } = user;
      const sanitizedUserData = {
        ...safeUserData,
        template: user.template || "BASIC",
        profile: user.profile || null,
        projects: user.projects || [],
        socials: user.socials || [],
        links: user.links || [],
        experiences: user.experiences || [],
        education: user.education || [],
        skills: user.skills || [], 
      };

      return res.status(200).json(sanitizedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}



