import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { comparePassword } from "../middlware/helper";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          if (!email || !password) {
            throw new Error("Email and password are required.");
          }
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error("User not found. Please check the email.");
          }

          const isMatch = await comparePassword(password, user.password);
          if (!isMatch) {
            throw new Error("Incorrect password. Please try again.");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            username: user.username,
          };
        } catch (error) {
          console.error(error);
          throw new Error(error.message || "Authentication failed.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          username: token.username,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/", 
  },
  secret: process.env.NEXTAUTH_SECRET, 
};
