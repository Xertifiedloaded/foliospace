import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { comparePassword } from "../middlware/helper";

const prisma = new PrismaClient();

async function cleanupExpiredSessions() {
  const expiryDate = new Date(Date.now() - (3 * 24 * 60 * 60 * 1000));
  try {
    await prisma.session.deleteMany({
      where: {
        expires: {
          lt: expiryDate
        }
      }
    });
  } catch (error) {
    console.error("Error cleaning up expired sessions:", error);
  }
}

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
          
          if (user.isGoogleAuth) {
            throw new Error(
              "This user is registered with Google authentication. Please log in with Google."
            );
          }
          
          return user;
        } catch (error) {
          console.log(error);
          throw new Error(error.message || "Authentication failed.");
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
    maxAge: 3 * 24 * 60 * 60, // 3 days in seconds
  },

  jwt: {
    maxAge: 3 * 24 * 60 * 60, // 3 days in seconds
    secret: process.env.NEXTAUTH_SECRET,
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3 * 24 * 60 * 60
      }
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },

  callbacks: {
    async signIn({ user, account }) {
      if (!account || !account.provider) {
        console.error("Account is undefined or missing provider");
        return false;
      }

      try {
        await cleanupExpiredSessions();
        
        if (account.provider === "google") {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          
          if (!existingUser) {
            return true;
          }
          
          if (!existingUser.isGoogleAuth) {
            return false;
          }
        }
        
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
        token.iat = Math.floor(Date.now() / 1000);
      }

      if (account && account.provider === "google") {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      const now = Math.floor(Date.now() / 1000);
      if (token.iat && now - token.iat > 3 * 24 * 60 * 60) {
        return null;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        const now = Math.floor(Date.now() / 1000);
        if (token.iat && now - token.iat > 3 * 24 * 60 * 60) {
          return null;
        }

        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.username = token.username;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },

  pages: {
    signIn: "/",
    error: '/auth/error',
    signOut: '/auth/signout'
  },

  events: {
    async signOut({ session }) {
      try {
        await prisma.session.deleteMany({
          where: {
            userId: session?.user?.id
          }
        });
      } catch (error) {
        console.error("Error cleaning up session on signOut:", error);
      }
    },
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};







// import CredentialsProvider from "next-auth/providers/credentials"
// import GitHubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import { PrismaClient } from "@prisma/client";
// import { comparePassword } from "../middlware/helper"
// const prisma = new PrismaClient();
// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       async authorize(credentials) {
//         const { email, password } = credentials
//         try {
//           if (!email || !password) {
//             throw new Error("Email and password are required.")
//           }
//           const user = await prisma.user.findUnique({
//             where: { email },
//           })

//           if (!user) {
//             throw new Error("User not found. Please check the email.")
//           }

//           const isMatch = await comparePassword(password, user.password)
//           if (!isMatch) {
//             throw new Error("Incorrect password. Please try again.")
//           }
//           if (user.isGoogleAuth) {
//             throw new Error(
//               "This user is registered with Google authentication. Please log in with Google."
//             )
//           }
//           return user
//         } catch (error) {
//           console.log(error)
//           throw new Error(error.message || "Authentication failed.")
//         }
//       },
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       if (!account || !account.provider) {
//         console.error("Account is undefined or missing provider")
//         return false
//       }
//     },

//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id
//         token.email = user.email
//         token.name = user.name
//         token.username = user.username
//       }
//       if (account && account.provider === "google") {
//         const dbUser = await prisma.user.findUnique({
//           where: { email: token.email },
//         })
//         if (dbUser) {
//           token.id = dbUser.id
//         }
//       }
//       return token
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id
//         session.user.email = token.email
//         session.user.name = token.name
//         session.user.username = token.username
//       }
//       console.log(`Session:`, session)
//       return session
//     },
//     async redirect({ url, baseUrl }) {
//       return baseUrl
//     },
//   },
//   pages: {
//     signIn: "/",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// }