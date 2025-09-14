type ControlsProps = {
  onPrev: () => void;
  onNext: () => void;
  onToggleAnswer: () => void;
  onToggleQuestion: () => void;
  showAnswer: boolean;
  disablePrev: boolean;
  disableNext: boolean;
  showBonus?: boolean;
  onToggleBonus?: () => void;
  disableBonus?: boolean;
};

export default function Controls({
  onPrev,
  onNext,
  onToggleAnswer,
  onToggleQuestion,
  showAnswer,
  disablePrev,
  disableNext,
  showBonus,
  onToggleBonus,
  disableBonus,
}: ControlsProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50"
      >
        Previous
      </button>

      <div className="space-x-3">
        <button
          onClick={onToggleQuestion}
          className="px-4 py-2 rounded-xl bg-primary text-black hover:brightness-110"
        >
          Show Question
        </button>
        <button
          onClick={onToggleAnswer}
          className="px-4 py-2 rounded-xl bg-secondary text-white hover:brightness-110"
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        {/* for bonus questions */}
        {onToggleBonus && (
          <button
            onClick={onToggleBonus}
            disabled={disableBonus}
            className={`px-4 py-2 rounded-xl btn ${
              showBonus ? "bg-secondary text-black" : "bg-white/10 text-white"
            }`}
          >
            {showBonus ? "Hide Bonus" : "Show Bonus"}
          </button>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={disableNext}
        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
