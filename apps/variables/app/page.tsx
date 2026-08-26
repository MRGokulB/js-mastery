"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScene } from "@/components/variables/HeroScene";
import { ScopeScene } from "@/components/variables/ScopeScene";
import { MemoryScene } from "@/components/variables/MemoryScene";
import { CoercionScene } from "@/components/variables/CoercionScene";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial reveal animation for the whole page
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-start w-full relative">
      <HeroScene />
      <ScopeScene />
      <MemoryScene />
      <CoercionScene />
      
      {/* End spacer */}
      <div className="h-screen w-full flex items-center justify-center flex-col text-center bg-[#050505]">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          You've Mastered Variables
        </h2>
        <p className="text-white/60 text-xl max-w-lg mb-8">
          Primitives are locked in the stack. References point to the heap. Let and Const bind to blocks. You are ready for what comes next.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
      </div>
    </div>
  );
}
