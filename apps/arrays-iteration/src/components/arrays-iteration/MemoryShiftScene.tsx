"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MemoryShiftScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      tl.to(".text-ms-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-ms-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".ms-box-orig", { opacity: 1, scale: 1, stagger: 0.1, duration: 1 }, "<")

      tl.to(".text-ms-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-ms-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".ms-box-push", { opacity: 1, scale: 1, y: 0, duration: 1 })

      tl.to(".text-ms-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-ms-4", { opacity: 1, y: 0, duration: 1 }, "<")

      tl.to(".text-ms-4", { opacity: 0, y: -20, duration: 1 })
        .to(".text-ms-5", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".ms-box-shiftable", { x: "+=72", duration: 1, stagger: -0.2 })

      tl.to(".text-ms-5", { opacity: 0, y: -20, duration: 1 })
        .to(".text-ms-6", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".ms-box-unshift", { opacity: 1, scale: 1, y: 0, duration: 1 })

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center px-6">
      
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 min-w-0">
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-ms-1 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              Why are some operations fast and others slow? Let&apos;s look at memory shifting.
            </h2>
            <h2 className="text-ms-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              An array currently holds <span className="text-cyan-400">3 elements</span>.
            </h2>
            <h2 className="text-ms-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              <span className="text-cyan-400 font-mono">.push(&quot;D&quot;)</span><br/>Adds an element to the end. The engine just places it in the next available slot. <span className="text-green-400">O(1) Time</span>.
            </h2>
            <h2 className="text-ms-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              But what about <span className="text-pink-400 font-mono">.unshift(&quot;Z&quot;)</span>?
            </h2>
            <h2 className="text-ms-5 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              The first slot (index 0) is already occupied! The engine must shift <span className="text-pink-400">EVERY</span> element one slot to the right.
            </h2>
            <h2 className="text-ms-6 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Finally, the new element can be placed. If the array had 1,000,000 items, that&apos;s 1,000,000 memory moves. <span className="text-red-400">O(n) Time</span>.
            </h2>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center min-w-0">
          
          <div className="relative w-full max-w-2xl h-48 border-b-2 border-white/20 flex items-end">
            
            <div className="ms-box-unshift absolute bottom-2 left-[16px] opacity-0 scale-50 -translate-y-10 w-16 h-16 bg-pink-900 border-2 border-pink-500 rounded-xl flex items-center justify-center text-white font-bold font-mono text-xl z-20 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
              Z
            </div>

            <div className="ms-box-orig ms-box-shiftable absolute bottom-2 left-[16px] opacity-0 scale-50 w-16 h-16 bg-slate-800 border-2 border-slate-600 rounded-xl flex items-center justify-center text-white font-bold font-mono text-xl z-10">
              A
            </div>
            <div className="ms-box-orig ms-box-shiftable absolute bottom-2 left-[88px] opacity-0 scale-50 w-16 h-16 bg-slate-800 border-2 border-slate-600 rounded-xl flex items-center justify-center text-white font-bold font-mono text-xl z-10">
              B
            </div>
            <div className="ms-box-orig ms-box-shiftable absolute bottom-2 left-[160px] opacity-0 scale-50 w-16 h-16 bg-slate-800 border-2 border-slate-600 rounded-xl flex items-center justify-center text-white font-bold font-mono text-xl z-10">
              C
            </div>

            <div className="ms-box-push ms-box-shiftable absolute bottom-2 left-[232px] opacity-0 scale-50 -translate-y-10 w-16 h-16 bg-cyan-900 border-2 border-cyan-500 rounded-xl flex items-center justify-center text-white font-bold font-mono text-xl z-10 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              D
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
