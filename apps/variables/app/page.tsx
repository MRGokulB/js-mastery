import { HeroScene } from "@/components/variables/HeroScene";
import { NextSection } from "@/components/layout/NextSection";

export default function HomePage() {
  return (
    <>
      <HeroScene />
      <NextSection
        href="/analogy"
        title="The Analogy"
        description="Understand variables through the labeled box metaphor — the simplest way to grasp how data storage works."
      />
    </>
  );
}
