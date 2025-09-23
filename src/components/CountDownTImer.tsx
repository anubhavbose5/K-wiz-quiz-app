// "use client";

// import { useEffect, useState, useRef } from "react";

// type CountdownTimerProps = {
//   totalSeconds: number;
//   onComplete?: () => void;
// };

// export default function CountdownTimer({
//   totalSeconds,
//   onComplete,
// }: CountdownTimerProps) {
//   const [timeLeft, setTimeLeft] = useState(totalSeconds);
//   const [isRunning, setIsRunning] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     setTimeLeft(totalSeconds);
//     setIsRunning(false);
//     if (timerRef.current) clearInterval(timerRef.current);
//   }, [totalSeconds]);

//   useEffect(() => {
//     if (!isRunning) {
//       if (timerRef.current) clearInterval(timerRef.current);
//       return;
//     }

//     if (timeLeft <= 0) {
//       setIsRunning(false);
//       onComplete?.();
//       return;
//     }

//     timerRef.current = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [isRunning, timeLeft, onComplete]);

//   // Format time as mm:ss
//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const handleStart = () => setIsRunning(true);
//   const handlePause = () => setIsRunning(false);
//   const handleReset = () => {
//     setIsRunning(false);
//     setTimeLeft(totalSeconds);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
//       {/* Timer Circle */}
//       <div className="w-60 h-60 rounded-full flex items-center justify-center text-5xl md:text-6xl font-bold text-primary ai-glow border-4 border-primary bg-background">
//         {formatTime(timeLeft)}
//       </div>

//       {/* Controls */}
//       <div className="flex gap-4">
//         <button
//           onClick={handleStart}
//           disabled={isRunning || timeLeft === 0}
//           className="px-4 py-2 rounded-xl bg-primary text-black font-semibold hover:brightness-110 disabled:opacity-50 ai-glow"
//         >
//           Start
//         </button>
//         <button
//           onClick={handlePause}
//           disabled={!isRunning}
//           className="px-4 py-2 rounded-xl bg-secondary text-white font-semibold hover:brightness-110 disabled:opacity-50 ai-glow"
//         >
//           Pause
//         </button>
//         <button
//           onClick={handleReset}
//           className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 ai-glow"
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// }

// src/components/CountdownTimer.tsx
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

type CountdownTimerProps = {
  totalSeconds: number;
  onComplete?: () => void;
  /**
   * size in pixels for the circular timer (width & height).
   * default: 240 (approx your previous w-60 / h-60)
   */
  size?: number;
  /**
   * optional CSS classes to apply to outer container
   */
  className?: string;
  /**
   * optional flag to autoplay start on mount
   */
  autoStart?: boolean;
};

export default function CountdownTimer({
  totalSeconds = 60,
  onComplete,
  size = 240,
  className = "",
  autoStart = false,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const intervalRef = useRef<number | null>(null); // window.setInterval id
  const finishPlayedRef = useRef<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // preload audio (put the file at /public/sounds/finish.mp3)
  useEffect(() => {
    // create audio object once
    audioRef.current = new Audio("/bell.mp3");
    // attempt to load (browsers may block autoplay until user gesture)
    audioRef.current.load();
    return () => {
      // cleanup audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  // Reset when totalSeconds changes
  useEffect(() => {
    setTimeLeft(totalSeconds);
    setIsRunning(autoStart);
    // reset finish flag so sound can play on next run
    finishPlayedRef.current = false;

    // clear interval if any active
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [totalSeconds, autoStart]);

  // Main timer effect: start/stop interval when isRunning toggles
  useEffect(() => {
    // if already running, do nothing (we use a single interval ref)
    if (isRunning) {
      if (intervalRef.current !== null) return;

      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // reaching 0: clear interval and handle completion
            if (intervalRef.current !== null) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            // ensure finish sound and callback run after state update
            // we return 0 here; separate effect will handle side-effects
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // stop running: clear interval
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // cleanup on unmount or when isRunning changes
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]); // do not include timeLeft or onComplete here

  // Effect: react to hitting zero (play sound, call onComplete). Fires once per finish.
  useEffect(() => {
    if (timeLeft === 0) {
      if (!finishPlayedRef.current) {
        // play finish sound if available
        audioRef.current?.play().catch(() => {
          /* ignore autoplay errors (browsers require user gesture) */
        });
        finishPlayedRef.current = true;
      }

      // call onComplete exactly once at finish
      onComplete?.();

      // also stop running (defensive)
      setIsRunning(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]); // only depend on timeLeft

  // helpers
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStart = () => {
    // attempt to resume (user gesture) so audio playback later is allowed
    // Some browsers need a user gesture to allow audio playback — starting here is ideal.
    audioRef.current
      ?.play()
      .then(() => audioRef.current?.pause())
      .catch(() => {});
    setIsRunning(true);
  };
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
    finishPlayedRef.current = false;
  };

  // compute inline styles for size
  const diameter = size;
  const fontSize = Math.max(18, Math.round(diameter * 0.22)); // responsive text size
  const innerStyle: React.CSSProperties = {
    width: `${diameter}px`,
    height: `${diameter}px`,
    fontSize: `${fontSize}px`,
    lineHeight: 1,
  };

  // aria label for accessibility
  const ariaLabel = `Countdown timer: ${formatTime(timeLeft)} remaining`;

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-6 ${className}`}
    >
      {/* Timer Circle */}
      <div
        role="status"
        aria-live="polite"
        aria-label={ariaLabel}
        className="rounded-full flex items-center justify-center font-bold text-primary ai-glow border-4 border-primary bg-background"
        style={innerStyle}
      >
        <span className="select-none">{formatTime(timeLeft)}</span>
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
