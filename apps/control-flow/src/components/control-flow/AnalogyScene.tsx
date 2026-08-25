"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

      // Initially everything is straight
      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        // Switch track to left
        .to(".track-switch", { rotation: -15, transformOrigin: "bottom center", duration: 1 }, "<")
        .to(".code-if", { color: "#4ade80", duration: 0.5 }, "<0.5")
        // Train moves left
        .to(".train-dot", { x: -80, y: -120, scale: 1.5, backgroundColor: "#4ade80", duration: 1.5 })

      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        // Reset and switch track to right
        .to(".train-dot", { x: 0, y: 0, scale: 1, backgroundColor: "#60a5fa", duration: 0.1 }, "<")
        .to(".track-switch", { rotation: 15, duration: 1 }, "<")
        .to(".code-if", { color: "#6b7280", duration: 0.5 }, "<")
        .to(".code-else", { color: "#f87171", duration: 0.5 }, "<0.5")
        // Train moves right
        .to(".train-dot", { x: 80, y: -120, scale: 1.5, backgroundColor: "#f87171", duration: 1.5 })

      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".truthy-panel", { opacity: 1, y: 0, duration: 1 }, "<")

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 relative h-48 lg:h-96 flex flex-col justify-center">
          <h2 className="text-beat-1 absolute text-2xl md:text-4xl font-bold text-white">
            Code runs straight down... until it hits a switch.
          </h2>
          <h2 className="text-beat-2 absolute text-2xl md:text-4xl font-bold text-white opacity-0 translate-y-5">
            If the condition is <span className="text-green-400">TRUE</span>, it takes the "if" branch.
          </h2>
          <h2 className="text-beat-3 absolute text-2xl md:text-4xl font-bold text-white opacity-0 translate-y-5">
            If the condition is <span className="text-red-400">FALSE</span>, it bypasses it and takes the "else" branch.
          </h2>
          <h2 className="text-beat-4 absolute text-2xl md:text-4xl font-bold text-white opacity-0 translate-y-5">
            What counts as true or false? <br/><span className="text-purple-400 font-mono text-xl mt-4 block">Truthy vs Falsy</span>
          </h2>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center relative h-96">
          {/* Visual Track System */}
          <div className="relative w-48 h-64 border-b-2 border-white/20">
            {/* Left Branch */}
            <div className="absolute top-0 left-0 w-[2px] h-32 bg-white/20 -rotate-[30deg] origin-bottom transform translate-x-12" />
            <div className="absolute top-[-20px] left-0 font-mono text-sm text-green-400 code-if transition-colors">if (true)</div>
            
            {/* Right Branch */}
            <div className="absolute top-0 right-0 w-[2px] h-32 bg-white/20 rotate-[30deg] origin-bottom transform -translate-x-12" />
            <div className="absolute top-[-20px] right-0 font-mono text-sm text-gray-500 code-else transition-colors">else</div>

            {/* Main Switch Track */}
            <div className="track-switch absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-32 bg-blue-500 origin-bottom shadow-[0_0_15px_#3b82f6]" />

            {/* Base Track */}
            <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[4px] h-32 bg-white/40" />

            {/* The Train/Execution context */}
            <div className="train-dot absolute bottom-0 left-1/2 w-8 h-8 -ml-4 -mb-4 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(96,165,250,0.5)] z-20" />
          </div>

          <div className="truthy-panel absolute -bottom-20 right-0 opacity-0 translate-y-5 bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl backdrop-blur-xl w-64 shadow-2xl">
            <h3 className="text-white font-mono mb-4 text-sm">Falsy Values:</h3>
            <ul className="space-y-2 font-mono text-xs text-red-400">
              <li>false</li>
              <li>0</li>
              <li>"" (empty string)</li>
              <li>null</li>
              <li>undefined</li>
              <li>NaN</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10 font-mono text-xs text-green-400">
              Everything else is Truthy!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
