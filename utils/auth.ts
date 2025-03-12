import { NextAuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { prisma } from "@utils/prisma";

// Define a type for Prisma user (excluding sensitive fields)
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  //-NOTE: Add avatar field
};

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
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: { headers: Headers },
      ): Promise<User | null> {
        if (!credentials) {
          console.log("❌ No credentials provided.");
          return null;
        }

        const { email, password } = credentials;

        if (!email || !password) {
          console.log("❌ Missing email or password.");
          return null;
        }

        // Fetch user from DB
        const dbUser = await prisma.user.findFirst({
          where: { email },
        });

        if (!dbUser) {
          console.log("❌ User not found.");
          return null;
        }

        console.log("✅ User found in DB:", dbUser);

        // Verify password
        if (dbUser.passwordHash !== password) {
          console.log("❌ Incorrect password.");
          return null;
        }

        // Remove sensitive info before returning
        const {
          age,
          phone,
          gender,
          role,
          createdAt,
          passwordHash,
          ...safeUser
        } = dbUser;

        console.log("🔹 Safe User Details:", safeUser);
        return { ...safeUser, id: String(dbUser.id) } as User;
      },
    }),
  ],
};

// ✅ SERVER-SIDE AUTH CHECK
export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  console.log("Session Data:", session);
  if (!session) return redirect("/login");
  return session;
}
