"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";

type Member = {
  id: string;
  name: string;
  img?: string; // path in /public or full URL
};

const DEFAULT_MEMBERS: Member[] = [
  { id: "m4", name: "Arijit Ghosh", img: "/Photo_Arijit.jpeg" },
  { id: "m1", name: "Juniya Tewari", img: "/Photo_Juniya.jpg" },
  { id: "m6", name: "Ankush Das", img: "/Photo_Ankush.jpg" },
  { id: "m7", name: "Shreya Dey", img: "/Photo_Shreya.jpeg" },
  { id: "m5", name: "Swarnil Dey", img: "/Photo_Swarnil.jpeg" },
  { id: "m3", name: "Sohini Chakraborty", img: "/Photo_Sohini.jpeg" },
  { id: "m2", name: "Anubhav Bose", img: "/Photo_Anubhav2.jpg" },
];

export default function TeamMembersDrawer({
  members = DEFAULT_MEMBERS,
  showOpener = true,
}: {
  members?: Member[];
  showOpener?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => drawerRef.current?.focus(), 50);
    }
  }, [open]);

  // fallback avatar URL
  const getFallback = (name: string) =>
    `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
      name
    )}&backgroundType=gradient`;

  return (
    <>
      {showOpener && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-6 right-24 z-50 px-4 py-4 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-teal-300 text-black font-semibold shadow-lg flex items-center justify-center"
        >
          <Users />
        </button>
      )}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={drawerRef}
        className={`fixed inset-0 z-50 pointer-events-none`}
      >
        <div
          className={`absolute inset-0 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          } pointer-events-auto`}
        >
          <div className="h-full w-full bg-[#071422] overflow-auto flex flex-col">
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <h2 className="text-3xl font-bold">Team Members</h2>
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded bg-white/5 text-white"
              >
                Close
              </button>
            </div>

            {/* Fullscreen Grid */}
            <div className="flex-1 p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-col items-center text-center group transition-transform hover:scale-105"
                  >
                    <div className="w-60 h-60 rounded-full overflow-hidden shadow-xl relative">
                      <Image
                        src={m.img ?? getFallback(m.name)}
                        alt={m.name}
                        fill
                        sizes="200px"
                        className="object-cover"
                        // removed onError - src fallback should handle missing images.
                      />
                    </div>
                    <div className="mt-4 text-xl font-semibold">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="flex-1  flex items-center justify-center">
              <div className="relative w-[min(90vw,640px)] h-[min(90vw,640px)]">
                {members.map((m, idx) => {
                  const angle = (idx / members.length) * Math.PI * 2; // radians
                  const radius = 220; // px, adjust to taste (responsive below)
                  const left = `calc(50% + ${Math.round(
                    Math.cos(angle) * radius
                  )}px - 64px)`; // 64 = half avatar (128/2)
                  const top = `calc(50% + ${Math.round(
                    Math.sin(angle) * radius
                  )}px - 64px)`;
                  return (
                    <div
                      key={m.id}
                      className="absolute transform flex flex-col items-center text-center"
                      style={{ left, top }}
                    >
                      <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl relative">
                        <Image
                          src={m.img ?? getFallback(m.name)}
                          alt={m.name}
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-3 w-36 text-sm font-semibold">
                        {m.name}
                      </div>
                    </div>
                  );
                })}
               
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-28 h-28 rounded-full bg-white/5 flex items-center justify-center text-white/70">
                    <Users />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
