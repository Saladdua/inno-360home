"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface MainNavProps {
  onLoginClick: () => void
}

export default function MainNav({ onLoginClick }: MainNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white py-4 px-6 flex items-center justify-between shadow-sm relative z-20">
      <div className="flex items-center">
        <Link href="/" className="mr-8">
          <Image src="/logo.png" alt="360HOME Logo" width={120} height={40} className="h-10 w-auto" />
        </Link>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/why-us" className="text-teal-700 hover:text-teal-600">
            LÝ DO LỰA CHỌN 360HOME
          </Link>
          <Link href="https://360home.vn/xu-huong-thiet-ke-noi-that/" className="text-teal-700 hover:text-teal-600">
            XU HƯỚNG THIẾT KẾ NỘI THẤT
          </Link>
          <Link href="https://360home.vn/du-an/" className="text-teal-700 hover:text-teal-600">
            DỰ ÁN
          </Link>
          <Link href="https://360home.vn/tin-tuc" className="text-teal-700 hover:text-teal-600">
            TIN TỨC
          </Link>
          <Link href="https://360home.vn/danh-cho-kts/" className="text-teal-700 hover:text-teal-600">
            DÀNH CHO KTS
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/contact"
          className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition-colors hidden md:block"
        >
          LIÊN HỆ TƯ VẤN
        </Link>
        <button
          onClick={onLoginClick}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors hidden md:block"
        >
          ĐĂNG NHẬP
        </button>
        <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md z-50 md:hidden">
          <div className="flex flex-col p-4">
            <Link
              href="/why-us"
              className="py-2 text-teal-700 hover:text-teal-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              LÝ DO LỰA CHỌN 360HOME
            </Link>
            <Link
              href="/design-trends"
              className="py-2 text-teal-700 hover:text-teal-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              XU HƯỚNG THIẾT KẾ NỘI THẤT
            </Link>
            <Link
              href="/projects"
              className="py-2 text-teal-700 hover:text-teal-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              DỰ ÁN
            </Link>
            <Link
              href="/news"
              className="py-2 text-teal-700 hover:text-teal-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              TIN TỨC
            </Link>
            <Link
              href="/for-architects"
              className="py-2 text-teal-700 hover:text-teal-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              DÀNH CHO KTS
            </Link>
            <div className="flex flex-col space-y-2 mt-4">
              <Link
                href="/contact"
                className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                LIÊN HỆ TƯ VẤN
              </Link>
              <button
                onClick={() => {
                  onLoginClick()
                  setMobileMenuOpen(false)
                }}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                ĐĂNG NHẬP
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

