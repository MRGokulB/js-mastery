import PatternsScene from "@/components/variables/PatternsScene";
import { NextSection } from "@/components/layout/NextSection";

export const metadata = {
  title: "Patterns — Destructuring, Templates & Type Checking",
};

export default function PatternsPage() {
  return (
    <>
      <PatternsScene />
      <NextSection
        href="/quiz"
        title="Quiz"
        description="Test your understanding of variables, types, coercion, and scoping with 10 tricky questions."
      />
    </>
  );
}
