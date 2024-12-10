import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { userId, picture, tagline, bio, hobbies, languages } = body;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "UserId is required" }),
        { status: 400 }
      );
    }

    // Use upsert to handle both update and create scenarios
    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: { picture, tagline, bio, hobbies, languages },
      create: {
        userId,
        picture,
        tagline,
        bio,
        hobbies: hobbies || [],
        languages: languages || [],
      },
    });

    return new Response(JSON.stringify(updatedProfile), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
