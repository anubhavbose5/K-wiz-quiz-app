"use client";

import RoundHeader from "@/components/RoundHeader";
import QuestionManager from "@/components/QuestionManager";
import { tieBreakerQuestions } from "@/data/finals";

export default function Prelims1Round2Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <RoundHeader title="Tie Breaker" />

      <div className="flex-1 px-4 py-10">
        <QuestionManager questions={tieBreakerQuestions} />
      </div>
    </main>
  );
}
