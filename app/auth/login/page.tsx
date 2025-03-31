"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Mail, Eye, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered")
  const resetSuccess = searchParams.get("resetSuccess")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (registered) {
      setSuccess("Đăng ký thành công! Vui lòng đăng nhập.")
    }
    if (resetSuccess) {
      setSuccess("Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.")
    }
  }, [registered, resetSuccess])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("") // Clear error when user types
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    // Validate form
    if (!formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin")
      setLoading(false)
      return
    }

    try {
      // Sign in with NextAuth
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      // Redirect to home page
      router.push("/")
      router.refresh()
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Email hoặc mật khẩu không chính xác")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error: any) {
      console.error("Google sign-in error:", error)
      setError("Đăng nhập với Google không thành công. Vui lòng thử lại sau.")
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
            <Image
              src="/logo.png"
              alt="360HOME Logo"
              width={120}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>

          <h2 className="text-2xl font-bold text-teal-700 mb-2">ĐĂNG NHẬP 360HOME</h2>
          <p className="text-gray-600 mb-6">Đăng nhập để trải nghiệm đầy đủ các tính năng của 360HOME</p>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">{error}</div>}

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

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-teal-700 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="text-teal-700 hover:underline">
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-70"
          >
            <Image src="/google-logo.png" alt="Google" width={20} height={20} />
            <span>Google</span>
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{" "}
              <Link href="/auth/register" className="text-teal-700 hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

