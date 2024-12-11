import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, name, link, isVisible } = body;

    if (!userId || !name || !link) {
      return new Response(
        JSON.stringify({ error: "UserId, name, and link are required" }),
        { status: 400 }
      );
    }

    const newSocial = await prisma.social.create({
      data: { userId, name, link, isVisible },
    });

    return new Response(
      JSON.stringify({ success: true, id: newSocial.id }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "UserId is required" }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const socialLinks = await prisma.social.findMany({
      where: { userId },
    });
    
    return new Response(
      JSON.stringify({ socials: socialLinks }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
    }

    const deletedSocial = await prisma.social.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ success: true, message: "Social link deleted successfully", id: deletedSocial.id }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}


export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");
    const link = searchParams.get("link");
    const isVisible = searchParams.get("isVisible");

    if (!id || !userId || !name || !link) {
      return new Response(JSON.stringify({ error: "id, userId, name, and link are required" }), { status: 400 });
    }

    const existingSocial = await prisma.social.findUnique({
      where: { id },
    });

    if (!existingSocial) {
      return new Response(JSON.stringify({ error: "Social media link not found" }), { status: 404 });
    }

    const updatedSocial = await prisma.social.update({
      where: { id },
      data: {
        userId,
        name,
        link,
        isVisible: isVisible === "true", 
      },
    });

    return new Response(
      JSON.stringify({ success: true, updatedSocial }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
