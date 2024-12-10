import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function POST(req) {
  const { userId, links, socials, resume } = await req.json();

  try {
    const newPortfolio = await prisma.portfolio.create({
      data: {
        user: {
          connect: { id: userId },
        },
        links: {
          create: links.map((link) => ({
            url: link.url,
            text: link.text,
          })),
        },
        socials: {
          create: socials.map((social) => ({
            name: social.name,
            link: social.link,
            isVisible: social.isVisible || false,
          })),
        },
        resume: resume
          ? {
              create: {
                experiences: {
                  create: resume.experiences.map((exp) => ({
                    company: exp.company,
                    position: exp.position,
                    startDate: new Date(exp.startDate),
                    endDate: exp.endDate ? new Date(exp.endDate) : null,
                    description: exp.description,
                  })),
                },
                education: {
                  create: resume.education.map((edu) => ({
                    institution: edu.institution,
                    degree: edu.degree,
                    startDate: new Date(edu.startDate),
                    endDate: edu.endDate ? new Date(edu.endDate) : null,
                  })),
                },
                skills: resume.skills,
              },
            }
          : undefined,
      },
    });

    return new Response(JSON.stringify(newPortfolio), { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return new Response(JSON.stringify({ error: "Failed to create portfolio" }), { status: 500 });
  }
}
