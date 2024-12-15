import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/NextOption";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id;

  if (req.method === "GET") {
    try {
      const links = await prisma.link.findMany({
        where: { userId }, 
      });

      return res.status(200).json(links);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { linkId } = req.query; 

      if (!linkId) {
        return res.status(400).json({ error: "LinkId is required" });
      }

      const deletedLink = await prisma.link.deleteMany({
        where: {
          id: linkId,
          userId, 
        },
      });

      if (deletedLink.count === 0) {
        return res
          .status(404)
          .json({ error: "Link not found or you don't have permission" });
      }

      return res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { url, text } = req.body;

      if (!url || !text) {
        return res
          .status(400)
          .json({ error: "Both URL and Text fields are required" });
      }

      const newLink = await prisma.link.create({
        data: { userId, url, text }, 
      });

      return res.status(201).json(newLink);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
