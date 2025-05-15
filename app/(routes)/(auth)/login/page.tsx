"use client";

import React, { useState } from "react";
import { handleAuthSubmit } from "@components/AuthHandler";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setMessage(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold text-center mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h1>

      <form
        onSubmit={(e) =>
          handleAuthSubmit(e, isLogin ? "login" : "signup", setMessage)
        }
        className="space-y-4"
      >
        {!isLogin && (
          <>
            <TextField label="First Name" name="firstName" />
            <TextField label="Last Name" name="lastName" />
            <TextField label="Phone" name="phone" />
            <div>
              <label>Gender</label>
              <select name="gender" className="w-full border px-3 py-2 rounded">
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <TextField label="Age" name="age" type="number" />
          </>
        )}

        <TextField label="Email" name="email" type="email" />
        <TextField label="Password" name="password" type="password" />

        {!isLogin && (
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
        )}

        <AuthButton label={isLogin ? "Login" : "Sign Up"} />

        {message && (
          <p className="text-sm text-center text-red-500 mt-2">{message}</p>
        )}
      </form>

      <p className="text-sm text-center mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={toggleMode}
          className="text-blue-500 hover:underline font-semibold"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

function TextField({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label>{label}</label>
      <input
        name={name}
        type={type}
        className="w-full border px-3 py-2 rounded"
        required
      />
    </div>
  );
}

function AuthButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
}
