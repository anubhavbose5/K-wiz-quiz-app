"use client";

import RoundHeader from "@/components/RoundHeader";
import QuestionManager from "@/components/QuestionManager";
import { finalsQuestionsRound3 } from "@/data/finals";

export default function Prelims1Round2Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <RoundHeader title="K-onnect The Dots" />

      <div className="flex-1 px-4 py-10">
        <QuestionManager questions={finalsQuestionsRound3} />
      </div>
    </main>
  );
}
