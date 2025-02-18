import { PrismaClient } from "@prisma/client";
import PDFDocument from "pdfkit";
import stream from "stream";

const prisma = new PrismaClient();

const colors = {
  primary: "#7C3AED",
  secondary: "#4F46E5",
  text: "#374151",
  mutedText: "#6B7280",
  lightBg: "#F3F4F6",
  white: "#FFFFFF",
};

const fonts = {
  regular: "Times-Roman", 
  bold: "Times-Bold",
};

// And modify the createGradientHeader function to use regular font instead:

const createGradientHeader = (doc, user) => {
  // Create gradient background
  doc.rect(0, 0, doc.page.width, 150).fillColor(colors.primary).fill();

  // Add user name and details in white
  doc
    .fontSize(28)
    .font(fonts.bold)
    .fillColor(colors.white)
    .text(user.name, { align: "center" })
    .moveDown(0.2);

  if (user.profile?.tagline) {
    doc
      .fontSize(14)
      .font(fonts.regular)
      .fillColor(colors.white)
      .text(user.profile.tagline, { align: "center" })
      .moveDown(0.3);
  }

  // Contact information - changed from fonts.light to fonts.regular
  const contactInfo = [
    user.email,
    user.profile?.phoneNumber,
    user.profile?.location,
  ]
    .filter(Boolean)
    .join(" • ");

  doc
    .fontSize(10)
    .font(fonts.regular)
    .fillColor(colors.white)
    .text(contactInfo, { align: "center" })
    .moveDown(2);
};

const addSection = (doc, title, icon = "") => {
  doc
    .moveDown(0.5)
    .fontSize(16)
    .font(fonts.bold)
    .fillColor(colors.primary)
    .text(title)
    .moveDown(0.5);

  doc
    .lineCap("butt")
    .moveTo(doc.x, doc.y)
    .lineTo(doc.page.width - 72, doc.y)
    .strokeColor(colors.lightBg)
    .lineWidth(2)
    .stroke()
    .moveDown(0.5);
};

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
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
      return res.status(404).json({ message: "User not found" });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      bufferPages: true,
    });

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${user.name.replace(/\s+/g, "_")}_Resume.pdf"`
    );

    const pdfStream = new stream.PassThrough();
    doc.pipe(pdfStream);
    pdfStream.pipe(res);

    // Create header with gradient
    createGradientHeader(doc, user);

    // Professional Summary
    if (user.profile?.bio) {
      doc.moveDown(2);
      addSection(doc, "Professional Summary");
      doc
        .fontSize(11)
        .font(fonts.regular)
        .fillColor(colors.text)
        .text(user.profile.bio, { align: "justify" })
        .moveDown(1.5);
    }

    if (user.skills.length > 0) {
      addSection(doc, "Technical Skills");

      const skills = user.skills.map(
        (skill) => `${skill.name} (${skill.level})`
      );
      const columns = 3; // Number of skills per row
      const rows = Math.ceil(skills.length / columns);

      for (let i = 0; i < rows; i++) {
        const rowSkills = skills
          .slice(i * columns, (i + 1) * columns)
          .join("  |  "); 

        doc
          .fontSize(11)
          .font(fonts.regular)
          .fillColor(colors.text)
          .text(rowSkills, { align: "start" })
          .moveDown(0.3);
      }
    }


    // Experience section with modern styling
    if (user.experiences.length > 0) {
      addSection(doc, "Professional Experience");
      user.experiences.forEach((exp) => {
        doc
          .fontSize(12)
          .font(fonts.bold)
          .fillColor(colors.text)
          .text(exp.position)
          .fontSize(11)
          .font(fonts.regular)
          .fillColor(colors.mutedText)
          .text(
            `${exp.company} • ${new Date(exp.startDate).getFullYear()} - ${
              exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"
            }`
          )
          .moveDown(0.5)
          .fillColor(colors.text)
          .text(exp.description, { align: "justify" })
          .moveDown(1);
      });
    }

    // Education section with modern styling
    if (user.education.length > 0) {
      addSection(doc, "Education");
      user.education.forEach((edu) => {
        doc
          .fontSize(12)
          .font(fonts.bold)
          .fillColor(colors.text)
          .text(edu.degree)
          .fontSize(11)
          .font(fonts.regular)
          .fillColor(colors.mutedText)
          .text(
            `${edu.institution} • ${new Date(edu.startDate).getFullYear()} - ${
              edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"
            }`
          )
          .moveDown(1);
      });
    }

    // Footer with page numbers
    const pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      doc
        .fontSize(8)
        .fillColor(colors.mutedText)
        .text(
          `Page ${i + 1} of ${pages.count}`,
          doc.page.width - 100,
          doc.page.height - 50,
          { align: "right" }
        );
    }

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
