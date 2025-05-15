"use client";

import React, { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signup, login } from "@utils/01-auth";
import { FormState } from "@utils/definitions";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginState, loginAction] = useActionState(login, {
    errors: {},
  } satisfies FormState);

  const [signupState, signupAction] = useActionState(signup, {
    errors: {},
  } satisfies FormState);

  const toggleMode = () => setIsLogin((prev) => !prev);

  const currentAction = isLogin ? loginAction : signupAction;
  const currentErrors = isLogin ? loginState?.errors : signupState?.errors;
  const currentMessage = isLogin ? loginState?.message : signupState?.message;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold text-center mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h1>

      <form action={currentAction} className="space-y-4">
        {!isLogin && (
          <>
            <TextField
              label="First Name"
              name="firstName"
              error={currentErrors?.firstName}
            />
            <TextField
              label="Last Name"
              name="lastName"
              error={currentErrors?.lastName}
            />
            <TextField
              label="Phone"
              name="phone"
              error={currentErrors?.phone}
            />
            <div>
              <label>Gender</label>
              <select name="gender" className="w-full border px-3 py-2 rounded">
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              {currentErrors?.gender && (
                <p className="text-red-500 text-sm">{currentErrors.gender}</p>
              )}
            </div>
            <TextField
              label="Age"
              name="age"
              type="number"
              error={currentErrors?.age}
            />
          </>
        )}

        <TextField
          label="Email"
          name="email"
          type="email"
          error={currentErrors?.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          error={currentErrors?.password}
        />

        {!isLogin && (
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            error={currentErrors?.confirmPassword}
          />
        )}

        <AuthButton label={isLogin ? "Login" : "Sign Up"} />

        {currentMessage && (
          <p className="text-sm text-center text-red-500 mt-2">
            {currentMessage}
          </p>
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
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | string[];
}) {
  return (
    <div>
      <label>{label}</label>
      <input
        name={name}
        type={type}
        className="w-full border px-3 py-2 rounded"
      />
      {error && (
        <p className="text-red-500 text-sm">
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
}

function AuthButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
    >
      {pending ? "Processing..." : label}
    </button>
  );
}
