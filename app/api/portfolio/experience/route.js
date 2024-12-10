import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, company, position, startDate, endDate, description } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "UserId is required" }), { status: 400 });
    }
    const newExperience = await prisma.experience.create({
      data: { userId, company, position, startDate, endDate, description },
    });

    return new Response(JSON.stringify(newExperience), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
