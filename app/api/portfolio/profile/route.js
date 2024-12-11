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

    let pictureData = null;

    if (picture) {
      const base64Data = picture.split(';base64,').pop();
      if (!base64Data) {
        return new Response(
          JSON.stringify({ error: "Invalid base64 image format" }),
          { status: 400 }
        );
      }
      pictureData = base64Data;
    }

    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: {
        picture: pictureData,
        tagline,
        bio,
        hobbies,
        languages,
      },
      create: {
        userId,
        picture: pictureData,
        tagline,
        bio,
        hobbies: hobbies || [],
        languages: languages || [],
      },
    });

    return new Response(JSON.stringify(updatedProfile), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "UserId is required" }),
        { status: 400 }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    const defaultProfile = {
      userId,
      picture: null,
      tagline: null,
      bio: null, 
      hobbies: [],
      languages: [],
    };

    const responseProfile = profile || defaultProfile;

    return new Response(JSON.stringify(responseProfile), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
