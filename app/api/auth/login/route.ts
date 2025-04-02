import { type NextRequest, NextResponse } from "next/server"
import { validateCredentials, createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Validate credentials
    const user = await validateCredentials(email, password)

    if (!user) {
      return NextResponse.json({ message: "Email hoặc mật khẩu không đúng" }, { status: 401 })
    }
    // Create session
    await createSession(user.id.toString())

    return NextResponse.json({
      message: "Đăng nhập thành công", 
      user,
    })
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Đăng nhập không thành công. Vui lòng thử lại sau." }, { status: 500 })
  }
}

