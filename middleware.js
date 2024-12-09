import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  console.log(token);
  if (!token) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    return new NextResponse("Not authenticated", { status: 401 });
  }
}

export const config = {
  matcher: [
    "/profile/dashboard",
    "/profile/details",
    "/profile/links",
    "/profile/resume",
    "/profile/socials",
    // "/api/:path*",
  ],
};
