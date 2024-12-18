import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/NextOption';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp'; 

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

export default async function handler(req, res) {
  try {
    const { method, query, body } = req;

    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.id;

    if (method === "POST") {
      const { title, description, technologies, link, githubLink, image } = body;

      if (!title || !description || !image) {
        return res.status(400).json({ error: "Title, description, and image are required" });
      }

      let imageUrl = null;
      if (image) {
        try {
          // Extract file extension and original name
          const matches = image.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
          if (!matches || matches.length !== 3) {
            return res.status(400).json({ error: "Invalid image format" });
          }

          const fileExtension = matches[1];
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, 'base64');
          
          const originalName = `${title}-${userId}-${Date.now()}.${fileExtension}`;
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          const filePath = path.join(uploadDir, originalName);


          const format = await sharp(buffer).metadata().then(metadata => metadata.format);
          await sharp(buffer)
            .resize(800)
            .toFormat(format, { quality: 80 })  
            .toFile(filePath);

          imageUrl = `/uploads/${originalName}`;
        } catch (uploadError) {
          return res.status(400).json({ error: "Image upload failed", details: uploadError.message });
        }
      }

      const newProject = await prisma.project.create({
        data: {
          userId,
          title,
          description,
          technologies,
          link,
          githubLink,
          image: imageUrl,
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

      if (projectToDelete && projectToDelete.image) {
        // Remove local image file
        const imagePath = path.join(process.cwd(), 'public', projectToDelete.image);
        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        } catch (error) {
          console.error('Error deleting image file:', error);
        }
      }

      const deletedProject = await prisma.project.delete({
        where: { id },
      });

      return res.status(200).json({ success: true, message: "Project deleted successfully", id: deletedProject.id });
    }

    if (method === "PATCH") {
      const { id } = query;
      const { title, description, technologies, link, githubLink, image } = body;

      if (!id || !title || !description) {
        return res.status(400).json({ error: "id, title, and description are required" });
      }

      const existingProject = await prisma.project.findUnique({
        where: { id },
      });

      if (!existingProject) {
        return res.status(404).json({ error: "Project not found" });
      }

      let imageUrl = existingProject.image;
      if (image) {
        try {
          // Remove existing image file if it exists
          if (existingProject.image) {
            const oldImagePath = path.join(process.cwd(), 'public', existingProject.image);
            try {
              if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
              }
            } catch (error) {
              console.error('Error deleting old image:', error);
            }
          }

          const matches = image.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
          if (!matches || matches.length !== 3) {
            return res.status(400).json({ error: "Invalid image format" });
          }

          const fileExtension = matches[1];
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, 'base64');
        
          const originalName = `${title}-${userId}-${Date.now()}.${fileExtension}`;
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          
          const filePath = path.join(uploadDir, originalName);

          // Compress the image using sharp
          await sharp(buffer)
            .resize(800)  // Resize to a width of 800px (optional, adjust as needed)
            .jpeg({ quality: 80 })  // Compress to 80% quality (you can adjust this)
            .toFile(filePath);

          imageUrl = `/uploads/${originalName}`;
        } catch (uploadError) {
          return res.status(400).json({ error: "Image upload failed", details: uploadError.message });
        }
      }

      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          userId,
          title,
          description,
          technologies,
          link,
          githubLink,
          image: imageUrl,
        },
      });

      return res.status(200).json({ success: true, updatedProject });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
