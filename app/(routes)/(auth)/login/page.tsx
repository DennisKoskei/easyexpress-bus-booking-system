// app/(auth)/login/page.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { handleAuthSubmit } from "@components/AuthHandler";
import { signIn } from "next-auth/react";
import { TextField, AuthButton } from "@components/AuthComponents";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook, FaApple } from "react-icons/fa"; // Branded icons

export default function LoginPage() {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="w-full md:px-5 md:w-[75%] justify-center mx-auto">
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
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your Email"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your Password"
        />

        <AuthButton label="Login" />

        {message && (
          <p className="text-sm text-center w-auto text-red-500 mt-2">
            {message}
          </p>
        )}
      </form>

      <div className="flex items-start py-3">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded-md bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-blue-900 dark:text-gray-400"
          >
            Remember me
          </label>
        </div>
        <a
          href="#"
          className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-600"
        >
          Lost Password?
        </a>
      </div>

      <p className="text-sm text-center mt-6 text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-600 hover:underline font-semibold"
        >
          Sign Up
        </Link>
      </p>

      {/** Social Auth **/}
      <div className="mt-6">
        <div className="flex items-center flex-nowrap justify-between gap-x-2 text-gray-500 text-sm">
          <div className="h-px w-20 bg-gray-300" />
          <span className="text-sm text-gray-400">or continue with</span>
          <div className="h-px w-20 bg-gray-300" />
        </div>

        <div className="flex justify-center gap-x-2">
          <button
            onClick={() => signIn("github")}
            aria-label="Login with GitHub"
            className="m-3  rounded-full"
            //className="m-3 p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <FaGithub size={25} />
          </button>

          <button
            onClick={() => signIn("google")}
            aria-label="Login with Google"
            className="m-3  rounded-full"
            //className="m-3 p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <FcGoogle size={25} />
          </button>

          <button
            onClick={() => signIn("apple")}
            aria-label="Login with Apple"
            disabled
            className="m-3 rounded-full cursor-not-allowed"
            // className="m-3 p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <FaApple size={25} />
          </button>

          <button
            onClick={() => signIn("facebook")}
            aria-label="Login with Facebook"
            disabled
            className="m-3 rounded-full cursor-not-allowed "
            // className="m-3 p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <FaFacebook size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
