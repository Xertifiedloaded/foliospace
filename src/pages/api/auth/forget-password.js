import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../../../../utils/sendEmail";
import { transporter } from "../../../../lib/nodemailer";

export default async function handler(req, res) {
  await databaseConnection();

  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetToken = uuidv4();
      const resetTokenExpiry = new Date();
      resetTokenExpiry.setMinutes(resetTokenExpiry.getMinutes() + 10);

      await prisma.user.update({
        where: { email },
        data: {
          verificationToken: resetToken,
          verificationTokenExpiry: resetTokenExpiry,
        },
      });

      const resetLink = `https://foliospace.vercel.app/auth/${resetToken}`;
      const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4caf50;">Password Reset Request</h1>
        <p>Hi ${user.name},</p>
        <p>You requested to reset your password. Please click the link below to reset it:</p>
        <a href="${resetLink}" style="display: inline-block; margin: 10px 0; padding: 10px 15px; color: white; background-color: #4caf50; border-radius: 5px; text-decoration: none;">Reset Password</a>
        <p>If you didn't request this, please ignore this email. This link is valid for 10 minutes.</p>
      </div>
    `;

      await transporter.sendMail({
        from: "noreply@foliospace.com",
        to: email,
        subject: "Verify Your Account - foliospace",
        html: emailContent,
      });

      res.status(200).json({ message: "Reset link sent successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error sending reset link", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
