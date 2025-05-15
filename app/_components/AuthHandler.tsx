// components/AuthHandler.tsx
"use client";

import { signup } from "@utils/01-auth";
import { signIn } from "next-auth/react";
import { FormState } from "@utils/definitions";

type Mode = "login" | "signup";

export async function handleAuthSubmit(
  e: React.FormEvent<HTMLFormElement>,
  mode: Mode,
  setMessage: (msg: string | null) => void,
) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (mode === "signup") {
    const result = (await signup({}, formData)) as FormState;

    if (result?.success) {
      // Sign in user automatically after successful signup
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/login",
      });
    } else {
      setMessage(result?.message || "Signup failed.");
    }
  } else {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.ok) {
      window.location.href = "/";
    } else {
      setMessage("Invalid login credentials.");
    }
  }
}
