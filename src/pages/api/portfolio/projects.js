import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/NextOption";
import { mkdir, writeFile, readFile, unlink } from 'fs/promises';
import path from 'path';
import formidable from 'formidable';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const createRequiredDirectories = async () => {
  const tmpDir = path.join(process.cwd(), 'public', 'uploads', 'tmp')
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
  
  await mkdir(tmpDir, { recursive: true });
  await mkdir(uploadsDir, { recursive: true });
  
  return tmpDir;
};

const parseForm = async (req) => {
  const tmpDir = await createRequiredDirectories();
  
  const form = formidable({
    maxFileSize: 50 * 1024 * 1024, 
    uploadDir: tmpDir,
    keepExtensions: true,
    multiples: false,
  });
  
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  try {
    const { method, query } = req;

    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.user.id;

    if (method === "POST") {
      const { fields, files } = await parseForm(req);
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const link = Array.isArray(fields.link) ? fields.link[0] : fields.link;
      const githubLink = Array.isArray(fields.githubLink) ? fields.githubLink[0] : fields.githubLink;

      if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
      }

      let imagePath = null;
      const uploadedFile = files.image && files.image[0];

      if (uploadedFile) {
        try {
          const userUploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
          await mkdir(userUploadDir, { recursive: true });

          const fileExtension = path.extname(uploadedFile.originalFilename || uploadedFile.newFilename || '.jpg');
          const fileName = `${fields.title}${fileExtension}`;
          const finalPath = path.join(userUploadDir, fileName);

          const fileData = await readFile(uploadedFile.filepath);
          await writeFile(finalPath, fileData);
          await unlink(uploadedFile.filepath).catch(console.error);
          
          imagePath = `/uploads/projects/${fileName}`;
        } catch (uploadError) {
          console.error("Error saving file:", uploadError);
          return res.status(400).json({
            error: "File save failed",
            details: uploadError.message,
          });
        }
      }

      const newProject = await prisma.project.create({
        data: {
          userId,
          title,
          description,
          link,
          githubLink,
          image: imagePath,
        },
      });

      return res.status(200).json({ success: true, id: newProject.id });
    }

    if (method === "GET") {
      const { userId: queryUserId } = query;

      if (queryUserId && queryUserId !== userId) {
        return res.status(403).json({ error: "You can only access your own projects" });
      }

      const projects = await prisma.project.findMany({
        where: { userId },
      });

      return res.status(200).json({ projects });
    }

    if (method === "DELETE") {
      const { id } = query;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const projectToDelete = await prisma.project.findUnique({
        where: { id },
      });

      if (projectToDelete && projectToDelete.image) {
        const imagePath = path.join(process.cwd(), 'public', projectToDelete.image);
        await unlink(imagePath).catch(console.error);
      }

      const deletedProject = await prisma.project.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: "Project deleted successfully",
        id: deletedProject.id,
      });
    }

    if (method === "PATCH") {
      const { fields, files } = await parseForm(req);
      const { id } = query;
      
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const link = Array.isArray(fields.link) ? fields.link[0] : fields.link;
      const githubLink = Array.isArray(fields.githubLink) ? fields.githubLink[0] : fields.githubLink;
   

      if (!id || !title || !description) {
        return res.status(400).json({ error: "id, title, and description are required" });
      }

      const existingProject = await prisma.project.findUnique({
        where: { id },
      });

      if (!existingProject) {
        return res.status(404).json({ error: "Project not found" });
      }

      let imagePath = existingProject.image;
      const uploadedFile = files.image && files.image[0];

      if (uploadedFile) {
        try {
          if (existingProject.image) {
            const oldImagePath = path.join(process.cwd(), 'public', existingProject.image);
            await unlink(oldImagePath).catch(console.error);
          }

          const userUploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
          const fileExtension = path.extname(uploadedFile.originalFilename || uploadedFile.newFilename || '.jpg');
          const fileName = `${fields.title}${fileExtension}`;
          const finalPath = path.join(userUploadDir, fileName);

          const fileData = await readFile(uploadedFile.filepath);
          await writeFile(finalPath, fileData);
          await unlink(uploadedFile.filepath).catch(console.error);
          
          imagePath = `/uploads/projects/${fileName}`;
        } catch (uploadError) {
          console.error("Error saving file:", uploadError);
          return res.status(400).json({
            error: "File save failed",
            details: uploadError.message,
          });
        }
      }

      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          userId,
          title,
          description,
          link,
          githubLink,
          image: imagePath,
        },
      });

      return res.status(200).json({ success: true, updatedProject });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}