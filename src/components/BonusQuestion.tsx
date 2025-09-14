// src/components/BonusQuestion.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { BonusQuestion as BonusQ } from "@/types/QuestionType";

/**
 * Simple presentational bonus question box.
 * - `bonus` : the bonus question object
 * - `initialReveal` : optional initial reveal state
 */
export default function BonusQuestion({
  bonus,
  initialReveal = false,
}: {
  bonus: BonusQ;
  initialReveal?: boolean;
}) {
  const [reveal, setReveal] = useState<boolean>(initialReveal);

  if (!bonus) return null;

  return (
    <div className="mt-4 rounded-lg p-4 bg-yellow-900/5 border border-yellow-400/20">
      {bonus.questionText && (
        <div className="text-4xl font-semibold">{bonus.questionText}</div>
      )}

      {bonus.questionMediaUrl && !reveal && (
        <div className="flex justify-center">
          <Image
            src={bonus.questionMediaUrl}
            alt={"bonus question media"}
            width={500}
            height={400}
            className="rounded-lg ai-glow object-contain"
            priority
          />
        </div>
      )}

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => setReveal((r) => !r)}
          className="px-3 py-2 rounded bg-secondary text-black font-medium"
        >
          {reveal ? "Hide Bonus Answer" : "Show Bonus Answer"}
        </button>
      </div>

      {reveal && bonus.answer && (
        <>
          <div className="mt-3 text-yellow-50 text-4xl">
            <strong>Bonus Answer: </strong>
            <span>{bonus.answer}</span>
          </div>
          {bonus.answerMediaUrl && reveal && (
            <div className="flex justify-center">
              <Image
                src={bonus.answerMediaUrl}
                alt={"bonus question media"}
                width={500}
                height={400}
                className="rounded-lg ai-glow object-contain"
                priority
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
