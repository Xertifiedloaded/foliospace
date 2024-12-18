
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client";
import { comparePassword } from "../middlware/helper"
const prisma = new PrismaClient();
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials
        try {
          if (!email || !password) {
            throw new Error("Email and password are required.")
          }
          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (!user) {
            throw new Error("User not found. Please check the email.")
          }

          const isMatch = await comparePassword(password, user.password)
          if (!isMatch) {
            throw new Error("Incorrect password. Please try again.")
          }
          if (user.isGoogleAuth) {
            throw new Error(
              "This user is registered with Google authentication. Please log in with Google."
            )
          }
          return user
        } catch (error) {
          console.log(error)
          throw new Error(error.message || "Authentication failed.")
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !account.provider) {
        console.error("Account is undefined or missing provider")
        return false
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.username = user.username
      }
      if (account && account.provider === "google") {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        })
        if (dbUser) {
          token.id = dbUser.id
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.username = token.username
      }
      console.log(`Session:`, session)
      return session
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
}