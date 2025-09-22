"use client";

import React, { useEffect, useMemo, useState } from "react";
import KonnectionsGrid from "./KonectionsGrid";
import { cn } from "@/lib/utils";

/**
 * Types
 */
export type KonnectionsPuzzle = {
  id: string;
  words: string[]; // length 16
  groups: {
    id: string;
    words: string[]; // length 4
    label?: string;
    description?: string;
  }[];
};

type Props = {
  puzzle: KonnectionsPuzzle;
  maxTries?: number;
  showConnectionLabel?: boolean;
  /**
   * Controlled start flag: if provided (boolean), component follows this
   * and does NOT show internal Start UI. Parent should toggle this per question.
   *
   * If omitted, the component shows its own Start/Reset controls (standalone mode).
   */
  started?: boolean;
  /**
   * When true, reveal all groups (host toggled Show Answer).
   */
  showAnswer?: boolean;
  onAllGroupsFound?: () => void;
};

export default function KonnectionsManager({
  puzzle,
  maxTries = 3,
  showConnectionLabel = true,
  started,
  showAnswer = false,
  onAllGroupsFound,
}: Props) {
  // internal "started" state (mirrors prop when controlled)
  const isControlled = typeof started === "boolean";
  const [internalStarted, setInternalStarted] = useState<boolean>(!!started);

  // puzzle-specific internal state
  const [triesLeft, setTriesLeft] = useState<number>(maxTries);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    new Set()
  );
  const [foundGroupIds, setFoundGroupIds] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<string>("");

  const correctSound = useMemo(() => new Audio("/CorrectAnswer.mp3"), []);
