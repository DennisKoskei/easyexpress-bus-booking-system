// lib/getUserIdFromSession.ts
import { getServerSession } from "next-auth";
import { authConfig } from "@utils/auth";
// import { NextRequest } from "next/server";

export async function getUserIdFromSession(): Promise<string | null> {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.id) {
    return null;
  }

  return session.user.id;
}
