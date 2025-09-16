"use client";
import RoundHeader from "@/components/RoundHeader";
import SpinRound from "@/components/SpinRound";
import { questionsFinalsR2 } from "@/data/finals"; // Ensure these have category & difficulty

export default function FinalsRound2Page() {
  // Filter only konnection round or appropriate subset as needed
  const finalsQuestions = questionsFinalsR2.filter(
    (q) => q.category && q.difficulty
  );

  return (
    <main className="min-h-screen flex flex-col">
      <RoundHeader title="Finals • Round 2 — Spin the Wheel" />
      <div className="flex-1 px-4 py-10">
        <SpinRound questions={finalsQuestions} />
      </div>
    </main>
  );
}
