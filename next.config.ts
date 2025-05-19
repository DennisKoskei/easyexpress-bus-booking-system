// @type {import('next').NextConfig}
import type { NextConfig } from "next";

const NextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // Added pravatar
        pathname: "/**",
      },
    ],
  },
};

module.exports = NextConfig;
