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
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Beat 1: Show raw memory grid
      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".array-slot", { opacity: 1, stagger: 0.1, duration: 1 })

      // Beat 2: Highlight index 3
      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".slot-3", { backgroundColor: "#0891b2", scale: 1.1, duration: 0.5 })
        .to(".cpu-calc", { opacity: 1, duration: 0.5 }, "<")

      // Beat 3: Math formula
      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".formula", { opacity: 1, duration: 0.5 })

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const arrayData = ["Apple", "Banana", "Cherry", "Date", "Elder", "Fig"];

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        {/* Left Side: Explanations */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 min-w-0">
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-beat-1 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              Why is finding an item in an array instantly fast, no matter how big it gets?
            </h2>
            <h2 className="text-beat-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Arrays are stored in <span className="text-cyan-400">Contiguous Memory</span>. The items sit directly next to each other, like houses on a street.
            </h2>
            <h2 className="text-beat-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              If you ask for <code className="text-pink-400 font-mono bg-pink-900/30 px-2 py-1 rounded">arr[3]</code>, the CPU doesn't check 0, 1, and 2. It jumps straight there.
            </h2>
            <h2 className="text-beat-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              It simply takes the Base Address and adds (Index × Size). One single math calculation = <span className="text-green-400">O(1) Speed</span>.
            </h2>
          </div>
        </div>

        {/* Right Side: Memory Grid */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-w-0 py-12">
          
          <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <div className="absolute -top-4 left-6 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2">
              <Cpu className="w-3 h-3" /> Physical RAM
            </div>

            {/* RAM Grid */}
            <div className="flex flex-col gap-2 mt-4">
              {arrayData.map((item, i) => (
                <div key={i} className={`array-slot opacity-0 w-full flex items-center border border-white/10 bg-white/5 rounded-lg overflow-hidden transition-all duration-300 ${i === 3 ? "slot-3" : ""}`}>
                  <div className="w-16 bg-black/50 border-r border-white/10 p-3 text-center text-white/40 font-mono text-sm">
                    {i}
                  </div>
                  <div className="flex-1 p-3 font-mono text-white/80">
                    "{item}"
                  </div>
                  <div className="w-20 bg-black/30 p-3 text-right text-cyan-500/40 font-mono text-xs">
                    0x10{i*4}
                  </div>
                </div>
              ))}
            </div>

            {/* CPU Calculation Tooltip */}
            <div className="cpu-calc opacity-0 absolute top-1/2 -right-12 md:-right-24 bg-cyan-950 border border-cyan-500/50 p-4 rounded-xl shadow-xl backdrop-blur-xl">
              <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">Offset Calculated</div>
              <div className="formula opacity-0 flex flex-col gap-1 font-mono text-sm text-white/80">
                <span>Base: 0x100</span>
                <span>+ (3 × 4 bytes)</span>
                <div className="w-full h-[1px] bg-cyan-500/30 my-1" />
                <span className="text-cyan-300 font-bold">= 0x10C</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
