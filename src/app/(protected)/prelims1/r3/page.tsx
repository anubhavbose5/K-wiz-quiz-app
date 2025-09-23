"use client";

import RoundHeader from "@/components/RoundHeader";
import QuestionManager from "@/components/QuestionManager";
import { prelims1Round3 } from "@/data/prelims1";

export default function Prelims1Round3Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <RoundHeader title="Blues Clues" />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <QuestionManager questions={prelims1Round3} />
      </div>
    </main>
  );
}
