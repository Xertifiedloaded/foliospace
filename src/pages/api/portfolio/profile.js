

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/NextOption";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import formidable from "formidable";
import { readFile, unlink } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

const createRequiredDirectories = async () => {
  const tmpDir = path.join(process.cwd(), 'public', 'uploads', 'tmp')
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads','profile-picture',);
  
  await mkdir(tmpDir, { recursive: true });
  await mkdir(uploadsDir, { recursive: true });
  
  return tmpDir;
};

const parseForm = async (req) => {
  const tmpDir = await createRequiredDirectories();
  
  const form = formidable({
    maxFileSize: 20 * 1024 * 1024,
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
    const username = session.user.name;

    if (req.method === "PATCH") {
      await createRequiredDirectories();
      
      const { fields, files } = await parseForm(req);
      
      let imagePath = null;
      const uploadedFile = files.file && files.file[0];

      if (uploadedFile) {
        try {
          const userUploadDir = path.join(process.cwd(), 'public', 'uploads', 'profile-picture');
          await mkdir(userUploadDir, { recursive: true });

          const fileExtension = path.extname(uploadedFile.originalFilename || uploadedFile.newFilename || '.jpg');
          const fileName = `${username}${fileExtension}`;
          const finalPath = path.join(userUploadDir, fileName);

          const fileData = await readFile(uploadedFile.filepath);
          await writeFile(finalPath, fileData);
          await unlink(uploadedFile.filepath).catch(console.error);
          imagePath = `/uploads/profile-picture/${fileName}`;
        } catch (uploadError) {
          console.error("Error saving file:", uploadError);
          return res.status(400).json({
            error: "File save failed",
            details: uploadError.message,
          });
        }
      }

      // Parse JSON strings from form fields
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
console.log(profile);
    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Handler error:", error.message);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}











// import { PrismaClient } from "@prisma/client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../../../lib/NextOption";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "djknvzync",
//   api_key: "569228811476594",
//   api_secret: "di4UhIUKiZ1QnmpSQLdKU8I9Oko",
// });

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "20mb", 
//     },
//   },
// };

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   try {
//     const session = await getServerSession(req, res, authOptions);

//     if (!session || !session.user) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const userIdFromSession = session.user.id;

//     if (req.method === "PATCH") {
//       const { tagline, bio, hobbies, languages, picture, phoneNumber, address } = req.body;

//       let imageUrl = null;
//       if (picture) {
//         try {
//           const uploadResponse = await cloudinary.uploader.upload_large(picture, {
//             folder: "projects",
//             chunk_size: 6000000, // Split files into chunks of 6MB
//             quality: "auto:eco", // Automatically adjust quality for compression
//             format: "jpg",
//           });
//           imageUrl = uploadResponse.secure_url;
//         } catch (uploadError) {
//           console.error("Error uploading image:", uploadError);
//           return res.status(400).json({
//             error: "Image upload failed",
//             details: uploadError.message,
//           });
//         }
//       }

//       const updatedProfile = await prisma.profile.upsert({
//         where: { userId: userIdFromSession },
//         update: {
//           picture: imageUrl || undefined,
//           tagline,
//           bio,
//           hobbies: hobbies || [],
//           languages: languages || [],
//           phoneNumber: phoneNumber || null,
//           address: address || null,
//         },
//         create: {
//           userId: userIdFromSession,
//           picture: imageUrl,
//           tagline,
//           bio,
//           hobbies: hobbies || [],
//           languages: languages || [],
//           phoneNumber: phoneNumber || null,
//           address: address || null,
//         },
//       });

//       return res.status(200).json({
//         ...updatedProfile,
//         picture: updatedProfile.picture || null,
//       });
//     }

//     if (req.method === "GET") {
//       const { userId } = req.query;

//       if (!userId) {
//         return res.status(400).json({ error: "UserId query parameter is required" });
//       }

//       const profile = await prisma.profile.findUnique({
//         where: { userId },
//       });

//       return res.status(200).json(
//         profile || {
//           userId,
//           picture: null,
//           tagline: null,
//           bio: null,
//           hobbies: [],
//           languages: [],
//           address: null,
//           phoneNumber: null,
//         }
//       );
//     }

//     return res.status(405).json({ message: "Method Not Allowed" });
//   } catch (error) {
//     console.error("Handler error:", error.message);
//     return res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// }
