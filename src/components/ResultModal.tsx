"use client";

import React from "react";
import { Check, X as IconX } from "lucide-react";

type ResultModalProps = {
  open: boolean;
  type: "correct" | "wrong" | null;
  onClose: () => void;
};

export function ResultModal({ open, type, onClose }: ResultModalProps) {
  if (!open || !type) return null;

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // clicking outside the modal closes it
    >
      {/* Stop click propagation inside content so clicking inside won’t close */}
      <div
        className="bg-gray-900 rounded-lg p-8 relative flex flex-col items-center space-y-4 w-[90vw] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button at top-right */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-700"
        >
          <IconX className="text-gray-300" size={24} />
        </button>

        {/* Tick or cross icon */}
        {type === "correct" ? (
          <Check className="text-green-400" size={64} />
        ) : (
          <IconX className="text-red-400" size={64} />
        )}

        {/* Title */}
        <div className="text-2xl font-semibold text-center text-white">
          {type === "correct" ? "Correct!" : "Wrong"}
        </div>

        {/* Message */}
        <div className="text-sm text-gray-400 text-center">
          {type === "correct"
            ? "You found a correct group."
            : "That selection wasn't correct. Try again."}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
