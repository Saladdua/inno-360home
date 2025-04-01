"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ForgotPasswordPage() {
  const { forgotPassword, error, clearError } = useAuth()
  const [email, setEmail] = useState("")
  const [localError, setLocalError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  // Clear errors when component mounts or unmounts
  useEffect(() => {
    clearError()
    return () => clearError()
  }, [clearError])

  // Update local error when context error changes
  useEffect(() => {
    if (error) {
      setLocalError(error)
    }
  }, [error])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError("")
    setSuccess("")
    setLoading(true)

    // Validate email
    if (!email) {
      setLocalError("Vui lòng nhập địa chỉ email")
      setLoading(false)
      return
    }

    try {
      await forgotPassword(email)
      setSuccess("Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.")
      setEmail("")
    } catch (error: any) {
      console.error("Password reset error:", error)

      if (error.code === "auth/invalid-email") {
        setLocalError("Email không hợp lệ")
      } else if (error.code === "auth/user-not-found") {
        // For security reasons, we still show success message even if user doesn't exist
        setSuccess("Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.")
        setEmail("")
      } else {
        setLocalError("Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/auth-background.jpg')] bg-cover bg-center">
      <div className="max-w-5xl w-full mx-4 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="md:w-2/5 relative hidden md:block">
          <Image src="/interior-living-room.jpg" alt="Interior Design" fill className="object-cover" />
        </div>

        {/* Right side - Form */}
        <div className="md:w-3/5 p-8">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="360HOME Logo" width={120} height={40} />
          </div>

          <h2 className="text-2xl font-bold text-teal-700 mb-2">QUÊN MẬT KHẨU</h2>
          <p className="text-gray-600 mb-6">Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu</p>

          {localError && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">{localError}</div>}

          {success && <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email field */}
              <div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-MAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? "ĐANG XỬ LÝ..." : "GỬI LIÊN KẾT ĐẶT LẠI MẬT KHẨU"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              <Link href="/auth/login" passHref className="text-teal-700 hover:underline">
                Quay lại đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

