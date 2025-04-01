"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar } from "lucide-react"
import type { NewsItem } from "@/lib/news-service"
import { formatDate } from "@/lib/utils"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [news, setNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

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

  if (error || !news) {
    return (
      <div className="min-h-screen">
        <MainNav onLoginClick={() => setShowLoginModal(true)} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 text-red-600 p-4 rounded-md">{error || "News not found"}</div>
          <div className="mt-4">
            <Link href="/news" className="text-teal-700 hover:underline flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to News
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <MainNav onLoginClick={() => setShowLoginModal(true)} />

      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4 max-w-4xl">{news.title}</h1>
          <div className="flex items-center text-gray-300">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(news.date instanceof Date ? news.date : news.date.toDate())}</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-8 font-medium">{news.description}</p>

              {news.content ? (
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
              ) : (
                <p className="text-gray-600">{news.description}</p>
              )}
            </div>

            {news.link && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-700">
                  Read more at:{" "}
                  <a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:underline"
                  >
                    {new URL(news.link).hostname}
                  </a>
                </p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link href="/news" className="text-teal-700 hover:underline flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to News
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </main>
  )
}

