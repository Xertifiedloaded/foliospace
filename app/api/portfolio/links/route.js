import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, url, text } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "UserId is required" }), { status: 400 });
    }

    const newLink = await prisma.link.create({
      data: { userId, url, text },
    });

    return new Response(JSON.stringify(newLink), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
