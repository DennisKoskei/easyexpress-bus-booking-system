// @utils/auth.ts
import { NextAuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

import { prisma } from "@utils/prisma";
import bcrypt from "bcrypt";
import { GoogleProfile, GithubProfile, FacebookProfile } from "@/types/auth";

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
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
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
        ["google", "github", "facebook"].includes(account.provider)
      ) {
        let email: string | null = null;
        let name = "Unnamed User";
        let avatarUrl: string | null = null;

        switch (account.provider) {
          case "google": {
            const g = profile as GoogleProfile;
            email = g.email;
            name = g.name ?? name;
            avatarUrl = g.picture ?? null;
            break;
          }
          case "github": {
            const gh = profile as GithubProfile;
            email = gh.email;
            name = gh.name ?? gh.login ?? name;
            avatarUrl = gh.avatar_url ?? null;
            break;
          }
          case "facebook": {
            const fb = profile as FacebookProfile;
            email = fb.email;
            name = fb.name ?? name;
            avatarUrl = fb.picture?.data?.url ?? null;
            break;
          }
        }

        if (!email) {
          console.error("❌ OAuth profile missing email.");
          return token;
        }

        let existingUser = await prisma.user.findUnique({ where: { email } });

        if (!existingUser) {
          const [firstName = "User", lastName = "User"] = name.split(" ");
          existingUser = await prisma.user.create({
            data: {
              firstName,
              lastName: lastName || "User",
              email,
              phone: undefined,
              passwordHash: undefined,
              gender: undefined,
              age: undefined,
              avatarUrl,
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

    async redirect() {
      console.log("Redirecting...");
      return "/";
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
