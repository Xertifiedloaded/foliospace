import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: "UserId is required" });
      }

      const links = await prisma.link.findMany({
        where: { userId },
      });

      return res.status(200).json(links);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { linkId, userId } = req.query;

      if (!linkId || !userId) {
        return res.status(400).json({ error: "LinkId and UserId are required" });
      }

      const deletedLink = await prisma.link.deleteMany({
        where: {
          id: linkId,
          userId: userId,
        },
      });

      if (deletedLink.count === 0) {
        return res.status(404).json({ error: "Link not found or you don't have permission" });
      }

      return res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { userId, url, text } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "UserId is required" });
      }

      const newLink = await prisma.link.create({
        data: { userId, url, text },
      });

      return res.status(201).json(newLink);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
