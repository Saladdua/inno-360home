import mysql from "mysql2/promise"
import dotenv from "dotenv"

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" })

async function createDatabase() {
  // Create a connection without specifying a database
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "123456",
  })

  try {
    console.log("Creating database if it doesn't exist...")

    // Create the database if it doesn't exist
    const dbName = process.env.MYSQL_DATABASE || "auth360db"
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)

    console.log(`Database '${dbName}' created or already exists.`)
  } catch (error) {
    console.error("Error creating database:", error)
    process.exit(1)
  } finally {
    await connection.end()
  }
}

// Run the function
createDatabase()

