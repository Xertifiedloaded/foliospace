import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { method, query, body } = req;

    if (method === "POST") {
      const { userId, title, description, technologies, link, githubLink, image } = body;

      if (!userId || !title || !description || !image) {
        return res.status(400).json({ error: "UserId, title, description, and image are required" });
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
      const { userId } = query;

      if (!userId) {
        return res.status(400).json({ error: "UserId is required" });
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
      const { userId, title, description, technologies, link, githubLink, image } = body;

      if (!id || !userId || !title || !description) {
        return res.status(400).json({ error: "id, userId, title, and description are required" });
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