const wrongSound = useMemo(() => new Audio("/WrongAnswer.mp3"), []);

  // Reset internal state whenever puzzle changes (new question)
  useEffect(() => {
    setInternalStarted(!!started); // reflect controlled start if provided
    setTriesLeft(maxTries);
    setSelectedIndices(new Set());
    setFoundGroupIds(new Set());
    setMessage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle.id]);

  // Keep internalStarted in sync when started prop is provided (controlled mode)
  useEffect(() => {
    if (isControlled) {
      setInternalStarted(Boolean(started));
      // When parent explicitly toggles started from false -> true, we may want to clear previous selections
      if (started) {
        setTriesLeft(maxTries);
        setSelectedIndices(new Set());
        setFoundGroupIds(new Set());
        setMessage("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  // When host asks to show answers, reveal all groups
  useEffect(() => {
    if (showAnswer) {
      setFoundGroupIds(new Set(puzzle.groups.map((g) => g.id)));
      setMessage("Answers revealed by host.");
    }
  }, [showAnswer, puzzle.groups]);

  // map word -> indices to support duplicate words if any
  const wordIndexMap = useMemo(() => {
    const map = new Map<string, number[]>();
    puzzle.words.forEach((w, i) => {
      const arr = map.get(w) ?? [];
      arr.push(i);
      map.set(w, arr);
    });
    return map;
  }, [puzzle.words]);

  // set of indices (0..15) that belong to already found groups
  const foundIndices = useMemo(() => {
    const idxSet = new Set<number>();
    for (const g of puzzle.groups) {
      if (foundGroupIds.has(g.id)) {
        for (const w of g.words) {
          const idxs = wordIndexMap.get(w) ?? [];
          idxs.forEach((i) => idxSet.add(i));
        }
      }
    }
    return idxSet;
  }, [foundGroupIds, puzzle.groups, wordIndexMap]);

  // helper: start/reset for internal mode
  const startInternal = () => {
    setInternalStarted(true);
    setTriesLeft(maxTries);
    setSelectedIndices(new Set());
    setFoundGroupIds(new Set());
    setMessage("");
  };
  const resetInternal = () => {
    setInternalStarted(isControlled ? Boolean(started) : false);
    setTriesLeft(maxTries);
    setSelectedIndices(new Set());
    setFoundGroupIds(new Set());
    setMessage("");
  };

  // toggle selection (limit to 4)
  const toggleIndex = (i: number) => {
    setSelectedIndices((prev) => {
      const copy = new Set(prev);
      if (copy.has(i)) copy.delete(i);
      else {
        if (copy.size >= 4) return copy;
        copy.add(i);
      }
      return copy;
    });
  };

  const clearSelection = () => setSelectedIndices(new Set());

  // find matched group or null
  const findMatchedGroup = (): (typeof puzzle.groups)[0] | null => {
    if (selectedIndices.size !== 4) return null;
    const selectedWords = Array.from(selectedIndices).map(
      (i) => puzzle.words[i]
    );
    const selectedSet = new Set(selectedWords.map((s) => s.toLowerCase()));

    const remaining = puzzle.groups.filter((g) => !foundGroupIds.has(g.id));
    for (const g of remaining) {
      const gset = new Set(g.words.map((w) => w.toLowerCase()));
      if (gset.size !== selectedSet.size) continue;
      let eq = true;
      for (const item of gset) {
        if (!selectedSet.has(item)) {
          eq = false;
          break;
        }
      }
      if (eq) return g;
    }
    return null;
  };

  // submit selection
  const submitSelection = () => {
    if (selectedIndices.size !== 4) {
      setMessage("Please select exactly 4 words before submitting.");
      return;
    }

    const matched = findMatchedGroup();
    if (matched) {
      correctSound.play().catch(() => {});
      setFoundGroupIds((prev) => {
        const copy = new Set(prev);
        copy.add(matched.id);
        return copy;
      });
      setMessage(`Correct! ${matched.label ?? "Group found."}`);
      setSelectedIndices(new Set());

      // if all found, call callback
      if (foundGroupIds.size + 1 >= puzzle.groups.length) {
        onAllGroupsFound?.();
      }
    } else {
      wrongSound.play().catch(() => {});
      const remaining = triesLeft - 1;
      setTriesLeft(remaining);
      setSelectedIndices(new Set());
      if (remaining <= 0) {
        setFoundGroupIds(new Set(puzzle.groups.map((g) => g.id)));
        setMessage("No tries left — revealing all answers.");
      } else {
        setMessage(
          `Incorrect. ${remaining} ${remaining === 1 ? "try" : "tries"} left.`
        );
      }
    }
  };

  // helper: map group -> indices (useful for showing group words or debug UI)
  const groupIndicesMap = useMemo(() => {
    const map = new Map<string, number[]>();
    for (const g of puzzle.groups) {
      const idxs: number[] = [];
      for (const w of g.words) {
        const list = wordIndexMap.get(w) ?? [];
        list.forEach((i) => idxs.push(i));
      }
      map.set(g.id, idxs);
    }
    return map;
  }, [puzzle.groups, wordIndexMap]);

  // ---- RENDER ----
  // If not started: show internal start controls if uncontrolled,
  // otherwise show a placeholder telling the host to start the puzzle.
  if (!internalStarted) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {!isControlled ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-3">
              <button
                onClick={startInternal}
                className="px-4 py-2 rounded-xl bg-primary text-black font-semibold hover:brightness-110 ai-glow"
              >
                Start Puzzle
              </button>
              <button
                onClick={resetInternal}
                className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 ai-glow"
              >
                Reset Puzzle
              </button>
            </div>

            <div className="text-sm text-white/70">
              Tries left:{" "}
              <span className="font-semibold text-accent">{triesLeft}</span>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 ai-glow text-center">
            <p className="text-lg">Host must start the puzzle to begin.</p>
            <div className="text-sm text-white/60 mt-2">
              Click the per-question Start Puzzle button to begin.
            </div>
          </div>
        )}
      </div>
    );
  }

  // Started: main puzzle UI
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3">
          <button
            disabled
            className="px-4 py-2 rounded-xl bg-white/5 text-white/60"
          >
            Started
          </button>
          <button
            onClick={resetInternal}
            className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 ai-glow"
          >
            Reset Puzzle
          </button>
        </div>

        <div className="text-sm text-white/70">
          Tries left:{" "}
          <span className="font-semibold text-accent">{triesLeft}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <KonnectionsGrid
          words={puzzle.words}
          selectedIndices={selectedIndices}
          foundIndices={foundIndices}
          onToggleIndex={toggleIndex}
        />

        <div className="flex gap-3">
          <button
            onClick={submitSelection}
            disabled={selectedIndices.size !== 4}
            className={cn(
              "px-5 py-3 rounded-xl font-semibold ai-glow",
              selectedIndices.size === 4
                ? "bg-secondary text-white"
                : "bg-white/10 text-white/60 cursor-not-allowed opacity-60"
            )}
          >
            Submit
          </button>

          <button
            onClick={clearSelection}
            disabled={selectedIndices.size === 0}
            className="px-4 py-3 rounded-xl bg-primary text-black font-semibold ai-glow"
          >
            Clear Selection
          </button>
        </div>

        {message && (
          <div className="mt-2 text-center text-sm text-white/80">
            {message}
          </div>
        )}
      </div>

      {/* found groups display */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {puzzle.groups.map((g) => {
          const isFound = foundGroupIds.has(g.id);
          return (
            <div
              key={g.id}
              className={cn(
                "rounded-lg p-3 border",
                isFound
                  ? "bg-green-600/10 border-green-400 text-green-200"
                  : "bg-white/5 border-white/10 text-white/70"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">
                    {isFound ? g.label ?? "Connection" : "Hidden group"}
                  </div>
                  {isFound && showConnectionLabel && (
                    <div className="text-xs text-white/60">
                      Words: {g.words.join(", ")}
                    </div>
                  )}
                  {isFound && g.description && (
                    <div className="text-xs text-white/50 mt-1">
                      {g.description}
                    </div>
                  )}
                </div>
                <div className="text-xs text-white/50">
                  {isFound ? "Found" : "—"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
