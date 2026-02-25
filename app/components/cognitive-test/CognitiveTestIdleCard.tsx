"use client";

import type { CognitiveTestIdleCardProps } from "./types";

/**
 * CognitiveTestIdleCard - Idle state CTA card
 *
 * Displays the initial call-to-action with brain icon, description,
 * and start button for the cognitive test.
 */
export default function CognitiveTestIdleCard({
  onStart,
}: CognitiveTestIdleCardProps) {
  return (
    <div
      className="premium-card-soft premium-card-soft-stroke flex flex-col items-center text-center p-6 lg:p-10"
      style={{ color: "var(--color-ink)" }}
    >
      {/* Brain Icon */}
      <div className="w-16 h-16 lg:w-24 lg:h-24 mb-6 lg:mb-8 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80 w-full h-full"
        >
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
          <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
          <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
          <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
          <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
          <path d="M6 18a4 4 0 0 1-1.967-.516" />
          <path d="M19.967 17.484A4 4 0 0 1 18 18" />
        </svg>
      </div>

      <h3
        className="text-xl lg:text-2xl font-bold mb-3"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Give it a go, see how your brain is performing
      </h3>
      <p
        className="text-base mb-8 opacity-80"
        style={{
          lineHeight: "var(--premium-font-body-leading)",
          maxWidth: "var(--premium-body-max-width)",
        }}
      >
        This is a short version of the full cognitive test in the CONKA app.
        Take about 30 seconds to get a snapshot of your processing speed. The
        full test in the app gives you detailed insights and tracks how you
        improve over time.
      </p>

      <button
        onClick={onStart}
        className="w-full px-12 py-5 font-bold text-xl transition-transform hover:scale-[1.02] active:scale-[0.98] rounded-[var(--premium-radius-interactive)] border border-[var(--color-premium-stroke)] bg-[var(--color-ink)] text-[var(--color-bone)] hover:opacity-90"
      >
        Start short test
      </button>

      <p
        className="text-sm mt-6 opacity-70"
        style={{ fontSize: "var(--premium-font-data-size)" }}
      >
        Full test with personalised insights available in the CONKA app
      </p>
    </div>
  );
}
