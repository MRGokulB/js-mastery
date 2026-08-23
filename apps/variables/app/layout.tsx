import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Variables & Data Types | JS Mastery",
    template: "%s | JS Mastery",
  },
  description: "Master JavaScript variables, data types, and type coercion through cinematic interactive visualizations. Learn let, const, var, primitives, and references.",
  keywords: ["JavaScript", "Variables", "Data Types", "let", "const", "var", "Type Coercion", "Primitives", "References", "Interactive Learning"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "JavaScript Variables & Data Types",
  "description": "An interactive, visual course covering JavaScript variables, data types, memory allocation, and type coercion.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "JS Mastery",
  },
  "coursePrerequisites": "None — absolute beginner friendly",
  "educationalLevel": "Beginner",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "courseWorkload": "PT1H30M"
  },
  "offers": {
    "@type": "Offer",
    "category": "Free",
    "price": "0",
    "priceCurrency": "USD"
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050505] text-white overflow-x-hidden min-h-screen selection:bg-amber-500/30">
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none z-0" />
        <div className="fixed top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-orange-500/10 blur-[150px] pointer-events-none z-0" />

        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

        <main className="relative w-full min-h-screen pb-24 z-10">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
