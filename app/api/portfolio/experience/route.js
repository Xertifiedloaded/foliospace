import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, company, position, startDate, endDate, description } = body;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "UserId is required" }),
        { status: 400 }
      );
    }

    const newExperience = await prisma.experience.create({
      data: { userId, company, position, startDate, endDate, description },
    });

    return new Response(JSON.stringify(newExperience), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "UserId query parameter is required" }),
        { status: 400 }
      );
    }

    const experiences = await prisma.experience.findMany({
      where: { userId },
    });

    return new Response(JSON.stringify(experiences), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { userId, company, position, startDate, endDate, description, experienceId } = body;

    if (!userId || !experienceId) {
      return new Response(
        JSON.stringify({ error: "UserId and experienceId are required" }),
        { status: 400 }
      );
    }

    const updatedExperience = await prisma.experience.update({
      where: { id: experienceId },
      data: { userId, company, position, startDate, endDate, description },
    });

    return new Response(JSON.stringify(updatedExperience), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const experienceId = url.searchParams.get('experienceId');
    const userId = url.searchParams.get('userId');

    if (!experienceId || !userId) {
      return new Response(
        JSON.stringify({ error: "experienceId and userId query parameters are required" }),
        { status: 400 }
      );
    }

    const deletedExperience = await prisma.experience.delete({
      where: { id: experienceId },
    });

    return new Response(JSON.stringify(deletedExperience), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
