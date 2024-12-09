import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies.token;
  if (!token) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return new NextResponse(
      JSON.stringify({ message: "Token is valid", decoded }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
