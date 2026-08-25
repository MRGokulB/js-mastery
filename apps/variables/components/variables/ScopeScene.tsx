"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BoxSelect } from "lucide-react";

export function ScopeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1
        }
      });

      // Show title
      tl.to(".scope-title", { opacity: 1, y: 0, duration: 1 })
        .to(".scope-title", { opacity: 0, y: -50, duration: 1, delay: 0.5 });

      // Animate scopes in
      tl.to(".global-scope", { opacity: 1, duration: 1 })
        .to(".function-scope", { opacity: 1, scale: 1, duration: 1 })
        .to(".block-scope", { opacity: 1, scale: 1, duration: 1 });

      // Highlight Var behavior
      tl.to(".var-badge", { y: -100, backgroundColor: "rgba(239, 68, 68, 0.2)", color: "#f87171", duration: 1 })
        .to(".var-desc", { opacity: 1, duration: 1 });

      // Highlight Let/Const behavior
      tl.to(".let-badge", { backgroundColor: "rgba(245, 158, 11, 0.2)", color: "#fbbf24", duration: 1 }, "<")
        .to(".let-desc", { opacity: 1, duration: 1 }, "<");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative bg-transparent px-6 perspective-[1000px]">
      
      <div className="scope-title absolute inset-0 flex flex-col items-center justify-center opacity-0 -translate-y-10 pointer-events-none">
        <BoxSelect className="w-16 h-16 text-amber-500 mb-6" />
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">The Battle of Scopes</h2>
        <p className="text-white/60 text-xl max-w-lg text-center">
          Where a variable is born determines where it can be seen.
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
        
        {/* Global Scope */}
        <div className="global-scope absolute inset-0 border-2 border-white/10 bg-white/[0.02] rounded-3xl p-8 flex flex-col opacity-0">
          <div className="font-mono text-white/40 mb-2">Global Scope</div>
          
          {/* Function Scope */}
          <div className="function-scope mt-auto h-[80%] border-2 border-blue-500/30 bg-blue-500/5 rounded-2xl p-6 flex flex-col opacity-0 scale-95 origin-bottom">
            <div className="font-mono text-blue-400/60 mb-2">Function Scope</div>
            
            {/* Block Scope */}
            <div className="block-scope mt-auto h-[60%] border-2 border-amber-500/30 bg-amber-500/10 rounded-xl p-6 flex flex-col items-center justify-center gap-6 opacity-0 scale-90 origin-bottom relative">
              <div className="absolute top-4 left-4 font-mono text-amber-400/60">Block Scope (if, for)</div>
              
              <div className="flex gap-8 items-end z-10 w-full justify-center mt-8">
                
                <div className="flex flex-col items-center gap-4">
                  <div className="var-desc opacity-0 text-red-400 text-xs font-mono text-center max-w-[120px]">
                    Ignores blocks! Escapes to the nearest function.
                  </div>
                  <div className="var-badge px-6 py-3 rounded-xl bg-white/10 text-white font-mono font-bold transition-colors shadow-lg">
                    var leak = true;
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="let-desc opacity-0 text-amber-400 text-xs font-mono text-center max-w-[120px]">
                    Trapped securely inside the block.
                  </div>
                  <div className="let-badge px-6 py-3 rounded-xl bg-white/10 text-white font-mono font-bold transition-colors shadow-lg">
                    let secure = true;
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
