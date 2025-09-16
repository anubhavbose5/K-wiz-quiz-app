// src/components/LeaderboardDrawer.tsx
"use client";

import React, { useState } from "react";
import LeaderboardTable from "./LeaderboardTable";
import { Trophy } from "lucide-react";

export default function LeaderboardDrawer({
  seedTeams,
}: {
  seedTeams?: { id: string; name: string; score: number }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* You can keep this opener in header instead; included for convenience */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-[#00e6ff4d] flex items-center justify-center shadow-lg hover:bg-accent/80 transition-colors"
        aria-label="Open Leaderboard"
      >
        <Trophy color="black" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* FULL WIDTH Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-[#061421] z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold">Leaderboard</h3>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1 rounded bg-white/10 text-white"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto h-full">
          {/* Center the content */}
          <div className="max-w-6xl mx-auto">
            <LeaderboardTable seedTeams={seedTeams} />
          </div>
        </div>
      </div>
    </>
  );
}
