import { HeroScene } from "@/components/objects-maps/HeroScene";
import { ReferenceScene } from "@/components/objects-maps/ReferenceScene";
import { ObjectScene } from "@/components/objects-maps/ObjectScene";
import { MapScene } from "@/components/objects-maps/MapScene";
import { CopyScene } from "@/components/objects-maps/CopyScene";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-amber-500/30 overflow-hidden">
      <HeroScene />
      <ReferenceScene />
      <ObjectScene />
      <MapScene />
      <CopyScene />
    </main>
  );
}
