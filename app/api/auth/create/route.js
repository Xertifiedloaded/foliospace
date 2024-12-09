import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import {  cookiesSerialize, generateToken } from "../../../../middlware/helper.js";

const prisma = new PrismaClient();

export default async function POST(req) {
  const { username, name, email, password, confirmPassword } = await req.json();

  if (!username || !name || !email || !password || !confirmPassword) {
    return new Response(
      JSON.stringify({ message: "All fields are required." }),
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return new Response(
      JSON.stringify({ message: "Passwords do not match." }),
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists." }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user);
    const cookie = cookiesSerialize(token);


    return new Response(
      JSON.stringify({
        message: "User created successfully",
        user: { ...user, password: undefined }, 
        token,
      }),
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({
        message: "Registration failed.",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
