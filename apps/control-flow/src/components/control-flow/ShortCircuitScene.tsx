"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ShortCircuitScene() {
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

      tl.to(".text-sc-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-sc-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".sc-block-1", { backgroundColor: "rgba(74,222,128,0.2)", borderColor: "rgba(74,222,128,0.5)", duration: 0.5 })
        .to(".sc-path-1", { strokeDashoffset: 0, duration: 1 })
        .to(".sc-block-2", { backgroundColor: "rgba(74,222,128,0.2)", borderColor: "rgba(74,222,128,0.5)", duration: 0.5 })

      tl.to(".text-sc-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-sc-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".sc-block-1", { backgroundColor: "rgba(248,113,113,0.2)", borderColor: "rgba(248,113,113,0.5)", duration: 0.5 })
        .to(".sc-path-cross", { opacity: 1, duration: 0.5 })
        .to(".sc-block-2", { opacity: 0.2, duration: 0.5 })

      tl.to(".text-sc-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-sc-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".code-preview-sc", { opacity: 1, y: 0, duration: 1 }, "<")

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.05),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 relative h-64 lg:h-96 flex flex-col justify-center">
          <div className="grid grid-cols-1 grid-rows-1 relative">
            <h2 className="text-sc-1 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white">
              && and || aren't just for Booleans.
            </h2>
            <h2 className="text-sc-2 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white opacity-0 translate-y-5">
              They evaluate expressions left-to-right.
            </h2>
            <h2 className="text-sc-3 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white opacity-0 translate-y-5">
              If the first value in an <span className="text-red-400">&&</span> is falsy, it <span className="text-red-400">short-circuits</span> and stops evaluating.
            </h2>
            <h2 className="text-sc-4 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white opacity-0 translate-y-5">
              This makes them powerful, hidden control flow mechanisms.
            </h2>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative h-[500px]">
          <div className="flex items-center justify-center w-full relative mb-12">
            <div className="sc-block-1 w-32 h-16 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center font-mono text-white/80 transition-colors">
              User
            </div>
            
            <div className="w-24 h-[2px] mx-4 relative">
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                <path className="sc-path-1" d="M0 1 L96 1" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" />
                <path className="sc-path-cross opacity-0" d="M38 -10 L58 10 M38 10 L58 -10" fill="none" stroke="#f87171" strokeWidth="3" />
              </svg>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-purple-400 text-xl font-bold">&&</div>
            </div>

            <div className="sc-block-2 w-32 h-16 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center font-mono text-white/80 transition-colors">
              Login()
            </div>
          </div>

          <div className="code-preview-sc opacity-0 translate-y-5 w-full bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <pre className="font-mono text-sm text-white/90">
              <code dangerouslySetInnerHTML={{ __html: `
<span class="text-blue-400">// Instead of this:</span>
if (user) {
  login(user);
}

<span class="text-green-400">// Short-circuit evaluation:</span>
user && login(user);

<span class="text-blue-400">// Or providing fallbacks:</span>
const name = user.name || "Guest";
              `.trim() }} />
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
