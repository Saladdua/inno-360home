import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    // Validate input
    if (!token || !password) {
      return NextResponse.json({ message: "Vui lòng điền đầy đủ thông tin" }, { status: 400 })
    }

    // Find token in database
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    })

    // Check if token exists and is valid
    if (!passwordResetToken || passwordResetToken.expires < new Date()) {
      return NextResponse.json({ message: "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn" }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await hash(password, 10)

    // Update user password
    await db.user.update({
      where: { id: passwordResetToken.userId },
      data: { password: hashedPassword },
    })

    // Delete token
    await db.passwordResetToken.delete({
      where: { id: passwordResetToken.id },
    })

    return NextResponse.json({ message: "Đặt lại mật khẩu thành công" }, { status: 200 })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ message: "Đặt lại mật khẩu không thành công. Vui lòng thử lại sau." }, { status: 500 })
  }
}

