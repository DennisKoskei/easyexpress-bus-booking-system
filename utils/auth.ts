import { NextAuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { prisma } from "@utils/prisma";

// Define a type for Prisma user (excluding sensitive fields)
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  role: string;
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
        credentials: Record<"email" | "password", string | undefined>,
      ): Promise<User | null> {
        if (!credentials || !credentials.email || !credentials.password) {
          console.log("❌ Missing email or password.");
          return null;
        }

        // Fetch user from DB
        const dbUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!dbUser) {
          console.log("❌ User not found.");
          return null;
        }

        console.log("✅ User found in DB:", dbUser);

        // Verify password using simple `===`
        if (dbUser.passwordHash !== credentials.password) {
          console.log("❌ Incorrect password.");
          return null;
        }

        // Log all user details
        console.log("🔹 User Details:");
        //console.log(`ID: ${dbUser.id}`);
        //console.log(`Name: ${dbUser.firstName} ${dbUser.lastName}`);
        //console.log(`Email: ${dbUser.email}`);
        //console.log(`Phone: ${dbUser.phone}`);
        console.log("All user details:", dbUser);

        // Remove sensitive info before returning
        const { passwordHash, ...safeUser } = dbUser;

        return safeUser as User;
      },
    }),
  ],
};

// ✅ SERVER-SIDE AUTH CHECK
export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}
