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
    <div className="neo-box p-10 flex flex-col items-center text-center">
      {/* Brain Icon */}
      <div className="w-24 h-24 mb-8 flex items-center justify-center">
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
          className="opacity-80"
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

      <h3 className="text-2xl font-bold mb-3">
        Try the Speed of Processing Game
      </h3>
      <p className="text-base opacity-70 mb-8">
        A 30-second clinical-grade assessment used in real research trials.
        Unlike typical brain games, you can&apos;t improve through practice
        alone—only by genuinely enhancing your cognitive function.
      </p>

      {/* Large prominent button */}
      <button
        onClick={onStart}
        className="neo-button px-12 py-5 font-bold text-xl w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Start Game
      </button>

      <p className="font-clinical text-sm opacity-50 mt-6">
        Full test with personalized insights available in the CONKA app
      </p>
    </div>
  );
}
