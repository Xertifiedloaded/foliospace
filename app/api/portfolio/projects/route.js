import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, title, description, technologies, link, githubLink, image } = body;
    if (!userId || !title || !description || !image) {
      return new Response(
        JSON.stringify({ error: "UserId, title, description, and image are required" }),
        { status: 400 }
      );
    }

    let imageData = null;
    if (image) {
      const base64Data = image.split(';base64,').pop();

      if (!base64Data) {
        return new Response(
          JSON.stringify({ error: "Invalid base64 image format" }),
          { status: 400 }
        );
      }
      imageData = base64Data;
    }

    const newProject = await prisma.project.create({
      data: {
        userId,
        title,
        description,
        technologies,
        link,
        githubLink,
        image: imageData, 
      },
    });


    return new Response(
      JSON.stringify({ success: true, id: newProject.id }),
      { status: 200 }
    );
  } catch (error) {
    // Handle errors
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
        { status: 400 }
      );
    }

    const projects = await prisma.project.findMany({
      where: { userId },
    });

    return new Response(
      JSON.stringify({ projects }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
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
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
    }

    const deletedProject = await prisma.project.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ success: true, message: "Project deleted successfully", id: deletedProject.id }),
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
    const id = searchParams.get('id');
    const { userId, title, description, technologies, link, githubLink, image } = await req.json();

    if (!id || !userId || !title || !description) {
      return new Response(
        JSON.stringify({ error: "id, userId, title, and description are required" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: { id: id },
    });

    if (!existingProject) {
      return new Response(
        JSON.stringify({ error: "Project not found" }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    let imageData = null;
    if (image) {
      const base64Data = image.split(';base64,').pop();
      if (!base64Data) {
        return new Response(
          JSON.stringify({ error: "Invalid base64 image format" }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      
      imageData = base64Data;
    }

    const updatedProject = await prisma.project.update({
      where: { id: id }, 
      data: {
        userId,
        title,
        description,
        technologies,
        link,
        githubLink,
        image: imageData,
      },
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        updatedProject 
      }),
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
