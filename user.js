const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteAllUsers() {
  try {
    const result = await prisma.user.deleteMany();
    console.log(`${result.count} users deleted`);
  } catch (error) {
    console.error('Error deleting users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllUsers();



















import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/NextOption";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import formidable from "formidable";
import { readFile, unlink } from 'fs/promises';

// Disable the default body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

// Create necessary directories
const createRequiredDirectories = async () => {
  const tmpDir = path.join(process.cwd(), 'tmp');
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  
  await mkdir(tmpDir, { recursive: true });
  await mkdir(uploadsDir, { recursive: true });
  
  return tmpDir;
};

// Helper function to parse form data
const parseForm = async (req) => {
  const tmpDir = await createRequiredDirectories();
  
  const form = formidable({
    maxFileSize: 20 * 1024 * 1024, // 20mb
    uploadDir: tmpDir,
    keepExtensions: true,
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

    if (req.method === "PATCH") {
      // Ensure directories exist
      await createRequiredDirectories();
      
      const { fields, files } = await parseForm(req);
      
      let imagePath = null;
      if (files.file) {
        try {
          // Create user-specific directory
          const userUploadDir = path.join(process.cwd(), 'public', 'uploads', userIdFromSession);
          await mkdir(userUploadDir, { recursive: true });

          // Generate unique filename
          const fileExtension = path.extname(files.file.originalFilename);
          const fileName = `${Date.now()}${fileExtension}`;
          const finalPath = path.join(userUploadDir, fileName);

          // Read the temporary file and write to final destination
          const fileData = await readFile(files.file.filepath);
          await writeFile(finalPath, fileData);
          
          // Clean up temp file
          await unlink(files.file.filepath).catch(console.error);

          // Store relative path in database
          imagePath = `/uploads/${userIdFromSession}/${fileName}`;
        } catch (uploadError) {
          console.error("Error saving file:", uploadError);
          return res.status(400).json({
            error: "File save failed",
            details: uploadError.message,
          });
        }
      }

      // Parse JSON strings from form fields
      const hobbies = fields.hobbies ? JSON.parse(fields.hobbies) : [];
      const languages = fields.languages ? JSON.parse(fields.languages) : [];

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

