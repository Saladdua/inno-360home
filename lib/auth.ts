import { db } from "@/lib/db"
import { compare, hash } from "bcryptjs"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import type { User } from "@prisma/client"

// Session duration in seconds (7 days)
const SESSION_DURATION = 7 * 24 * 60 * 60

export type SafeUser = Omit<User, "password">

export async function createSession(userId: string) {
  // Generate a unique session token
  const sessionToken = uuidv4()

  // Calculate expiry date (7 days from now)
  const expires = new Date(Date.now() + SESSION_DURATION * 1000)

  // Create session in database
  await db.session.create({
    data: {
      sessionToken,
      userId: parseInt(userId),
      expires,
    },
  })

  // Set session cookie
  ;(await
        // Set session cookie
        cookies()).set("session_token", sessionToken, {
    httpOnly: true,
    expires,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  return { sessionToken, expires }
}

export async function getSession() {
  const sessionToken = (await cookies()).get("session_token")?.value

  if (!sessionToken) {
    return null
  }

  const session = await db.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  })

  if (!session) {
    return null
  }

  // Check if session is expired
  if (session.expires < new Date()) {
    await db.session.delete({ where: { id: session.id } })
    ;(await cookies()).delete("session_token")
    return null
  }

  return session
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const session = await getSession()

  if (!session) {
    return null
  }

  const { password, ...safeUser } = session.user
  return safeUser
}

export async function validateCredentials(email: string, password: string): Promise<SafeUser | null> {
  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user || !user.password) {
    return null
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    return null
  }

  const { password: _, ...safeUser } = user
  return safeUser
}

export async function destroySession() {
  const sessionToken = (await cookies()).get("session_token")?.value

  if (sessionToken) {
    await db.session.delete({
      where: { sessionToken },
    })
  }

  (await cookies()).delete("session_token")
}

export async function signUp(
  email: string,
  password: string,
  name: string,
): Promise<SafeUser | null> {
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return null
    }

    const hashedPassword = await hash(password, 10)

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    const { password: _, ...safeUser } = user
    return safeUser
  } catch (error) {
    console.error("Registration error:", error)
    return null
  }
}

export async function resetPassword(email: string): Promise<boolean> {
  try {
    // Check if user exists
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return false
    }

    return true
  } catch (error) {
    console.error("Reset password error:", error)
    return false
  }
}

export async function updateUserProfile(userId: number, data: Partial<User>): Promise<SafeUser | null> {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data,
    })
    const { password: _, ...safeUser } = user
    return safeUser
  } catch (error) {
    console.error("Profile update error:", error)
    return null
  }
}

export type { User }

