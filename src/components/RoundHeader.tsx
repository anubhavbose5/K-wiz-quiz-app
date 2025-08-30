"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function RoundHeader({
  title,
  rightSlot,
}: {
  title: string;
  rightSlot?: React.ReactNode; // e.g. CountdownTimer
}) {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b border-white/10 bg-background/70 backdrop-blur-md ai-glow">
      {/* Left: Home button */}
      <Link
        href="/"
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition ai-glow"
      >
        <Home className="w-5 h-5 text-primary" />
        <span className="text-sm font-semibold">Home</span>
      </Link>

      {/* Center: Title */}
      <h2 className="text-xl md:text-2xl font-futuristic text-primary text-center flex-1">
        {title}
      </h2>

      {/* Right: Optional slot (like a timer) */}
      <div className="min-w-[80px] flex justify-end">{rightSlot}</div>
    </header>
  );
}
