import { type NextRequest, NextResponse } from "next/server"
import { destroySession } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    await destroySession()
    return NextResponse.json({ message: "Đăng xuất thành công" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Đăng xuất không thành công" }, { status: 500 })
  }
}

