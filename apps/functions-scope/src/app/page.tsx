import { HeroScene } from "@/components/functions-scope/HeroScene";
import { HoistingScene } from "@/components/functions-scope/HoistingScene";
import { OperationsScene } from "@/components/functions-scope/OperationsScene";
import { MemoryScene } from "@/components/functions-scope/MemoryScene";
import { AnalogyScene } from "@/components/functions-scope/AnalogyScene";
import { ScopeChainScene } from "@/components/functions-scope/ScopeChainScene";
import { PatternsScene } from "@/components/functions-scope/PatternsScene";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-orange-500/30 overflow-hidden">
      <HeroScene />
      <HoistingScene />
      <OperationsScene />
      <MemoryScene />
      <AnalogyScene />
      <ScopeChainScene />
      <PatternsScene />
    </main>
  );
}
