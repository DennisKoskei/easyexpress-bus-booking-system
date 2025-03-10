import type { Metadata } from "next";
import React from "react";
import "@styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import SessionProvider from "@components/SessionProvider"; // Import the new provider

export const metadata: Metadata = {
  title: "EasyExpress Bus Booking System",
  description: "Booking Made Easy, Travel made swift",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          <div className="relative overflow-hidden">{children}</div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
