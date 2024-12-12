import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, institution, degree, startDate, endDate } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "UserId is required" });
      }

      const newEducation = await prisma.education.create({
        data: { userId, institution, degree, startDate, endDate },
      });

      return res.status(201).json(newEducation);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: "UserId query parameter is required" });
      }

      const educationEntries = await prisma.education.findMany({
        where: { userId },
      });

      return res.status(200).json(educationEntries);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { educationId, userId, institution, degree, startDate, endDate } = req.body;

      if (!educationId || !userId) {
        return res.status(400).json({ error: "EducationId and UserId are required" });
      }

      const updatedEducation = await prisma.education.update({
        where: { id: educationId },
        data: { userId, institution, degree, startDate, endDate },
      });

      return res.status(200).json(updatedEducation);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { educationId, userId } = req.query;

      if (!educationId || !userId) {
        return res.status(400).json({ error: "EducationId and UserId query parameters are required" });
      }

      const deletedEducation = await prisma.education.delete({
        where: { id: educationId },
      });

      return res.status(200).json(deletedEducation);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
