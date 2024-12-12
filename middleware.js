import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  console.log("Token:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized?from=middleware", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode('mankindsnnjndjsnwulskidsnzjsdnj')
    );
    console.log("Token Payload:", payload);
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/unauthorized?from=middleware", req.url));
  }
}

export const config = {
  matcher: [
    "/profile/dashboard",
    "/profile/details",
    "/profile/links",
    "/profile/resume",
    "/profile/socials",
  ],
};
