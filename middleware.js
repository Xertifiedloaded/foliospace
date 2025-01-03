import { NextResponse } from "next/server";
import { getSession } from "next-auth/react"; 

export async function middleware(req) {
  const protectedPaths = ['/auth/login', '/auth/signup', '/auth/forgot-password'];
  const session = await getSession({ req });

  // path is protected and the user is already authenticated, redirect them
  if (protectedPaths.includes(req.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL('/profile/dashboard', req.url));
  }

  // path is protected and the user is not authenticated, redirect to the login page
  if (protectedPaths.includes(req.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*'],
};
