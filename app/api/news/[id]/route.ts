import { type NextRequest, NextResponse } from "next/server"
import { getNewsById, updateNews, deleteNews } from "@/lib/news-service"

// GET /api/news/[id] - Get a specific news item
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const news = await getNewsById(id)

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

// PUT /api/news/[id] - Update a news item (protected)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const data = await request.json()

    // Ensure date is a Date object if provided
    if (data.date) {
      data.date = new Date(data.date)
    }

    await updateNews(id, data)

    return NextResponse.json({ id, ...data })
  } catch (error) {
    console.error("Error updating news:", error)
    return NextResponse.json({ error: "Failed to update news" }, { status: 500 })
  }
}

// DELETE /api/news/[id] - Delete a news item (protected)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    await deleteNews(id)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting news:", error)
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 })
  }
}

