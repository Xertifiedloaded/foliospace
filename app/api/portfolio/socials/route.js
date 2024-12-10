import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, name, link, isVisible } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "UserId is required" }), { status: 400 });
    }

    const newSocial = await prisma.social.create({
      data: { userId, name, link, isVisible },
    });

    return new Response(JSON.stringify(newSocial), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
