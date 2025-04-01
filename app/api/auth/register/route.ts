import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcrypt"
import { db } from "@/lib/db"
import { auth } from "@/lib/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Vui lòng điền đầy đủ thông tin" }, { status: 400 })
    }

    // Check if user already exists in database
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Email đã được sử dụng" }, { status: 400 })
    }

    // Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Update Firebase user profile
    await updateProfile(firebaseUser, {
      displayName: name
    })

    // Hash password for database
    const hashedPassword = await hash(password, 10)

    // Create user in database
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // firebaseUid: firebaseUser.uid
      },
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "Đăng ký thành công",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    
    // Handle Firebase specific errors
    if (error.code === 'auth/email-already-in-use') {
      return NextResponse.json({ message: "Email đã được sử dụng" }, { status: 400 })
    }
    
    return NextResponse.json({ message: "Đăng ký không thành công. Vui lòng thử lại sau." }, { status: 500 })
  }
}
