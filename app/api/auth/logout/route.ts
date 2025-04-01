import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { destroyToken } from "@/lib/token"

export async function POST(req: NextRequest) {
  try {
    // Sign out from Firebase
    await signOut(auth)
    
    // Destroy token
    await destroyToken()

    return NextResponse.json({ message: "Đăng xuất thành công" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Đăng xuất không thành công" }, { status: 500 })
  }
}

