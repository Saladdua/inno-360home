import { type NextRequest, NextResponse } from "next/server"
import { getAllNews, createNews, getFeaturedNews } from "@/lib/news-service"

// GET /api/news - Get all news or featured news
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"
    const count = searchParams.get("count") ? Number.parseInt(searchParams.get("count")!) : undefined

    const news = featured ? await getFeaturedNews(count) : await getAllNews()

    return NextResponse.json(news)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

// POST /api/news - Create a new news item (protected)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // This is a simplified auth check - in production, you'd verify the token
    // with Firebase Admin SDK

    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.description || !data.image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Ensure date is a Date object
    if (data.date) {
      data.date = new Date(data.date)
    } else {
      data.date = new Date()
    }

    const id = await createNews(data)

    return NextResponse.json({ id, ...data }, { status: 201 })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 })
  }
}

