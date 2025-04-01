"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { NewsItem } from "@/lib/news-service"
import { formatDate } from "@/lib/utils"
import { Trash2, Edit, Plus } from "lucide-react"

export default function NewsAdminPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  // Check if user is admin (you'll need to implement this logic)
  const isAdmin = user?.email === "admin@example.com" // Replace with your admin check

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (!isAdmin) {
      router.push("/")
      return
    }

    // Fetch news
    async function fetchNews() {
      try {
        const response = await fetch("/api/news")
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

    fetchNews()
  }, [user, isAdmin, router])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) {
      return
    }

    try {
      // Get user token for authorization
      const token = await user?.getIdToken()

      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete news")
      }

      // Remove from state
      setNews(news.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error deleting news:", error)
      setError("Failed to delete news. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">News Management</h1>
        <button
          onClick={() => router.push("/admin/news/create")}
          className="bg-teal-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add News
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">{error}</div>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.description.substring(0, 100)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(item.date instanceof Date ? item.date : item.date.toDate())}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.featured ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {item.featured ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => router.push(`/admin/news/edit/${item.id}`)}
                    className="text-teal-600 hover:text-teal-900 mr-4"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(item.id!)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}

            {news.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No news items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

