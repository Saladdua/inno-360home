"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageSquare, Mail, Phone, ArrowRight } from "lucide-react"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"
import ServiceCard from "@/components/service-card"

export default function ServicesPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const services = [
    {
      id: 1,
      title: "Thiết kế nội thất",
      description:
        "Đội ngũ kiến trúc sư chuyên nghiệp với nhiều năm kinh nghiệm sẽ mang đến những giải pháp thiết kế tối ưu cho không gian sống và làm việc của bạn.",
      icon: "/icons/design-icon.png",
      image: "/services/interior-design.jpg",
      features: [
        "Thiết kế căn hộ chung cư",
        "Thiết kế biệt thự, nhà phố",
        "Thiết kế văn phòng",
        "Thiết kế không gian thương mại",
      ],
    },
    {
      id: 2,
      title: "Thi công nội thất",
      description:
        "Đảm bảo chất lượng thi công với đội ngũ thợ lành nghề và quy trình giám sát chặt chẽ, mang đến không gian hoàn hảo theo đúng thiết kế.",
      icon: "/icons/construction-icon.png",
      image: "/services/construction.jpg",
      features: ["Thi công trọn gói", "Thi công phần thô", "Thi công phần hoàn thiện", "Thi công đồ gỗ nội thất"],
    },
    {
      id: 3,
      title: "Cung cấp nội thất",
      description:
        "Cung cấp đa dạng sản phẩm nội thất cao cấp từ các thương hiệu uy tín trong và ngoài nước, đáp ứng mọi nhu cầu của khách hàng.",
      icon: "/icons/furniture-icon.png",
      image: "/services/furniture.jpg",
      features: ["Nội thất phòng khách", "Nội thất phòng ngủ", "Nội thất phòng bếp", "Nội thất văn phòng"],
    },
    {
      id: 4,
      title: "Tư vấn giải pháp",
      description:
        "Tư vấn các giải pháp tối ưu cho không gian sống và làm việc của bạn, giúp bạn tiết kiệm chi phí và thời gian.",
      icon: "/icons/consulting-icon.png",
      image: "/services/consulting.jpg",
      features: ["Tư vấn phong thủy", "Tư vấn vật liệu", "Tư vấn ngân sách", "Tư vấn quy trình"],
    },
  ]

  return (
    <main className="min-h-screen">
      <MainNav onLoginClick={() => setShowLoginModal(true)} />

      {/* Hero Section */}
      <section className="relative h-[300px]">
        <div className="absolute inset-0">
          <Image src="/services-hero.jpg" alt="Our Services" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Dịch vụ của chúng tôi</h1>
          <p className="text-xl max-w-2xl">Cung cấp đầy đủ các dịch vụ thiết kế và thi công nội thất</p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Dịch vụ toàn diện</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp đầy đủ các dịch vụ từ thiết kế đến thi công và cung cấp nội thất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center mb-16 last:mb-0`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <Image
                      src={service.icon || "/placeholder.svg"}
                      alt={`${service.title} icon`}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="text-teal-700 mr-2">•</div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.id}`}
                  className="inline-flex items-center text-teal-700 font-medium hover:text-teal-600 transition-colors"
                >
                  Tìm hiểu thêm
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
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

