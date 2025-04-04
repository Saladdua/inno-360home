import {
    getAllNews as getAllNewsFirebase,
    getFeaturedNews as getFeaturedNewsFirebase,
    getNewsById as getNewsByIdFirebase,
    createNews as createNewsFirebase,
    updateNews as updateNewsFirebase,
    deleteNews as deleteNewsFirebase,
    type NewsItem,
  } from "./news-service"
  
  import { createNewsMySQL, updateNewsMySQL, deleteNewsMySQL } from "./mysql-news-service"
  
  // Re-export the NewsItem type
  export type { NewsItem }
  
  // Combined functions that update both databases
  export async function getAllNews(): Promise<NewsItem[]> {
    // For read operations, we'll prioritize Firebase data
    return await getAllNewsFirebase()
  }
  
  export async function getFeaturedNews(count = 4): Promise<NewsItem[]> {
    return await getFeaturedNewsFirebase(count)
  }
  
  export async function getNewsById(id: string): Promise<NewsItem | null> {
    return await getNewsByIdFirebase(id)
  }
  
  export async function createNews(news: Omit<NewsItem, "id">): Promise<string> {
    // Create in Firebase first
    const firebaseId = await createNewsFirebase(news)
  
    try {
      // Then create in MySQL
      await createNewsMySQL(news)
    } catch (error) {
      console.error("Error creating news in MySQL:", error)
      // We don't throw here to avoid blocking the operation if MySQL fails
    }
  
    return firebaseId
  }
  
  export async function updateNews(id: string, news: Partial<NewsItem>): Promise<void> {
    // Update in Firebase first
    await updateNewsFirebase(id, news)
  
    try {
      // Then update in MySQL
      await updateNewsMySQL(id, news)
    } catch (error) {
      console.error("Error updating news in MySQL:", error)
      // We don't throw here to avoid blocking the operation if MySQL fails
    }
  }
  
  export async function deleteNews(id: string): Promise<void> {
    // Delete from Firebase first
    await deleteNewsFirebase(id)
  
    try {
      // Then delete from MySQL
      await deleteNewsMySQL(id)
    } catch (error) {
      console.error("Error deleting news from MySQL:", error)
      // We don't throw here to avoid blocking the operation if MySQL fails
    }
  }
  
  