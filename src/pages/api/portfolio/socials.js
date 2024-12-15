import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/NextOption';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const { method } = req;
    if (!session || !session.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = session.user.id; 

    if (method === "POST") {
      const body = req.body;
      const { name, link, isVisible } = body;

      if (!name || !link) {
        return res.status(400).json({ error: "Name and link are required" });
      }

      const newSocial = await prisma.social.create({
        data: { userId, name, link, isVisible },
      });

      return res.status(200).json({ success: true, id: newSocial.id });
    }

    if (method === "GET") {
      const socialLinks = await prisma.social.findMany({
        where: { userId },
      });

      return res.status(200).json({ socials: socialLinks });
    }

    if (method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const deletedSocial = await prisma.social.delete({
        where: { id },
      });

      return res.status(200).json({ success: true, message: "Social link deleted successfully", id: deletedSocial.id });
    }

    if (method === "PATCH") {
      const { id, name, link, isVisible } = req.body;

      if (!id || !name || !link) {
        return res.status(400).json({ error: "id, name, and link are required" });
      }

      const existingSocial = await prisma.social.findUnique({
        where: { id },
      });

      if (!existingSocial) {
        return res.status(404).json({ error: "Social media link not found" });
      }

      const updatedSocial = await prisma.social.update({
        where: { id },
        data: {
          userId,
          name,
          link,
          isVisible: isVisible === true,
        },
      });

      return res.status(200).json({ success: true, updatedSocial });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
