import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

// Firebase Config (Make sure your .env.local is correctly set up)
// Debug Firebase Config Loading
console.log("🛠️ Loading Firebase Config...");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("🔥 Firebase Config Loaded:", firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample Data
const newsData = [
  {
    title: "360HOME - Giải pháp thông minh",
    description: "360Home cung cấp các thiết kế chuyên nghiệp...",
    image: "/services/news1.png",
    date: "2025-02-12", // Keep as string here
    icon: "/logo.png",
    link: "https://360home.vn/360home-giai-phap-thong-minh/",
    featured: true,
    category: "design",
  }
];

// Function to Validate and Format Data Before Firestore
async function seedNews() {
  try {
    for (const news of newsData) {
      console.log("🔥 Checking news item:", news);

      // Convert date to Firestore Timestamp in a new object
      const newsToInsert = {
        ...news,
        date: Timestamp.fromDate(new Date(news.date)), // Convert here
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, "news"), newsToInsert);
      console.log(`✅ Successfully added document with ID: ${docRef.id}`);
    }
  } catch (error) {
    console.error("🔥 Firestore Error:", error);
  }
}

// Run the function
seedNews();
