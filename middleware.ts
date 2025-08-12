import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
  console.log("MIDDLEWARE :", request.url);

  if (request.method === "POST") {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  // Allow access to login and register routes for everyone
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    // If user is already logged in, redirect to home
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // If user is not logged in, allow access to login/register
    return NextResponse.next();
  }

  // For admin routes, check if user is logged in and is admin
  if (request.nextUrl.pathname.startsWith("/admin-dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decodedToken = decodeJwt(token);
    if (!decodedToken.admin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard/:path*", "/login", "/register"],
};
