import { type NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { db } from "@/lib/db"
import { sendEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    // Validate input
    if (!email) {
      return NextResponse.json({ message: "Vui lòng nhập địa chỉ email" }, { status: 400 })
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal that the user doesn't exist for security reasons
      return NextResponse.json(
        { message: "Nếu địa chỉ email tồn tại, bạn sẽ nhận được email đặt lại mật khẩu" },
        { status: 200 },
      )
    }

    // Generate reset token
    const token = randomUUID()
    const expires = new Date(Date.now() + 3600000) // 1 hour

    // Save token to database
    await db.passwordResetToken.upsert({
      where: { userId: user.id },
      update: {
        token,
        expires,
      },
      create: {
        userId: user.id,
        token,
        expires,
      },
    })

    // Send email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`

    await sendEmail({
      to: email,
      subject: "Đặt lại mật khẩu 360HOME",
      html: `
        <div>
          <h1>Đặt lại mật khẩu</h1>
          <p>Nhấn vào liên kết bên dưới để đặt lại mật khẩu của bạn:</p>
          <a href="${resetUrl}">Đặt lại mật khẩu</a>
          <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
          <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        </div>
      `,
    })

    return NextResponse.json(
      { message: "Nếu địa chỉ email tồn tại, bạn sẽ nhận được email đặt lại mật khẩu" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { message: "Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau." },
      { status: 500 },
    )
  }
}

