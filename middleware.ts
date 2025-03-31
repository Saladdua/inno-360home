import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/settings"]

  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !sessionToken) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // Auth routes that should redirect to dashboard if user is authenticated
  const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"]

  // Check if the route is an auth route and user is authenticated
  if (authRoutes.some((route) => pathname.startsWith(route)) && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
}

