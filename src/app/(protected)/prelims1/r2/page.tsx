"use client";

import RoundHeader from "@/components/RoundHeader";
import QuestionManager from "@/components/QuestionManager";
import { konnectionsPuzzles } from "@/data/prelims1";

export default function Prelims1Round2Page() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header with round title + home button */}
      <RoundHeader title="Konnections" />

      <div className="flex-1 px-4 py-10">
        {/* Pass in the array of questions */}
        <QuestionManager questions={konnectionsPuzzles} />
      </div>
    </main>
  );
}
