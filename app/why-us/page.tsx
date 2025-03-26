"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Mail,
  Phone,
  MessageSquare,
  Check,
  Users,
  Award,
  Clock,
  Zap,
  Shield,
  ThumbsUp,
} from "lucide-react"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"
import TestimonialCard from "@/components/testimonial-card"

export default function WhyUsPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const reasons = [
    {
      id: 1,
      title: "Đội ngũ chuyên nghiệp",
      description: "Đội ngũ kiến trúc sư và nhà thầu thi công giàu kinh nghiệm, được đào tạo bài bản.",
      icon: <Users className="h-8 w-8 text-teal-700" />,
    },
    {
      id: 2,
      title: "Chất lượng đảm bảo",
      description: "Cam kết chất lượng thiết kế và thi công với quy trình giám sát chặt chẽ.",
      icon: <Award className="h-8 w-8 text-teal-700" />,
    },
    {
      id: 3,
      title: "Tiến độ đúng hẹn",
      description: "Luôn hoàn thành dự án đúng thời hạn cam kết với khách hàng.",
      icon: <Clock className="h-8 w-8 text-teal-700" />,
    },
    {
      id: 4,
      title: "Giải pháp toàn diện",
      description: "Cung cấp dịch vụ trọn gói từ thiết kế đến thi công và cung cấp nội thất.",
      icon: <Zap className="h-8 w-8 text-teal-700" />,
    },
    {
      id: 5,
      title: "Chi phí hợp lý",
      description: "Mức giá cạnh tranh với nhiều gói dịch vụ phù hợp với ngân sách khách hàng.",
      icon: <Shield className="h-8 w-8 text-teal-700" />,
    },
    {
      id: 6,
      title: "Hậu mãi chu đáo",
      description: "Chính sách bảo hành rõ ràng và dịch vụ hậu mãi tận tâm.",
      icon: <ThumbsUp className="h-8 w-8 text-teal-700" />,
    },
  ]

  const advantages = [
    {
      id: 1,
      title: "Nền tảng kết nối thông minh",
      description:
        "360HOME là nền tảng kết nối thông minh giữa chủ nhà, nhà thầu, kiến trúc sư và đơn vị cung ứng, tạo nên một hệ sinh thái hoàn chỉnh trong lĩnh vực thiết kế và thi công nội thất.",
      image: "/advantages/platform.jpg",
    },
    {
      id: 2,
      title: "Công nghệ hiện đại",
      description:
        "Ứng dụng công nghệ 3D, VR/AR vào quy trình thiết kế, giúp khách hàng có cái nhìn trực quan về không gian tương lai của mình trước khi thi công.",
      image: "/advantages/technology.jpg",
    },
    {
      id: 3,
      title: "Đa dạng phong cách thiết kế",
      description:
        "Đáp ứng mọi nhu cầu với đa dạng phong cách thiết kế từ hiện đại, tối giản đến cổ điển, Indochine, Scandinavian...",
      image: "/advantages/styles.jpg",
    },
  ]

  const statistics = [
    {
      id: 1,
      value: "500+",
      label: "Dự án hoàn thành",
    },
    {
      id: 2,
      value: "300+",
      label: "Khách hàng hài lòng",
    },
    {
      id: 3,
      value: "50+",
      label: "Đối tác tin cậy",
    },
    {
      id: 4,
      value: "5+",
      label: "Năm kinh nghiệm",
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

  const comparisonPoints = [
    {
      id: 1,
      title: "Quy trình làm việc",
      us: "Quy trình rõ ràng, minh bạch từ thiết kế đến thi công",
      others: "Quy trình không rõ ràng, thiếu minh bạch",
    },
    {
      id: 2,
      title: "Báo giá",
      us: "Báo giá chi tiết, minh bạch, không phát sinh chi phí",
      others: "Báo giá không chi tiết, thường phát sinh chi phí",
    },
    {
      id: 3,
      title: "Chất lượng",
      us: "Cam kết chất lượng bằng văn bản, bảo hành rõ ràng",
      others: "Không có cam kết chất lượng rõ ràng",
    },
    {
      id: 4,
      title: "Tiến độ",
      us: "Cam kết tiến độ, bồi thường nếu chậm tiến độ",
      others: "Thường xuyên chậm tiến độ, không có bồi thường",
    },
    {
      id: 5,
      title: "Hậu mãi",
      us: "Dịch vụ hậu mãi chu đáo, bảo hành lâu dài",
      others: "Dịch vụ hậu mãi hạn chế, thời gian bảo hành ngắn",
    },
  ]

  return (
    <main className="min-h-screen">
      <MainNav onLoginClick={() => setShowLoginModal(true)} />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-700">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-800">Lý do lựa chọn 360HOME</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <Image src="/why-us-hero.jpg" alt="Why Choose 360HOME" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Lý do lựa chọn 360HOME</h1>
          <p className="text-xl max-w-3xl">Giải pháp hoàn hảo cho không gian sống và làm việc của bạn</p>
        </div>
      </section>

      {/* Key Reasons Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Tại sao chọn 360HOME?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi mang đến giải pháp toàn diện và chuyên nghiệp cho không gian sống và làm việc của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason) => (
              <div key={reason.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Lợi thế của chúng tôi</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Những điều khiến 360HOME trở nên khác biệt</p>
          </div>

          {advantages.map((advantage, index) => (
            <div
              key={advantage.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center mb-16 last:mb-0`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={advantage.image || "/placeholder.svg"}
                    alt={advantage.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{advantage.title}</h3>
                <p className="text-gray-600 text-lg">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-teal-700 text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
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

      {/* Comparison Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">So sánh dịch vụ</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Sự khác biệt khi lựa chọn 360HOME</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-gray-100 border"></th>
                  <th className="p-4 text-center bg-teal-700 text-white border">360HOME</th>
                  <th className="p-4 text-center bg-gray-700 text-white border">Đơn vị khác</th>
                </tr>
              </thead>
              <tbody>
                {comparisonPoints.map((point) => (
                  <tr key={point.id}>
                    <td className="p-4 border font-medium">{point.title}</td>
                    <td className="p-4 border bg-white">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-teal-700 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{point.us}</span>
                      </div>
                    </td>
                    <td className="p-4 border bg-white">{point.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Quy trình làm việc</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Quy trình làm việc chuyên nghiệp, minh bạch</p>
          </div>

          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-teal-200 transform -translate-x-1/2"></div>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-teal-700">Tư vấn khảo sát</h3>
                  <p className="text-gray-600 mt-2">
                    Gặp gỡ, trao đổi và khảo sát hiện trạng để hiểu rõ nhu cầu của khách hàng.
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white font-bold z-10">
                  1
                </div>
                <div className="md:hidden flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white font-bold mb-4">
                  1
                </div>
                <div className="flex-1 md:pl-12">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Trao đổi về nhu cầu, sở thích</li>
                      <li>Khảo sát hiện trạng</li>
                      <li>Tư vấn giải pháp ban đầu</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0 md:order-1">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Phát triển ý tưởng thiết kế</li>
                      <li>Lên phương án sơ bộ</li>
                      <li>Trao đổi với khách hàng</li>
                    </ul>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white font-bold z-10">
                  2
                </div>
                <div className="md:hidden flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white font-bold mb-4">
                  2
                </div>
                <div className="flex-1 md:pl-12 md:order-0">
                  <h3 className="text-xl font-semibold text-teal-700">Lên ý tưởng thiết kế</h3>
                  <p className="text-gray-600 mt-2">
                    Phát triển ý tưởng thiết kế dựa trên yêu cầu và phong cách của khách hàng.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-teal-700">Thiết kế chi tiết</h3>
                  <p className="text-gray-600 mt-2">
                    Hoàn thiện bản vẽ kỹ thuật, chi tiết vật liệu và dự toán chi phí.
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white font-bold z-10">
                  3
                </div>
                <div className="md:hidden flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white font-bold mb-4">
                  3
                </div>
                <div className="flex-1 md:pl-12">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Bản vẽ kỹ thuật chi tiết</li>
                      <li>Phối cảnh 3D</li>
                      <li>Dự toán chi phí</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0 md:order-1">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Triển khai thi công</li>
                      <li>Giám sát chất lượng</li>
                      <li>Báo cáo tiến độ</li>
                    </ul>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white font-bold z-10">
                  4
                </div>
                <div className="md:hidden flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white font-bold mb-4">
                  4
                </div>
                <div className="flex-1 md:pl-12 md:order-0">
                  <h3 className="text-xl font-semibold text-teal-700">Thi công</h3>
                  <p className="text-gray-600 mt-2">Triển khai thi công theo đúng thiết kế đã được phê duyệt.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-teal-700">Nghiệm thu bàn giao</h3>
                  <p className="text-gray-600 mt-2">
                    Kiểm tra chất lượng và bàn giao công trình hoàn thiện cho khách hàng.
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white font-bold z-10">
                  5
                </div>
                <div className="md:hidden flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white font-bold mb-4">
                  5
                </div>
                <div className="flex-1 md:pl-12">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Kiểm tra chất lượng</li>
                      <li>Bàn giao công trình</li>
                      <li>Hướng dẫn sử dụng</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-700 text-white px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Bạn đã sẵn sàng biến ý tưởng thành hiện thực?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-teal-700 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              Liên hệ ngay
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border border-white text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-white/10 transition-colors inline-block"
            >
              Xem dự án
            </Link>
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

