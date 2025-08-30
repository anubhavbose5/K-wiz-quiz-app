import { Question } from "@/types/QuestionType";
import QuestionRenderer from "./QuestionRenderer";

// type Question = {
//   id: string;
//   question: string;
//   questionText: string;
//   answer: string;
//   answerMediaType?: "text" | "image";
//   mediaType?: "text" | "image";
//   mediaURL?: string;
// };

export default function QuestionCard({
  question,
  showAnswer,
}: {
  question: Question;
  showAnswer: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 p-6 bg-white/5 ai-glow">
      <QuestionRenderer data={question} showAnswer={showAnswer} />
    </div>
  );
}
