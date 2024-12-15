import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/NextOption";


const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id;

  if (req.method === "POST") {
    try {
      const { institution, degree, startDate, endDate } = req.body;

      if (!institution || !degree) {
        return res.status(400).json({ error: "Institution and degree are required" });
      }

      const newEducation = await prisma.education.create({
        data: {
          userId,
          institution,
          degree,
          startDate,
          endDate,
        },
      });

      return res.status(201).json(newEducation);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
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
      const { educationId, institution, degree, startDate, endDate } = req.body;

      if (!educationId || !institution || !degree) {
        return res.status(400).json({ error: "EducationId, institution, and degree are required" });
      }

      const updatedEducation = await prisma.education.update({
        where: { id: educationId },
        data: {
          institution,
          degree,
          startDate,
          endDate,
        },
      });

      return res.status(200).json(updatedEducation);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  if (req.method === "DELETE") {
    try {
      const { educationId } = req.query;

      if (!educationId) {
        return res.status(400).json({ error: "EducationId query parameter is required" });
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
