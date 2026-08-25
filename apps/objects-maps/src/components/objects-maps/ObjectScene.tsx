"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Brackets, Box } from "lucide-react";

export function ObjectScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
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

      // Beat 1: The Object Box
      tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".prop-name", { opacity: 1, x: 0, duration: 0.5 })
        .to(".prop-age", { opacity: 1, x: 0, duration: 0.5 })

      // Beat 2: Dot Notation
      tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".dot-tool", { opacity: 1, y: 0, duration: 1 })
        .to(".dot-tool", { y: -60, x: -50, duration: 1 }) // moves to prop-name
        .to(".prop-name", { scale: 1.1, borderColor: "#3b82f6", duration: 0.5 })

      // Beat 3: Bracket Notation
      tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".prop-name", { scale: 1, borderColor: "rgba(255,255,255,0.1)", duration: 0.5 })
        .to(".dot-tool", { opacity: 0, duration: 0.5 }, "<")
        .to(".prop-space", { opacity: 1, y: 0, duration: 0.5 })
        .to(".bracket-tool", { opacity: 1, y: 0, duration: 1 })
        .to(".bracket-tool", { y: -20, x: -30, duration: 1 }) // moves to prop-space
        .to(".prop-space", { scale: 1.1, borderColor: "#f59e0b", duration: 0.5 })

      // Beat 4: Summary
      tl.to(".text-beat-4", { opacity: 0, y: -20, duration: 1 })
        .to(".text-beat-5", { opacity: 1, y: 0, duration: 1 }, "<")

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
              An Object is just a box with labeled slots. Let's look inside.
            </h2>
            <h2 className="text-beat-2 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Inside <code className="text-blue-400">user</code>, we have properties like <code className="text-blue-200">name</code> and <code className="text-blue-200">age</code>. 
            </h2>
            <h2 className="text-beat-3 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              Normally, we use <span className="text-blue-400">Dot Notation</span> (<code className="text-white/70">user.name</code>). It's clean and direct. But it has rules: no spaces, no variables.
            </h2>
            <h2 className="text-beat-4 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              If a property name has spaces like <code className="text-amber-400">"first name"</code>, or if it's stored in a variable, Dot Notation crashes. You MUST use <span className="text-amber-400">Bracket Notation</span>.
            </h2>
            <h2 className="text-beat-5 col-start-1 row-start-1 w-full text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-0 translate-y-5 leading-tight break-words">
              <code className="text-white/70">user["first name"]</code> evaluates the string first, then finds the slot. It's the skeleton key.
            </h2>
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-w-0 h-[400px] relative">
          
          <div className="w-72 h-80 bg-white/5 border border-white/10 rounded-xl relative flex flex-col p-6 shadow-2xl">
            <div className="absolute -top-4 -left-4 bg-blue-500/20 border border-blue-500/50 text-blue-400 font-mono px-3 py-1 rounded-lg text-sm">
              const user = {'{'}
            </div>

            <div className="flex flex-col gap-4 mt-4 relative z-10">
              <div className="prop-name opacity-0 -translate-x-4 bg-white/5 border border-white/10 p-3 rounded flex justify-between font-mono text-sm transition-colors">
                <span className="text-blue-300">name:</span>
                <span className="text-green-300">"Gokul"</span>
              </div>
              <div className="prop-age opacity-0 -translate-x-4 bg-white/5 border border-white/10 p-3 rounded flex justify-between font-mono text-sm transition-colors">
                <span className="text-blue-300">age:</span>
                <span className="text-orange-300">25</span>
              </div>
              <div className="prop-space opacity-0 translate-y-4 bg-white/5 border border-white/10 p-3 rounded flex justify-between font-mono text-sm transition-colors">
                <span className="text-amber-300">"first name":</span>
                <span className="text-green-300">"G"</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 text-white/50 font-mono text-xl">
              {'}'}
            </div>

            {/* Tools */}
            <div className="dot-tool opacity-0 absolute bottom-12 right-[-60px] translate-y-10 bg-blue-500/20 border border-blue-500/50 p-2 rounded-lg flex items-center gap-2 font-mono text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <span className="text-blue-400">.name</span>
            </div>

            <div className="bracket-tool opacity-0 absolute bottom-12 right-[-80px] translate-y-10 bg-amber-500/20 border border-amber-500/50 p-2 rounded-lg flex items-center gap-2 font-mono text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <span className="text-amber-400">["first name"]</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
