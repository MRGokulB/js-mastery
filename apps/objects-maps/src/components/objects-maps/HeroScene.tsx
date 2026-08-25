"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Braces } from "lucide-react";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".bg-item", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-10, 10)",
        duration: "random(2, 4)",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.1,
          from: "random"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.1),transparent_50%)] -z-10" />
      
      {/* Background Floating Objects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="bg-item absolute font-mono text-amber-500/30 border border-amber-500/10 rounded-lg px-4 py-2"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: 0.5 + Math.random() * 1
            }}
          >
            {`key_${i}: "value"`}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-24 h-24 rounded-3xl bg-amber-950/30 border border-amber-500/20 flex items-center justify-center mb-8 backdrop-blur-xl shadow-[0_0_50px_rgba(245,158,11,0.2)]"
      >
        <Braces className="w-12 h-12 text-amber-400" />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 text-center mb-6"
      >
        Objects & Maps
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 text-white/60 text-lg md:text-xl max-w-2xl text-center font-light px-6"
      >
        The world of Key-Value stores. Understand the critical difference between copying a value and copying a memory reference.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center text-white/30 text-sm font-mono z-10"
      >
        <span>Scroll down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mt-4" />
      </motion.div>
    </div>
  );
}
