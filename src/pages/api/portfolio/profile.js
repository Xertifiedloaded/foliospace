import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/NextOption";
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb', // Set size limit to 20mb for the image upload
    },
  },
};

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Get session from NextAuth
    const session = await getServerSession(req, res, authOptions);

    // Check if the session exists and user is authenticated
    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userIdFromSession = session.user.id;
    if (req.method === "PATCH") {
      const { tagline, bio, hobbies, languages, picture, phoneNumber, address } = req.body;

      let imageUrl = null;
      if (picture) {
        try {
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

          const format = await sharp(buffer).metadata().then(metadata => metadata.format);

          await sharp(buffer)
            .resize(800)  // Resize image to 800px width (optional, adjust as needed)
            .toFormat(format, { quality: 70 })  // Maintain the format and compress with 80% quality
            .toFile(path.join(uploadDir, originalName));  // Save to file

          imageUrl = `/pictures/${originalName}`;
        } catch (uploadError) {
          console.error("Image upload error:", uploadError.message);
          return res.status(400).json({
            error: "Image upload failed",
            details: uploadError.message,
          });
        }
      }

      // Update or create the profile in the database
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
    }

    else if (req.method === "GET") {
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
