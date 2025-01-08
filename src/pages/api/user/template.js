import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from '../../../../lib/AuthOptions';
const prisma = new PrismaClient();


export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = session.user.id;
  if (req.method === "PUT") {
    const { template } = req.body;
    const validTemplates = ["BASIC", "MODERN", "PROFESSIONAL", "MINIMAL"];
    if (!validTemplates.includes(template)) {
      return res.status(400).json({ error: "Invalid template" });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId }, 
        data: { template },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update template" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
