import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/firebase-admin"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value || ""

  // Verify the session cookie
  try {
    if (!session) {
      return redirectToLogin(request)
    }

    const decodedClaims = await auth.verifySessionCookie(session)

    // Check if the route requires admin access
    if (request.nextUrl.pathname.startsWith("/admin")) {
      // Get custom claims to check if user is admin
      const userRecord = await auth.getUser(decodedClaims.uid)
      const customClaims = userRecord.customClaims || {}

      if (!customClaims.admin) {
        // Redirect to home page if not admin
        return NextResponse.redirect(new URL("/", request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    return redirectToLogin(request)
  }
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = "/auth/login"
  url.searchParams.set("redirectTo", request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
}

