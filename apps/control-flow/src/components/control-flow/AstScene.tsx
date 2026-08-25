"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AstScene() {
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

      tl.to(".text-ast-1", { opacity: 0, y: -20, duration: 1 })
        .to(".text-ast-2", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".ast-node-root", { borderColor: "#a855f7", boxShadow: "0 0 20px rgba(168,85,247,0.5)", duration: 1 }, "<")
        .to(".ast-line-left", { strokeDashoffset: 0, duration: 1 })
        .to(".ast-node-left", { opacity: 1, scale: 1, duration: 0.5 })

      tl.to(".text-ast-2", { opacity: 0, y: -20, duration: 1 })
        .to(".text-ast-3", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".ast-line-right", { strokeDashoffset: 0, duration: 1 })
        .to(".ast-node-right", { opacity: 1, scale: 1, duration: 0.5 })

      tl.to(".text-ast-3", { opacity: 0, y: -20, duration: 1 })
        .to(".text-ast-4", { opacity: 1, y: 0, duration: 1 }, "<")
        .to(".ast-node-left-child", { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2 })
        .to(".ast-line-left-child", { strokeDashoffset: 0, duration: 0.5, stagger: 0.2 }, "<")

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.05),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 relative h-64 lg:h-96 flex flex-col justify-center">
          <div className="grid grid-cols-1 grid-rows-1 relative">
            <h2 className="text-ast-1 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white">
              Behind the scenes, your code isn't just text.
            </h2>
            <h2 className="text-ast-2 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white opacity-0 translate-y-5">
              The engine parses it into an <span className="text-purple-400">Abstract Syntax Tree (AST)</span>.
            </h2>
            <h2 className="text-ast-3 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white opacity-0 translate-y-5">
              Control flow constructs like <span className="text-blue-400">IfStatement</span> split the tree.
            </h2>
            <h2 className="text-ast-4 col-start-1 row-start-1 text-3xl md:text-5xl font-bold text-white opacity-0 translate-y-5">
              The engine walks this tree, evaluating branches recursively.
            </h2>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center relative h-[500px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500">
            <path className="ast-line-left" d="M250 100 L150 220" fill="none" stroke="#4ade80" strokeWidth="3" strokeDasharray="200" strokeDashoffset="200" />
            <path className="ast-line-right" d="M250 100 L350 220" fill="none" stroke="#f87171" strokeWidth="3" strokeDasharray="200" strokeDashoffset="200" />
            <path className="ast-line-left-child" d="M150 260 L100 380" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
            <path className="ast-line-left-child" d="M150 260 L200 380" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" />
          </svg>

          <div className="absolute top-[60px] left-1/2 -translate-x-1/2 z-10">
            <div className="ast-node-root px-6 py-3 rounded-xl border border-white/20 bg-black/80 text-white font-mono text-sm shadow-xl transition-all">
              IfStatement
            </div>
          </div>

          <div className="absolute top-[220px] left-[150px] -translate-x-1/2 z-10">
            <div className="ast-node-left opacity-0 scale-50 px-5 py-2 rounded-lg border border-green-500/50 bg-green-500/10 text-green-300 font-mono text-xs shadow-[0_0_15px_rgba(74,222,128,0.2)]">
              Consequent (Block)
            </div>
          </div>

          <div className="absolute top-[220px] left-[350px] -translate-x-1/2 z-10">
            <div className="ast-node-right opacity-0 scale-50 px-5 py-2 rounded-lg border border-red-500/50 bg-red-500/10 text-red-300 font-mono text-xs shadow-[0_0_15px_rgba(248,113,113,0.2)]">
              Alternate (Block)
            </div>
          </div>

          <div className="absolute top-[380px] left-[100px] -translate-x-1/2 z-10">
            <div className="ast-node-left-child opacity-0 scale-50 px-4 py-2 rounded-md border border-blue-500/50 bg-blue-500/10 text-blue-300 font-mono text-[10px]">
              Expression
            </div>
          </div>

          <div className="absolute top-[380px] left-[200px] -translate-x-1/2 z-10">
            <div className="ast-node-left-child opacity-0 scale-50 px-4 py-2 rounded-md border border-blue-500/50 bg-blue-500/10 text-blue-300 font-mono text-[10px]">
              Return
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
