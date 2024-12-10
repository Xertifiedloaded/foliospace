import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  const { portfolioId, skills } = await req.json();

  try {
    const newSkills = await prisma.resume.update({
      where: { portfolioId },
      data: {
        skills,
      },
    });

    return NextResponse.json(newSkills, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create skills' }, { status: 500 });
  }
}




export async function PUT(req, { params }) {
  const { portfolioId } = params;
  const { skills } = await req.json();

  try {
    const updatedSkills = await prisma.resume.update({
      where: { portfolioId },
      data: {
        skills,
      },
    });

    return NextResponse.json(updatedSkills, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update skills' }, { status: 500 });
  }
}
