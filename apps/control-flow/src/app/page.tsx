import { HeroScene } from "@/components/control-flow/HeroScene";
import { AnalogyScene } from "@/components/control-flow/AnalogyScene";
import { MemoryScene } from "@/components/control-flow/MemoryScene";
import { OperationsScene } from "@/components/control-flow/OperationsScene";
import { PatternsScene } from "@/components/control-flow/PatternsScene";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-purple-500/30 overflow-hidden">
      <HeroScene />
      <AnalogyScene />
      <MemoryScene />
      <OperationsScene />
      <PatternsScene />
    </main>
  );
}
