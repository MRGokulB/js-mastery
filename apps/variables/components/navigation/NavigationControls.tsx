"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUp, Compass, Code2, ArrowLeft, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function NavigationControls({ topicName }: { topicName: string }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  const CHAPTERS = [
    { id: "scene-analogies", label: "Analogies" },
    { id: "scene-memory", label: "Stack vs Heap" },
    { id: "scene-declarations", label: "Declarations" },
    { id: "scene-mutations", label: "Mutations" },
    { id: "scene-tdz", label: "TDZ Chamber" },
    { id: "scene-gc", label: "Garbage Collector" },
    { id: "scene-coercion", label: "Coercion" },
    { id: "scene-sandbox", label: "Sandbox" },
    { id: "scene-quiz", label: "Quiz" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScrollY / totalScroll) * 100)));
      }

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setShowTopBtn(currentScrollY > 300);
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-200/80 dark:border-white/[0.08] bg-white/85 dark:bg-[#07090e]/85 backdrop-blur-xl transition-colors duration-200"
      >
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="https://hub-bay-six-16.vercel.app/"
              className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl"
              title="Return to JavaScript Universe Hub"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center shadow-sm border border-slate-700/60 relative overflow-hidden group-hover:border-amber-500/50 transition-colors">
                <svg width="22" height="22" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                  <defs>
                    <linearGradient id="navLogoGold" x1="120" y1="120" x2="390" y2="390" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FEF08A"/>
                      <stop offset="35%" stopColor="#F59E0B"/>
                      <stop offset="100%" stopColor="#D97706"/>
                    </linearGradient>
                  </defs>
                  <path d="M216 150 V315 C216 358 190 382 146 382 C120 382 98 372 84 358 L108 318 C118 326 130 334 146 334 C164 334 172 322 172 304 V150 H216 Z" fill="url(#navLogoGold)"/>
                  <path d="M394 212 C394 168 360 144 306 144 C256 144 222 168 218 206 L260 214 C264 192 282 182 306 182 C330 182 350 192 350 208 C350 222 340 230 312 238 L284 246 C242 258 220 280 220 316 C220 358 256 384 310 384 C364 384 400 358 404 318 L360 310 C356 334 336 346 310 346 C284 346 264 336 264 318 C264 304 274 296 300 288 L328 280 C372 268 394 246 394 212 Z" fill="url(#navLogoGold)"/>
                  <circle cx="396" cy="146" r="22" fill="#FEF08A"/>
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">
                    JS Universe
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">
                    CH 01
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block leading-tight">
                  {topicName}
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.06] text-xs font-medium">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollToId(ch.id)}
                className="px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.08] transition-all cursor-pointer whitespace-nowrap focus-visible:ring-1 focus-visible:ring-amber-500"
              >
                {ch.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <ThemeToggle />

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-variables-tour"))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
              title="Tour this module"
            >
              <Compass size={14} className="text-amber-500" />
              <span className="hidden sm:inline">Tour</span>
            </button>

            <Link
              href="https://hub-bay-six-16.vercel.app/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[36px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs"
              title="Back to JS Universe Hub"
            >
              <ArrowLeft size={13} />
              <span className="hidden sm:inline">Hub</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer"
              aria-label="Toggle chapters menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 py-3 shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CHAPTERS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => scrollToId(ch.id)}
                    className="p-2 text-left rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-500 transition-colors cursor-pointer"
                  >
                    &bull; {ch.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 backdrop-blur-md transition-all shadow-xl cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
