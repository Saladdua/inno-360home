import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcrypt"
import { db } from "@/lib/db"
import type { User } from "next-auth"

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Vui lòng điền đầy đủ thông tin")
        }
      
        const user = await db.user.findUnique({
          where: { email: credentials.email },
          select: { 
            id: true, 
            name: true,  // Ensure name is selected
            email: true, 
            image: true, // Ensure image is selected
            password: true 
          },
        })
      
        if (!user || !user.password) {
          throw new Error("Email hoặc mật khẩu không chính xác")
        }
      
        const isPasswordValid = await compare(credentials.password, user.password)
      
        if (!isPasswordValid) {
          throw new Error("Email hoặc mật khẩu không chính xác")
        }
      
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        } as User
      },
      
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

