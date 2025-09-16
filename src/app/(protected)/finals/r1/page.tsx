"use client";

import RoundHeader from "@/components/RoundHeader";
import QuestionManager from "@/components/QuestionManager";
import { finalsQuestionsRound1 } from "@/data/finals";

export default function Prelims1Round2Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <RoundHeader title="Zoomin' n buzzin'" />

      <div className="flex-1 px-4 py-10">
        <QuestionManager questions={finalsQuestionsRound1} />
      </div>
    </main>
  );
}
