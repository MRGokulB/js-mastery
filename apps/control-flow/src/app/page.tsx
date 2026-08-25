import { HeroScene } from "@/components/control-flow/HeroScene";
import { AstScene } from "@/components/control-flow/AstScene";
import { AnalogyScene } from "@/components/control-flow/AnalogyScene";
import { ShortCircuitScene } from "@/components/control-flow/ShortCircuitScene";
import { EqualityScene } from "@/components/control-flow/EqualityScene";
import { MemoryScene } from "@/components/control-flow/MemoryScene";
import { OperationsScene } from "@/components/control-flow/OperationsScene";
import { PatternsScene } from "@/components/control-flow/PatternsScene";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-purple-500/30 overflow-hidden">
      <HeroScene />
      <AstScene />
      <AnalogyScene />
      <ShortCircuitScene />
      <EqualityScene />
      <MemoryScene />
      <OperationsScene />
      <PatternsScene />
    </main>
  );
}
