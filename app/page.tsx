"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Mail, Phone, MessageSquare, Check, ArrowRight } from "lucide-react"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"
import ServiceCard from "@/components/service-card"
import DesignProcess from "@/components/design-process"
import PartnerLogos from "@/components/partner-logos"
import FloatingContactButtons from "@/components/floating-contact-buttons"
import { icon } from "leaflet"
import { link } from "fs"

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
      title: "DIAMOND CROWN HẢI PHÒNG",
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

  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Function to copy text and show notification
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            setCopySuccess("Copied to clipboard!");
            setTimeout(() => setCopySuccess(null), 2000);
        })
        .catch((err) => {
            console.error("Failed to copy: ", err);
            setCopySuccess("Failed to copy!");
            setTimeout(() => setCopySuccess(null), 2000);
        });
};


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
      return setInterval(() => {
        rotateImage(index);
      }, 3000 + index * 500); // Stagger transitions
    });
  
    return () => {
      intervals.forEach(clearInterval); // Cleanup previous intervals
    };
  }, [projects, rotateImage]); // Ensure it updates properly
  

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
      title: "360HOME - Giải pháp thông minh và toàn diện cho thiết kế nội thất",
      description:
        "360Home cung cấp các thiết kế chuyên nghiệp hoàn toàn miễn phí kèm theo báo giá chi tiết dịch vụ nội thất trọn gói của mình cho khách tất cả khách hàng. Trước bối cảnh chính sách nhà nước phê duyệt chiến lược phát triển ngành xây dựng đến",
      image: "/services/news1.png",
      date: "12/02/2025",
      icon: "/logo.png",
      link: "https://360home.vn/360home-giai-phap-thong-minh-va-toan-dien-cho-thiet-ke-noi-that/",
    },
    {
      id: 2,
      title: "Cập nhật tiến độ dự án LUMI CAPITALAND Hanoi",
      description: "Mặc dù điều kiện thời tiết tại Hà Nội trong tháng vừa qua không được thuận lợi, dự án Lumi Hanoi vẫn đảm bảo tiến độ xây dựng được diễn ra theo kế hoạch và đạt được những cột mốc quan trọng.",
      image: "/services/news2.jpg",
      date: "12/03/2025",
      icon: "/logo.png",
      link: "https://360home.vn/cap-nhat-tien-do-du-an-lumi-capitaland-ha-noi/",
    },
    {
      id: 3,
      title: "Các xu hướng trang trí nội thất thịnh hành năm 2025",
      description: "Bỏ qua tone màu trung tính, các không gian sống đa dạng màu sắc, có góc sáng tạo tại nhà… sẽ được ưa chuộng nhiều hơn trong năm mới.",
      image: "/services/news3.png",
      date: "22/01/2025",
      icon: "/logo.png",
      link: "https://360home.vn/cac-xu-huong-trang-tri-noi-that-thinh-hanh-nam-2025/",
    },
    {
      id: 4,
      title: "Đắm mình trong không gian “thiên nhiên xanh” giữa lòng đô thị",
      description: "Khu vườn treo phủ kín mặt tiền giúp tạo bóng mát, điều hòa nhiệt độ công trình và góp thêm mảng xanh cho đô thị.",
      image: "/services/news4.jpg",
      date: "03/03/2025",
      icon: "/logo.png",
      link: "https://360home.vn/dam-minh-trong-khong-gian-thien-nhien-xanh-giua-long-do-thi/",
    },
  ];

  // Rendering the "Tìm hiểu thêm" button
  services.map((services) => (
    <div key={services.id}>
      <h3>{services.title}</h3>
      <p>{services.description}</p>
      <a href={services.link} target="_blank" rel="noopener noreferrer">
        Tìm hiểu thêm →
      </a>
    </div>
  ));

  return (
    <main className="min-h-screen">
      <MainNav onLoginClick={() => setShowLoginModal(true)} />
      {/* Hero Section */}
      <section className="relative h-[600px]">

        {/*Floating Banners*/}
        <div className="floating-banners fixed left-0 right-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div 
            className="banner left-banner fixed left-4"
            style={{
              maxWidth: '160px'
            }}
          >
            <img 
              src="/left-banner.jpg" 
              alt="Left Banner"
              className="w-full h-auto" 
            />
          </div>
          <div 
            className="banner right-banner fixed right-4"
            style={{
              maxWidth: '160px'
            }}
          >
            <img 
              src="/right-banner.jpg" 
              alt="Right Banner"
              className="w-full h-auto"
            />
          </div>
        </div>

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
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
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

    <div className="flex flex-col items-center w-full">
  {/* ✅ Grid with 5 columns */}
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
    {[
      { 
        title: "CHỦ NHÀ", 
        image: "/why-choose-1.png",
        description: [
          "Thoả sức xem thiết kế căn hộ tương lai của mình.", 
          "Tặng thiết kế miễn phí."
        ] 
      },
      { 
        title: "CHỦ ĐẦU TƯ DỰ ÁN", 
        image: "/why-choose-2.png",
        description: [
          "Làm phong phú bộ tài liệu bán hàng.", 
          "Đồng hành cùng CĐT trong quảng bá sản phẩm."
        ] 
      },
      { 
        title: "ĐƠN VỊ CUNG ỨNG", 
        image: "/why-choose-3.png",
        description: [
          "Thúc đẩy bán hàng tốt hơn.", 
          "Tham gia vào chợ thương mại điện tử 360Market."
        ] 
      },
      { 
        title: "NHÀ THẦU THI CÔNG", 
        image: "/why-choose-4.png",
        description: [
          "Kết nối với chủ nhà để cung cấp dịch vụ thi công.", 
          "Tiết kiệm chi phí do thi công trọng điểm."
        ] 
      },
      { 
        title: "TƯ VẤN THIẾT KẾ", 
        image: "/why-choose-5.png",
        description: [
          "Truy cập thư viện thiết kế miễn phí.", 
          "Hưởng chính sách mua nội thất dành riêng cho kiến trúc sư."
        ] 
      },
    ].map((item, index) => (
      <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center min-w-[250px]">
        {/* ✅ Different image for each column */}
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <img src={item.image} alt={item.title} className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        {item.description.map((text, idx) => (
          <p key={idx} className="text-gray-600">• {text}</p>
        ))}
      </div>
    ))}
  </div>

  {/* ✅ Centered Clickable Text */}
  <div className="w-full flex justify-center mt-6">
    <a 
          href="https://360home.vn/gioi-thieu/"
          className="inline-flex items-center text-teal-700 font-medium hover:text-teal-600 transition-colors"
    >
      Xem tất cả dự án 
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>
</div>


  </div>
</section>


      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Tin tức từ 360HOME</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Cùng 360HOME lên ý tưởng cho dự án mới của bạn qua thông tin, tin tức về thiết kế, thầu thi công trong và ngoài nước
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="https://360home.vn/tin-tuc/"
              className="inline-flex items-center text-teal-700 font-medium hover:text-teal-600 transition-colors"
            >
              Xem thêm tin tức
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Quy trình của chúng tôi</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Quy trình làm việc chuyên nghiệp, minh bạch</p>
          </div>

          <DesignProcess />
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
      <FloatingContactButtons />

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </main>
  )
}

