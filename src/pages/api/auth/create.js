import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { generateOTP } from "../../../../lib/GenerateOtp";
import { generateEmailContent } from "../../../../utils/emailContent";
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
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2934}-\u{2935}\u{3030}\u{2B06}\u{2194}\u{25AA}\u{25AB}\u{2B1B}\u{2B1C}\u{25FE}\u{25FB}\u{2B50}\u{1F004}-\u{1F0CF}\u{1F201}-\u{1F251}\u{1F004}-\u{1F0CF}\u{1F0D0}-\u{1F0FF}\u{23F0}]/u;
    if (emojiRegex.test(username)) {
      return res.status(400).json({ message: "Username cannot contain emoji characters." });
    }
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
  
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });
  
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }
  
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
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
    const verificationLink = `https://www.foliospace.org.ng/auth/verification/${OTPverificationToken}`;

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
