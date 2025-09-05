"use client";

import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import Controls from "./Controls";
import { Question } from "@/types/QuestionType";
import Clues from "./Clues";
import KonnectionsManager from "./KonectionsManager";
import Image from "next/image";

export default function QuestionManager({
  questions,
}: {
  questions: Question[];
}) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  // Per-question "Start puzzle" flag used for konnections (resets when index changes)
  const [puzzleStarted, setPuzzleStarted] = useState(false);

  const current = questions[index];

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => setShowAnswer((s) => !s);
  const toggleQuestion = () => setShowAnswer(false);

  useEffect(() => {
    // Reset puzzle started state when question changes
    setPuzzleStarted(false);
  }, [index]);

  if (!current) return <div>No questions available.</div>;

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* Normal vs Clue rendering */}
      {current.type === "clue" ? (
        <div className="space-y-4">
          {!showAnswer && (
            <Clues
              key={current.id}
              clues={current.clues || []}
              showAnswer={showAnswer}
            />
          )}

          {/* Answer reveal (only when toggled) */}
          {showAnswer && (
            <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-400/40 ai-glow flex flex-col items-center justify-center text-center gap-2">
              <p className="text-2xl font-semibold text-green-300">
                {current?.answer}
              </p>
              {current?.answerMediaUrl &&
              current?.answerMediaType === "image" ? (
                <Image
                  src={current?.answerMediaUrl}
                  alt={"Answer Media"}
                  width={400}
                  height={300}
                  className="rounded-lg ai-glow object-contain"
                  priority
                />
              ) : null}
            </div>
          )}
        </div>
      ) : current.type === "konnections" ? (
        <>
          {!puzzleStarted ? (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setPuzzleStarted(true)}
                className="px-6 py-3 rounded-xl bg-primary text-black font-semibold ai-glow"
              >
                Start Puzzle
              </button>
              <button
                onClick={() => {
                  // optional skip behavior: goNext()
                }}
                className="px-4 py-3 rounded-xl bg-white/10"
              >
                Skip Puzzle
              </button>
            </div>
          ) : null}

          {/* Pass the embedded puzzle object directly. Do NOT auto-start inside KonnectionsManager. */}
          <KonnectionsManager
            key={current.id}
            puzzle={current.konnectionsPuzzle}
            // controlled start: pass started prop (parent decides)
            started={puzzleStarted}
            // showAnswer toggled from this manager's Show Answer button (passed below)
            showAnswer={showAnswer}
          />
        </>
      ) : (
        <QuestionCard question={current} showAnswer={showAnswer} />
      )}

      <Controls
        onPrev={handlePrev}
        onNext={handleNext}
        onToggleAnswer={toggleAnswer}
        onToggleQuestion={toggleQuestion}
        showAnswer={showAnswer}
        disablePrev={index === 0}
        disableNext={index === questions.length - 1}
      />

      <p className="text-center text-sm text-white/50">
        Question {index + 1} of {questions.length}
      </p>
    </div>
  );
}
