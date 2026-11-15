"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Lock, Unlock, Layers, FileText, Home, Copy, BookOpen, ArrowRight } from "lucide-react";

export default function AnalogyScene() {
  const [lockerValue, setLockerValue] = useState<number>(100);
  const [photoCopyVal, setPhotoCopyVal] = useState<string>("Alice");
  const [houseName, setHouseName] = useState<string>("Alice");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
      <div className="max-w-3xl mb-20">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-500/90 uppercase block mb-3">
          01 &bull; Physical Mental Models
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Mental Models That Never Fail
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
          Before inspecting V8 bytecode addresses, ground your intuition in three physical principles. These mental models explain 95% of all JavaScript memory behaviors.
        </p>
      </div>

      <div className="space-y-24 sm:space-y-32">
        {/* Model 01 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500/80 block mb-2">
              Principle 01 &bull; Identifier vs Slot
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
              The Labeled Storage Locker
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4 font-light">
              A variable is not the data itself. It is a human-readable identifier attached to a physical 64-bit slot in computer memory. Mutating a variable replaces the paper inside the locker without altering the locker&apos;s nameplate.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Silicon Reality: Variable name &rarr; Register offset lookup &rarr; L1 Cache read.
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl bg-slate-50/70 dark:bg-white/[0.015] border border-slate-200/60 dark:border-white/[0.04]">
            <div className="w-56 p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex flex-col items-center justify-center relative mb-5 shadow-inner">
              <span className="absolute -top-3 px-2.5 py-0.5 bg-amber-500 text-slate-950 font-mono text-[10px] font-black rounded-md">
                let score = {lockerValue}
              </span>
              <Box className="w-8 h-8 text-amber-500 mb-2" />
              <span className="text-3xl font-mono font-bold text-slate-900 dark:text-white">{lockerValue}</span>
              <span className="text-[10px] font-mono text-slate-400 mt-1">Stack Register: 0x7FFE00</span>
            </div>
            <button
              onClick={() => setLockerValue((prev) => (prev === 100 ? 250 : 100))}
              className="text-xs font-mono px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all cursor-pointer shadow-xs hover:scale-[1.02]"
            >
              Swap Paper Inside Locker &rarr; ({lockerValue === 100 ? "score = 250" : "score = 100"})
            </button>
          </div>
        </div>

        {/* Model 02 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500/80 block mb-2">
              Principle 02 &bull; Pass by Value
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
              Primitives: The Photocopy Machine
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4 font-light">
              Strings, Numbers, Booleans, and Symbols have fixed bit lengths and live directly on the Call Stack. Assigning a primitive creates an independent duplicate sheet. Scribbling on Sheet B leaves Sheet A 100% untouched.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Silicon Reality: Bitwise 64-bit value copy into CPU register. Zero heap footprint.
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1 flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl bg-slate-50/70 dark:bg-white/[0.015] border border-slate-200/60 dark:border-white/[0.04]">
            <div className="flex items-center gap-4 w-full justify-center mb-5">
              <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-center flex-1 max-w-[150px]">
                <FileText className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <span className="font-mono text-[10px] text-slate-400 block">Original a</span>
                <strong className="font-mono text-sm text-slate-900 dark:text-white">&quot;Alice&quot;</strong>
              </div>
              <Copy className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-center flex-1 max-w-[150px]">
                <FileText className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <span className="font-mono text-[10px] text-slate-400 block">Photocopy b</span>
                <strong className="font-mono text-sm text-slate-900 dark:text-white">&quot;{photoCopyVal}&quot;</strong>
              </div>
            </div>
            <button
              onClick={() => setPhotoCopyVal((prev) => (prev === "Alice" ? "Bob" : "Alice"))}
              className="text-xs font-mono px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all cursor-pointer shadow-xs hover:scale-[1.02]"
            >
              Mutate Copy &apos;b&apos; to &quot;{photoCopyVal === "Alice" ? "Bob" : "Alice"}&quot;
            </button>
          </div>
        </div>

        {/* Model 03 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500/80 block mb-2">
              Principle 03 &bull; Pass by Reference
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
              Objects: The GPS Coordinate Beacon
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4 font-light">
              Objects are dynamically sized and live on the V8 Heap. The stack variable stores only the 8-byte pointer address (the GPS coordinate). Copying an object variable duplicates the coordinate, pointing to the exact same physical house.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Silicon Reality: Two 64-bit pointers sharing memory address 0x4A10.
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl bg-slate-50/70 dark:bg-white/[0.015] border border-slate-200/60 dark:border-white/[0.04]">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 font-mono text-xs text-amber-500 font-bold">
                user1 &rarr; 0x4A10
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 font-mono text-xs text-amber-500 font-bold">
                user2 &rarr; 0x4A10
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3 w-full max-w-[320px] justify-center mb-5">
              <Home className="w-5 h-5 text-cyan-500 shrink-0" />
              <span className="font-mono text-xs text-slate-900 dark:text-white">
                Heap Object: <strong className="text-cyan-400">&#123; name: &quot;{houseName}&quot; &#125;</strong>
              </span>
            </div>
            <button
              onClick={() => setHouseName((prev) => (prev === "Alice" ? "Jordan" : "Alice"))}
              className="text-xs font-mono px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all cursor-pointer shadow-xs hover:scale-[1.02]"
            >
              user2.name = &quot;{houseName === "Alice" ? "Jordan" : "Alice"}&quot; (Updates Both!)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
