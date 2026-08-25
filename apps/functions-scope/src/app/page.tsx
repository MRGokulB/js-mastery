import { HeroScene } from "@/components/functions-scope/HeroScene";
import { AnalogyScene } from "@/components/functions-scope/AnalogyScene";
import { MemoryScene } from "@/components/functions-scope/MemoryScene";
import { OperationsScene } from "@/components/functions-scope/OperationsScene";
import { PatternsScene } from "@/components/functions-scope/PatternsScene";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-orange-500/30 overflow-hidden">
      <HeroScene />
      <AnalogyScene />
      <MemoryScene />
      <OperationsScene />
      <PatternsScene />
    </main>
  );
}
