import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import cloudinary from "cloudinary";
import formidable from "formidable";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOptions";

export const config = {
    api: {
        bodyParser: false,
    },
};

const prisma = new PrismaClient();

cloudinary.v2.config({
    cloud_name: 'djknvzync',
    api_key: "569228811476594",
    api_secret: "di4UhIUKiZ1QnmpSQLdKU8I9Oko",
});

const VALID_TYPES = ['awards', 'certifications'] as const;
type ValidType = typeof VALID_TYPES[number];

const isValidType = (type: string): type is ValidType => VALID_TYPES.includes(type as ValidType);

const parseForm = async (req: NextApiRequest) => {
    const form = formidable({ maxFileSize: 20 * 1024 * 1024, multiples: false });

    return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
};

const uploadImageToCloudinary = async (filePath: string, userId: string, type: 'award' | 'certification') => {
    try {
        const uploadResponse = await cloudinary.v2.uploader.upload(filePath, {
            folder: `portfolio/${type}-images`,
            public_id: `${userId}-${type}-${Date.now()}`,
            overwrite: true,
            transformation: [{ width: 800, height: 600, crop: "limit" }],
        });
        fs.unlinkSync(filePath);
        return uploadResponse.secure_url;
    } catch (error) {
        throw error;
    }
};

const validateRequestData = (fields: formidable.Fields, type: string) => {
    type = Array.isArray(type) ? type[0] : type;
    if (!isValidType(type)) return { valid: false, error: `Invalid type. Must be one of: ${VALID_TYPES.join(', ')}` };
    if (!fields.title || !fields.issuer) return { valid: false, error: 'Title and Issuer are required' };
    if (type === 'awards' && !fields.date) return { valid: false, error: 'Date is required for awards' };
    if (type === 'certifications' && !fields.issueDate) return { valid: false, error: 'Issue Date is required for certifications' };
    return { valid: true };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // @ts-ignore
        const session = await getServerSession(req, res, authOptions);
        if (!session || !session.user) return res.status(401).json({ error: "Unauthorized" });
        const userId = session.user.id;

        switch (req.method) {
            case "GET": {
                const type = Array.isArray(req.query.type) ? req.query.type[0] : req.query.type;
                // @ts-ignore
                if (!isValidType(type)) return res.status(400).json({ error: "Invalid type" });

                const items = type === "awards"
                    ? await prisma.award.findMany({ where: { userId } })
                    : await prisma.certification.findMany({ where: { userId } });

                return res.status(200).json(items);
            }

            case "POST": {
                const { fields, files } = await parseForm(req);
                const createType = Array.isArray(fields.type) ? fields.type[0] : fields.type;
                console.log(fields);
                console.log("Parsed Fields:", fields);
                console.log("Parsed Issue Date:", fields.issueDate?.[0]);
                console.log("Parsed Expiry Date:", fields.expiryDate?.[0]);
                console.log("Parsed Credential ID:", fields.credentialId?.[0]);

                console.log(createType);
                // @ts-ignore
                const validationResult = validateRequestData(fields, createType);
                if (!validationResult.valid) return res.status(400).json({ error: validationResult.error });

                const data: any = {
                    // @ts-ignore
                    title: fields.title[0],
                    // @ts-ignore
                    issuer: fields.issuer[0],
                    userId,
                    // @ts-ignore
                    description: fields.description ? fields.description[0] : undefined,
                    // @ts-ignore
                    url: fields.url ? fields.url[0] : undefined,
                };

                const uploadedFile = files.image ? (Array.isArray(files.image) ? files.image[0] : files.image) : null;
                if (uploadedFile) {
                    data.image = await uploadImageToCloudinary(uploadedFile.filepath, userId, createType === 'awards' ? 'award' : 'certification');
                }

                if (createType === 'awards') {
                    // @ts-ignore
                    data.date = new Date(fields.date[0]);
                    const award = await prisma.award.create({ data });
                    return res.status(201).json(award);
                } else {
                    data.issueDate = fields.issueDate?.[0] ? new Date(fields.issueDate[0]) : null;
                    if (fields.expiryDate?.[0]) data.expiryDate = new Date(fields.expiryDate[0]);
                    if (fields.credentialId) data.credentialId = fields.credentialId[0];
                    const certification = await prisma.certification.create({ data });
                    return res.status(201).json(certification);
                }
            }

            case "PUT": {
                const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
                const updateType = Array.isArray(req.query.type) ? req.query.type[0] : req.query.type;
                if (!id || !updateType) return res.status(400).json({ error: "Missing ID or type" });

                const { fields, files } = await parseForm(req);

                const validationResult = validateRequestData(fields, updateType);
                if (!validationResult.valid) return res.status(400).json({ error: validationResult.error });

                const data: any = {
                    // @ts-ignore
                    title: fields.title[0],
                    // @ts-ignore
                    issuer: fields.issuer[0],
                    // @ts-ignore
                    description: fields.description ? fields.description[0] : undefined,
                    // @ts-ignore
                    url: fields.url ? fields.url[0] : undefined,
                };

                const uploadedFile = files.image ? (Array.isArray(files.image) ? files.image[0] : files.image) : null;
                if (uploadedFile) {
                    data.image = await uploadImageToCloudinary(uploadedFile.filepath, userId, updateType === 'awards' ? 'award' : 'certification');
                }

                if (updateType === 'awards') {
                    // @ts-ignore
                    data.date = new Date(fields.date[0]);
                    const updatedAward = await prisma.award.update({ where: { id, userId }, data });
                    return res.status(200).json(updatedAward);
                } else {
                    // @ts-ignore
                    data.issueDate = new Date(fields.issueDate[0]);
                    // @ts-ignore
                    if (fields.expiryDate) data.expiryDate = new Date(fields.expiryDate[0]);
                    // @ts-ignore
                    if (fields.credentialId) data.credentialId = fields.credentialId[0];
                    const updatedCertification = await prisma.certification.update({ where: { id, userId }, data });
                    return res.status(200).json(updatedCertification);
                }
            }

            case "DELETE": {
                const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
                const deleteType = Array.isArray(req.query.type) ? req.query.type[0] : req.query.type;
                if (!id || !deleteType) return res.status(400).json({ error: "Missing ID or type" });

                if (deleteType === 'awards') {
                    await prisma.award.deleteMany({ where: { id, userId } });
                } else if (deleteType === 'certifications') {
                    await prisma.certification.deleteMany({ where: { id, userId } });
                } else {
                    return res.status(400).json({ error: "Invalid type" });
                }
                return res.status(200).json({ message: "Record deleted successfully" });
            }

            default:
                return res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        console.error("Server Error:", error);
        // @ts-ignore
        return res.status(500).json({ error: "Internal Server Error", details: error?.message });
    }
}
