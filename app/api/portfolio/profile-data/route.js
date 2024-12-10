import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const portfolios = await prisma.user.findMany({
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

    if (!portfolios || portfolios.length === 0) {
      return NextResponse.json(
        { error: 'No users found' },
        { status: 404 }
      );
    }

    const safePortfolios = portfolios.map(({ password, ...user }) => user);

    return NextResponse.json(safePortfolios, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0', 
      },
    });
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
