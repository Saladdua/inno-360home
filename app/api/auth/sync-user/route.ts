import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { query } from "@/lib/mysql"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { email, name, password, provider, firebaseUid } = await req.json()

    console.log("Syncing user:", { email, name, provider, firebaseUid, hasPassword: !!password })

    // Check if user already exists in MySQL
    const existingUsers = await query("SELECT * FROM users WHERE email = ?", [email])

    // @ts-ignore
    if (existingUsers && existingUsers.length > 0) {
      // User already exists in MySQL, update firebaseUid if provided
      if (firebaseUid) {
        console.log("Updating existing user with firebaseUid:", email)
        await query("UPDATE users SET firebaseUid = ? WHERE email = ?", [firebaseUid, email])
      }

      console.log("User already exists in MySQL:", email)
      return NextResponse.json({ message: "User already exists" })
    }

    // Create user in MySQL
    let hashedPassword = null
    if (password) {
      hashedPassword = await hash(password, 10)
    }

    console.log("Creating user in MySQL:", email)
    await query("INSERT INTO users (email, password, name, firebaseUid) VALUES (?, ?, ?, ?)", [
      email,
      hashedPassword,
      name || email.split("@")[0],
      firebaseUid || null,
    ])

    // Also create user in Prisma if needed
    try {
      const existingPrismaUser = await db.user.findUnique({
        where: { email },
      })

      if (!existingPrismaUser) {
        console.log("Creating user in Prisma:", email)
        await db.user.create({
          data: {
            email,
            password: hashedPassword,
            name: name || email.split("@")[0],
          },
        })
      }
    } catch (prismaError) {
      console.error("Prisma user creation error:", prismaError)
      // Continue even if Prisma fails - we at least have the MySQL user
    }

    return NextResponse.json({ message: "User synchronized successfully" })
  } catch (error) {
    console.error("User sync error:", error)
    return NextResponse.json({ message: "Failed to synchronize user. Please try again later." }, { status: 500 })
  }
}

