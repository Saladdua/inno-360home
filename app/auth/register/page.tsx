"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Mail, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function RegisterPage() {
  const router = useRouter()
  const { register, error, clearError } = useAuth()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [localError, setLocalError] = useState("")
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLocalError("") // Clear error when user types
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError("")
    setLoading(true)

    // Validate form
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setLocalError("Vui lòng điền đầy đủ thông tin")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Mật khẩu không khớp")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setLocalError("Mật khẩu phải có ít nhất 6 ký tự")
      setLoading(false)
      return
    }

    try {
      // Register with Firebase
      const userCredential = await register(formData.username, formData.email, formData.password)

      if (!userCredential || !userCredential.user) {
        throw new Error("Registration failed")
      }

      // Also save to MySQL database
      try {
        console.log("Syncing user to MySQL...")
        const response = await fetch("/api/auth/sync-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.username,
            email: formData.email,
            password: formData.password,
            firebaseUid: userCredential.user.uid,
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          console.error("MySQL sync error:", data)
          // We don't throw here because Firebase registration succeeded
        } else {
          console.log("User synced to MySQL successfully")
        }
      } catch (mysqlError) {
        console.error("MySQL sync error:", mysqlError)
        // We don't throw here because Firebase registration succeeded
      }

      // Redirect to login page with success message
      router.push("/auth/login?registered=true")
    } catch (error: any) {
      console.error("Registration error:", error)

      // Handle Firebase specific errors
      if (error.code === "auth/email-already-in-use") {
        setLocalError("Email đã được sử dụng")
      } else if (error.code === "auth/invalid-email") {
        setLocalError("Email không hợp lệ")
      } else if (error.code === "auth/operation-not-allowed") {
        setLocalError("Đăng ký tạm thời không khả dụng")
      } else if (error.code === "auth/weak-password") {
        setLocalError("Mật khẩu không đủ mạnh")
      } else {
        setLocalError(error.message || "Đăng ký không thành công. Vui lòng thử lại sau.")
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
            <Link href="/" passHref>
              <Image src="/logo.png" alt="360HOME Logo" width={120} height={40} className="cursor-pointer" />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-teal-700 mb-2">ĐĂNG KÝ 360HOME</h2>
          <p className="text-gray-600 mb-6">
            360HOME cam kết bảo mật thông tin khách hàng, không sử dụng thông tin khách hàng vào mục đích khác.
          </p>

          {localError && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">{localError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Username field */}
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    placeholder="TÀI KHOẢN"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Email field */}
              <div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-MAIL"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="MẬT KHẨU"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password field */}
              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="NHẬP LẠI MẬT KHẨU"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ TÀI KHOẢN"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Đã có tài khoản?{" "}
              <Link href="/auth/login" passHref className="text-teal-700 hover:underline">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

