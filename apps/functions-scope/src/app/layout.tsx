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
  title: "Functions, Scope, & Closures | JavaScript Mastery",
  description: "Visually master JavaScript Functions. Explore the Execution Context, Call Stack, Lexical Scope, and Closures through cinematic GSAP animations.",
  keywords: ["JavaScript Functions", "JS Closures", "Execution Context", "Call Stack", "Lexical Scope", "Learn JS"],
  openGraph: {
    title: "Functions, Scope, & Closures | JavaScript Mastery",
    description: "Visually master JavaScript Functions. Explore the Execution Context, Call Stack, Lexical Scope, and Closures.",
    type: "website",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "JavaScript Functions, Scope & Closures",
      "description": "Visual guide to the JS Execution Context, memory creation phases, and how closures trap scope.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "JS Mastery"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a closure in JavaScript?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A closure is a function that remembers the variables in its outer lexical environment, even after that outer function has finished executing."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Call Stack?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Call Stack is a LIFO (Last In, First Out) data structure used by the JavaScript engine to keep track of function execution."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NavigationControls topicName="Functions & Scope" />
        {children}
      </body>
    </html>
  );
}
