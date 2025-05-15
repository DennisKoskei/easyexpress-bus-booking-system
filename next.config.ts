//@type {import('next').NextConfig}
import type { NextConfig } from "next";

const NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Or 'http' if needed
        hostname: "avatars.githubusercontent.com",
        port: "", // Leave empty if default port
        pathname: "/**", // Allow all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile images
        pathname: "/**",
      },
    ],
  },
  // devIndicators: false,
};

module.exports = NextConfig;
