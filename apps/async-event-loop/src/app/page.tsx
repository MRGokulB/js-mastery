import { HeroScene } from "@/components/async-event-loop/HeroScene";
import { AnalogyScene } from "@/components/async-event-loop/AnalogyScene";
import { EventLoopEngineScene } from "@/components/async-event-loop/EventLoopEngineScene";
import { PromiseSteppingScene } from "@/components/async-event-loop/PromiseSteppingScene";
import { StarvationHazardScene } from "@/components/async-event-loop/StarvationHazardScene";
import { SandboxScene } from "@/components/async-event-loop/SandboxScene";
import { QuizScene } from "@/components/async-event-loop/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-indigo-500/30 overflow-hidden">
      <HeroScene />
      <AnalogyScene />
      <EventLoopEngineScene />
      <PromiseSteppingScene />
      <StarvationHazardScene />
      <SandboxScene />
      <QuizScene />

      <div className="py-24 w-full flex items-center justify-center flex-col text-center bg-[#050507] border-t border-white/5 px-4">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
          You&apos;ve Mastered The Event Loop
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-8 font-light leading-relaxed">
          The Call Stack handles synchronous execution. Web APIs delegate host tasks. Microtasks drain immediately to 0 before Macrotasks. You now understand how JavaScript concurrency actually works.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-purple-500 rounded-full" />
      </div>

      <NextSection
        href="https://hub-bay-six-16.vercel.app/"
        title="JavaScript Universe Hub"
        description="Return to the central roadmap to continue your journey across all core JavaScript modules."
      />
    </main>
  );
}
