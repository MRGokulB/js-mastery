"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu } from "lucide-react";

export function MemoryScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Show execution jumping
      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        // highlight IF evaluation
        .to(".mem-if", { backgroundColor: "#1e3a8a", borderColor: "#3b82f6", duration: 0.5 })
        .to(".pointer", { top: "60px", duration: 0.5 }, "<")
        
      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        // condition is false, jump to else
        .to(".mem-if", { backgroundColor: "#0f0f0f", borderColor: "#333", duration: 0.5 })
        .to(".pointer", { top: "240px", duration: 1, ease: "power2.inOut" })
        .to(".mem-else", { backgroundColor: "#3f1a1a", borderColor: "#ef4444", duration: 0.5 }, "<0.5")

      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        // continue
        .to(".mem-else", { backgroundColor: "#0f0f0f", borderColor: "#333", duration: 0.5 })
        .to(".pointer", { top: "360px", duration: 0.5 })
        .to(".mem-cont", { backgroundColor: "#14532d", borderColor: "#22c55e", duration: 0.5 }, "<")

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2 relative h-64 lg:h-96 flex flex-col justify-center">
          <h2 className="text-beat-1 absolute text-2xl md:text-4xl font-bold text-white">
            Under the hood, your CPU reads instructions one by one.
          </h2>
          <h2 className="text-beat-2 absolute text-2xl md:text-4xl font-bold text-white opacity-0 translate-y-5">
            When it hits an <span className="text-blue-400 font-mono">if()</span> statement, it evaluates the condition.
          </h2>
          <h2 className="text-beat-3 absolute text-2xl md:text-4xl font-bold text-white opacity-0 translate-y-5">
            If false, it doesn't read the inside code. It physically <span className="text-red-400 font-mono">JUMPS</span> the instruction pointer over those memory addresses!
          </h2>
          <h2 className="text-beat-4 absolute text-2xl md:text-4xl font-bold text-white opacity-0 translate-y-5">
            This is why skipping large blocks of code using if/else is highly efficient.
          </h2>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center pl-12 lg:pl-0">
          <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl font-mono text-sm">
            
            {/* Instruction Pointer */}
            <div className="pointer absolute -left-12 top-6 flex items-center gap-2 text-yellow-400 transition-all">
              <Cpu className="w-6 h-6 animate-pulse" />
              <div className="w-4 h-0.5 bg-yellow-400" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <span className="text-white/30 text-xs w-12">0x100</span>
                <div className="flex-1 p-2 rounded bg-[#0f0f0f] border border-[#333] text-white/50">let age = 16;</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white/30 text-xs w-12">0x104</span>
                <div className="mem-if flex-1 p-2 rounded bg-[#0f0f0f] border border-[#333] text-white/80">if (age {">="} 18) {'{'}</div>
              </div>
              
              {/* IF block */}
              <div className="flex items-center gap-4 pl-16">
                <span className="text-white/30 text-xs w-12 -ml-16">0x108</span>
                <div className="flex-1 p-2 rounded bg-[#0f0f0f] border border-[#333] text-white/50 opacity-40">buyTicket();</div>
              </div>
              <div className="flex items-center gap-4 pl-16">
                <span className="text-white/30 text-xs w-12 -ml-16">0x10C</span>
                <div className="flex-1 p-2 rounded bg-[#0f0f0f] border border-[#333] text-white/50 opacity-40">enterVenue();</div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-white/30 text-xs w-12">0x110</span>
                <div className="mem-else flex-1 p-2 rounded bg-[#0f0f0f] border border-[#333] text-white/80">{'}'} else {'{'}</div>
              </div>

              {/* ELSE block */}
              <div className="flex items-center gap-4 pl-16">
                <span className="text-white/30 text-xs w-12 -ml-16">0x114</span>
                <div className="flex-1 p-2 rounded bg-[#0f0f0f] border border-[#333] text-white/80">goHome();</div>
              </div>
              <div className="flex items-center gap-4 pl-16">
                <span className="text-white/30 text-xs w-12 -ml-16">0x118</span>
                <div className="flex-1 p-2 rounded bg-[#0f0f0f] border border-[#333] text-white/80">studyJS();</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white/30 text-xs w-12">0x11C</span>
                <div className="flex-1 p-2 rounded bg-[#0f0f0f] border border-[#333] text-white/80">{'}'}</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white/30 text-xs w-12">0x120</span>
                <div className="mem-cont flex-1 p-2 rounded bg-[#0f0f0f] border border-[#333] text-white/80">sleep();</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
