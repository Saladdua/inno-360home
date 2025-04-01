"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { NewsItem } from "@/lib/news-service"
import Image from "next/image"

interface NewsFormProps {
  initialData?: NewsItem
  isEditing?: boolean
}

export default function NewsForm({ initialData, isEditing = false }: NewsFormProps) {
  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: "",
    description: "",
    content: "",
    image: "",
    date: new Date(),
    icon: "/logo.png",
    link: "",
    featured: false,
    category: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { user } = useAuth()
  const router = useRouter()

  // Initialize form with existing data if editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      if (initialData.image) {
        setImagePreview(initialData.image)
      }
    }
  }, [initialData])

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    }

    // Add your admin check logic here
    const isAdmin = user?.email === "admin@example.com" // Replace with your admin check

    if (!isAdmin) {
      router.push("/")
    }
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload this to storage and get a URL
      // For now, we'll just create a local preview
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.image) {
        throw new Error("Please fill in all required fields")
      }

      // Get user token for authorization
      const token = await user?.getIdToken()

      const url = isEditing && initialData?.id ? `/api/news/${initialData.id}` : "/api/news"

      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save news")
      }

      setSuccess(isEditing ? "News updated successfully!" : "News created successfully!")

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/news")
      }, 2000)
    } catch (error: any) {
      console.error("Error saving news:", error)
      setError(error.message || "Failed to save news. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{isEditing ? "Edit News" : "Create News"}</h1>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">{error}</div>}

      {success && <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 md:col-span-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image *
            </label>
            <input
              type="file"
              id="image"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
            />
            {imagePreview && (
              <div className="mt-2 relative h-40 w-full">
                <Image
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
            <p className="mt-1 text-sm text-gray-500">Or enter image URL:</p>
            <input
              type="text"
              name="image"
              value={typeof formData.image === "string" ? formData.image : ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date instanceof Date ? formData.date.toISOString().split("T")[0] : ""}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="">Select a category</option>
                <option value="design">Design</option>
                <option value="projects">Projects</option>
                <option value="trends">Trends</option>
                <option value="tips">Tips</option>
              </select>
            </div>

            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                External Link
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link || ""}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={!!formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content || ""}
              onChange={handleChange}
              rows={10}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/admin/news")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70"
          >
            {loading ? "Saving..." : isEditing ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  )
}

