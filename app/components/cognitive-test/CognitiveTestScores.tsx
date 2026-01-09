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
    <div className="neo-box p-6 lg:p-8">
      <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-4 text-center">
        Your Speed of Processing Scores
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-teal-500/10 rounded-lg">
          <p className="font-clinical text-3xl lg:text-4xl font-bold text-teal-500 mb-1">
            {result.score}
          </p>
          <p className="font-clinical text-xs opacity-60 uppercase tracking-wider">
            Overall
          </p>
        </div>
        <div className="text-center p-4 bg-current/5 rounded-lg">
          <p className="font-clinical text-3xl lg:text-4xl font-bold mb-1">
            {result.accuracy}%
          </p>
          <p className="font-clinical text-xs opacity-60 uppercase tracking-wider">
            Accuracy
          </p>
        </div>
        <div className="text-center p-4 bg-current/5 rounded-lg">
          <p className="font-clinical text-3xl lg:text-4xl font-bold mb-1">
            {result.speed}%
          </p>
          <p className="font-clinical text-xs opacity-60 uppercase tracking-wider">
            Speed
          </p>
        </div>
      </div>
      {email && (
        <p className="text-center text-sm opacity-60 mt-4">
          Results sent to {email}
        </p>
      )}
    </div>
  );
}
