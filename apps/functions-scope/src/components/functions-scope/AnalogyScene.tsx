"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, EyeOff } from "lucide-react";

export function AnalogyScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Beat 1: Intro to Global Scope
      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".func-room", { opacity: 1, scale: 1, duration: 1 }, "<")

      // Beat 2: Function can look OUT
      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".ray-out", { strokeDashoffset: 0, duration: 1 }, "<")
        .to(".global-var", { backgroundColor: "#f97316", color: "#fff", duration: 0.5 })

      // Beat 3: Global CANNOT look IN
      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".ray-in", { strokeDashoffset: 0, duration: 0.8 }, "<")
        .to(".ray-in-bounce", { opacity: 1, duration: 0.2 })
        .to(".ray-in-bounce", { strokeDashoffset: 0, duration: 0.8 })
        .to(".mirror-wall", { borderColor: "#ef4444", boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)", duration: 0.5 }, "<0.2")

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.03),transparent_50%)]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 flex flex-col justify-center min-w-0">
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-beat-1 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              Imagine your JavaScript file is a giant room. This is the <span className="text-orange-400">Global Scope</span>.
            </h2>
            <h2 className="text-beat-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Creating a function builds a smaller room inside it. 
            </h2>
            <h2 className="text-beat-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              The walls of the function are <span className="text-blue-400">One-Way Glass</span>. Code inside the function can perfectly see out into the global scope...
            </h2>
            <h2 className="text-beat-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              But the global scope CANNOT see inside the function! Variables inside are strictly private.
            </h2>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative w-full max-w-[400px] aspect-square">
            
            {/* Global Scope Room */}
            <div className="absolute inset-0 border border-white/20 rounded-3xl p-6">
              <span className="absolute top-6 right-6 text-white/30 font-mono text-sm uppercase tracking-widest">Global Scope</span>
              <div className="global-var absolute top-16 right-6 px-4 py-2 bg-white/5 border border-white/10 rounded-lg font-mono text-white/50 transition-colors z-20">
                let globalMoney = 100;
              </div>

              {/* SVG Interaction Rays */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                {/* Ray looking OUT (from bottom-left to top-right) */}
                <path className="ray-out" d="M 120 250 Q 200 250 280 120" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="300" strokeDashoffset="300" />
                <circle cx="280" cy="120" r="4" fill="#f97316" className="ray-out opacity-0" style={{ transition: "opacity 0.2s 1s" }} />

                {/* Ray trying to look IN (from top-right to bottom-left) */}
                <path className="ray-in" d="M 280 120 Q 200 180 150 200" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="300" strokeDashoffset="300" />
                {/* Bouncing off */}
                <path className="ray-in-bounce opacity-0" d="M 150 200 Q 200 280 280 320" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="300" strokeDashoffset="300" />
              </svg>
            </div>

            {/* Function Scope Room */}
            <div className="func-room opacity-0 scale-90 absolute left-6 bottom-6 w-56 h-56 border border-blue-500/30 bg-blue-950/20 backdrop-blur-md rounded-2xl p-6 mirror-wall transition-colors duration-500 z-20 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-400 font-mono text-xs uppercase tracking-widest">Function Scope</span>
                <Eye className="w-4 h-4 text-blue-400" />
              </div>
              
              <div className="mt-auto">
                <div className="px-3 py-2 bg-blue-900/50 border border-blue-500/30 rounded-lg font-mono text-blue-200 mb-2 text-sm">
                  let privateSecret = 42;
                </div>
                <div className="text-xs text-blue-300/50 italic flex items-center gap-1">
                  <EyeOff className="w-3 h-3" /> Hidden from outside
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
