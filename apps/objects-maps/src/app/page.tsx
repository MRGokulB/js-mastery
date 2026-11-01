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
        href="https://hub-bay-six-16.vercel.app/"
        title="JavaScript Universe Hub"
        description="Return to the central roadmap to continue your mastery across all core JavaScript concepts."
      />
    </main>
  );
}
