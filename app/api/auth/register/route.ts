import { type NextRequest, NextResponse } from "next/server"
import { signUp } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Vui lòng điền đầy đủ thông tin" }, { status: 400 })
    }

    // Register user
    const user = await signUp(email, password, name)

    if (!user) {
      return NextResponse.json({ message: "Email đã được sử dụng" }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: "Đăng ký thành công",
        user,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Đăng ký không thành công. Vui lòng thử lại sau." }, { status: 500 })
  }
}

