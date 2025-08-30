"use client";

import { useState } from "react";
import QuestionCard from "./QuestionCard";
import Controls from "./Controls";
import { Question } from "@/types/QuestionType";
import Clues from "./Clues";

export default function QuestionManager({
  questions,
}: {
  questions: Question[];
}) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

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

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
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
            <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-400/40 ai-glow">
              <p className="text-lg font-semibold text-green-300">
                Answer: {current.answer}
              </p>
            </div>
          )}
        </div>
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
