"use client";

import RoundHeader from "@/components/RoundHeader";
import CountdownTimer from "@/components/CountDownTImer";

export default function Prelims1Round1Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <RoundHeader title="Round 1 • RAPID FIRE" />
      <CountdownTimer
        totalSeconds={90}
        onComplete={() => alert("⏰ Time's up!")}
      />
    </main>
  );
}
