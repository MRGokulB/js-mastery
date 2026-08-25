"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function NavigationControls({ topicName }: { topicName: string }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      setShowTopBtn(currentScrollY > 300);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 left-6 z-50 flex items-center"
      >
        <Link 
          href="https://hub-bay-six-16.vercel.app/" 
          className="group flex items-center gap-3 px-4 py-2 bg-[#050505]/80 hover:bg-[#111] border border-white/10 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-md text-sm font-mono shadow-2xl"
        >
          {/* Mini Logo */}
          <div className="relative flex items-center justify-center w-6 h-6 group-hover:scale-110 transition-transform">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm" />
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
              <path d="M50 5 L93 25 L93 75 L50 95 L7 75 L7 25 Z" fill="none" stroke="currentColor" strokeWidth="8" />
              <text x="50" y="60" fontFamily="monospace" fontSize="30" fill="currentColor" fontWeight="bold" textAnchor="middle">JS</text>
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-tight">JS Universe</span>
            <span className="text-white/20">/</span>
            <span className="text-white/70">{topicName}</span>
          </div>
        </Link>
      </motion.div>

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 backdrop-blur-md transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
