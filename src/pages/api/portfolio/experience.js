import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, company, position, startDate, endDate, description } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "UserId is required" });
      }

      const newExperience = await prisma.experience.create({
        data: { userId, company, position, startDate, endDate, description },
      });

      return res.status(201).json(newExperience);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: "UserId query parameter is required" });
      }

      const experiences = await prisma.experience.findMany({
        where: { userId },
      });

      return res.status(200).json(experiences);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "PATCH") {
    try {
      const { userId, company, position, startDate, endDate, description, experienceId } = req.body;

      if (!userId || !experienceId) {
        return res.status(400).json({ error: "UserId and experienceId are required" });
      }

      const updatedExperience = await prisma.experience.update({
        where: { id: experienceId },
        data: { userId, company, position, startDate, endDate, description },
      });

      return res.status(200).json(updatedExperience);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { experienceId, userId } = req.query;

      if (!experienceId || !userId) {
        return res.status(400).json({ error: "experienceId and userId query parameters are required" });
      }

      const deletedExperience = await prisma.experience.delete({
        where: { id: experienceId },
      });

      return res.status(200).json(deletedExperience);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
