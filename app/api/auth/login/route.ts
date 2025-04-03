import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { db } from "@/lib/db"
import { createToken } from "@/lib/token"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Find or create user in database
    let user = await db.user.findUnique({
      where: { firebaseUid: firebaseUser.uid }
    })

    if (!user) {
      user = await db.user.create({
        data: {
          email: firebaseUser.email!,
          name: firebaseUser.displayName || '',
          firebaseUid: firebaseUser.uid,
          password: '',
        }
      })
    }

    // Create token
    await createToken(user.id.toString(), firebaseUser.uid)

    return NextResponse.json({
      message: "Đăng nhập thành công",
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error: any) {
    console.error("Login error:", error)
    if (error.code === 'auth/invalid-credential') {
      return NextResponse.json({ message: "Email hoặc mật khẩu không đúng" }, { status: 401 })
    }
    return NextResponse.json({ message: "Đăng nhập không thành công. Vui lòng thử lại sau." }, { status: 500 })
  }
}

