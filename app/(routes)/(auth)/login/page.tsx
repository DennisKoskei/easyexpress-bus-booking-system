// app/(auth)/login/page.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { handleAuthSubmit } from "@components/AuthHandler";
import { TextField, AuthButton } from "@components/AuthComponents";

export default function LoginPage() {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Welcome Back
      </h1>
      <p className="text-sm text-center text-gray-500 mb-8">
        Please enter your credentials to log in
      </p>

      <form
        onSubmit={(e) => handleAuthSubmit(e, "login", setMessage)}
        className="space-y-5"
      >
        <TextField label="Email" name="email" type="email" />
        <TextField label="Password" name="password" type="password" />

        <AuthButton label="Login" />

        {message && (
          <p className="text-sm text-center text-red-500 mt-2">{message}</p>
        )}
      </form>

      <p className="text-sm text-center mt-6 text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-600 hover:underline font-semibold"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
