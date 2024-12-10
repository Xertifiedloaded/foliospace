import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  const { url, text, portfolioId } = await req.json();

  try {
    const newLink = await prisma.link.create({
      data: {
        url,
        text,
        portfolioId,
      },
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}



export async function PUT(req, { params }) {
  const { id } = params;
  const { url, text } = await req.json();

  try {
    const updatedLink = await prisma.link.update({
      where: { id },
      data: {
        url,
        text,
      },
    });

    return NextResponse.json(updatedLink, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update link' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedLink = await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json(deletedLink, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
  }
}
