"use client";

import { HeroScene } from "@/components/variables/HeroScene";
import AnalogyScene from "@/components/variables/AnalogyScene";
import { SpatialMemoryStudio } from "@/components/variables/SpatialMemoryStudio";
import { DeclarationStudio } from "@/components/variables/DeclarationStudio";
import { MutationCloneStudio } from "@/components/variables/MutationCloneStudio";
import { TdzChamber } from "@/components/variables/TdzChamber";
import { GarbageCollectionStudio } from "@/components/variables/GarbageCollectionStudio";
import { CoercionCalculatorStudio } from "@/components/variables/CoercionCalculatorStudio";
import PatternsScene from "@/components/variables/PatternsScene";
import SandboxScene from "@/components/variables/SandboxScene";
import QuizScene from "@/components/variables/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Home() {
  return (
    <div className="w-full relative bg-[#fbfcfd] dark:bg-[#07090e] text-slate-900 dark:text-white transition-colors duration-200 selection:bg-amber-500/20 selection:text-amber-500">
      
      <section id="scene-hero" className="w-full">
        <HeroScene />
      </section>

      <section id="scene-analogies" className="w-full relative">
        <AnalogyScene />
      </section>

      <section id="scene-memory" className="w-full relative">
        <SpatialMemoryStudio />
      </section>

      <section id="scene-declarations" className="w-full relative">
        <DeclarationStudio />
      </section>

      <section id="scene-mutations" className="w-full relative">
        <MutationCloneStudio />
      </section>

      <section id="scene-tdz" className="w-full relative">
        <TdzChamber />
      </section>

      <section id="scene-gc" className="w-full relative">
        <GarbageCollectionStudio />
      </section>

      <section id="scene-coercion" className="w-full relative">
        <CoercionCalculatorStudio />
      </section>

      <section id="scene-patterns" className="w-full relative">
        <PatternsScene />
      </section>

      <section id="scene-sandbox" className="w-full relative">
        <SandboxScene />
      </section>

      <section id="scene-quiz" className="w-full relative">
        <QuizScene />
      </section>

      <div className="min-h-[40vh] w-full flex items-center justify-center flex-col text-center bg-slate-100/60 dark:bg-[#090b12]/60 px-6 py-28 transition-colors duration-200">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-500 mb-3">
          Module 01 Complete
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          You&apos;ve Mastered Variables &amp; Memory
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed font-light">
          Primitives lock into high-speed stack registers. Objects float within the heap, addressed by pointers. Lexical blocks enforce containment. You are ready for Control Flow.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
      </div>

      <NextSection
        href="https://control-flow-ruby.vercel.app"
        title="Module 02: Control Flow & Logic"
        description="Master branching logic, short-circuit evaluation, truthy/falsy nuances, and the AST execution pipeline."
      />
    </div>
  );
}
