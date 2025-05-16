// app/(auth)/signup/page.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { handleAuthSubmit } from "@components/AuthHandler";
import { TextField, AuthButton } from "@components/AuthComponents";

export default function SignupPage() {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">
        Create Account
      </h1>
      <p className="text-sm text-center text-gray-500 mb-6">
        Join EasyExpress and enjoy stress-free bus bookings
      </p>

      {/* Form */}
      <form
        onSubmit={(e) => handleAuthSubmit(e, "signup", setMessage)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <TextField label="First Name" name="firstName" />
        <TextField label="Last Name" name="lastName" />
        <TextField label="Phone" name="phone" />
        <div>
          <label className="block mb-1 font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <TextField label="Age" name="age" type="number" />
        <TextField label="Email" name="email" type="email" />
        <TextField label="Password" name="password" type="password" />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
        />

        <div className="md:col-span-2 mt-2">
          <AuthButton label="Sign Up" />
        </div>

        {message && (
          <p className="md:col-span-2 text-center text-sm text-red-500 mt-2">
            {message}
          </p>
        )}
      </form>

      {/* Footer */}
      <p className="text-sm text-center mt-6 text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline font-semibold"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
