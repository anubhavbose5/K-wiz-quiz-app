"use client";

import React from "react";
import { cn } from "@/lib/utils"; // replace or remove if you don't have cn

type Props = {
  words: string[]; // length 16
  selectedIndices: Set<number>;
  foundIndices: Set<number>;
  onToggleIndex: (idx: number) => void;
  // optional: allow disabling interaction entirely (e.g., when showAnswer true)
  disabled?: boolean;
};

export default function KonnectionsGrid({
  words,
  selectedIndices,
  foundIndices,
  onToggleIndex,
  disabled = false,
}: Props) {
  return (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-4 gap-4">
        {words.map((word, i) => {
          const isSelected = selectedIndices.has(i);
          const isFound = foundIndices.has(i);
          const isDisabled = disabled || isFound;

          const base =
            "rounded-lg p-4 text-center text-sm md:text-base font-medium transition-all border focus:outline-none focus:ring-2 focus:ring-offset-2";
          const classes = cn(
            base,
            isFound
              ? "bg-green-600/20 border-green-400 text-green-200 cursor-default"
              : isSelected
              ? "bg-cyan-500/20 border-cyan-300 text-cyan-100"
              : "bg-white/5 border-white/10 text-white hover:bg-white/10",
            isDisabled && "opacity-60 cursor-not-allowed"
          );

          return (
            <button
              key={i}
              onClick={() => {
                if (!isDisabled) onToggleIndex(i);
              }}
              disabled={isDisabled}
              aria-pressed={isSelected}
              aria-disabled={isDisabled}
              title={word}
              className={classes}
            >
              <span className="block truncate">{word}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
