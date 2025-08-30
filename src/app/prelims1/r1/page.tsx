"use client";

import RoundHeader from "@/components/RoundHeader";
import QuestionManager from "@/components/QuestionManager";
import { prelims1Round1 } from "@/data/prelims1";
import CountdownTimer from "@/components/CountDownTImer";

export default function Prelims1Round1Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <RoundHeader title="Round 1 • RAPID FIRE" />
      <CountdownTimer
        totalSeconds={90}
        onComplete={() => alert("⏰ Time’s up!")}
      />
      {/* <div className="flex-1 flex items-center justify-center px-4 py-10">
        <QuestionManager questions={prelims1Round1} />

      </div> */}
    </main>
  );
}
