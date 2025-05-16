// app/(auth)/layout.tsx

import React from "react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute -z-40 inset-0">
        <Image
          src="/Assets/bus-wallpaper-bg.jpg"
          alt="Bus Travel"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-700/10" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="flex w-full max-w-5xl h-[650px] md:h-[600px] bg-white/95 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Left Section - only on desktop */}
          <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-blue-500 text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Welcome to EasyExpress</h2>
            <p className="text-sm text-center">
              Book your bus tickets easily and travel smarter.
            </p>
            {/* Optional: Add a logo or image */}
          </div>

          {/* Right Section - form area */}
          <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 flex items-center justify-center">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
