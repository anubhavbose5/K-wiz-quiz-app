"use client";

import { Question } from "@/types/QuestionType";
import MediaRenderer from "./MediaRenderer";

export default function QuestionRenderer({
  data,
  showAnswer,
}: {
  data: Question;
  showAnswer: boolean;
}) {
  console.log(data);
  return (
    <div className="w-full space-y-4">
      {/* Question */}
      {!showAnswer && (
        <div className="w-full">
          <p className="text-xl font-semibold">{data?.questionText}</p>
          <MediaRenderer type={data.mediaType} url={data.questionMediaUrl} />
        </div>
      )}

      {/* Answer */}
      {showAnswer && (
        <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-400/40 ai-glow">
          <p className="text-lg font-semibold text-green-300">
            Answer: {data.answer}
          </p>
          <MediaRenderer
            type={data.answerMediaType}
            url={data.answerMediaUrl}
          />
        </div>
      )}
    </div>
  );
}
