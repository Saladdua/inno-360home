import { type NextRequest, NextResponse } from "next/server"
import { validateCredentials, createSession } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Vui lòng điền đầy đủ thông tin" }, { status: 400 })
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

