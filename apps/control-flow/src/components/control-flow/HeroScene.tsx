"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SplitSquareHorizontal, GitBranch } from "lucide-react";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".branch-line", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#050505] -z-20" />
      
      {/* Background SVG branches */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path className="branch-line" d="M500 0 L500 300 L200 600 L200 1000" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="1500" strokeDashoffset="1500" />
        <path className="branch-line" d="M500 300 L800 600 L800 1000" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="1500" strokeDashoffset="1500" />
        <path className="branch-line" d="M200 600 L50 800" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="1500" strokeDashoffset="1500" />
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.2)]"
      >
        <GitBranch className="w-12 h-12 text-purple-400" />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 text-center mb-6"
      >
        Control Flow & Logic
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-white/60 text-lg md:text-xl max-w-2xl text-center font-light"
      >
        Programs don't just run straight down. They think, they evaluate, and they make choices. Learn how JavaScript navigates the crossroads.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center text-white/30 text-sm font-mono"
      >
        <span>Scroll to evaluate</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mt-4" />
      </motion.div>
    </div>
  );
}
