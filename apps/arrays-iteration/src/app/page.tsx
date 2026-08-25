import { HeroScene } from "@/components/arrays-iteration/HeroScene";
import { MemoryScene } from "@/components/arrays-iteration/MemoryScene";
import { V8EngineScene } from "@/components/arrays-iteration/V8EngineScene";
import { OperationsScene } from "@/components/arrays-iteration/OperationsScene";
import { MemoryShiftScene } from "@/components/arrays-iteration/MemoryShiftScene";
import { IterationScene } from "@/components/arrays-iteration/IterationScene";
import { PatternsScene } from "@/components/arrays-iteration/PatternsScene";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-cyan-500/30 overflow-hidden">
      <HeroScene />
      <MemoryScene />
      <V8EngineScene />
      <OperationsScene />
      <MemoryShiftScene />
      <IterationScene />
      <PatternsScene />
    </main>
  );
}
