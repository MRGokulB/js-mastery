"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Brackets } from "lucide-react";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Background array indices sliding
      gsap.to(".bg-index", {
        x: "-=100%",
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_50%)] -z-10" />
      
      {/* Background Matrix-like Arrays */}
      <div className="absolute top-1/4 w-[200%] flex gap-4 opacity-5 pointer-events-none font-mono text-6xl text-cyan-500 overflow-hidden bg-index">
        {[...Array(20)].map((_, i) => (
          <span key={i}>[{i}]</span>
        ))}
      </div>
      <div className="absolute bottom-1/4 w-[200%] flex gap-4 opacity-5 pointer-events-none font-mono text-6xl text-cyan-500 overflow-hidden bg-index" style={{ animationDirection: 'reverse' }}>
        {[...Array(20)].map((_, i) => (
          <span key={i}>[{20-i}]</span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-24 h-24 rounded-3xl bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-center mb-8 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.2)]"
      >
        <Brackets className="w-12 h-12 text-cyan-400" />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-500 text-center mb-6"
      >
        Arrays & Iteration
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-white/60 text-lg md:text-xl max-w-2xl text-center font-light px-6"
      >
        The backbone of data structures. Contiguous memory blocks, high-speed indexed access, and elegant functional pipelines.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center text-white/30 text-sm font-mono"
      >
        <span>Scroll to index [0]</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mt-4" />
      </motion.div>
    </div>
  );
}
