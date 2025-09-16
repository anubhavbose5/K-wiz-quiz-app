"use client";
export const dynamic = "force-dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

export default function AuthPageWrapper() {
  return (
    <Suspense>
      <AuthPage />
    </Suspense>
  );
}

function AuthPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params?.get("redirectTo") ?? "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password, redirectTo }),
    });

    if (res.ok) {
      // Successful — redirect to saved page (middleware will allow)
      router.push(redirectTo);
    } else {
      const j = await res.json().catch(() => ({ message: "Invalid" }));
      setError(j?.message || "Invalid password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071422]">
      <form
        onSubmit={submit}
        className="mx-4 w-full max-w-md bg-white/5 p-8 rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-4">Enter password to continue</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-white/5 mb-3"
          placeholder="Password"
        />
        {error && <div className="text-sm text-red-400 mb-3">{error}</div>}
        <button
          disabled={loading}
          className="w-full p-3 bg-primary rounded font-semibold"
        >
          {loading ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
