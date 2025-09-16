// src/components/LeaderboardTable.tsx
"use client";

/**
 * LeaderboardTable.tsx
 *
 * - Three tabs: Prelim1, Prelim2, Finals
 * - Prelim tabs store rows of shape { id, name, score } and sort by score desc
 * - Finals stores rows of shape { id, name, prelimScore, finalScore }
 *   - Finals are populated only when you click "Sync Finals (top 6)" (explicit sync)
 *   - finalScore is editable independently (starts at 0 on sync) and persists
 * - All data persists to localStorage via useLocalStorage hook
 * - onBlur of a score input updates the stored value and re-sorts the visible table
 * - There's Reset Tab / Reset All and add/delete team functionality
 *
 * Hydration handling:
 * - We avoid SSR/client mismatch by showing a simple placeholder while `mounted === false`.
 * - Crucial: **we don't exit early before calling hooks**, so hooks run consistently
 *   on every render (avoids "Rendered more hooks" errors).
 */

import React, { useEffect, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

/* ----------------------------- Types ---------------------------------- */

type PrelimTeam = { id: string; name: string; score: number };
type FinalTeam = {
  id: string;
  name: string;
  prelimScore: number;
  finalScore: number;
};

type TabKey = "prelim1" | "prelim2" | "finals";

const STORAGE_PREFIX = "k_wiz_leaderboard_v1";

/* ------------------------ Default seed teams -------------------------- */
/* Different seeds for prelim1 and prelim2 as requested */
const DEFAULT_TEAMS_PRELIM1: PrelimTeam[] = [
  { id: "p1-t1", name: "FELUDATICS 1", score: 0 },
  { id: "p1-t2", name: "GOLDEN FORTIFIERS 1", score: 0 },
  { id: "p1-t3", name: "APU'S ARC 1", score: 0 },
  { id: "p1-t4", name: "GOOPY BAGHA BEATS 1", score: 0 },
  { id: "p1-t5", name: "CHARU'S GAZE 1", score: 0 },
  { id: "p1-t6", name: "CHECKMATE RAY 1", score: 0 },
];

const DEFAULT_TEAMS_PRELIM2: PrelimTeam[] = [
  { id: "p2-t1", name: "FELUDATICS 2", score: 0 },
  { id: "p2-t2", name: "GOLDEN FORTIFIERS 2", score: 0 },
  { id: "p2-t3", name: "APU'S ARC 2", score: 0 },
  { id: "p2-t4", name: "GOOPY BAGHA BEATS 2", score: 0 },
  { id: "p2-t5", name: "CHARU'S GAZE 2", score: 0 },
  { id: "p2-t6", name: "CHECKMATE RAY 2", score: 0 },
];

/* -------------------------- Storage keys ------------------------------- */
function storageKeyFor(tab: TabKey) {
  return `${STORAGE_PREFIX}:${tab}`;
}

/* -------------------------- Component --------------------------------- */
export default function LeaderboardTable({
  initialTab = "prelim1",
  seedTeams,
}: {
  initialTab?: TabKey;
  seedTeams?: (PrelimTeam | FinalTeam)[];
}) {
  /* ------------------------ localStorage state ------------------------- */
  // Use per-tab localStorage with sensible default seeds.
  const [prelim1, setPrelim1] = useLocalStorage<PrelimTeam[]>(
    storageKeyFor("prelim1"),
    (seedTeams as PrelimTeam[]) ?? DEFAULT_TEAMS_PRELIM1
  );
  const [prelim2, setPrelim2] = useLocalStorage<PrelimTeam[]>(
    storageKeyFor("prelim2"),
    (seedTeams as PrelimTeam[]) ?? DEFAULT_TEAMS_PRELIM2
  );
  const [finals, setFinals] = useLocalStorage<FinalTeam[]>(
    storageKeyFor("finals"),
    []
  );

  const [activeTab, setActiveTab] = React.useState<TabKey>(initialTab);

  /* -------------------- Hydration guard (IMPORTANT) -------------------- */
  // We need a mounted flag to avoid hydration mismatch (server renders placeholder,
  // client then renders actual data). BUT we must not `return` early before calling
  // the hooks below. So we only use `mounted` to decide what *UI* to render,
  // while all hooks remain declared above and executed every render.
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ------------------------ Helpers & derived -------------------------- */

  // Provide easy access to the active tab's data and setter.
  // NOTE: this useMemo is ALWAYS called (not conditional) — prevents hook-order issues.
  const tabState = useMemo(() => {
    if (activeTab === "prelim1")
      return { data: prelim1 as PrelimTeam[], set: setPrelim1 };
    if (activeTab === "prelim2")
      return { data: prelim2 as PrelimTeam[], set: setPrelim2 };
    return { data: finals as FinalTeam[], set: setFinals };
  }, [activeTab, prelim1, prelim2, finals, setPrelim1, setPrelim2, setFinals]);

  // Sorted view (descending). Sorting rules differ for finals vs prelims.
  const sortedView = useMemo(() => {
    const copy = (tabState.data ?? []).slice();

    if (activeTab === "finals") {
      // Finals: sort by finalScore desc, tiebreaker prelimScore desc, then name.
      (copy as FinalTeam[]).sort(
        (a: FinalTeam, b: FinalTeam) =>
          b.finalScore - a.finalScore ||
          b.prelimScore - a.prelimScore ||
          a.name.localeCompare(b.name)
      );
    } else {
      // Prelims: sort by score desc then name
      (copy as PrelimTeam[]).sort(
        (a: PrelimTeam, b: PrelimTeam) =>
          b.score - a.score || a.name.localeCompare(b.name)
      );
    }

    return copy;
  }, [tabState.data, activeTab]);

  /* ------------------------ Score update handlers ---------------------- */

  // Update a prelim team's score on blur (works for both prelim1 and prelim2)
  function handlePrelimScoreBlur(teamId: string, value: string) {
    const numeric = parseFloat(value);
    const score = Number.isFinite(numeric) ? numeric : 0;

    const updated = ((activeTab === "prelim1" ? prelim1 : prelim2) ?? []).map(
      (t) => (t.id === teamId ? { ...t, score } : t)
    );

    // persist sorted list
    updated.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
    if (activeTab === "prelim1") setPrelim1(updated);
    else setPrelim2(updated);
  }

  // Update a final team's finalScore on blur
  function handleFinalScoreBlur(teamId: string, value: string) {
    const numeric = parseFloat(value);
    const score = Number.isFinite(numeric) ? numeric : 0;

    const updated = (finals ?? []).map((t) =>
      t.id === teamId ? { ...t, finalScore: score } : t
    );

    // sort by finalScore desc
    updated.sort(
      (a, b) =>
        b.finalScore - a.finalScore ||
        b.prelimScore - a.prelimScore ||
        a.name.localeCompare(b.name)
    );
    setFinals(updated);
  }

  /* ------------------------ Reset / add / delete ----------------------- */

  function handleResetTab() {
    if (activeTab === "finals") {
      const cleared = (finals ?? []).map((t) => ({ ...t, finalScore: 0 }));
      setFinals(cleared);
    } else {
      const cleared = ((tabState.data ?? []) as PrelimTeam[]).map((t) => ({
        ...t,
        score: 0,
      }));
      if (activeTab === "prelim1") setPrelim1(cleared);
      else setPrelim2(cleared);
    }
  }

  function handleResetAll() {
    setPrelim1((seedTeams as PrelimTeam[]) ?? DEFAULT_TEAMS_PRELIM1);
    setPrelim2((seedTeams as PrelimTeam[]) ?? DEFAULT_TEAMS_PRELIM2);
    setFinals([]);
    try {
      Object.keys(localStorage || {})
        .filter((k) => k.startsWith(STORAGE_PREFIX))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }

  function handleAddTeam() {
    if (activeTab === "finals") {
      const newTeam: FinalTeam = {
        id: `f-${Date.now()}`,
        name: `Team ${Date.now().toString().slice(-4)}`,
        prelimScore: 0,
        finalScore: 0,
      };
      setFinals([...(finals ?? []), newTeam]);
    } else {
      const newTeam: PrelimTeam = {
        id: `t-${Date.now()}`,
        name: `Team ${Date.now().toString().slice(-4)}`,
        score: 0,
      };
      if (activeTab === "prelim1") setPrelim1([...(prelim1 ?? []), newTeam]);
      else setPrelim2([...(prelim2 ?? []), newTeam]);
    }
  }

  function handleDeleteTeam(teamId: string) {
    if (activeTab === "finals") {
      setFinals((finals ?? []).filter((t) => t.id !== teamId));
    } else if (activeTab === "prelim1") {
      setPrelim1((prelim1 ?? []).filter((t) => t.id !== teamId));
    } else {
      setPrelim2((prelim2 ?? []).filter((t) => t.id !== teamId));
    }
  }

  /* ------------------------ Qualifiers logic --------------------------- */

  function top6FromPrelim(list: PrelimTeam[]) {
    return (list ?? [])
      .slice()
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }

  function getTop6Qualifiers(): { name: string; prelimScore: number }[] {
    const top6a = top6FromPrelim(prelim1 ?? []);
    const top6b = top6FromPrelim(prelim2 ?? []);

    const map = new Map<string, number>();
    top6a.forEach((t) =>
      map.set(t.name, Math.max(map.get(t.name) ?? 0, t.score))
    );
    top6b.forEach((t) =>
      map.set(t.name, Math.max(map.get(t.name) ?? 0, t.score))
    );

    return Array.from(map.entries()).map(([name, prelimScore]) => ({
      name,
      prelimScore,
    }));
  }

  // EXPLICIT Sync action: populate finals table with qualifiers.
  // finalScore starts at 0. If finals already has an entry with the same name,
  // we preserve that finalScore.
  function handleSyncFinals() {
    const qualifiers = getTop6Qualifiers(); // [{name, prelimScore}, ...]
    const existingMap = new Map((finals ?? []).map((f) => [f.name, f]));

    const finalList: FinalTeam[] = qualifiers.map((q, i) => {
      const existing = existingMap.get(q.name);
      return {
        id: existing?.id ?? `final-${i}-${q.name}`,
        name: q.name,
        prelimScore: q.prelimScore,
        finalScore: existing?.finalScore ?? 0,
      };
    });

    setFinals(finalList);
    setActiveTab("finals");
  }

  /* ---------------------------- Render -------------------------------- */

  // If not mounted yet, show a lightweight placeholder to avoid SSR/CSR mismatch.
  // NOTE: hooks have already executed above — this is *only* UI-level conditional.
  if (!mounted) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8 text-center text-white/60">
        Loading leaderboard…
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 items-center mb-4">
        {(["prelim1", "prelim2", "finals"] as TabKey[]).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-full ${
              activeTab === t
                ? "bg-primary text-black"
                : "bg-white/5 text-white"
            }`}
          >
            {t === "prelim1"
              ? "Prelim 1"
              : t === "prelim2"
              ? "Prelim 2"
              : "Finals"}
          </button>
        ))}

        <div className="ml-auto flex gap-2">
          {/* Sync Finals button is ONLY visible when not on Finals tab */}
          {activeTab !== "finals" && (
            <button
              onClick={handleSyncFinals}
              className="px-3 py-2 rounded bg-accent text-black"
              title="Promote top-6 from Prelim1 & Prelim2 into Finals"
            >
              Sync Finals (top 6)
            </button>
          )}

          <button
            onClick={handleAddTeam}
            className="px-3 py-2 rounded bg-white/10 text-white"
          >
            + Add team
          </button>

          <button
            onClick={handleResetTab}
            className="px-3 py-2 rounded bg-white/10 text-white"
          >
            Reset Tab
          </button>

          <button
            onClick={handleResetAll}
            className="px-3 py-2 rounded bg-red-600 text-white"
            title="Reset everything (all tabs)"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Centered table container */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl rounded-lg overflow-hidden border border-white/10">
          {/* table header - different for finals */}
          {activeTab === "finals" ? (
            <div className="grid grid-cols-[48px_1fr_160px_160px_80px] gap-0 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
              <div>Rank</div>
              <div>Team</div>
              <div className="text-right">Prelim Score</div>
              <div className="text-right">Final Score</div>
              <div className="text-right">Actions</div>
            </div>
          ) : (
            <div className="grid grid-cols-[48px_1fr_160px_80px] gap-0 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
              <div>Rank</div>
              <div>Team</div>
              <div className="text-right">Score</div>
              <div className="text-right">Actions</div>
            </div>
          )}

          {/* rows */}
          <div className="divide-y divide-white/5">
            {(activeTab === "finals"
              ? sortedView.slice(0, 6)
              : sortedView
            )?.map((t, i) => {
              if (activeTab === "finals") {
                const ft = t as FinalTeam;
                return (
                  <div
                    key={ft.id}
                    className="grid grid-cols-[48px_1fr_160px_160px_80px] items-center gap-0 px-4 py-3"
                  >
                    <div className="font-semibold text-white/90">{i + 1}</div>
                    <div className="text-white/90">{ft.name}</div>
                    <div className="flex items-center justify-end text-white/90">
                      {ft.prelimScore}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <input
                        type="number"
                        defaultValue={String(ft.finalScore)}
                        onBlur={(e) =>
                          handleFinalScoreBlur(ft.id, e.target.value)
                        }
                        className="w-32 bg-white/5 rounded px-3 py-1 text-right text-white"
                      />
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => handleDeleteTeam(ft.id)}
                        className="px-2 py-1 rounded bg-white/5 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              } else {
                const pt = t as PrelimTeam;
                return (
                  <div
                    key={pt.id}
                    className="grid grid-cols-[48px_1fr_160px_80px] items-center gap-0 px-4 py-3"
                  >
                    <div className="font-semibold text-white/90">{i + 1}</div>
                    <div className="text-white/90">{pt.name}</div>
                    <div className="flex items-center justify-end gap-2">
                      <input
                        type="number"
                        defaultValue={String(pt.score)}
                        onBlur={(e) =>
                          handlePrelimScoreBlur(pt.id, e.target.value)
                        }
                        className="w-28 bg-white/5 rounded px-3 py-1 text-right text-white"
                      />
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => handleDeleteTeam(pt.id)}
                        className="px-2 py-1 rounded bg-white/5 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              }
            })}

            {sortedView.length === 0 && (
              <div className="px-4 py-6 text-center text-white/60">
                No teams yet. Add new teams.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* qualifiers preview */}
      <div className="mt-4 text-sm text-white/70">
        <div>Top qualifiers preview (Prelim1 + Prelim2, Top 6):</div>
        <div className="mt-2">
          {getTop6Qualifiers().map((q, idx) => (
            <span
              key={q.name}
              className="inline-block mr-2 px-3 py-1 rounded bg-white/5 text-white/80"
            >
              {idx + 1}. {q.name} ({q.prelimScore})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
