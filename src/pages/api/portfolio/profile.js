import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/NextOption";
import { v2 as cloudinary } from "cloudinary";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: "djknvzync",
  api_key: "569228811476594",
  api_secret: "di4UhIUKiZ1QnmpSQLdKU8I9Oko",
});

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
          const uploadResponse = await cloudinary.uploader.upload(picture, {
            folder: "profile-pictures",
            max_allowed_size: 10 * 1024 * 1024, 
          });
          imageUrl = uploadResponse.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError.message);
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
      // Method not allowed
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Handler error:", error.message);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
