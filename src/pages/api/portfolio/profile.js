import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/NextOption';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userIdFromSession = session.user.id;

  switch (req.method) {
    case "PATCH":
      try {
        const { picture, tagline, bio, hobbies, languages } = req.body;
        if (hobbies && !Array.isArray(hobbies)) {
          return res.status(400).json({ error: "Hobbies must be an array" });
        }
        if (languages && !Array.isArray(languages)) {
          return res.status(400).json({ error: "Languages must be an array" });
        }

        let pictureData = null;
        if (picture) {
          const base64Data = picture.split(';base64,').pop();
          if (!base64Data) {
            return res.status(400).json({ error: "Invalid base64 image format" });
          }
          pictureData = base64Data;
        }

        const updatedProfile = await prisma.profile.upsert({
          where: { userId: userIdFromSession },
          update: {
            picture: pictureData,
            tagline,
            bio,
            hobbies: hobbies || [],
            languages: languages || [],
          },
          create: {
            userId: userIdFromSession,
            picture: pictureData,
            tagline,
            bio,
            hobbies: hobbies || [],
            languages: languages || [],
          },
        });

        return res.status(200).json(updatedProfile);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "GET":
      try {
        const { userId } = req.query; 

        if (!userId) {
          return res.status(400).json({ error: "UserId query parameter is required" });
        }

        const profile = await prisma.profile.findUnique({
          where: { userId },
        });

        return res.status(200).json(
          profile || {
            userId,
            picture: null,
            tagline: null,
            bio: null,
            hobbies: [],
            languages: [],
          }
        );
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
