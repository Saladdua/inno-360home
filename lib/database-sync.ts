import {
    getAllNews as getAllNewsFirebase,
    createNews as createNewsFirebase,
    updateNews as updateNewsFirebase,
    deleteNews as deleteNewsFirebase,
  } from "./news-service"
  
  import { getAllNewsMySQL, createNewsMySQL, updateNewsMySQL, deleteNewsMySQL } from "./mysql-news-service"
  
  // Function to sync Firebase data to MySQL
  export async function syncFirebaseToMySQL() {
    try {
      console.log("Starting Firebase to MySQL sync...")
  
      // Get all news from Firebase
      const firebaseNews = await getAllNewsFirebase()
  
      // Get all news from MySQL
      const mysqlNews = await getAllNewsMySQL()
  
      // Create a map of MySQL news by ID for quick lookup
      const mysqlNewsMap = new Map(mysqlNews.map((item) => [item.id, item]))
  
      // For each Firebase news item
      for (const item of firebaseNews) {
        if (!item.id) continue
  
        // Check if it exists in MySQL
        if (mysqlNewsMap.has(item.id)) {
          // Update the MySQL item
          await updateNewsMySQL(item.id, item)
        } else {
          // Create a new MySQL item
          await createNewsMySQL(item)
        }
      }
  
      // Find MySQL items that don't exist in Firebase and delete them
      const firebaseIds = new Set(firebaseNews.map((item) => item.id))
      for (const mysqlItem of mysqlNews) {
        if (!firebaseIds.has(mysqlItem.id)) {
          await deleteNewsMySQL(mysqlItem.id!)
        }
      }
  
      console.log("Firebase to MySQL sync completed successfully")
    } catch (error) {
      console.error("Error syncing Firebase to MySQL:", error)
    }
  }
  
  // Function to sync MySQL data to Firebase
  export async function syncMySQLToFirebase() {
    try {
      console.log("Starting MySQL to Firebase sync...")
  
      // Get all news from MySQL
      const mysqlNews = await getAllNewsMySQL()
  
      // Get all news from Firebase
      const firebaseNews = await getAllNewsFirebase()
  
      // Create a map of Firebase news by ID for quick lookup
      const firebaseNewsMap = new Map(firebaseNews.map((item) => [item.id, item]))
  
      // For each MySQL news item
      for (const item of mysqlNews) {
        if (!item.id) continue
  
        // Check if it exists in Firebase
        if (firebaseNewsMap.has(item.id)) {
          // Update the Firebase item
          await updateNewsFirebase(item.id, item)
        } else {
          // Create a new Firebase item
          await createNewsFirebase(item)
        }
      }
  
      // Find Firebase items that don't exist in MySQL and delete them
      const mysqlIds = new Set(mysqlNews.map((item) => item.id))
      for (const firebaseItem of firebaseNews) {
        if (!mysqlIds.has(firebaseItem.id)) {
          await deleteNewsFirebase(firebaseItem.id!)
        }
      }
  
      console.log("MySQL to Firebase sync completed successfully")
    } catch (error) {
      console.error("Error syncing MySQL to Firebase:", error)
    }
  }
  
  