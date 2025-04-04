import { db } from "@/lib/firebase-config"
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from "firebase/firestore"
import type { User } from "firebase/auth"

// Define user roles
export enum UserRole {
  USER = "user",
  EDITOR = "editor",
  ADMIN = "admin",
}

export interface UserProfile {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

const USERS_COLLECTION = "users"

// Create or update a user profile in Firestore
export async function createOrUpdateUserProfile(user: User, role?: UserRole): Promise<UserProfile> {
  const userRef = doc(db, USERS_COLLECTION, user.uid)
  const userSnap = await getDoc(userRef)

  const now = new Date()

  if (!userSnap.exists()) {
    // Create new user profile
    const newUserProfile: UserProfile = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || undefined,
      photoURL: user.photoURL || undefined,
      role: role || UserRole.USER, // Default role is USER
      createdAt: now,
      updatedAt: now,
    }

    await setDoc(userRef, newUserProfile)
    return newUserProfile
  } else {
    // Update existing user profile
    const existingData = userSnap.data() as UserProfile

    const updatedProfile: Partial<UserProfile> = {
      email: user.email || existingData.email,
      displayName: user.displayName || existingData.displayName,
      photoURL: user.photoURL || existingData.photoURL,
      updatedAt: now,
    }

    // Only update role if provided
    if (role) {
      updatedProfile.role = role
    }

    await updateDoc(userRef, updatedProfile)

    return {
      ...existingData,
      ...updatedProfile,
    } as UserProfile
  }
}

// Get a user profile from Firestore
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, USERS_COLLECTION, uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    return null
  }

  return userSnap.data() as UserProfile
}

// Update a user's role
export async function updateUserRole(uid: string, role: UserRole): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, uid)
  await updateDoc(userRef, {
    role,
    updatedAt: new Date(),
  })
}

// Get all users
export async function getAllUsers(): Promise<UserProfile[]> {
  const usersQuery = query(collection(db, USERS_COLLECTION))
  const snapshot = await getDocs(usersQuery)

  return snapshot.docs.map((doc) => doc.data() as UserProfile)
}

// Get users by role
export async function getUsersByRole(role: UserRole): Promise<UserProfile[]> {
  const usersQuery = query(collection(db, USERS_COLLECTION), where("role", "==", role))

  const snapshot = await getDocs(usersQuery)

  return snapshot.docs.map((doc) => doc.data() as UserProfile)
}

