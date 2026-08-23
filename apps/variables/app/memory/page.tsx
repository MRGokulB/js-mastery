import MemoryScene from "@/components/variables/MemoryScene";
import { NextSection } from "@/components/layout/NextSection";

export const metadata = {
  title: "Memory — How Variables Live in RAM",
};

export default function MemoryPage() {
  return (
    <>
      <MemoryScene />
      <NextSection
        href="/operations"
        title="Operations"
        description="Step through variable declarations, assignments, and the wild world of JavaScript type coercion."
      />
    </>
  );
}
