import { HeroScene } from "@/components/arrays-iteration/HeroScene";
import { MemoryScene } from "@/components/arrays-iteration/MemoryScene";
import { OperationsScene } from "@/components/arrays-iteration/OperationsScene";
import { IterationScene } from "@/components/arrays-iteration/IterationScene";
import { PatternsScene } from "@/components/arrays-iteration/PatternsScene";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-cyan-500/30 overflow-hidden">
      <HeroScene />
      <MemoryScene />
      <OperationsScene />
      <IterationScene />
      <PatternsScene />
    </main>
  );
}
