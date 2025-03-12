"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react"; // Use client-side session retrieval

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      console.log("Session: new", session);
      if (session) router.push("/");
    }
    checkSession();
  }, [router]); // Run effect when router changes

  return (
    <div className="h-screen flex items-center justify-center bg-slate-300">
      <div className="relative w-3/4 h-3/4 flex shadow-xl rounded-3xl overflow-hidden">
        {/* Left Section (Info) */}
        <div className="w-1/2 bg-blue-600 text-white p-10 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold">SwiftXpress</h1>
          <p className="text-center mt-4">
            The fastest and most reliable way to book your trips online. Join us
            now!
          </p>
          <button
            className="mt-6 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </button>
        </div>

        {/* Right Section (Form) */}
        <div
          className={`w-1/2 p-10 flex flex-col justify-center transition-transform duration-500`}
        >
          {!isSignUp ? (
            <>
              <h1 className="text-2xl font-semibold text-center">Login</h1>
              <form className="flex flex-col gap-4 mt-6">
                <input
                  className="rounded-xl h-10 px-3 border"
                  type="email"
                  placeholder="Email"
                />
                <input
                  className="rounded-xl h-10 px-3 border"
                  type="password"
                  placeholder="Password"
                />
                <button className="mt-4 bg-blue-600 text-white py-2 rounded-xl shadow-md">
                  Log In
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
              <form className="flex flex-col gap-4 mt-6">
                <input
                  className="rounded-xl h-10 px-3 border"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  className="rounded-xl h-10 px-3 border"
                  type="text"
                  placeholder="Last Name"
                />
                <input
                  className="rounded-xl h-10 px-3 border"
                  type="email"
                  placeholder="Email"
                />
                <input
                  className="rounded-xl h-10 px-3 border"
                  type="text"
                  placeholder="Phone Number"
                />
                <input
                  className="rounded-xl h-10 px-3 border"
                  type="password"
                  placeholder="Password"
                />
                <input
                  className="rounded-xl h-10 px-3 border"
                  type="password"
                  placeholder="Confirm Password"
                />
                <button className="mt-4 bg-blue-600 text-white py-2 rounded-xl shadow-md">
                  Sign Up
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
