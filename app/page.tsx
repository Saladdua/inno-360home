"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Mail, Phone, MessageSquare, Check, ArrowRight } from "lucide-react"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"
import ServiceCard from "@/components/service-card"
import TestimonialCard from "@/components/testimonial-card"
import DesignProcess from "@/components/design-process"
import PartnerLogos from "@/components/partner-logos"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const projects = [
    {
      id: 1,
      logo: "/lumi-logo.png",
      logoAlt: "LUMI HANOI",
      title: "LUMI HANOI",
      image: "/project1.jpg",
      imageAlt: "LUMI HANOI Project",
      images: [] as string[],
    },
    {
      id: 2,
      logo: "/diamond-logo.png",
      logoAlt: "DIAMOND CROWN",
      title: "DIAMOND CROWN HẢI PHÒNG - DOJILAND",
      image: "/project2.jpg",
      imageAlt: "DIAMOND CROWN Project",
      images: [] as string[],
    },
    {
      id: 3,
      logo: "/heritage-logo.png",
      logoAlt: "HERITAGE",
      title: "HERITAGE WEST LAKE",
      image: "/project3.jpg",
      imageAlt: "HERITAGE Project",
      images: [] as string[],
    },
    {
      id: 4,
      logo: "/minato-logo.png",
      logoAlt: "THE MINATO",
      title: "THE MINATO RESIDENT",
      image: "/project4.jpg",
      imageAlt: "THE MINATO RESIDENT Project",
      images: [] as string[],
    },
    {
      id: 5,
      logo: "/hoang-huy-logo.png",
      logoAlt: "HOANG HUY",
      title: "HOANG HUY COMMERCE",
      image: "/project5.jpg",
      imageAlt: "HOANG HUY COMMERCE Project",
      images: [] as string[],
    },
  ]

  // Add multiple images per project
  projects.forEach((project) => {
    project.images = [project.image, `/project${project.id}-2.jpg`, `/project${project.id}-3.jpg`]
  })

  // State to track current image for each project
  const [currentImages, setCurrentImages] = useState(projects.map(() => 0))

  // Function to rotate images for a specific project
  interface Project {
    id: number;
    logo: string;
    logoAlt: string;
    title: string;
    image: string;
    imageAlt: string;
    images: string[];
  }

  type RotateImage = (projectIndex: number, imageIndex?: number | null) => void;

  const rotateImage: RotateImage = useCallback((projectIndex, imageIndex = null) => {
    setCurrentImages((prev) => {
      const newState = [...prev];
      if (imageIndex !== null) {
        newState[projectIndex] = imageIndex;
      } else {
        newState[projectIndex] = (newState[projectIndex] + 1) % 3;
      }
      return newState;
    });
  }, []);

  const totalSlides = Math.ceil(projects.length / 3)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }, [totalSlides])

  // Add this with the other state declarations at the top of the component
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const heroImages = ["/hero-background.jpg", "/hero-background-2.jpg", "/hero-background-3.jpg"]

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // Auto-rotate images
  useEffect(() => {
    const intervals = projects.map((_, index) => {
      return setInterval(
        () => {
          rotateImage(index)
        },
        3000 + index * 500,
      ) // Stagger the transitions
    })

    return () => intervals.forEach((interval) => clearInterval(interval))
  }, [rotateImage, projects])

  // Add this with the other useEffect hooks
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  const services = [
    {
      id: 1,
      title: "Thiết kế nội thất",
      description:
        "Đội ngũ kiến trúc sư chuyên nghiệp với nhiều năm kinh nghiệm sẽ mang đến những giải pháp thiết kế tối ưu.",
      icon: "/icons/design-icon.png",
      image: "/services/interior-design.jpg",
    },
    {
      id: 2,
      title: "Thi công nội thất",
      description: "Đảm bảo chất lượng thi công với đội ngũ thợ lành nghề và quy trình giám sát chặt chẽ.",
      icon: "/icons/construction-icon.png",
      image: "/services/construction.jpg",
    },
    {
      id: 3,
      title: "Cung cấp nội thất",
      description: "Cung cấp đa dạng sản phẩm nội thất cao cấp từ các thương hiệu uy tín trong và ngoài nước.",
      icon: "/icons/furniture-icon.png",
      image: "/services/furniture.jpg",
    },
    {
      id: 4,
      title: "Tư vấn giải pháp",
      description: "Tư vấn các giải pháp tối ưu cho không gian sống và làm việc của bạn.",
      icon: "/icons/consulting-icon.png",
      image: "/services/consulting.jpg",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "Chủ căn hộ tại LUMI HANOI",
      content:
        "Tôi rất hài lòng với dịch vụ thiết kế và thi công của 360HOME. Đội ngũ kiến trúc sư rất chuyên nghiệp và tận tâm, luôn lắng nghe ý kiến của tôi và đưa ra những giải pháp tối ưu.",
      avatar: "/testimonials/avatar1.jpg",
    },
    {
      id: 2,
      name: "Trần Thị B",
      position: "Chủ căn hộ tại HERITAGE WEST LAKE",
      content:
        "360HOME đã giúp tôi hoàn thiện căn hộ của mình một cách hoàn hảo. Từ thiết kế đến thi công đều rất chuyên nghiệp và đúng tiến độ. Tôi sẽ giới thiệu 360HOME cho bạn bè và người thân.",
      avatar: "/testimonials/avatar2.jpg",
    },
    {
      id: 3,
      name: "Lê Văn C",
      position: "Chủ căn hộ tại DIAMOND CROWN",
      content:
        "Đội ngũ 360HOME rất tận tâm và chuyên nghiệp. Họ luôn lắng nghe ý kiến của tôi và đưa ra những giải pháp phù hợp với nhu cầu và ngân sách của tôi.",
      avatar: "/testimonials/avatar3.jpg",
    },
  ]

  return (
    <main className="min-h-screen">
      <MainNav onLoginClick={() => setShowLoginModal(true)} />

      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1500 ${
                currentHeroImage === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`Interior Design ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl">
            360HOME – Nền tảng kết nối hoàn thiện nội thất toàn diện
          </h1>
          <p className="text-xl max-w-2xl">Giải pháp hoàn hảo, tối ưu chi phí cho ngôi nhà của bạn!</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-teal-700 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-teal-600 transition-colors"
            >
              Liên hệ tư vấn
            </Link>
            <Link
              href="/projects"
              className="bg-white text-teal-700 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
            >
              Xem dự án
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Carousel */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Dự án tiêu biểu</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các dự án nổi bật mà chúng tôi đã thực hiện
          </p>
        </div>

        <div className="relative">
          {/* Carousel Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Carousel Items */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / projects.length) * 3}%)` }}
            >
              {projects.map((project, projectIndex) => (
                <div key={project.id} className="w-full md:w-1/3 flex-shrink-0 px-3">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                    <div className="p-4 flex items-center justify-between bg-white">
                      <Image
                        src={project.logo || "/placeholder.svg"}
                        alt={project.logoAlt}
                        width={100}
                        height={40}
                        className="h-10 w-auto"
                      />
                      <h3 className="text-teal-700 font-medium">{project.title}</h3>
                    </div>
                    <div className="relative h-64">
                      {project.images.map((img, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`absolute inset-0 transition-opacity duration-1000 ${
                            currentImages[projectIndex] === imgIndex ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`${project.imageAlt} - Image ${imgIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="p-4 flex justify-center">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((imgIndex) => (
                          <span
                            key={imgIndex}
                            className={`h-2 w-2 rounded-full cursor-pointer ${
                              currentImages[projectIndex] === imgIndex ? "bg-teal-700" : "bg-gray-300"
                            }`}
                            onClick={() => rotateImage(projectIndex, imgIndex)}
                          ></span>
                        ))}
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <button className="w-full py-3 bg-[#8BC34A] text-white font-medium rounded-md hover:bg-[#7CB342] transition-colors">
                        NHẬN THIẾT KẾ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center text-teal-700 font-medium hover:text-teal-600 transition-colors"
          >
            Xem tất cả dự án
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Lý do lựa chọn 360HOME</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp giải pháp toàn diện cho không gian sống của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Đội ngũ chuyên nghiệp</h3>
              <p className="text-gray-600">Kiến trúc sư và đội ngũ thi công giàu kinh nghiệm</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Giải pháp toàn diện</h3>
              <p className="text-gray-600">Từ thiết kế đến thi công và cung cấp nội thất</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chất lượng cam kết</h3>
              <p className="text-gray-600">Đảm bảo chất lượng với quy trình giám sát chặt chẽ</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tiến độ đúng hẹn</h3>
              <p className="text-gray-600">Cam kết hoàn thành dự án đúng thời hạn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Dịch vụ của chúng tôi</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Cung cấp đầy đủ các dịch vụ thiết kế và thi công nội thất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center text-teal-700 font-medium hover:text-teal-600 transition-colors"
            >
              Xem tất cả dịch vụ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Quy trình thiết kế</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Quy trình làm việc chuyên nghiệp, minh bạch</p>
          </div>

          <DesignProcess />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Khách hàng nói gì về chúng tôi</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Sự hài lòng của khách hàng là thành công lớn nhất của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Đối tác của chúng tôi</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hợp tác với các thương hiệu uy tín trong và ngoài nước
            </p>
          </div>

          <PartnerLogos />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bạn cần tư vấn thiết kế nội thất?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí</p>
          <Link
            href="/contact"
            className="bg-white text-teal-700 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            Liên hệ ngay
          </Link>
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

