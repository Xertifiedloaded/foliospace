import { PrismaClient } from "@prisma/client";
import PDFDocument from "pdfkit";
import stream from "stream";
import axios from "axios";

const prisma = new PrismaClient();

const colors = {
  primary: "#2E5090",      // Professional blue
  secondary: "#333333",    // Dark text
  accent: "#4A6FA5",       // Light blue accent
  text: "#333333",         // Main text
  mutedText: "#666666",    // Secondary text
  lightBg: "#F5F5F5",      // Light background
  white: "#FFFFFF",
};

const fonts = {
  regular: "Helvetica",
  bold: "Helvetica-Bold",
  italic: "Helvetica-Oblique",
};

const MARGIN = 50;
const CONTENT_WIDTH = 495; 
const LEFT_COLUMN = MARGIN;
const RIGHT_COLUMN = 350;
const PHOTO_SIZE = 80; 

const fetchImageBuffer = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

const createHeader = async (doc, user) => {
  const nameStartX = LEFT_COLUMN + (user.profile?.picture ? PHOTO_SIZE + 20 : 0);
  
  if (user.profile?.picture) {
    try {
      const imageBuffer = await fetchImageBuffer(user.profile.picture);
      
      if (imageBuffer) {
        doc.save();
        
        const centerX = LEFT_COLUMN + PHOTO_SIZE/2;
        const centerY = MARGIN + PHOTO_SIZE/2;
        const radius = PHOTO_SIZE/2;
        
        doc.circle(centerX, centerY, radius);
        doc.clip();
      
        doc.image(imageBuffer, LEFT_COLUMN, MARGIN, {
          width: PHOTO_SIZE,
          height: PHOTO_SIZE
        });
        
        doc.restore();
      
        doc.circle(centerX, centerY, radius)
          .strokeColor(colors.primary)
          .lineWidth(1.5)
          .stroke();
      }
    } catch (error) {
      console.error("Error adding profile picture:", error);
    }
  }
  
  doc
    .font(fonts.bold)
    .fontSize(18)
    .fillColor(colors.primary)
    .text(user.name.toUpperCase(), nameStartX, MARGIN);
  
  let currentY = doc.y + 8; 
  
  if (user.profile?.tagline) {
    doc
      .font(fonts.italic)
      .fontSize(12)
      .fillColor(colors.secondary)
      .text(user.profile.tagline, nameStartX, currentY);
    currentY = doc.y + 8;
  }
  
  let contactY = MARGIN;
  doc.font(fonts.regular).fontSize(10).fillColor(colors.text);
  
  // Email
  if (user.email) {
    doc.text(user.email, RIGHT_COLUMN, contactY, { align: "right" });
    contactY += 15;
  }
  
  // Phone
  if (user.profile?.phoneNumber) {
    doc.text(user.profile.phoneNumber, RIGHT_COLUMN, contactY, { align: "right" });
    contactY += 15;
  }
  
  // Location
  if (user.profile?.location) {
    doc.text(user.profile.location, RIGHT_COLUMN, contactY, { align: "right" });
    contactY += 15;
  }

  const photoBottom = user.profile?.picture ? MARGIN + PHOTO_SIZE + 10 : 0;
  const textBottom = Math.max(currentY, contactY);
  doc.y = Math.max(photoBottom, textBottom);

  doc
    .moveTo(LEFT_COLUMN, doc.y + 5)
    .lineTo(MARGIN + CONTENT_WIDTH, doc.y + 5)
    .strokeColor(colors.primary)
    .lineWidth(1)
    .stroke();
  
  doc.y = doc.y + 20; 
};

const addSection = (doc, title) => {
  doc.moveDown(1); 
  
  const sectionY = doc.y;
  doc
    .font(fonts.bold)
    .fontSize(12)
    .fillColor(colors.primary)
    .text(title.toUpperCase(), LEFT_COLUMN);
  
  doc
    .moveTo(LEFT_COLUMN, doc.y + 3)
    .lineTo(MARGIN + CONTENT_WIDTH, doc.y + 3)
    .strokeColor(colors.lightBg)
    .lineWidth(1)
    .stroke();
  
  doc.moveDown(0.7);
  return doc.y;
};

const addExperienceEntry = (doc, experience) => {
  const startDate = new Date(experience.startDate);
  const endDate = experience.endDate ? new Date(experience.endDate) : null;
  
  const dateText = `${startDate.getFullYear()} - ${endDate ? endDate.getFullYear() : "Present"}`;
  
  const positionY = doc.y;
  doc
    .font(fonts.bold)
    .fontSize(11)
    .fillColor(colors.text)
    .text(experience.position, LEFT_COLUMN);
  
  doc
    .font(fonts.regular)
    .fontSize(10)
    .fillColor(colors.mutedText)
    .text(dateText, RIGHT_COLUMN, positionY, { align: "right" });
  
  const companyY = doc.y + 3;
  doc
    .font(fonts.italic)
    .fontSize(10);
  
  if (experience?.url) {
    doc.fillColor(colors.accent)
       .text(experience.company, LEFT_COLUMN, companyY, {
         link: experience.url,
         underline: true
       });
  } else {
    doc.fillColor(colors.secondary)
       .text(experience.company, LEFT_COLUMN, companyY);
  }
  
  if (experience.description) {
    doc.moveDown(0.5); 
    doc
      .font(fonts.regular)
      .fontSize(10)
      .fillColor(colors.text);
    
    const sentences = experience.description
      .split(/\.(?:\s+|\s*$)/)
      .filter(s => s.trim().length > 0);
    
    if (sentences.length > 1) {
      sentences.forEach((sentence, idx) => {
        if (idx > 0) doc.moveDown(0.3);
        
        const bulletY = doc.y + 4;
        
        doc
          .circle(LEFT_COLUMN + 3, bulletY, 1.5)
          .fillColor(colors.primary)
          .fill();
        
        doc
          .fillColor(colors.text)
          .text(sentence.trim() + ".", LEFT_COLUMN + 10, doc.y, {
            width: CONTENT_WIDTH - 10,
            align: "left",
          });
      });
    } else {
      doc.text(experience.description, {
        width: CONTENT_WIDTH,
        align: "left",
      });
    }
  }
  
  doc.moveDown(0.8); 
};

