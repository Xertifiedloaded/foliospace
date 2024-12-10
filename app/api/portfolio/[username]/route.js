
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const username = (await params).username

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
        socials: true,
        links: true,
        experiences: { orderBy: { startDate: 'desc' } },
        education: { orderBy: { startDate: 'desc' } },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { password, ...safeUserData } = user;

    return NextResponse.json(safeUserData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0', 
      },
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
