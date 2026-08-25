"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Database, Lock, Unlock, Hash, Type } from "lucide-react";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin the hero section while animating elements in
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1
        }
      });

      // Step 1: Fade out main title
      tl.to(".main-title", { opacity: 0, y: -50, duration: 1 })
        .to(".subtitle", { opacity: 0, y: -20, duration: 1 }, "<");

      // Step 2: Bring in the 'var, let, const' boxes
      tl.fromTo(".var-box", { opacity: 0, x: -100, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration: 1 })
        .fromTo(".let-box", { opacity: 0, y: 100, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "<")
        .fromTo(".const-box", { opacity: 0, x: 100, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration: 1 }, "<");

      // Step 3: Fade out boxes, fade in Primitive vs Reference explanation
      tl.to(".var-box, .let-box, .const-box", { opacity: 0, scale: 1.2, duration: 1 })
        .fromTo(".data-types", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative bg-transparent px-6 perspective-[1000px]">
      
      {/* INITIAL TITLE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center main-title pointer-events-none">
        <div className="w-20 h-20 mb-8 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.2)]">
          <Database className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-orange-300 mb-6">
          Variables & Data Types
        </h1>
        <p className="subtitle text-white/60 text-lg md:text-xl max-w-2xl font-light">
          Scroll to explore the foundational building blocks of JavaScript. From variable declarations to primitive types and memory references.
        </p>
      </div>

      {/* VAR, LET, CONST BOXES */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 px-4 opacity-0 pointer-events-none var-box-container">
        
        {/* VAR */}
        <div className="var-box w-full md:w-1/3 max-w-[300px] h-[320px] bg-red-500/10 border border-red-500/30 rounded-3xl p-8 flex flex-col backdrop-blur-xl opacity-0">
          <div className="flex justify-between items-start mb-6">
            <span className="font-mono text-2xl font-bold text-red-400">var</span>
            <Unlock className="w-6 h-6 text-red-400/50" />
          </div>
          <p className="text-white/70 mb-4 text-sm leading-relaxed">
            The chaotic legacy keyword. Function-scoped, hoisted to the top, and allows redeclaration.
          </p>
          <div className="mt-auto bg-black/40 rounded-xl p-4 font-mono text-xs text-red-200/80">
            var x = 1;<br/>
            var x = 2; // Valid!
          </div>
        </div>

        {/* LET */}
        <div className="let-box w-full md:w-1/3 max-w-[300px] h-[350px] bg-amber-500/10 border border-amber-500/30 rounded-3xl p-8 flex flex-col backdrop-blur-xl opacity-0 relative z-10 shadow-[0_0_50px_rgba(245,158,11,0.15)]">
          <div className="flex justify-between items-start mb-6">
            <span className="font-mono text-2xl font-bold text-amber-400">let</span>
            <Layers className="w-6 h-6 text-amber-400/50" />
          </div>
          <p className="text-white/70 mb-4 text-sm leading-relaxed">
            The modern standard for mutability. Block-scoped, protects against redeclaration, but allows reassignment.
          </p>
          <div className="mt-auto bg-black/40 rounded-xl p-4 font-mono text-xs text-amber-200/80">
            let y = 1;<br/>
            y = 2; // Valid!<br/>
            let y = 3; // Error!
          </div>
        </div>

        {/* CONST */}
        <div className="const-box w-full md:w-1/3 max-w-[300px] h-[320px] bg-green-500/10 border border-green-500/30 rounded-3xl p-8 flex flex-col backdrop-blur-xl opacity-0">
          <div className="flex justify-between items-start mb-6">
            <span className="font-mono text-2xl font-bold text-green-400">const</span>
            <Lock className="w-6 h-6 text-green-400/50" />
          </div>
          <p className="text-white/70 mb-4 text-sm leading-relaxed">
            The guardian of assignment. Block-scoped. The variable binding cannot be reassigned, but the underlying object can be mutated.
          </p>
          <div className="mt-auto bg-black/40 rounded-xl p-4 font-mono text-xs text-green-200/80">
            const z = 1;<br/>
            z = 2; // Error!
          </div>
        </div>

      </div>

      {/* DATA TYPES INTRO */}
      <div className="data-types absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Two Worlds of Data</h2>
        
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <Hash className="w-10 h-10 text-orange-400 mb-6 mx-auto" />
            <h3 className="text-2xl font-bold text-white mb-4">Primitives</h3>
            <p className="text-white/60 mb-6 text-sm">Strings, Numbers, Booleans, Null, Undefined, Symbol, BigInt.</p>
            <div className="px-4 py-2 bg-orange-500/10 text-orange-400 rounded-full font-mono text-sm inline-block">Passed by Value</div>
          </div>

          <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <Type className="w-10 h-10 text-blue-400 mb-6 mx-auto" />
            <h3 className="text-2xl font-bold text-white mb-4">References</h3>
            <p className="text-white/60 mb-6 text-sm">Objects, Arrays, Functions. (Technically all Objects under the hood).</p>
            <div className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full font-mono text-sm inline-block">Passed by Reference</div>
          </div>
        </div>
      </div>

    </div>
  );
}
