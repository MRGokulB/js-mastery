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
  title: "JavaScript Universe | Visual V8 Internals & Interactive Architecture",
  description: "Master JavaScript through hardware-level visualizers. Stack vs Heap, V8 Execution Context, Closures, Event Loop microtasks, and DOM rendering pipelines.",
  keywords: ["JavaScript tutorial", "Learn JS", "Interactive JavaScript", "JS Universe", "Frontend Development", "Web Development", "Execution Context", "JS Engine", "Event Loop"],
  openGraph: {
    title: "JavaScript Universe | Visual V8 Internals & Interactive Architecture",
    description: "Deep dive into JS mechanics with cinematic visualizers. From memory pointers to the Event Loop.",
    type: "website",
    locale: "en_US",
    siteName: "JavaScript Universe",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Universe | Visual V8 Internals",
    description: "Interactive, cinematic JavaScript roadmap.",
  },
  robots: "index, follow",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "JavaScript Universe",
  "url": "https://hub-bay-six-16.vercel.app/",
  "logo": "https://hub-bay-six-16.vercel.app/logo.png",
  "description": "An interactive, visual roadmap to mastering JavaScript programming down to memory allocation, AST execution, event loop queues, and prototype chains.",
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
      "name": "How does the JavaScript Event Loop work under the hood?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The JavaScript engine executes synchronous operations on the Call Stack. Asynchronous tasks spawn Web APIs; upon resolution, Promise reactions populate the Microtask queue while timers enter the Macrotask queue. Microtasks drain completely before the next task executes."
      }
    }
  ]
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-amber-400/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
