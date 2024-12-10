import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const username = (await params).username
    const portfolio = await prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
        portfolio: {
          include: {
            links: true,
            socials: {
              where: { isVisible: true },
            },
            resume: {
              include: {
                experiences: {
                  orderBy: { startDate: 'desc' },
                },
                education: {
                  orderBy: { startDate: 'desc' },
                },
              },
            },
          },
        },
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { password, ...safeUserData } = portfolio;

    return NextResponse.json(safeUserData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0', 
      },
    });
  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}