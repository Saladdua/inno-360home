import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db"

// Token duration in seconds (7 days)
const TOKEN_DURATION = 7 * 24 * 60 * 60

export async function createToken(userId: string, firebaseUid: string) {
  // Generate a unique token
  const token = uuidv4()

  // Calculate expiry date (7 days from now)
  const expires = new Date(Date.now() + TOKEN_DURATION * 1000)

  // Create token in database
  await db.token.create({
    data: {
      token,
      userId: parseInt(userId),
      firebaseUid,
      expires,
    },
  })

  // Set token cookie
  ;(await cookies()).set("auth_token", token, {
    httpOnly: true,
    expires,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  return { token, expires }
}

export async function getToken() {
  const token = (await cookies()).get("auth_token")?.value

  if (!token) {
    return null
  }

  const tokenData = await db.token.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!tokenData) {
    return null
  }

  // Check if token is expired
  if (tokenData.expires < new Date()) {
    await db.token.delete({ where: { id: tokenData.id } })
    ;(await cookies()).delete("auth_token")
    return null
  }

  return tokenData
}

export async function destroyToken() {
  const token = (await cookies()).get("auth_token")?.value

  if (token) {
    await db.token.delete({
      where: { token },
    })
  }

  ;(await cookies()).delete("auth_token")
} 