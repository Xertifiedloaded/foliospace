import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


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

    const links = await prisma.link.findMany({
      where: { userId },
    });

    return new Response(JSON.stringify(links), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500 }
    );
  }
}






export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const linkId = searchParams.get('linkId');
    const userId = searchParams.get('userId');

    if (!linkId || !userId) {
      return new Response(
        JSON.stringify({ error: "LinkId and UserId are required" }), 
        { status: 400 }
      );
    }

    const deletedLink = await prisma.link.deleteMany({
      where: { 
        id: linkId,
        userId: userId 
      },
    });

    if (deletedLink.count === 0) {
      return new Response(
        JSON.stringify({ error: "Link not found or you don't have permission" }), 
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ message: "Link deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500 }
    );
  }
}



export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, url, text } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "UserId is required" }), { status: 400 });
    }

    const newLink = await prisma.link.create({
      data: { userId, url, text },
    });

    return new Response(JSON.stringify(newLink), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
