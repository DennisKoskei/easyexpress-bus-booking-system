import type { Metadata } from "next";
import Header from "@components/Header";
import Footer from "@components/Footer";

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
      <body className="min-h-screen flex flex-col relative bg-gray-100">
        <Header />
        <div className="container mx-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
