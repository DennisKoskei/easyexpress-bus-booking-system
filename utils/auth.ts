// @utils/auth.ts
import { NextAuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { prisma } from "@utils/prisma";
import bcrypt from "bcrypt";

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
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Handle social login user creation
      if (
        account &&
        profile &&
        (account.provider === "google" || account.provider === "github")
      ) {
        const email = profile.email as string;
        let existingUser = await prisma.user.findUnique({ where: { email } });

        if (!existingUser) {
          // Fallback values for required fields
          const name = profile.name || "Unnamed User";
          const [firstName, lastName] = name.split(" ") || ["User", "Name"];
          const phone = undefined ; // Default placeholder phone
          const passwordHash = await bcrypt.hash(
            Math.random().toString(36).slice(-8), // dummy random password
            10,
          );

          existingUser = await prisma.user.create({
            data: {
              firstName,
              lastName: lastName || "User",
              email,
              phone,
              passwordHash,
              gender: "OTHER", // Assuming enum Gender has OTHER
              age: 0, // default/fake value
              avatarUrl: profile.image || null,
            },
          });
        }

        token.id = existingUser.id;
      }

      // For credentials login
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allow returning to the previous page via callbackUrl, fallback to homepage
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Server-side session enforcement
export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/login");
  return session;
}
