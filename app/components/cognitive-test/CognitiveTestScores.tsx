"use client";

import type { CognitiveTestScoresProps } from "./types";

/**
 * CognitiveTestScores - Score display grid
 *
 * Displays the test results in a 3-column grid showing
 * overall score, accuracy, and speed percentages.
 */
export default function CognitiveTestScores({
  result,
  email,
}: CognitiveTestScoresProps) {
  return (
    <div
      className="premium-card-soft premium-card-soft-stroke p-6 lg:p-8"
      style={{ color: "var(--color-ink)" }}
    >
      <p
        className="text-xs uppercase tracking-widest mb-4 text-center opacity-70"
        style={{ fontSize: "var(--premium-font-data-size)" }}
      >
        Your Speed of Processing Scores
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          className="text-center p-4 rounded-[var(--premium-radius-nested)]"
          style={{ background: "rgba(64,88,187,0.08)" }}
        >
          <p
            className="text-3xl lg:text-4xl font-bold mb-1"
            style={{
              background: "var(--gradient-neuro-blue-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {result.score}
          </p>
          <p
            className="text-xs uppercase tracking-wider opacity-70"
            style={{ fontSize: "var(--premium-font-data-size)" }}
          >
            Overall
          </p>
        </div>
        <div
          className="text-center p-4 rounded-[var(--premium-radius-nested)] bg-black/5"
        >
          <p className="text-3xl lg:text-4xl font-bold mb-1">{result.accuracy}%</p>
          <p
            className="text-xs uppercase tracking-wider opacity-70"
            style={{ fontSize: "var(--premium-font-data-size)" }}
          >
            Accuracy
          </p>
        </div>
        <div
          className="text-center p-4 rounded-[var(--premium-radius-nested)] bg-black/5"
        >
          <p className="text-3xl lg:text-4xl font-bold mb-1">{result.speed}%</p>
          <p
            className="text-xs uppercase tracking-wider opacity-70"
            style={{ fontSize: "var(--premium-font-data-size)" }}
          >
            Speed
          </p>
        </div>
      </div>
      {email && (
        <p className="text-center text-sm mt-4 opacity-70" style={{ fontSize: "var(--premium-font-data-size)" }}>
          Results sent to {email}
        </p>
      )}
    </div>
  );
}
