import type { Metadata, Viewport } from "next";
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

const DOMAIN = "https://hub-bay-six-16.vercel.app";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "JavaScript Universe | Visual V8 Internals & Interactive Architecture",
    template: "%s | JavaScript Universe",
  },
  description: "Master JavaScript through interactive visualizers. Explore Call Stack vs Heap memory, Closures, Event Loop microtasks, and V8 engine compilation.",
  keywords: [
    "JavaScript visualizer",
    "Learn JavaScript",
    "V8 engine internals",
    "JavaScript Event Loop visualizer",
    "Call Stack vs Heap",
    "Execution context",
    "Closures explained visually",
    "Interactive computer science",
    "Frontend development"
  ],
  authors: [{ name: "JavaScript Universe Team" }],
  creator: "JavaScript Universe",
  publisher: "JavaScript Universe",
  metadataBase: new URL(DOMAIN),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JavaScript Universe | Visual V8 Internals & Interactive Architecture",
    description: "Deep dive into JavaScript mechanics with interactive visualizers. From memory pointers to the Event Loop.",
    url: DOMAIN,
    siteName: "JavaScript Universe",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Universe | Visual V8 Internals & Interactive Architecture",
    description: "Interactive JavaScript visual roadmap: Stack vs Heap, Event Loop, Closures, and V8 engine internals.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const educationalOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "JavaScript Universe",
  "url": DOMAIN,
  "description": "An interactive, visual platform explaining JavaScript runtime mechanics, memory management, and V8 engine architecture.",
  "sameAs": [
    "https://github.com/MRGokulB/js-mastery"
  ]
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JavaScript Universe Visual Explorer",
  "url": DOMAIN,
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Interactive Call Stack vs Heap memory visualizer",
    "Live Event Loop microtask and macrotask simulation",
    "Closures and lexical scope chain mapping",
    "V8 Hidden Classes and property offset tracking",
    "Interactive code-stepping with line-by-line explanation"
  ]
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "JavaScript Runtime & V8 Engine Architecture Visual Course",
  "description": "Comprehensive visual guide to mastering JavaScript execution context, memory allocation, prototype chains, and concurrency.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "JavaScript Universe",
    "url": DOMAIN
  },
  "educationalLevel": "Intermediate to Advanced",
  "about": [
    "JavaScript",
    "V8 Engine",
    "Memory Management",
    "Event Loop",
    "Asynchronous Programming"
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between the Call Stack and Heap in JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Call Stack is fast, contiguous memory used for tracking function execution and storing primitive values (numbers, booleans, 31-bit Smis). The Heap is an unorganized memory pool used for dynamic object and array allocation. Variables referencing objects on the stack store a memory address pointing to the heap."
      }
    },
    {
      "@type": "Question",
      "name": "How does the JavaScript Event Loop prioritize Microtasks over Macrotasks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Whenever the Call Stack empties, the Event Loop checks the Microtask Queue first (e.g., Promise reactions, queueMicrotask). The engine drains all microtasks completely before executing the next Macrotask (e.g., setTimeout, setInterval, I/O events)."
      }
    },
    {
      "@type": "Question",
      "name": "What are V8 Hidden Classes and Shapes in JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Because JavaScript is dynamically typed, the V8 engine creates Hidden Classes (Shapes/Maps) under the hood. When properties are added to an object in the same order, objects share the same shape, enabling Inline Caches (IC) for O(1) property access speeds."
      }
    },
    {
      "@type": "Question",
      "name": "How do Closures retain memory in JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When an inner function references variables from an outer function, the engine stores the outer function's lexical scope environment on the Heap rather than popping it from the Stack, keeping those variables accessible across asynchronous calls."
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#fafbfc] text-[#0f172a] selection:bg-slate-200 selection:text-black">
        {children}
      </body>
    </html>
  );
}
