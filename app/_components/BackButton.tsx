"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 right-4 z-20 group"
      >
        <div
          className="rounded-full bg-white/30 backdrop-blur-md hover:bg-white/60 p-2 transition duration-200"
          title="Go back to previous page?"
        >
          <X className="w-5 h-5 text-gray-700 group-hover:text-black" />
        </div>
      </button>
    </div>
  );
};

export default BackButton;
