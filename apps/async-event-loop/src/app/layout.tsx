import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavigationControls } from "@/components/navigation/NavigationControls";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asynchronous JavaScript & The Event Loop | JS Universe",
  description: "Master JavaScript concurrency under the hood. Visual Call Stack, Web APIs, Microtask Queue (Promises), Task Queue (setTimeout), and Event Loop tick mechanics.",
  keywords: ["JavaScript Event Loop", "Microtasks vs Macrotasks", "Promise resolution", "Call Stack", "Web APIs", "Single Threaded Concurrency", "Libuv", "JS Universe"],
  openGraph: {
    title: "Asynchronous JavaScript & The Event Loop | JS Universe",
    description: "Cinematic, interactive visualizer of the JavaScript concurrency engine and event loop ticks.",
    type: "website",
    locale: "en_US",
    siteName: "JavaScript Universe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Async JS & The Event Loop | JS Universe",
    description: "Deep dive into JS concurrency with interactive stepping.",
  },
  robots: "index, follow",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Asynchronous JavaScript & The Event Loop",
  "description": "Interactive, visual guide to JavaScript single-threaded concurrency, Call Stack, Microtasks, Task Queue, and Promise scheduling.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "JavaScript Universe",
    "url": "https://hub-bay-six-16.vercel.app/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-indigo-500/30 selection:text-indigo-200">
        <NavigationControls topicName="Async & Event Loop" />
        {children}
      </body>
    </html>
  );
}
