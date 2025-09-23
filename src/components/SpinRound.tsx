"use client";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import QuestionManager from "@/components/QuestionManager";
import type { Question } from "@/types/QuestionType";

type Props = { questions: Question[] };

export default function SpinRound({ questions }: Props) {
  // Extract unique categories from questions
  const [categories, setCategories] = useState(
    Array.from(new Set(questions.map((q) => q.category)))
  );
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "EASY" | "MEDIUM" | "HARD" | null
  >(null);
  const [showQuestions, setShowQuestions] = useState(false);

  const data = categories.map((c) => ({ option: c }));

  const handleSpin = () => {
    const idx = Math.floor(Math.random() * categories.length);
    setPrizeIndex(idx);
    setMustSpin(true);
  };

  return showQuestions ? (
    <>
      <button
        onClick={() => {
          setShowQuestions(false);
          setSelectedDifficulty(null);
          //   setSelectedCategory(null);
        }}
        className="px-4 py-2 bg-secondary text-white rounded-lg mb-4"
      >
        Back to Spin
      </button>
      <QuestionManager
        questions={
          questions.filter(
            (q) =>
              q.category === selectedCategory &&
              q.difficulty === selectedDifficulty
          ) ?? []
        }
      />
    </>
  ) : (
    <div className="space-y-6 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full flex flex-row gap-10 justify-center items-center">
        <div className="flex items-center justify-center w-[500px] h-[500px] scale-110">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeIndex}
            data={data}
            backgroundColors={["#FF77A9", "#FFDD47", "#47FFD7", "#47B0FF"]}
            textColors={["#000"]}
            onStopSpinning={() => {
              setMustSpin(false);
              setSelectedCategory(categories[prizeIndex] ?? null);
            }}
            fontSize={16}
          />
        </div>

        {selectedCategory ? (
          <div className="space-y-2">
            <div className="text-6xl">
              <strong className="text-lime-400">{selectedCategory}</strong>
            </div>
            <div className="flex gap-2">
              {(["EASY", "MEDIUM", "HARD"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedDifficulty === level
                      ? "bg-secondary text-black"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-[395px]"></div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSpin}
          className="px-6 py-3 bg-primary text-black rounded-lg mr-2"
        >
          SPIN
        </button>

        <button
          disabled={!selectedCategory || !selectedDifficulty}
          onClick={selectedCategory ? () => setShowQuestions(true) : undefined}
          className={`px-6 py-3 rounded-lg mr-2 ${
            selectedCategory && selectedDifficulty
              ? "bg-green-500 text-white"
              : "bg-white/20 text-white/60 cursor-not-allowed"
          }`}
        >
          Show Questions
        </button>

        <button
          disabled={!selectedCategory || mustSpin}
          onClick={() => {
            setCategories((cats) => cats.filter((c) => c !== selectedCategory));
            setSelectedCategory(null);
          }}
          className="px-4 py-3 bg-red-500 text-white rounded-lg"
        >
          Remove Category
        </button>
      </div>
    </div>
  );
}
