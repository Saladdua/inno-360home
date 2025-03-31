import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, updateUserProfile } from "@/lib/auth"

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Prevent updating sensitive fields
    delete data.id
    delete data.email
    delete data.role
    delete data.createdAt

    const updatedUser = await updateUserProfile(user.id, data)

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update profile" }, { status: 400 })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

