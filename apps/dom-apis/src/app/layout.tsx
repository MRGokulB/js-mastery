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
  title: "The DOM & Browser APIs | JS Universe",
  description: "Master the Document Object Model, Render Tree, Layout Reflow, GPU Compositing, Event Capturing & Bubbling, and Virtual DOM diffing visually.",
  keywords: ["DOM", "Browser APIs", "Render Tree", "Reflow vs Repaint", "Event Bubbling", "Event Capturing", "Virtual DOM", "JS Universe"],
  openGraph: {
    title: "The DOM & Browser APIs | JS Universe",
    description: "Cinematic visualizer for DOM tree mutations, browser render pipeline, and event propagation.",
    type: "website",
    locale: "en_US",
    siteName: "JavaScript Universe",
  },
  twitter: {
    card: "summary_large_image",
    title: "The DOM & Browser APIs | JS Universe",
    description: "Interactive visualizer for DOM tree mutations and the critical rendering path.",
  },
  robots: "index, follow",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "The DOM & Browser APIs",
  "description": "Interactive visualizer for DOM tree mutations, the browser critical render pipeline, event bubbling phases, and virtual DOM diffing.",
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
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-orange-500/30 selection:text-orange-200">
        <NavigationControls topicName="DOM & Browser APIs" />
        {children}
      </body>
    </html>
  );
}
