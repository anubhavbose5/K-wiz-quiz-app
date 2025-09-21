"use client";
import LeaderboardDrawer from "@/components/LeaderboardDrawer";
import TeamMembersDrawer from "@/components/TeamMembersDrawer";
import Link from "next/link";

const Section = ({
  title,
  titleClass,
  rounds,
}: {
  title: string;
  titleClass?: string;
  rounds: { href: string; label: string }[];
}) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ai-glow flex flex-col items-center space-y-4">
    <h2 className={`text-3xl font-futuristic ${titleClass}`}>{title}</h2>
    <div className="flex flex-wrap gap-3 justify-center">
      {rounds.map((r) => (
        <Link
          key={r.href}
          href={r.href}
          className="rounded-xl px-6 py-3 bg-primary text-black font-semibold hover:brightness-110 transition ai-glow"
        >
          {r.label}
        </Link>
      ))}
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 space-y-12">
      <header className="text-center space-y-2">
        <div>
          <TeamMembersDrawer showOpener={true} />
          <LeaderboardDrawer />
        </div>
        <h1 className="text-6xl md:text-7xl font-futuristic text-primary drop-shadow-[0_0_20px_rgba(0,230,255,0.35)]">
          K-WIZ 2025
        </h1>
      </header>

      <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
        <Section
          title="Prelims 1"
          titleClass="text-primary"
          rounds={[
            { href: "/prelims1/r1", label: "Round 1" },
            { href: "/prelims1/r2", label: "Round 2" },
            { href: "/prelims1/r3", label: "Round 3" },
          ]}
        />
        <Section
          title="Finals"
          titleClass="text-secondary"
          rounds={[
            { href: "/finals/r1", label: "Round 1" },
            { href: "/finals/r2", label: "Round 2" },
            { href: "/finals/r3", label: "Round 3" },
          ]}
        />
        <Section
          title="Prelims 2"
          titleClass="text-primary"
          rounds={[
            { href: "/prelims2/r1", label: "Round 1" },
            { href: "/prelims2/r2", label: "Round 2" },
            { href: "/prelims2/r3", label: "Round 3" },
          ]}
        />
      </div>
    </main>
  );
}
