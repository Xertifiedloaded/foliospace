import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/NextOption";
import formidable from "formidable";
import cloudinary from "cloudinary";

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

const parseForm = async (req) => {
  const form = formidable({
    maxFileSize: 50 * 1024 * 1024, 
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

const uploadToCloudinary = async (file) => {
  const result = await cloudinary.v2.uploader.upload(file.filepath, {
    folder: "projects",
    use_filename: true,
    unique_filename: false,
  });
  return result.secure_url; 
};

export default async function handler(req, res) {
  try {
    const { method, query } = req;

    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.user.id;

    if (method === "POST") {
      const { fields, files } = await parseForm(req);
      console.log("Files:", files);
      console.log("fields:", fields);
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const link = Array.isArray(fields.link) ? fields.link[0] : fields.link;
      const githubLink = Array.isArray(fields.githubLink) ? fields.githubLink[0] : fields.githubLink;
      const image = files.image ? files.image[0] : null;

      if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
      }

      let imagePath = null;

      if (image) {
        try {
          imagePath = await uploadToCloudinary(image); 
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return res.status(500).json({ error: "Image upload failed", details: uploadError.message });
        }
      }

      const newProject = await prisma.project.create({
        data: {
          userId,
          title,
          description,
          link,
          githubLink,
          image: imagePath, 
        },
      });

      return res.status(200).json({ success: true, id: newProject.id });
    }

    if (method === "GET") {
      const { userId: queryUserId } = query;

      if (queryUserId && queryUserId !== userId) {
        return res.status(403).json({ error: "You can only access your own projects" });
      }

      const projects = await prisma.project.findMany({
        where: { userId },
      });

      return res.status(200).json({ projects });
    }

    if (method === "DELETE") {
      const { id } = query;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const projectToDelete = await prisma.project.findUnique({
        where: { id },
      });

      if (projectToDelete?.image) {
        const publicId = projectToDelete.image.split("/").pop().split(".")[0];
        await cloudinary.v2.uploader.destroy(`projects/${publicId}`); // Delete the image from Cloudinary
      }

      const deletedProject = await prisma.project.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: "Project deleted successfully",
        id: deletedProject.id,
      });
    }

    if (method === "PATCH") {
      const { fields, files } = await parseForm(req);
      const { id } = query;

      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const link = Array.isArray(fields.link) ? fields.link[0] : fields.link;
      const githubLink = Array.isArray(fields.githubLink) ? fields.githubLink[0] : fields.githubLink;

      if (!id || !title || !description) {
        return res.status(400).json({ error: "ID, title, and description are required" });
      }

      const existingProject = await prisma.project.findUnique({
        where: { id },
      });

      if (!existingProject) {
        return res.status(404).json({ error: "Project not found" });
      }

      let imagePath = existingProject.image;

      if (files.image) {
        try {
        
          if (existingProject.image) {
            const publicId = existingProject.image.split("/").pop().split(".")[0];
            await cloudinary.v2.uploader.destroy(`projects/${publicId}`);
          }

          imagePath = await uploadToCloudinary(files.image[0]); 
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return res.status(500).json({ error: "Image upload failed", details: uploadError.message });
        }
      }

      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          userId,
          title,
          description,
          link,
          githubLink,
          image: imagePath, 
        },
      });

      return res.status(200).json({ success: true, updatedProject });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}

