import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { NavigationControls } from "@/components/navigation/NavigationControls";
import { OnboardingTour } from "@/components/OnboardingTour";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://variables-pi.vercel.app"),
  title: {
    default: "Variables, Stack & Heap | JS Universe",
    template: "%s | JS Universe",
  },
  description: "Master JavaScript memory architecture from physical silicon to V8 Ignition bytecode. Interactive Call Stack vs Heap telemetry, TDZ laser containment, and ECMA-262 type coercion engine.",
  keywords: [
    "JavaScript Variables",
    "Call Stack",
    "V8 Heap",
    "Temporal Dead Zone",
    "TDZ",
    "let vs const vs var",
    "Type Coercion",
    "Garbage Collection",
    "Mark and Sweep",
    "JS Memory Model",
    "ECMA-262"
  ],
  authors: [{ name: "JS Universe" }],
  creator: "JS Universe",
  publisher: "JS Universe",
  openGraph: {
    title: "Variables, Stack & Heap | Visual JavaScript Runtime",
    description: "Interactive architectural guide to JavaScript variables, Call Stack registers, V8 Heap pointers, and type coercion algorithms.",
    url: "https://variables-pi.vercel.app",
    siteName: "JS Universe",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "JavaScript Universe Variables Architecture"
      }
    ],
    locale: "en_US",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "Variables, Stack & Heap | Visual JavaScript Runtime",
    description: "Explore the V8 engine memory model: Call Stack allocations, Heap pointer graphs, TDZ mechanics, and ECMA-262 type conversion pipelines.",
    images: ["/icon.png"],
    creator: "@mrgokulb"
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/apple-icon.png"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "headline": "JavaScript Variables, Memory Allocation, and V8 Runtime Architecture",
      "description": "Comprehensive interactive analysis of how JavaScript allocates memory across Call Stack registers and V8 Heap pointers, enforcing lexical scopes and type coercion.",
      "author": {
        "@type": "Person",
        "name": "Gokul Boddawar"
      },
      "publisher": {
        "@type": "EducationalOrganization",
        "name": "JS Universe",
        "url": "https://hub-bay-six-16.vercel.app"
      },
      "educationalLevel": "Intermediate",
      "about": [
        { "@type": "Thing", "name": "V8 JavaScript Engine" },
        { "@type": "Thing", "name": "Call Stack and Heap" },
        { "@type": "Thing", "name": "Temporal Dead Zone" },
        { "@type": "Thing", "name": "ECMA-262 Specification" }
      ]
    },
    {
      "@type": "Course",
      "name": "JavaScript Variables, Data Types & Runtime Memory",
      "description": "An interactive, visual course covering JavaScript variables, data types, memory allocation, and type coercion.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "JS Universe"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between let, const, and var in JavaScript?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "var is function-scoped and hoisted with an initial value of undefined. let and const are block-scoped and enter a Temporal Dead Zone until initialized. const prevents reassignment of the stack binding, while objects stored on the heap remain mutable unless explicitly frozen."
          }
        },
        {
          "@type": "Question",
          "name": "How does V8 allocate memory for primitives versus objects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Primitives (numbers, booleans, symbols) with predictable bounds are stored directly in Call Stack registers as 31-bit Smis or 64-bit IEEE floats. Dynamically sized objects, arrays, and functions are allocated on the V8 Heap, with an 8-byte pointer address stored on the stack."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Temporal Dead Zone (TDZ) in JavaScript?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Temporal Dead Zone is the period between entering a lexical block scope and the physical execution of the let or const declaration. Accessing the variable during this window throws an immediate ReferenceError."
          }
        }
      ]
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-[#fbfcfd] dark:bg-[#07090e] text-slate-900 dark:text-white overflow-x-hidden min-h-screen selection:bg-amber-500/20 transition-colors duration-200">
        <OnboardingTour />
        <NavigationControls topicName="Variables & Data Types" />
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 dark:bg-amber-500/10 blur-[140px] pointer-events-none z-0" />
        <div className="fixed top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-orange-500/5 dark:bg-orange-500/10 blur-[160px] pointer-events-none z-0" />

        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

        <main className="relative w-full min-h-screen z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
