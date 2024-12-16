import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/NextOption';
import cloudinary from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';

const prisma = new PrismaClient();

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

const upload = multer({
  storage: multer.memoryStorage(),
});

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
};

async function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });

    const readable = new Readable();
    readable._read = () => {};
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(stream);
  });
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userIdFromSession = session.user.id;

  switch (req.method) {
    case "PATCH":
      await runMiddleware(req, res, upload.single('imageFile'));

      try {
        const { tagline, bio, hobbies, languages } = req.body;
        const imageFile = req.file;

        if (hobbies && !Array.isArray(JSON.parse(hobbies))) {
          return res.status(400).json({ error: "Hobbies must be an array" });
        }
        if (languages && !Array.isArray(JSON.parse(languages))) {
          return res.status(400).json({ error: "Languages must be an array" });
        }

        let imageUrl = null;
        if (imageFile) {
          try {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(imageFile.mimetype)) {
              return res.status(400).json({ message: "Invalid file type. Only images are allowed." });
            }

            imageUrl = await uploadToCloudinary(imageFile.buffer);
          } catch (error) {
            console.error("Image upload failed:", error);
            return res.status(500).json({ message: "Failed to upload image" });
          }
        }

        const updatedProfile = await prisma.profile.upsert({
          where: { userId: userIdFromSession },
          update: {
            picture: imageUrl,
            tagline,
            bio,
            hobbies: hobbies ? JSON.parse(hobbies) : [],
            languages: languages ? JSON.parse(languages) : [],
          },
          create: {
            userId: userIdFromSession,
            picture: imageUrl,
            tagline,
            bio,
            hobbies: hobbies ? JSON.parse(hobbies) : [],
            languages: languages ? JSON.parse(languages) : [],
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
