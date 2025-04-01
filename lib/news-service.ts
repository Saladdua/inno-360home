import { db } from "@/lib/firebase-config"
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
  type DocumentData,
} from "firebase/firestore"

export interface NewsItem {
  id?: string
  title: string
  description: string
  content?: string
  image: string
  date: Date | Timestamp
  icon?: string
  link?: string
  author?: string
  category?: string
  featured?: boolean
}

const NEWS_COLLECTION = "news"

export async function getAllNews(): Promise<NewsItem[]> {
  const newsQuery = query(collection(db, NEWS_COLLECTION), orderBy("date", "desc"))

  const snapshot = await getDocs(newsQuery)

  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      ...data,
      date: data.date instanceof Timestamp ? data.date.toDate() : data.date,
    } as NewsItem
  })
}

export async function getFeaturedNews(count = 4): Promise<NewsItem[]> {
  const newsQuery = query(
    collection(db, NEWS_COLLECTION),
    where("featured", "==", true),
    orderBy("date", "desc"),
    limit(count),
  )

  const snapshot = await getDocs(newsQuery)

  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      ...data,
      date: data.date instanceof Timestamp ? data.date.toDate() : data.date,
    } as NewsItem
  })
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const docRef = doc(db, NEWS_COLLECTION, id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return null
  }

  const data = docSnap.data()
  return {
    id: docSnap.id,
    ...data,
    date: data.date instanceof Timestamp ? data.date.toDate() : data.date,
  } as NewsItem
}

export async function createNews(news: Omit<NewsItem, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, NEWS_COLLECTION), {
    ...news,
    date: news.date instanceof Date ? Timestamp.fromDate(news.date) : news.date,
  })

  return docRef.id
}

export async function updateNews(id: string, news: Partial<NewsItem>): Promise<void> {
  const docRef = doc(db, NEWS_COLLECTION, id)

  // Convert Date to Timestamp if needed
  const updateData: DocumentData = { ...news }
  if (news.date instanceof Date) {
    updateData.date = Timestamp.fromDate(news.date)
  }

  await updateDoc(docRef, updateData)
}

export async function deleteNews(id: string): Promise<void> {
  const docRef = doc(db, NEWS_COLLECTION, id)
  await deleteDoc(docRef)
}

