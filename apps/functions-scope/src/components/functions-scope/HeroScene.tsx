"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Box, Wrench } from "lucide-react";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".gear-spin", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear"
      });
      gsap.to(".flow-path", {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#050505] -z-20" />
      
      {/* Background Flow */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none -z-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path className="flow-path" d="M200 200 Q 500 0 800 200 T 500 500 T 200 800" fill="none" stroke="#f97316" strokeWidth="4" strokeDasharray="1000" strokeDashoffset="1000" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-24 h-24 rounded-3xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-8 backdrop-blur-xl shadow-[0_0_50px_rgba(249,115,22,0.2)]"
      >
        <Box className="w-12 h-12 text-orange-400" />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-orange-500 text-center mb-6"
      >
        Functions & Scope
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-white/60 text-lg md:text-xl max-w-2xl text-center font-light"
      >
        The building blocks of modular code. Learn how JavaScript passes data, manages memory frames, and enforces strict boundary walls.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center text-white/30 text-sm font-mono"
      >
        <span>Scroll to invoke</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mt-4" />
      </motion.div>
    </div>
  );
}
