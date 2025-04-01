"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import NewsForm from "@/components/news-form"
import type { NewsItem } from "@/lib/news-service"

export default function EditNewsPage() {
  const params = useParams()
  const id = params.id as string

  const [news, setNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`/api/news/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch news")
        }
        const data = await response.json()
        setNews(data)
      } catch (error) {
        console.error("Error fetching news:", error)
        setError("Failed to load news. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchNews()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      </div>
    )
  }

  return <NewsForm initialData={news!} isEditing />
}

