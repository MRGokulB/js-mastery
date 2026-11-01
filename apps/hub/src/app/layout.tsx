import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "JavaScript Universe | Advanced JS Universe Hub",
  description: "Master JavaScript from the ground up. Interactive, Awwwards-winning visualizers for Variables, Control Flow, Functions, Arrays, Objects, and the DOM. Learn how JS actually works under the hood.",
  keywords: ["JavaScript tutorial", "Learn JS", "Interactive JavaScript", "JS Universe", "Frontend Development", "Web Development", "Execution Context", "JS Engine"],
  openGraph: {
    title: "JavaScript Universe | Advanced JS Universe Hub",
    description: "Deep dive into JS mechanics with cinematic visualizers. From memory pointers to the Event Loop.",
    type: "website",
    locale: "en_US",
    siteName: "JavaScript Universe",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Universe | Advanced JS Universe",
    description: "Interactive, visual JavaScript roadmap.",
  },
  robots: "index, follow",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "JavaScript Universe",
  "url": "https://hub-bay-six-16.vercel.app/",
  "logo": "https://hub-bay-six-16.vercel.app/logo.png",
  "description": "An interactive, visual roadmap to mastering JavaScript programming. Features deep technical visualizers explaining memory allocation, arrays, control flow, and objects.",
  "sameAs": [
    "https://github.com/MRGokulB"
  ],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hub-bay-six-16.vercel.app/"
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best way to learn JavaScript visually?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JavaScript Universe provides Awwwards-level interactive visualizers that explain code execution, memory allocation, array iteration, and object references visually."
      }
    },
    {
      "@type": "Question",
      "name": "How do JavaScript arrays work in memory?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In JavaScript, arrays are theoretically contiguous memory blocks. Accessing an index is O(1) time complexity, while unshifting elements is O(n) because all subsequent elements must be re-indexed."
      }
    }
  ]
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-blue-500/30">{children}</body>
    </html>
  );
}
