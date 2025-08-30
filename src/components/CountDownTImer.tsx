"use client";

import { useEffect, useState, useRef } from "react";

type CountdownTimerProps = {
  totalSeconds: number;
  onComplete?: () => void;
};

export default function CountdownTimer({
  totalSeconds,
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(totalSeconds);
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [totalSeconds]);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (timeLeft <= 0) {
      setIsRunning(false);
      onComplete?.();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, onComplete]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      {/* Timer Circle */}
      <div className="w-60 h-60 rounded-full flex items-center justify-center text-5xl md:text-6xl font-bold text-primary ai-glow border-4 border-primary bg-background">
        {formatTime(timeLeft)}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={handleStart}
          disabled={isRunning || timeLeft === 0}
          className="px-4 py-2 rounded-xl bg-primary text-black font-semibold hover:brightness-110 disabled:opacity-50 ai-glow"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="px-4 py-2 rounded-xl bg-secondary text-white font-semibold hover:brightness-110 disabled:opacity-50 ai-glow"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 ai-glow"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
