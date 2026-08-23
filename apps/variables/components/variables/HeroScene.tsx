'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const snippets = [
  { code: 'let name = "Alice";', top: '20%', left: '15%', delay: 0.2 },
  { code: 'const PI = 3.14;', top: '60%', left: '10%', delay: 0.4 },
  { code: 'let isReady = true;', top: '25%', left: '75%', delay: 0.6 },
  { code: 'var count = 0;', top: '65%', left: '80%', delay: 0.8 },
];

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-amber-500/20 rounded-full blur-[120px] opacity-50" />
      </div>

      <div
        ref={parallaxRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      >
        {snippets.map((snippet, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: snippet.delay,
              ease: 'easeOut',
            }}
            className="absolute px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
            style={{ top: snippet.top, left: snippet.left }}
          >
            <code className="text-sm font-mono text-amber-400">
              {snippet.code}
            </code>
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20"
        >
          <span className="text-xs font-mono tracking-wider text-amber-400 uppercase">
            Module 01
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-8"
        >
          <span className="block text-white">Variables</span>
          <span className="block text-white/40 font-light">& Data Types</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
        >
          The building blocks of every program. Named containers that hold your
          data — numbers, text, true/false, and more. Let's see how JavaScript
          stores and manages them.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500/50 to-transparent" />
      </motion.div>
    </div>
  );
}
