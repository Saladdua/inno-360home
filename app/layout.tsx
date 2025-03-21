import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "360HOME - Nền tảng kết nối hoàn thiện nội thất toàn diện",
  description: "Giải pháp hoàn hảo, tối ưu chi phí cho ngôi nhà của bạn!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'