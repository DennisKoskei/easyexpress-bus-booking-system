import { NextAuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { prisma } from "@utils/prisma";
import bcrypt from "bcrypt"; // ✅ use bcrypt, not bcryptjs

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        const dbUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!dbUser || !dbUser.passwordHash) {
          console.log("❌ User not found or password not set.");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          dbUser.passwordHash,
        );

        if (!passwordMatch) {
          console.log("❌ Invalid password");
          return null;
        }

        return {
          id: dbUser.id,
          email: dbUser.email,
          name: `${dbUser.firstName} ${dbUser.lastName}`,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login", // ✅ redirect for unauthorized users
  },

  session: {
    strategy: "jwt", // ✅ required for middleware-compatible session
  },

  callbacks: {
    async jwt({ token, user }) {
      // Add user ID to token on login
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token ID to session for use in client/server
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // ✅ ensure this is set
};

// ✅ Server-side session enforcement helper
export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  console.log("Session Data:", session);
  if (!session) return redirect("/login");
  return session;
}
