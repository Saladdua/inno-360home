import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore"

// Your Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Sample news data
const newsData = [
  {
    title: "360HOME - Giải pháp thông minh và toàn diện cho thiết kế nội thất",
    description:
      "360Home cung cấp các thiết kế chuyên nghiệp hoàn toàn miễn phí kèm theo báo giá chi tiết dịch vụ nội thất trọn gói của mình cho khách tất cả khách hàng. Trước bối cảnh chính sách nhà nước phê duyệt chiến lược phát triển ngành xây dựng đến",
    image: "/services/news1.png",
    date: new Timestamp(Math.floor(new Date("2025-02-12").getTime() / 1000), 0),
    icon: "/logo.png",
    link: "https://360home.vn/360home-giai-phap-thong-minh-va-toan-dien-cho-thiet-ke-noi-that/",
    featured: true,
    category: "design",
  },
  {
    title: "Cập nhật tiến độ dự án LUMI CAPITALAND Hanoi",
    description:
      "Mặc dù điều kiện thời tiết tại Hà Nội trong tháng vừa qua không được thuận lợi, dự án Lumi Hanoi vẫn đảm bảo tiến độ xây dựng được diễn ra theo kế hoạch và đạt được những cột mốc quan trọng.",
    image: "/services/news2.jpg",
    date: new Timestamp(Math.floor(new Date("2025-03-12").getTime() / 1000), 0),
    icon: "/logo.png",
    link: "https://360home.vn/cap-nhat-tien-do-du-an-lumi-capitaland-ha-noi/",
    featured: true,
    category: "projects",
  },
  {
    title: "Các xu hướng trang trí nội thất thịnh hành năm 2025",
    description:
      "Bỏ qua tone màu trung tính, các không gian sống đa dạng màu sắc, có góc sáng tạo tại nhà… sẽ được ưa chuộng nhiều hơn trong năm mới.",
    image: "/services/news3.png",
    date: new Timestamp(Math.floor(new Date("2025-01-22").getTime() / 1000), 0),
    icon: "/logo.png",
    link: "https://360home.vn/cac-xu-huong-trang-tri-noi-that-thinh-hanh-nam-2025/",
    featured: true,
    category: "trends",
  },
  {
    title: 'Đắm mình trong không gian "thiên nhiên xanh" giữa lòng đô thị',
    description:
      "Khu vườn treo phủ kín mặt tiền giúp tạo bóng mát, điều hòa nhiệt độ công trình và góp thêm mảng xanh cho đô thị.",
    image: "/services/news4.jpg",
    date: Timestamp.fromDate(new Date("2025-03-03")),
    icon: "/logo.png",
    link: "https://360home.vn/dam-minh-trong-khong-gian-thien-nhien-xanh-giua-long-do-thi/",
    featured: true,
    category: "design",
  },
]

// Seed function
async function seedNews() {
  try {
    for (const news of newsData) {
      await addDoc(collection(db, "news"), news)
      console.log(`Added news: ${news.title}`)
    }
    console.log("Seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding news:", error)
  }
}

// Run the seed function
seedNews()

