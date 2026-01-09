import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Portfolio | Your Name",
  description: "Full Stack Developer - Building innovative web applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-primary selection:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
