import { NextResponse } from "next/server"
import { query } from "@/lib/mysql"

export async function GET() {
  try {
    // Try to query the database
    const result = await query("SELECT 1 as test")

    // If successful, return a success message
    return NextResponse.json({
      status: "success",
      message: "Database connection successful!",
      result,
    })
  } catch (error) {
    console.error("Database connection error:", error)

    // If there's an error, return the error details
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to database",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