const addEducationEntry = (doc, education) => {
  const startDate = new Date(education.startDate);
  const endDate = education.endDate ? new Date(education.endDate) : null;
  
  const dateText = `${startDate.getFullYear()} - ${endDate ? endDate.getFullYear() : "Present"}`;
  
  const degreeY = doc.y;
  doc
    .font(fonts.bold)
    .fontSize(11)
    .fillColor(colors.text)
    .text(education.degree, LEFT_COLUMN);
  
  doc
    .font(fonts.regular)
    .fontSize(10)
    .fillColor(colors.mutedText)
    .text(dateText, RIGHT_COLUMN, degreeY, { align: "right" });
  
  const institutionY = doc.y + 3;
  doc
    .font(fonts.italic)
    .fontSize(10);
  
  if (education.url) {
    doc.fillColor(colors.accent)
       .text(education.institution, LEFT_COLUMN, institutionY, {
         link: education.url,
         underline: true
       });
  } else {
    doc.fillColor(colors.secondary)
       .text(education.institution, LEFT_COLUMN, institutionY);
  }
  
  doc.moveDown(0.8); 
};

const addSkills = (doc, skills) => {
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || "Skills";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});
  
  Object.entries(skillsByCategory).forEach(([category, categorySkills], index) => {
    if (index > 0) doc.moveDown(0.8); 
    
    if (Object.keys(skillsByCategory).length > 1) {
      doc
        .font(fonts.bold)
        .fontSize(10)
        .fillColor(colors.secondary)
        .text(category, LEFT_COLUMN);
      doc.moveDown(0.3); 
    }
    
    const skillNames = categorySkills.map(skill => skill.name);
  
    const columns = Math.min(3, Math.ceil(skillNames.length / 4)); // Max 3 columns
    const itemsPerColumn = Math.ceil(skillNames.length / columns);
    const columnWidth = CONTENT_WIDTH / columns;
    
    for (let i = 0; i < itemsPerColumn; i++) {
      doc.font(fonts.regular).fontSize(10).fillColor(colors.text);
      const rowY = doc.y;
      
      for (let col = 0; col < columns; col++) {
        const skillIndex = col * itemsPerColumn + i;
        if (skillIndex < skillNames.length) {
          const x = LEFT_COLUMN + (col * columnWidth);
          
          if (col === 0) {
            doc
              .circle(x + 3, doc.y + 4, 1.5)
              .fillColor(colors.primary)
              .fill();
            
            doc
              .fillColor(colors.text)
              .text(skillNames[skillIndex], x + 10, doc.y, {
                width: columnWidth - 20,
              });
          } else {
            doc
              .circle(x + 3, rowY + 4, 1.5)
              .fillColor(colors.primary)
              .fill();
          
            doc
              .fillColor(colors.text)
              .text(skillNames[skillIndex], x + 10, rowY, {
                width: columnWidth - 20,
              });
          }
        }
      }
      
      if (i < itemsPerColumn - 1) {
        doc.moveDown(0.4); 
      }
    }
  });
  
  doc.moveDown(0.5);
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
      margin: MARGIN,
      bufferPages: true,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${user.name.replace(/\s+/g, "_")}_CV.pdf"`
    );

    const pdfStream = new stream.PassThrough();
    doc.pipe(pdfStream);
    pdfStream.pipe(res);

    // Create header with name, photo, and contact info
    await createHeader(doc, user);

    if (user.profile?.bio) {
      addSection(doc, "PROFESSIONAL SUMMARY");
      const bioY = doc.y;
      doc
        .font(fonts.regular)
        .fontSize(10)
        .fillColor(colors.text)
        .text(user.profile.bio, LEFT_COLUMN, bioY, {
          width: CONTENT_WIDTH,
          align: "justify",
        });
    }

    if (user.skills && user.skills.length > 0) {
      addSection(doc, "SKILLS");
      addSkills(doc, user.skills);
    }

    if (user.experiences && user.experiences.length > 0) {
      addSection(doc, "PROFESSIONAL EXPERIENCE");
      
      const sortedExperiences = [...user.experiences].sort((a, b) => {
        return new Date(b.startDate) - new Date(a.startDate);
      });
      
      sortedExperiences.forEach((exp) => {
        addExperienceEntry(doc, exp);
      });
    }

    if (user.education && user.education.length > 0) {
      addSection(doc, "EDUCATION");
      
      const sortedEducation = [...user.education].sort((a, b) => {
        return new Date(b.startDate) - new Date(a.startDate);
      });
      
      sortedEducation.forEach((edu) => {
        addEducationEntry(doc, edu);
      });
    }

    const pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
    
      doc
        .font(fonts.regular)
        .fontSize(8)
        .fillColor(colors.mutedText)
        .text(
          `Page ${i + 1} of ${pages.count}`,
          0,
          doc.page.height - 25,
          { align: "center" }
        );
    }

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

console.log("Resume PDF generator with profile picture support ready to use");