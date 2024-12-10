import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId, picture, tagline, bio, hobbies, languages } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400 }
      );
    }

    const newProfile = await prisma.profile.create({
      data: {
        user: {
          connect: { id: userId },
        },
        picture,
        tagline,
        bio,
        hobbies,
        languages,
      },
    });

    return new Response(
      JSON.stringify(newProfile),
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating profile:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create profile' }),
      { status: 500 }
    );
  }
}





export async function PUT(req) {
  try {
    const { userId, picture, tagline, bio, hobbies, languages } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400 }
      );
    }


    const updatedProfile = await prisma.profile.update({
      where: { userId: userId }, 
      data: {
        picture,
        tagline,
        bio,
        hobbies,
        languages,
      },
    });

    return new Response(
      JSON.stringify(updatedProfile),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating profile:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update profile' }),
      { status: 500 }
    );
  }
}
