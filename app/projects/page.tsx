"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageSquare, Mail, Phone } from "lucide-react"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"

export default function ProjectsPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")

  const projects = [
    {
      id: 1,
      title: "LUMI HANOI",
      category: "apartment",
      image: "/project1.jpg",
      logo: "/lumi-logo.png",
      description: "Thiết kế nội thất căn hộ cao cấp tại dự án LUMI HANOI",
    },
    {
      id: 2,
      title: "DIAMOND CROWN HẢI PHÒNG - DOJILAND",
      category: "apartment",
      image: "/project2.jpg",
      logo: "/diamond-logo.png",
      description: "Thiết kế và thi công nội thất căn hộ tại DIAMOND CROWN",
    },
    {
      id: 3,
      title: "HERITAGE WEST LAKE",
      category: "apartment",
      image: "/project3.jpg",
      logo: "/heritage-logo.png",
      description: "Hoàn thiện nội thất căn hộ cao cấp tại HERITAGE WEST LAKE",
    },
    {
      id: 4,
      title: "THE MINATO RESIDENT",
      category: "apartment",
      image: "/project4.jpg",
      logo: "/minato-logo.png",
      description: "Thiết kế nội thất hiện đại cho căn hộ THE MINATO RESIDENT",
    },
    {
      id: 5,
      title: "HOANG HUY COMMERCE",
      category: "commercial",
      image: "/project5.jpg",
      logo: "/hoang-huy-logo.png",
      description: "Thiết kế không gian thương mại tại HOANG HUY COMMERCE",
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <main className="min-h-screen">
      <MainNav onLoginClick={() => setShowLoginModal(true)} />

      {/* Hero Section */}
      <section className="relative h-[300px]">
        <div className="absolute inset-0">
          <Image src="/projects-hero.jpg" alt="Our Projects" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Dự án của chúng tôi</h1>
          <p className="text-xl max-w-2xl">Khám phá các dự án nổi bật mà chúng tôi đã thực hiện</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "all" ? "bg-teal-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveFilter("apartment")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "apartment" ? "bg-teal-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Căn hộ
            </button>
            <button
              onClick={() => setActiveFilter("commercial")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "commercial" ? "bg-teal-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Thương mại
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                  <div className="p-4 flex items-center justify-between bg-white">
                    <Image
                      src={project.logo || "/placeholder.svg"}
                      alt={project.title}
                      width={100}
                      height={40}
                      className="h-10 w-auto"
                    />
                    <h3 className="text-teal-700 font-medium">{project.title}</h3>
                  </div>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">{project.description}</p>
                    <div className="mt-4">
                      <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {project.category === "apartment" && "Căn hộ"}
                        {project.category === "commercial" && "Thương mại"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Contact Buttons */}
      <div className="fixed right-4 bottom-4 flex flex-col space-y-3 z-50">
        <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
          <Mail className="h-6 w-6" />
        </button>
        <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
          <MessageSquare className="h-6 w-6" />
        </button>
        <button className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors">
          <Phone className="h-6 w-6" />
        </button>
      </div>

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </main>
  )
}

