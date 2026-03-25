"use client";

interface FunnelStepIndicatorProps {
  currentStep: 1 | 2;
}

const STEPS = [
  { number: 1, label: "Choose Plan" },
  { number: 2, label: "Choose Product" },
] as const;

export default function FunnelStepIndicator({ currentStep }: FunnelStepIndicatorProps) {
  return (
    <div className="flex items-center gap-3 py-4">
      {STEPS.map((step, i) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;

        return (
          <div key={step.number} className="flex items-center gap-3 flex-1">
            {/* Step */}
            <div className="flex items-center gap-2 flex-1">
              {/* Number circle */}
              <div
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-[var(--color-ink)] text-white"
                    : isCompleted
                      ? "bg-[var(--color-ink)] text-white"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2.5 8.5L6.5 12.5L13.5 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>

              {/* Label */}
              <span
                className={`text-sm font-medium transition-colors ${
                  isActive || isCompleted ? "text-[var(--color-ink)]" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={`h-px flex-1 max-w-8 transition-colors ${
                  isCompleted ? "bg-[var(--color-ink)]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
