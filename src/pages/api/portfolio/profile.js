import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const { userId, picture, tagline, bio, hobbies, languages } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "UserId is required" });
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
        where: { userId },
        update: {
          picture: pictureData,
          tagline,
          bio,
          hobbies,
          languages,
        },
        create: {
          userId,
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
  } else if (req.method === "GET") {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: "UserId is required" });
      }

      const profile = await prisma.profile.findUnique({
        where: { userId },
      });

      const defaultProfile = {
        userId,
        picture: null,
        tagline: null,
        bio: null,
        hobbies: [],
        languages: [],
      };

      const responseProfile = profile || defaultProfile;

      return res.status(200).json(responseProfile);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
