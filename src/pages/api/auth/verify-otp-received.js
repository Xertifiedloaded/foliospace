import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {

  if (req.method === "POST") {
    const { otp } = req.body
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" })
    }
    try {
      const user = await prisma.user.findFirst({
        where: { otp },
      })
      if (!user) {
        return res.status(400).json({ message: "Invalid OTP" })
      }
      if (new Date() > user.otpExpiry) {
        return res.status(400).json({ message: "OTP expired" })
      }
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          otp: null,
          otpExpiry: null,
        },
      })
      const updatedUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          email: true,
          isVerified: true,
        },
      })
      
      res
        .status(200)
        .json({ message: `${updatedUser} OTP verified successfully `})
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}