// src/hooks/useLocalStorage.ts
"use client";

import { useEffect, useState } from "react";

/**
 * Safe useLocalStorage hook:
 * - DOES NOT access window/localStorage during initial render.
 * - Initializes state with `initial`.
 * - In a client-only useEffect, reads localStorage and updates state.
 * - Writes back to localStorage whenever `state` changes.
 *
 * This avoids "window is not defined" during SSR / prerender.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  // Start with the initial value only (no window access here)
  const [state, setState] = useState<T>(initial);

  // On mount (client only), try to read persisted value and apply it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        setState(JSON.parse(raw) as T);
      }
    } catch {
      // ignore read errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // runs once on mount or when key changes

  // Persist to localStorage whenever state changes (client only)
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore write errors (e.g. storage full)
    }
  }, [key, state]);

  return [state, setState] as const;
}
