import { PrismaClient } from '@prisma/client';
import PDFDocument from 'pdfkit';
import stream from 'stream';

const prisma = new PrismaClient();

const colors = {
  primary: '#2D3748',
  secondary: '#4A5568',
  accent: '#3182CE',
  light: '#718096',
  ultraLight: '#E2E8F0',
};

const addSection = (doc, title, yPosition = null) => {
  if (yPosition) doc.y = yPosition;
  doc.fontSize(16)
     .font('Helvetica-Bold')
     .fillColor(colors.primary)
     .text(title)
     .moveDown(0.5)
     .lineCap('butt')
     .moveTo(doc.x, doc.y)
     .lineTo(doc.page.width - 72, doc.y)
     .strokeColor(colors.ultraLight)
     .lineWidth(2)
     .stroke()
     .moveDown(0.5);
};

export default async function handler(req, res) {
  const { userId } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        projects: true,
        socials: true,
        experiences: true,
        education: true,
        skills: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      bufferPages: true,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${user.name.replace(/\s+/g, '_')}_Resume.pdf"`);

    const pdfStream = new stream.PassThrough();
    doc.pipe(pdfStream);
    pdfStream.pipe(res);

    doc.fontSize(28)
       .font('Helvetica-Bold')
       .fillColor(colors.primary)
       .text(user.name, { align: 'center' })
       .fontSize(14)
       .font('Helvetica')
       .fillColor(colors.secondary)
       .text(user.profile?.tagline || '', { align: 'center' })
       .moveDown(0.5);

    doc.fontSize(10)
       .font('Helvetica')
       .fillColor(colors.light)
       .text([
         user.email,
         user.profile?.phoneNumber,
         user.profile?.location
       ].filter(Boolean).join(' • '), { align: 'center' })
       .moveDown(2);

    // Professional Summary
    if (user.profile?.bio) {
      addSection(doc, 'Professional Summary');
      doc.fontSize(11)
         .font('Helvetica')
         .fillColor(colors.secondary)
         .text(user.profile.bio, { align: 'justify' })
         .moveDown(1.5);
    }

    // Skills section
    if (user.skills.length > 0) {
      addSection(doc, 'Skills');
      const skillGroups = user.skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
      }, {});

      Object.entries(skillGroups).forEach(([category, skills]) => {
        doc.fontSize(11)
           .font('Helvetica-Bold')
           .fillColor(colors.secondary)
           .text(category + ': ', { continued: true })
           .font('Helvetica')
           .text(skills.join(' • '))
           .moveDown(0.5);
      });
      doc.moveDown(1);
    }

    // Experience section
    if (user.experiences.length > 0) {
      addSection(doc, 'Professional Experience');
      user.experiences.forEach((exp) => {
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor(colors.secondary)
           .text(exp.position)
           .fontSize(11)
           .font('Helvetica')
           .fillColor(colors.light)
           .text(`${exp.company} • ${exp.startDate.toLocaleDateString()} - ${exp.endDate ? exp.endDate.toLocaleDateString() : 'Present'}`)
           .moveDown(0.5)
           .fontSize(11)
           .fillColor(colors.secondary)
           .text(exp.description, { align: 'justify' })
           .moveDown(1);
      });
    }

    // Education section
    if (user.education.length > 0) {
      addSection(doc, 'Education');
      user.education.forEach((edu) => {
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor(colors.secondary)
           .text(edu.degree)
           .fontSize(11)
           .font('Helvetica')
           .fillColor(colors.light)
           .text(`${edu.institution} • ${edu.startDate.toLocaleDateString()} - ${edu.endDate ? edu.endDate.toLocaleDateString() : 'Present'}`)
           .moveDown(1);
      });
    }

    // Projects section
    if (user.projects.length > 0) {
      addSection(doc, 'Notable Projects');
      user.projects.forEach((project) => {
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor(colors.secondary)
           .text(project.title)
           .fontSize(11)
           .font('Helvetica')
           .fillColor(colors.secondary)
           .text(project.description)
           .fillColor(colors.accent)
           .text(project.link || project.githubLink || '')
           .moveDown(1);
      });
    }


    const visibleSocials = user.socials.filter(s => s.isVisible);
    if (visibleSocials.length > 0) {
      doc.fontSize(9)
         .font('Helvetica')
         .fillColor(colors.light)
         .text(visibleSocials.map(s => `${s.name}: ${s.link}`).join(' • '), {
           align: 'center',
           bottom: doc.page.height - 50
         });
    }

    let pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      doc.fontSize(8)
         .fillColor(colors.light)
         .text(
           `Page ${i + 1} of ${pages.count}`,
           doc.page.width - 100,
           doc.page.height - 50,
           { align: 'right' }
         );
    }

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}