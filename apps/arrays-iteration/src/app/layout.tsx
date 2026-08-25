import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavigationControls } from "@/components/navigation/NavigationControls";
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
  title: "Arrays & Iteration Pipelines | JavaScript Mastery",
  description: "Visualize how JavaScript Arrays map to contiguous memory. Master array mutations, Big-O complexities (O(n) vs O(1)), and functional programming pipelines (Map, Filter, Reduce).",
  keywords: ["JavaScript Arrays", "JS Map Filter Reduce", "Array Mutation", "Big O Notation Arrays", "Functional Programming JS", "JS Mastery"],
  openGraph: {
    title: "Arrays & Iteration Pipelines | JavaScript Mastery",
    description: "Visualize how JavaScript Arrays map to contiguous memory. Master array mutations and functional pipelines.",
    type: "website",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "JavaScript Arrays & Iteration",
      "description": "Visual guide to contiguous memory allocation, O(1) index access, and functional array pipelines in JavaScript.",
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
          "name": "Why is unshifting an array slower than pushing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pushing adds an element to the end of the array, requiring O(1) time. Unshifting adds an element to the beginning, meaning every single subsequent element must be shifted and re-indexed in memory, resulting in an O(n) operation."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between map, filter, and reduce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Map transforms each item into a new item. Filter keeps only items that pass a condition. Reduce takes all items and squashes them down into a single accumulated value."
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
        <NavigationControls topicName="Arrays & Iteration" />
        {children}
      </body>
    </html>
  );
}
