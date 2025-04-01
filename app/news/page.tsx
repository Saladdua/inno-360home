"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Search } from "lucide-react"
import type { NewsItem } from "@/lib/news-service"
import { formatDate } from "@/lib/utils"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
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
  }, [])

  // Filter news based on search term
  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen">
      <MainNav onLoginClick={() => setShowLoginModal(true)} />

      {/* Hero Section */}
      <section className="relative h-[300px]">
        <div className="absolute inset-0">
          <Image src="/news-hero.jpg" alt="News" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Tin tức từ 360HOME</h1>
          <p className="text-xl max-w-2xl">
            Cập nhật thông tin mới nhất về thiết kế nội thất, xu hướng và dự án của chúng tôi
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
      </section>

      {/* News List Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No news found matching your search.</p>
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="mt-4 text-teal-700 hover:underline">
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(item.date instanceof Date ? item.date : item.date.toDate())}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </main>
  )
}

