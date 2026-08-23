import OperationsScene from "@/components/variables/OperationsScene";
import { NextSection } from "@/components/layout/NextSection";

export const metadata = {
  title: "Operations — Declaration, Assignment & Type Coercion",
};

export default function OperationsPage() {
  return (
    <>
      <OperationsScene />
      <NextSection
        href="/patterns"
        title="Patterns"
        description="Master destructuring, template literals, and defensive type-checking patterns used by pros."
      />
    </>
  );
}
