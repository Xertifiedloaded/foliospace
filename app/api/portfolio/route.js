import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.json()
    const { userId, links, socials, resume } = body
    
    const portfolio = await prisma.portfolio.create({
      data: {
        userId,
        links: { create: links },
        socials: { create: socials },
        resume: {
          create: {
            experiences: { create: resume.experiences },
            education: { create: resume.education },
            skills: resume.skills
          }
        }
      }
    })
    
    return Response.json(portfolio, { status: 201 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}



export async function PATCH(req) {
  try {
    const body = await req.json()
    const { portfolioId, links, socials, resume } = body
    
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: portfolioId },
      data: {
        links: {
          deleteMany: {},
          create: links
        },
        socials: {
          deleteMany: {},
          create: socials
        },
        resume: {
          update: {
            experiences: {
              deleteMany: {},
              create: resume.experiences
            },
            education: {
              deleteMany: {},
              create: resume.education
            },
            skills: resume.skills
          }
        }
      },
      include: {
        links: true,
        socials: true,
        resume: {
          include: {
            experiences: true,
            education: true
          }
        }
      }
    })
    
    return Response.json(updatedPortfolio)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}

