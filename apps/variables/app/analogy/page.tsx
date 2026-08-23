import AnalogyScene from "@/components/variables/AnalogyScene";
import { NextSection } from "@/components/layout/NextSection";

export const metadata = {
  title: "The Analogy — Variables as Labeled Boxes",
};

export default function AnalogyPage() {
  return (
    <>
      <AnalogyScene />
      <NextSection
        href="/memory"
        title="Memory"
        description="See how JavaScript actually stores variables in RAM — primitives vs references, the stack vs the heap."
      />
    </>
  );
}
