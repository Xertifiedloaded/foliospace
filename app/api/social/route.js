import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, link, portfolioId, isVisible } = await req.json(); 

  try {
    const newSocial = await prisma.social.create({
      data: {
        name,
        link,
        isVisible,
        portfolioId,
      },
    });

    return NextResponse.json(newSocial, { status: 201 }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create social' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params; 
  const { name, link, isVisible } = await req.json(); 

  try {
    const updatedSocial = await prisma.social.update({
      where: { id },
      data: {
        name,
        link,
        isVisible,
      },
    });

    return NextResponse.json(updatedSocial, { status: 200 }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update social' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedSocial = await prisma.social.delete({
      where: { id },
    });

    return NextResponse.json(deletedSocial, { status: 200 }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete social' }, { status: 500 });
  }
}
