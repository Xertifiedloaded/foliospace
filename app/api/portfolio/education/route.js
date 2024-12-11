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

    const educationEntries = await prisma.education.findMany({
      where: { userId },
    });

    return new Response(JSON.stringify(educationEntries), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


export async function PATCH(req) {
  try {
    const body = await req.json();
    const { educationId, userId, institution, degree, startDate, endDate } = body;

    if (!educationId || !userId) {
      return new Response(
        JSON.stringify({ error: "EducationId and UserId are required" }),
        { status: 400 }
      );
    }

    const updatedEducation = await prisma.education.update({
      where: { id: educationId },
      data: { userId, institution, degree, startDate, endDate },
    });

    return new Response(JSON.stringify(updatedEducation), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const educationId = url.searchParams.get('educationId');
    const userId = url.searchParams.get('userId');

    if (!educationId || !userId) {
      return new Response(
        JSON.stringify({ error: "EducationId and UserId query parameters are required" }),
        { status: 400 }
      );
    }

    const deletedEducation = await prisma.education.delete({
      where: { id: educationId },
    });

    return new Response(JSON.stringify(deletedEducation), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
