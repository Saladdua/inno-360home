import { type NextRequest, NextResponse } from "next/server";
import { getAllNews, createNews } from "@/lib/news-service-combined";
import { getCurrentUser } from "@/lib/auth";

// GET /api/news - Get all news items
export async function GET(request: NextRequest) {
  try {
    const news = await getAllNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

// POST /api/news - Create a new news item (protected)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Ensure date is a Date object if provided
    if (data.date) {
      data.date = new Date(data.date);
    }

    const id = await createNews(data);

    return NextResponse.json({ id, ...data }, { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
