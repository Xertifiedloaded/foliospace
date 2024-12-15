import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/NextOption';


const prisma = new PrismaClient();

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

      let imageData = null;
      if (image) {
        const base64Data = image.split(';base64,').pop();

        if (!base64Data) {
          return res.status(400).json({ error: "Invalid base64 image format" });
        }
        imageData = base64Data;
      }

      const newProject = await prisma.project.create({
        data: {
          userId,
          title,
          description,
          technologies,
          link,
          githubLink,
          image: imageData,
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

      let imageData = null;
      if (image) {
        const base64Data = image.split(';base64,').pop();

        if (!base64Data) {
          return res.status(400).json({ error: "Invalid base64 image format" });
        }

        imageData = base64Data;
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
          image: imageData,
        },
      });

      return res.status(200).json({ success: true, updatedProject });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
