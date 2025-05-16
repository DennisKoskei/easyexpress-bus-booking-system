// app/(auth)/AuthComponents.tsx

import React from "react";

export function TextField({
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

export function AuthButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
}
