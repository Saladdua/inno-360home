import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "@/lib/token"

// Add paths that require authentication
const protectedPaths = [
  "/profile",
  "/dashboard",
  "/settings"
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path requires authentication
  if (protectedPaths.some(protectedPath => path.startsWith(protectedPath))) {
    const token = await getToken()

    if (!token) {
      // Redirect to login page if no token is found
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("callbackUrl", path)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}

