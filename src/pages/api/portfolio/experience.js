import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/NextOption";


const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" }); 
  }

  const userId = session.user.id;
  if (req.method === "POST") {
    try {
      const { company, position, startDate, endDate, description } = req.body;

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
      const { company, position, startDate, endDate, description, experienceId } = req.body;

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
      const { experienceId } = req.query;

      if (!experienceId) {
        return res.status(400).json({ error: "experienceId query parameter is required" });
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
