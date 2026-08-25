"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Layers, ShieldCheck } from "lucide-react";

export function CopyScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Beat 1: The original object
      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".shallow-panel", { opacity: 1, x: 0, duration: 1 })

      // Beat 2: Spread operator (Shallow Copy)
      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".shallow-copy-btn", { scale: 1.1, backgroundColor: "rgba(59,130,246,0.3)", duration: 0.5 })
        .to(".shallow-copy-btn", { scale: 1, backgroundColor: "rgba(59,130,246,0.1)", duration: 0.5 })
        .to(".cloned-box-shallow", { opacity: 1, y: 0, duration: 1 })
        .to(".shallow-line", { strokeDashoffset: 0, opacity: 1, duration: 0.5 })

      // Mutate nested object in shallow copy
      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".nested-obj-target", { backgroundColor: "#ef4444", duration: 0.5 }) // Changes BOTH because they point to same ref

      // Beat 3: Deep Copy
      tl.to(".text-beat-4", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-5", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".shallow-wrapper", { opacity: 0, display: "none", duration: 1 })
        .to(".deep-wrapper", { opacity: 1, display: "flex", duration: 1 })

      tl.to(".text-beat-5", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-6", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".deep-copy-btn", { scale: 1.1, backgroundColor: "rgba(16,185,129,0.3)", duration: 0.5 })
        .to(".deep-copy-btn", { scale: 1, backgroundColor: "rgba(16,185,129,0.1)", duration: 0.5 })
        .to(".cloned-box-deep", { opacity: 1, y: 0, duration: 1 })
        .to(".deep-line", { strokeDashoffset: 0, opacity: 1, duration: 0.5 })
        .to(".nested-obj-target-deep", { backgroundColor: "#10b981", duration: 0.5 }) // ONLY changes clone

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-center px-6">
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        {/* Left Side: Explanations */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center min-w-0">
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-beat-1 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              Since objects are passed by reference, how do we actually duplicate them?
            </h2>
            <h2 className="text-beat-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              The Spread operator <code className="text-blue-400">{'{...obj}'}</code> is the most common way. But it has a dark secret.
            </h2>
            <h2 className="text-beat-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              It only creates a <span className="text-blue-400">Shallow Copy</span>. It duplicates the top-level properties, but if your object contains another object inside it...
            </h2>
            <h2 className="text-beat-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              ...it just copies the <span className="text-red-400">reference</span> to the inner object. Modifying the inner object on the clone ruins the original!
            </h2>
            <h2 className="text-beat-5 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              To perfectly clone an object and all its nested children, we need a <span className="text-green-400">Deep Copy</span>.
            </h2>
            <h2 className="text-beat-6 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Modern JS gives us <code className="text-green-400">structuredClone(obj)</code>. It physically reconstructs the entire tree. Safe and detached.
            </h2>
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-w-0 h-[500px] relative">
          
          {/* SHALLOW COPY WRAPPER */}
          <div className="shallow-wrapper absolute inset-0 flex flex-col items-center justify-center gap-8">
            <div className="shallow-panel opacity-0 translate-x-10 flex gap-12 relative w-full justify-center">
              
              {/* Original Object */}
              <div className="w-48 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 relative z-20">
                <div className="text-white/50 text-xs font-mono mb-2">Original</div>
                <div className="bg-white/10 p-2 rounded text-xs font-mono">name: "Bob"</div>
                {/* Nested Object */}
                <div className="nested-obj-target bg-white/10 p-2 rounded border border-blue-500/30 transition-colors">
                  <div className="text-blue-300 text-xs font-mono mb-1">address: {'{'}</div>
                  <div className="text-white/70 text-xs font-mono pl-2">city: "NY"</div>
                  <div className="text-blue-300 text-xs font-mono">{'}'}</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shallow-copy-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-blue-500/10 border border-blue-500/50 p-2 rounded-full backdrop-blur-md">
                <Copy className="w-5 h-5 text-blue-400" />
              </div>

              {/* Shallow Cloned Object */}
              <div className="cloned-box-shallow opacity-0 translate-y-10 w-48 bg-white/5 border border-blue-500/50 rounded-xl p-4 flex flex-col gap-2 relative z-20">
                <div className="text-blue-400 text-xs font-mono mb-2">Shallow Clone</div>
                <div className="bg-white/10 p-2 rounded text-xs font-mono">name: "Bob"</div>
                {/* The reference to the exact same inner object */}
                <div className="bg-blue-500/10 p-2 rounded border border-blue-500/50 flex items-center justify-center">
                  <span className="text-blue-300 text-xs font-mono">Pointer to address</span>
                </div>
              </div>

              {/* SVG connection for shallow reference */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <path className="shallow-line opacity-0" d="M 330 110 C 250 110, 250 110, 150 110" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" fill="none" />
              </svg>
            </div>
          </div>


          {/* DEEP COPY WRAPPER */}
          <div className="deep-wrapper opacity-0 hidden absolute inset-0 flex-col items-center justify-center gap-8">
            <div className="flex gap-12 relative w-full justify-center">
              
              {/* Original Object */}
              <div className="w-48 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 relative z-20">
                <div className="text-white/50 text-xs font-mono mb-2">Original</div>
                <div className="bg-white/10 p-2 rounded text-xs font-mono">name: "Bob"</div>
                {/* Nested Object */}
                <div className="bg-white/10 p-2 rounded border border-white/10">
                  <div className="text-white/50 text-xs font-mono mb-1">address: {'{'}</div>
                  <div className="text-white/70 text-xs font-mono pl-2">city: "NY"</div>
                  <div className="text-white/50 text-xs font-mono">{'}'}</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="deep-copy-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-green-500/10 border border-green-500/50 p-2 rounded-full backdrop-blur-md">
                <ShieldCheck className="w-5 h-5 text-green-400" />
              </div>

              {/* Deep Cloned Object */}
              <div className="cloned-box-deep opacity-0 translate-y-10 w-48 bg-white/5 border border-green-500/50 rounded-xl p-4 flex flex-col gap-2 relative z-20">
                <div className="text-green-400 text-xs font-mono mb-2">Deep Clone</div>
                <div className="bg-white/10 p-2 rounded text-xs font-mono">name: "Bob"</div>
                {/* Brand new physical copy of nested object */}
                <div className="nested-obj-target-deep bg-green-500/10 p-2 rounded border border-green-500/50 transition-colors">
                  <div className="text-green-300 text-xs font-mono mb-1">address: {'{'}</div>
                  <div className="text-white/90 text-xs font-mono pl-2">city: "LA"</div>
                  <div className="text-green-300 text-xs font-mono">{'}'}</div>
                </div>
              </div>

              {/* SVG connection for deep (none needed, just an animation path if desired, or cross icon to show detached) */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
