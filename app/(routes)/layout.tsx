import type { Metadata } from "next";
import React from "react";
import "@styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import SessionProvider from "@components/SessionProvider"; // Import provider

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
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="relative flex-1 overflow-hidden">{children}</div>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
