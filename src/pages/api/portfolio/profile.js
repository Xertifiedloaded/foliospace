import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/NextOption";
import cloudinary from "cloudinary";
import formidable from "formidable";

cloudinary.v2.config({
  cloud_name: 'djknvzync',
  api_key: "569228811476594",
  api_secret: "di4UhIUKiZ1QnmpSQLdKU8I9Oko",
});
export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

const parseForm = async (req) => {
  const form = formidable({
    maxFileSize: 20 * 1024 * 1024,  
    multiples: false,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};




export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userIdFromSession = session.user.id;
    const username = session.user.name;

    if (req.method === "PATCH") {
      const { fields, files } = await parseForm(req);

      let imagePath = null;
      const uploadedFile = files.file && files.file[0];

      if (uploadedFile) {
        try {
          const uploadResponse = await cloudinary.v2.uploader.upload(uploadedFile.filepath, {
            folder: "profile-pictures", 
            public_id: username, 
          });

          imagePath = uploadResponse.secure_url;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          return res.status(400).json({
            error: "File upload failed",
            details: uploadError.message,
          });
        }
      }

      const hobbies = fields.hobbies ? JSON.parse(fields.hobbies[0]) : [];
      const languages = fields.languages ? JSON.parse(fields.languages[0]) : [];

      const updatedProfile = await prisma.profile.upsert({
        where: { userId: userIdFromSession },
        update: {
          picture: imagePath || undefined,
          tagline: fields.tagline?.[0] || null,
          bio: fields.bio?.[0] || null,
          hobbies,
          languages,
          phoneNumber: fields.phoneNumber?.[0] || null,
          address: fields.address?.[0] || null,
        },
        create: {
          userId: userIdFromSession,
          picture: imagePath,
          tagline: fields.tagline?.[0] || null,
          bio: fields.bio?.[0] || null,
          hobbies,
          languages,
          phoneNumber: fields.phoneNumber?.[0] || null,
          address: fields.address?.[0] || null,
        },
      });

      return res.status(200).json({
        ...updatedProfile,
        picture: updatedProfile.picture || null,
      });
    }

    if (req.method === "GET") {
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
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Handler error:", error.message);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
