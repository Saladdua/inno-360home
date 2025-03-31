"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { SafeUser } from "@/lib/auth"

type AuthContextType = {
  user: SafeUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string }>
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; message?: string }>
  updateProfile: (data: Partial<SafeUser>) => Promise<{ success: boolean; user?: SafeUser; message?: string }>
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Fetch the current user on initial load
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, message: data.message || "Đăng nhập không thành công" }
      }

      setUser(data.user)
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Đã xảy ra lỗi. Vui lòng thử lại sau." }
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, message: data.message || "Đăng ký không thành công" }
      }

      setUser(data.user)
      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "Đã xảy ra lỗi. Vui lòng thử lại sau." }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, message: data.message || "Yêu cầu đặt lại mật khẩu không thành công" }
      }

      return { success: true, message: data.message }
    } catch (error) {
      console.error("Forgot password error:", error)
      return { success: false, message: "Đã xảy ra lỗi. Vui lòng thử lại sau." }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (token: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, message: data.message || "Đặt lại mật khẩu không thành công" }
      }

      return { success: true, message: data.message }
    } catch (error) {
      console.error("Reset password error:", error)
      return { success: false, message: "Đã xảy ra lỗi. Vui lòng thử lại sau." }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<SafeUser>) => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return { success: false, message: errorData.message || "Cập nhật thông tin không thành công" }
      }

      const updatedUser = await response.json()
      setUser(updatedUser)
      return { success: true, user: updatedUser }
    } catch (error) {
      console.error("Profile update error:", error)
      return { success: false, message: "Đã xảy ra lỗi. Vui lòng thử lại sau." }
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, message: data.message || "Đổi mật khẩu không thành công" }
      }

      return { success: true, message: data.message }
    } catch (error) {
      console.error("Change password error:", error)
      return { success: false, message: "Đã xảy ra lỗi. Vui lòng thử lại sau." }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

