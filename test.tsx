"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth"
import { auth } from "@/lib/firebase-config"
import { getUserProfile, createOrUpdateUserProfile, UserRole, type UserProfile } from "@/lib/user-service"
import { createOrUpdateUserProfileMySQL } from "@/lib/mysql-user-service"

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
  isEditor: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        try {
          // Get user profile from Firestore
          const profile = await getUserProfile(user.uid)

          if (profile) {
            setUserProfile(profile)
          } else {
            // Create new profile if it doesn't exist
            const newProfile = await createOrUpdateUserProfile(user)
            setUserProfile(newProfile)

            // Also create in MySQL
            await createOrUpdateUserProfileMySQL(
              user.uid,
              user.email || "",
              user.displayName || undefined,
              user.photoURL || undefined,
            )
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setError(null)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Create user profile in Firestore
      await createOrUpdateUserProfile(userCredential.user)

      // Create user profile in MySQL
      await createOrUpdateUserProfileMySQL(
        userCredential.user.uid,
        userCredential.user.email || "",
        userCredential.user.displayName || undefined,
        userCredential.user.photoURL || undefined,
      )
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  // Check if user is admin
  const isAdmin = userProfile?.role === UserRole.ADMIN

  // Check if user is editor (or admin, since admins can do everything editors can)
  const isEditor = userProfile?.role === UserRole.EDITOR || isAdmin

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        isAdmin,
        isEditor,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

