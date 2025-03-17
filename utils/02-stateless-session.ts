"use server";

import type { SessionPayload } from "@utils/definitions";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.NEXTAUTH_SECRET;
if (!secretKey) {
  throw new Error("Missing NEXTAUTH_SECRET environment variable");
}

const key = new TextEncoder().encode(secretKey);

// ENCRYPTS THE SESSION PAYLOAD
export async function encrypt(payload: SessionPayload) {
  console.log("🔒 Encrypting session payload:", payload);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
  console.log("✅ Encrypted token:", token);
  return token;
}

// DECRYPTS THE SESSION TOKEN
export async function decrypt(session: string | undefined = "") {
  try {
    console.log("🔓 Decrypting session:", session);
    if (!session) {
      console.warn("⚠️ No session found to decrypt.");
      return null;
    }

    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    console.log("✅ Decrypted payload:", payload);
    return payload;
  } catch (error) {
    console.error("❌ JWT decryption error:", error);
    return null;
  }
}

// CREATES A NEW SESSION AND SETS THE COOKIE
export async function createSession(userId: string) {
  console.log("🔹 Creating session for user:", userId);

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  console.log("✅ Session cookie set. Redirecting to /");
  redirect("/");
}

// VERIFIES THE SESSION AND RETURNS THE USERID
export async function verifySession() {
  console.log("🔍 Verifying session...");

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    console.warn("⚠️ No session cookie found. Redirecting to /login");
    redirect("/login");
  }

  const session = await decrypt(sessionCookie?.value);
  if (!session?.userId) {
    console.warn("⚠️ Invalid session. Redirecting to /login");
    redirect("/login");
  }

  console.log("✅ Session verified for user:", session.userId);
  return { isAuth: true, userId: Number(session.userId) };
}

// UPDATES THE SESSION COOKIE WITH A NEW EXPIRY DATE
export async function updateSession() {
  console.log("🔄 Updating session...");
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    console.warn("⚠️ No session to update.");
    return null;
  }

  const payload = await decrypt(sessionCookie.value);
  if (!payload?.userId) {
    console.warn("⚠️ Invalid session payload. Cannot update.");
    return null;
  }

  const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const newSession = await encrypt({
    userId,
    expiresAt: newExpiresAt,
  });

  cookieStore.set("session", newSession, {
    httpOnly: true,
    secure: true,
    expires: newExpiresAt,
    sameSite: "lax",
    path: "/",
  });

  console.log("✅ Session updated with new expiry date:", newExpiresAt);
}

// DELETES THE SESSION COOKIE
export async function deleteSession() {
  console.log("🗑️ Deleting session...");
  const cookieStore = await cookies();
  cookieStore.delete("session");
  console.log("✅ Session deleted. Redirecting to /login");
  redirect("/login");
}
