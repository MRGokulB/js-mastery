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
  title: "Control Flow & Logic | JavaScript Mastery",
  description: "Master JavaScript Control Flow. Visual explanations for If/Else, Switch, Ternary Operators, and the Truthy/Falsy nature of JS with interactive WebGL/GSAP animations.",
  keywords: ["JavaScript Control Flow", "Truthy Falsy", "JS Switch Statement", "Ternary Operator", "Learn JavaScript", "Interactive JS"],
  openGraph: {
    title: "Control Flow & Logic | JavaScript Mastery",
    description: "Learn how JavaScript makes decisions. Interactive visualizers for if/else, switch, and truthy/falsy values.",
    type: "website",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "JavaScript Control Flow & Logic",
      "description": "Visual guide to JavaScript decision making, truthy/falsy evaluation, and branching logic.",
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
          "name": "What are truthy and falsy values in JavaScript?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In JavaScript, a falsy value is a value that is considered false when encountered in a Boolean context. There are only 6 falsy values: false, 0, '', null, undefined, and NaN. Everything else is truthy."
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
        <NavigationControls topicName="Control Flow & Logic" />
        {children}
      </body>
    </html>
  );
}
