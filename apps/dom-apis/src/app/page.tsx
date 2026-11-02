import { HeroScene } from "@/components/dom-apis/HeroScene";
import { AnalogyScene } from "@/components/dom-apis/AnalogyScene";
import { RenderPipelineScene } from "@/components/dom-apis/RenderPipelineScene";
import { EventBubblingScene } from "@/components/dom-apis/EventBubblingScene";
import { VirtualDomDiffingScene } from "@/components/dom-apis/VirtualDomDiffingScene";
import { SandboxScene } from "@/components/dom-apis/SandboxScene";
import { QuizScene } from "@/components/dom-apis/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-orange-500/30 overflow-hidden">
      <HeroScene />
      <AnalogyScene />
      <RenderPipelineScene />
      <EventBubblingScene />
      <VirtualDomDiffingScene />
      <SandboxScene />
      <QuizScene />

      <div className="py-24 w-full flex items-center justify-center flex-col text-center bg-[#060608] border-t border-white/5 px-4">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
          You&apos;ve Mastered The DOM &amp; Browser APIs
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-8 font-light leading-relaxed">
          The DOM is a C++ host tree. Layout reflows calculate physical coordinates, rasterization draws pixels, and GPU compositors blend layers. You understand the critical rendering path.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500 rounded-full" />
      </div>

      <NextSection
        href="https://hub-bay-six-16.vercel.app/"
        title="JavaScript Universe Hub"
        description="Return to the central roadmap to review the complete 7-module curriculum across all core JavaScript systems."
      />
    </main>
  );
}
