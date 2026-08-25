"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AdvancedObjectScene() {
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

      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".proto-link", { opacity: 1, scaleY: 1, duration: 0.5 })
        .to(".proto-box", { opacity: 1, y: 0, duration: 0.5 });

      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".proto-link", { opacity: 0, duration: 0.5 }, "<")
        .to(".proto-box", { opacity: 0, duration: 0.5 }, "<")
        .to(".prop-flags", { opacity: 1, height: "auto", marginTop: 8, paddingTop: 8, duration: 0.5 });

      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<");

      tl.to(".text-beat-4", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-5", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".box-seal", { opacity: 1, scale: 1, duration: 0.5 })
        .to(".flag-conf-true", { opacity: 0, y: -10, duration: 0.5 })
        .to(".flag-conf-false", { opacity: 1, y: 0, duration: 0.5 }, "<");

      tl.to(".text-beat-5", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-6", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".box-freeze", { opacity: 1, scale: 1, duration: 0.5 })
        .to(".flag-write-true", { opacity: 0, y: -10, duration: 0.5 })
        .to(".flag-write-false", { opacity: 1, y: 0, duration: 0.5 }, "<");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-center px-6 border-t border-white/5">
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center min-w-0">
          <div className="grid grid-cols-1 w-full">
            <h2 className="text-beat-1 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight break-words">
              Objects have hidden depths. They connect to other objects via the <span className="text-purple-400">Prototype Chain</span>.
            </h2>
            <h2 className="text-beat-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              If JS doesn&apos;t find a property locally, it looks down the <code className="text-purple-400">__proto__</code> link to the parent object. This is inheritance in JS.
            </h2>
            <h2 className="text-beat-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              A property isn&apos;t just a value. It has hidden <span className="text-teal-400">Property Descriptors</span> defining its behavior.
            </h2>
            <h2 className="text-beat-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              <code className="text-teal-200">writable</code> (can change?), <code className="text-teal-200">enumerable</code> (shows in loops?), <code className="text-teal-200">configurable</code> (can delete?).
            </h2>
            <h2 className="text-beat-5 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              <span className="text-orange-400">Object.seal()</span> sets <code className="text-orange-200">configurable: false</code>. You can&apos;t add or delete properties, but you can modify existing ones.
            </h2>
            <h2 className="text-beat-6 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              <span className="text-blue-400">Object.freeze()</span> sets <code className="text-blue-200">configurable: false</code> AND <code className="text-blue-200">writable: false</code>. The object is completely locked.
            </h2>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center min-w-0 h-[500px] relative">
          
          <div className="w-80 bg-white/5 border border-white/10 rounded-xl relative flex flex-col p-6 shadow-2xl z-20">
            <div className="absolute -top-4 -left-4 bg-teal-500/20 border border-teal-500/50 text-teal-400 font-mono px-3 py-1 rounded-lg text-sm">
              const target = {'{'}
            </div>

            <div className="box-seal opacity-0 scale-105 absolute inset-0 border-2 border-orange-500/50 rounded-xl pointer-events-none transition-transform" />
            <div className="box-freeze opacity-0 scale-105 absolute inset-0 border-4 border-blue-500/50 bg-blue-500/10 rounded-xl pointer-events-none transition-transform backdrop-blur-[2px]" />

            <div className="flex flex-col gap-4 mt-4 relative z-10">
              <div className="bg-white/5 border border-white/10 p-3 rounded flex flex-col font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-teal-300">score:</span>
                  <span className="text-green-300">100</span>
                </div>
                
                <div className="prop-flags opacity-0 flex flex-col gap-1 border-t border-white/10 text-xs" style={{ height: 0, marginTop: 0, paddingTop: 0, overflow: 'hidden' }}>
                  <div className="flex justify-between">
                    <span className="text-white/50">writable:</span>
                    <span className="relative inline-block w-10 text-right">
                      <span className="flag-write-true text-green-400 absolute right-0">true</span>
                      <span className="flag-write-false text-red-400 absolute right-0 opacity-0 translate-y-2">false</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">enumerable:</span>
                    <span className="relative inline-block w-10 text-right">
                      <span className="text-green-400 absolute right-0">true</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">configurable:</span>
                    <span className="relative inline-block w-10 text-right">
                      <span className="flag-conf-true text-green-400 absolute right-0">true</span>
                      <span className="flag-conf-false text-red-400 absolute right-0 opacity-0 translate-y-2">false</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 text-white/50 font-mono text-xl">
              {'}'}
            </div>
          </div>

          <div className="proto-link opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-purple-500/50 to-purple-500/0 z-10" style={{ marginTop: "70px", transformOrigin: "top" }} />
          
          <div className="proto-box opacity-0 translate-y-8 absolute top-1/2 left-1/2 -translate-x-1/2 w-72 bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 shadow-2xl z-0" style={{ marginTop: "134px" }}>
             <div className="text-purple-400 font-mono text-xs mb-2">[[Prototype]] (Object.prototype)</div>
             <div className="bg-white/5 border border-white/10 p-2 rounded flex flex-col gap-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-purple-300">toString:</span>
                  <span className="text-amber-300">ƒ()</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">hasOwnProperty:</span>
                  <span className="text-amber-300">ƒ()</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
