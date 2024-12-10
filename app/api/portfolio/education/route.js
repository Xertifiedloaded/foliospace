import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, institution, degree, startDate, endDate } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "UserId is required" }), { status: 400 });
    }

    const newEducation = await prisma.education.create({
      data: { userId, institution, degree, startDate, endDate },
    });

    return new Response(JSON.stringify(newEducation), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
