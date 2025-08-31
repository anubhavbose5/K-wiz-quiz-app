// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn(...inputs) -> merges conditional classes (clsx) and resolves Tailwind conflicts (twMerge)
 * Usage: className={cn("px-4", isActive && "bg-blue-500", "text-white")}
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

export default cn;
