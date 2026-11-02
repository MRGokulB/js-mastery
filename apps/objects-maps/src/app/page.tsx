import { HeroScene } from "@/components/objects-maps/HeroScene";
import { ReferenceScene } from "@/components/objects-maps/ReferenceScene";
import { ObjectScene } from "@/components/objects-maps/ObjectScene";
import { AdvancedObjectScene } from "@/components/objects-maps/AdvancedObjectScene";
import { MapScene } from "@/components/objects-maps/MapScene";
import { CopyScene } from "@/components/objects-maps/CopyScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-amber-500/30 overflow-hidden">
      <HeroScene />
      <ReferenceScene />
      <ObjectScene />
      <AdvancedObjectScene />
      <MapScene />
      <CopyScene />
      <NextSection
        href="https://async-event-loop.vercel.app"
        title="Module 06: Async JS & The Event Loop"
        description="Master single-threaded concurrency, Call Stack, Web APIs, Microtasks, and Macrotask queues."
      />
    </main>
  );
}
