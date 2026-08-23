import QuizScene from "@/components/variables/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

export const metadata = {
  title: "Quiz — Test Your Variable Knowledge",
};

export default function QuizPage() {
  return (
    <>
      <QuizScene />
      <NextSection
        href="/sandbox"
        title="Sandbox"
        description="Write and run JavaScript code live in your browser. Experiment with variables and see the results instantly."
      />
    </>
  );
}
