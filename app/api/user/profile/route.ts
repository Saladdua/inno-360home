import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { hash, compare } from "bcrypt"
import { db } from "@/lib/db"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PUT(req: NextRequest) {
  try {
    // Get session
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Bạn chưa đăng nhập" }, { status: 401 })
    }

    const { name, email, currentPassword, newPassword } = await req.json()

    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ message: "Người dùng không tồn tại" }, { status: 404 })
    }

    // Check if trying to change password
    if (newPassword) {
      // Verify current password
      if (!user.password) {
        return NextResponse.json({ message: "Tài khoản của bạn không sử dụng mật khẩu" }, { status: 400 })
      }

      const isPasswordValid = await compare(currentPassword, user.password)

      if (!isPasswordValid) {
        return NextResponse.json({ message: "Mật khẩu hiện tại không chính xác" }, { status: 400 })
      }

      // Hash new password
      const hashedPassword = await hash(newPassword, 10)

      // Update user with new password
      await db.user.update({
        where: { id: user.id },
        data: {
          name: name || user.name,
          password: hashedPassword,
        },
      })
    } else {
      // Just update name and/or email
      // Check if email is being changed and if it's already in use
      if (email !== user.email) {
        const existingUser = await db.user.findUnique({
          where: { email },
        })

        if (existingUser) {
          return NextResponse.json({ message: "Email đã được sử dụng bởi tài khoản khác" }, { status: 400 })
        }
      }

      // Update user
      await db.user.update({
        where: { id: user.id },
        data: {
          name: name || user.name,
          email: email || user.email,
        },
      })
    }

    return NextResponse.json({ message: "Cập nhật thông tin thành công" }, { status: 200 })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ message: "Cập nhật thông tin không thành công. Vui lòng thử lại sau." }, { status: 500 })
  }
}

