import dotenv from "dotenv"
import mysql from "mysql2/promise"
import { hash } from "bcryptjs"

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" })

async function setupDatabase() {
  console.log("Starting database setup...")

  // Create a connection without specifying a database first
  const rootConnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "123456",
  })

  const dbName = process.env.MYSQL_DATABASE || "auth360db"

  try {
    // Create database if it doesn't exist
    console.log(`Creating database ${dbName} if it doesn't exist...`)
    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)

    // Switch to the database
    await rootConnection.query(`USE ${dbName}`)

    // Create users table
    console.log("Creating users table...")
    await rootConnection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        firebaseUid VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create sessions table
    console.log("Creating sessions table...")
    await rootConnection.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        expires TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `)

    // Create password_reset_tokens table
    console.log("Creating password_reset_tokens table...")
    await rootConnection.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `)

    // Create a test user
    console.log("Creating test user...")
    const hashedPassword = await hash("password123", 10)

    // Check if test user already exists
    const [existingUsers] = await rootConnection.query("SELECT * FROM users WHERE email = ?", ["test@example.com"])

    // @ts-ignore
    if (existingUsers.length === 0) {
      await rootConnection.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
        "Test User",
        "test@example.com",
        hashedPassword,
      ])
      console.log("Test user created successfully")
    } else {
      console.log("Test user already exists")
    }

    console.log("Database setup completed successfully!")
  } catch (error) {
    console.error("Error setting up database:", error)
  } finally {
    await rootConnection.end()
  }
}

// Run the setup
setupDatabase()

