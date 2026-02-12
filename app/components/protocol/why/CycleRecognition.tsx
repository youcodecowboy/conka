"use client";

import { sectionHeadings, symptomEntries } from "@/app/lib/protocolWhyCopy";
import { protocolProblemCycleSteps } from "@/app/lib/protocolProblemCycleCopy";

interface CycleRecognitionProps {
  selectedSymptomId: string | null;
  onSelect: (symptomId: string) => void;
}

export default function CycleRecognition({
  selectedSymptomId,
  onSelect,
}: CycleRecognitionProps) {
  return (
    <section
      className="premium-section"
      aria-label="Recognize yourself"
    >
      <div className="premium-container max-w-6xl mx-auto px-6 md:px-16 pb-12">
        <h2 className="premium-section-heading text-2xl md:text-3xl font-bold text-center mb-10">
          {sectionHeadings.recognition}
        </h2>
        <p className="premium-body text-center opacity-80 max-w-xl mx-auto mb-10">
          Which sounds familiar? Your cycle starts there.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {symptomEntries.map((entry) => {
            const isSelected = selectedSymptomId === entry.id;
            const cycleStep = protocolProblemCycleSteps[entry.entryNode];
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => onSelect(entry.id)}
                className={`premium-box p-5 text-left rounded-xl border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-current bg-current/10 shadow-md"
                    : "border-transparent bg-[var(--color-surface)] hover:border-current/20 hover:bg-[var(--color-surface)]/80"
                }`}
                aria-pressed={isSelected}
                aria-label={entry.label}
              >
                <span
                  className={`premium-body text-sm font-medium block mb-2 ${
                    isSelected ? "opacity-100" : "opacity-90"
                  }`}
                >
                  {entry.label}
                </span>
                <span className="premium-data text-xs opacity-60 uppercase tracking-wider">
                  Starts at {cycleStep.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
