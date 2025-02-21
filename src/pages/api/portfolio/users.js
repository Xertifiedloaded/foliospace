import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const users = await prisma.user.findMany({
      take: 8,
      select: {
        name: true,
        username: true,
        profile: {
          select: {
            tagline: true,
            picture: true,
          },
        },
        skills: {
          select: {
            name: true,
            level: true, 
          },
        },
      },
    });

    const formattedUsers = users.map((user) => ({
      name: user?.name,
      username: user?.username,
      tagline: user?.profile?.tagline || "No tagline available",
      picture: user?.profile?.picture ,
      skills: user?.skills.map((skill) => ({
        name: skill?.name,
        level: skill?.level,
      })) || [], 
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
