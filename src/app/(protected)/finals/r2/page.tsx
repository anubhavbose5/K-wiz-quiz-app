"use client";

import RoundHeader from "@/components/RoundHeader";
import QuestionManager from "@/components/QuestionManager";
import { finalsQuestionsRound3 } from "@/data/finals";
import CountdownTimer from "@/components/CountDownTImer";

export default function Prelims1Round2Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <RoundHeader title="Mind over Montage" />
      <div className="fixed top-[15%] right-4 z-50">
        <CountdownTimer totalSeconds={30} size={120} onComplete={() => {}} />
      </div>

      <div className="flex-1 px-4 py-10">
        <QuestionManager questions={finalsQuestionsRound3} />
      </div>
    </main>
  );
}
