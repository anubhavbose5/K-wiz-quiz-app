"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Music } from "lucide-react";

export default function MusicDrawer({
  logo = "/themelogo.jpg",
  music = "/theme.mp3",
  showOpener = true,
}: {
  logo?: string;
  music?: string;
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

  return (
    <>
      {showOpener && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-6 right-40 z-20 w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 text-black shadow-lg flex items-center justify-center"
        >
          <Music />
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
        className="fixed inset-0 z-50 pointer-events-none"
      >
        <div
          className={`z-50 absolute inset-0 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          } pointer-events-auto`}
        >
          <div className="h-full w-full bg-[#071422] flex flex-col items-center justify-center gap-6 p-8">
            {/* Logo */}
            <div className="w-[800px] h-[800px] relative">
              <Image
                src={logo}
                alt="Logo"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>

            {/* Music Player */}
            <audio controls className="w-full max-w-md">
              <source src={music} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 mt-6 rounded bg-white/10 text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
