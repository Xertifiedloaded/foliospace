
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/NextOption";
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userIdFromSession = session.user.id;

    if (req.method === "PATCH") {
      const { tagline, bio, hobbies, languages, picture, phoneNumber, address } = req.body;

      let imageUrl = null;
      if (picture) {
        try {
          // i Extract file extension and original name
          const matches = picture.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
          if (!matches || matches.length !== 3) {
            return res.status(400).json({ error: "Invalid image format" });
          }

          const fileExtension = matches[1];
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, 'base64');
          
          const originalName = `profile-${Date.now()}.${fileExtension}`;
          const uploadDir = path.join(process.cwd(), 'public', 'pictures');
          
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          
          // Save file
          const filePath = path.join(uploadDir, originalName);
          fs.writeFileSync(filePath, buffer);
          
          imageUrl = `/pictures/${originalName}`;
        } catch (uploadError) {
          console.error("Image upload error:", uploadError.message);
          return res.status(400).json({
            error: "Image upload failed",
            details: uploadError.message,
          });
        }
      }

      const updatedProfile = await prisma.profile.upsert({
        where: { userId: userIdFromSession },
        update: {
          picture: imageUrl || undefined,
          tagline,
          bio,
          hobbies: hobbies || [],
          languages: languages || [],
          phoneNumber: phoneNumber || undefined,
          address: address || undefined,
        },
        create: {
          userId: userIdFromSession,
          picture: imageUrl,
          tagline,
          bio,
          hobbies: hobbies || [],
          languages: languages || [],
          phoneNumber: phoneNumber || null,
          address: address || null,
        },
      });

      return res.status(200).json({
        ...updatedProfile,
        picture: updatedProfile.picture || null,
      });
    } else if (req.method === "GET") {
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
          address: null,
          phoneNumber: null,
        }
      );
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Handler error:", error.message);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}