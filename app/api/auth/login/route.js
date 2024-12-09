import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";
import { comparePassword, cookiesSerialize, generateToken } from "../../../../middlware/helper.js";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password are required." }),
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found." }),
        { status: 404 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid password." }),
        { status: 401 }
      );
    }

    const token = generateToken(user);
    const cookie = cookiesSerialize(token);

    return new Response(
      JSON.stringify({
        user: { ...user, password: undefined }, 
        token,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({
        message: "Login failed.",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
