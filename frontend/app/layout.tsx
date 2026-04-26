"use client"

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Leftbar from "@/components/Leftbar";
import { Inter, Manrope } from 'next/font/google';
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-surface text-on-surface font-sans antialiased" suppressHydrationWarning>
        <Toaster position="top-center" reverseOrder={false} />

        <div className="flex min-h-screen">
          <Leftbar />

          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="ml-64 mt-20.25 p-8">
              {children}
            </main>
          </div>
        </div>

      </body>
    </html>
  );
}