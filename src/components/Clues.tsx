"use client";

import { useState, useEffect } from "react";
import MediaRenderer from "./MediaRenderer";
import { Clue } from "@/types/QuestionType";

export default function Clues({
  clues = [],
}: // showAnswer,
{
  clues: Clue[];
  showAnswer: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  console.log("CLUES", clues);

  const showNextClue = () => {
    if (visibleCount < clues.length) {
      setVisibleCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setVisibleCount(0);
  }, [clues]);

  return (
    <div className="space-y-6 w-full mx-auto">
      {/* Visible clues */}
      <div className="space-y-4">
        {clues.slice(0, visibleCount).map((clue) => (
          <div
            key={clue.id}
            className="p-4 rounded-xl border border-white/10 bg-white/5 ai-glow"
          >
            {clue.questionText && (
              <p className="text-3xl font-medium mb-2">{clue.questionText}</p>
            )}
            <MediaRenderer type={clue.mediaType} url={clue.mediaUrl} />
          </div>
        ))}
      </div>

      {/* Control to show more clues */}
      {visibleCount < clues.length && (
        <div className="flex justify-center">
          <button
            onClick={showNextClue}
            className="px-6 py-3 rounded-xl bg-primary text-black font-semibold hover:brightness-110 ai-glow"
          >
            Show Next Clue
          </button>
        </div>
      )}
    </div>
  );
}
