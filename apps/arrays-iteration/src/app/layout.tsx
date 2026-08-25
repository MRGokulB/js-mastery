import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arrays & Iteration | JS Mastery",
  description: "JavaScript Arrays and Iteration visualizer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Link 
          href="https://hub-bay-six-16.vercel.app/" 
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-md text-sm font-mono shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Hub</span>
        </Link>
        {children}
      </body>
    </html>
  );
}
