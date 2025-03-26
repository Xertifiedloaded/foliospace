import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { generateOTP } from "../../../../lib/GenerateOtp";
import { transporter } from "../../../../lib/nodemailer";
import { generateEmailContent } from "../../../../utils/emailContent";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const otp = generateOTP(4);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 
    await prisma.user.update({
      where: { email },
      data: { otp, otpExpiry },
    });

    const OTPverificationToken = jwt.sign({ otp }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const verificationLink = `https://www.foliospace.org.ng/auth/verification/${OTPverificationToken}`;
    const emailContent = generateEmailContent(otp);

    await transporter.sendMail({
      from: "noreply@foliospace.com",
      to: email,
      subject: "Resend OTP - foliospace",
      html: emailContent,
    });

    return res.status(200).json({
      message: "A new OTP has been sent. Check your email (including spam folder).",
      verificationLink,
      otp
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return res.status(500).json({
      message: "Failed to resend OTP.",
      error: error.message,
    });
  }
}
