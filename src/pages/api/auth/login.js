
import { PrismaClient } from "@prisma/client";
import { comparePassword, cookiesSerialize, generateToken } from "../../../../middlware/helper.js";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      const token = generateToken(user);
      const cookie = cookiesSerialize(token);

      res.setHeader("Set-Cookie", cookie);

      return res.status(200).json({
        user: { ...user, password: undefined },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        message: "Login failed.",
        error: error.message,
      });
    }
  } else {
    // Handle any other HTTP method (if needed)
    return res.status(405).json({ message: "Method not allowed." });
  }
}
