import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req) {
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object') {
      throw new Error('Invalid payload: Body is null or not an object.');
    }

    const { userId, picture, tagline, bio, hobbies, languages } = body;

    if (!userId) {
      throw new Error('userId is required.');
    }

    const updatedProfile = await prisma.profile.update({
      where: {
        user: {
          id: userId,
        },
      },
      data: {
        picture,
        tagline,
        bio,
        hobbies,
        languages,
      },
    });

    return new Response(
      JSON.stringify({
        message: 'Profile updated successfully',
        updatedProfile,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating profile:', error.message);

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
