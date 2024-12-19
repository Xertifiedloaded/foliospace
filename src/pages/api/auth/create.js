import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { generateOTP } from "../../../../lib/GenerateOtp";
import { generateEmailContent } from "../../../../utils/emailContent";
import sendEmail from "../../../../utils/sendEmail";
import { transporter } from "../../../../lib/nodemailer";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const { username, name, email, password, confirmPassword } = req.body;

  if (!username || !name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP(4);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const OTPverificationToken = jwt.sign({ otp }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
      },
    });
    // const verificationLink = `https://foliospace.vercel.app/auth/${OTPverificationToken}`;
    const verificationLink = `https://foliospace.vercel.app`;
    const emailContent = generateEmailContent(otp, verificationLink);

    await transporter.sendMail({
      from: "noreply@foliospace.com",
      to: email,
      subject: "Verify Your Account - foliospace",
      html: emailContent,
    });

    console.log(user);
    return res.status(201).json({
      message: "Account created successfully. Verification email sent.",
      data: {
        user,
        verificationLink,
        isVerified: false,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Registration failed.",
      error: error.message,
    });
  }
}
