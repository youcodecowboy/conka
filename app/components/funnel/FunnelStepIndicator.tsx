"use client";

import Image from "next/image";

interface FunnelStepIndicatorProps {
  currentStep: 1 | 2;
  onStepClick?: (step: 1 | 2) => void;
}

const STEPS = [
  { number: 1 as const, label: "Product" },
  { number: 2 as const, label: "Plan" },
];

export default function FunnelStepIndicator({
  currentStep,
  onStepClick,
}: FunnelStepIndicatorProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10">
      <div className="flex items-center justify-between h-12 px-4 lg:h-14 lg:px-8">
        {/* Step breadcrumb — mono spec-sheet register */}
        <div className="flex items-center gap-2 font-mono text-[10px] lg:text-xs uppercase tracking-[0.14em] tabular-nums">
          {STEPS.map((step, i) => {
            const isActive = step.number === currentStep;
            const isCompleted = step.number < currentStep;
            const isClickable = isCompleted && onStepClick;

            return (
              <div key={step.number} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-black/25" aria-hidden>·</span>
                )}

                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(step.number)}
                  disabled={!isClickable}
                  className={`flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "text-[#1B2757] font-bold"
                      : isCompleted
                        ? "text-[var(--brand-black)] cursor-pointer hover:text-[#1B2757]"
                        : "text-black/30 cursor-default"
                  }`}
                >
                  {/* Mono step number with optional check */}
                  <span className="inline-flex items-center justify-center leading-none">
                    {isCompleted ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 8.5L6.5 12L13 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="square"
                          strokeLinejoin="miter"
                        />
                      </svg>
                    ) : (
                      <span className="tabular-nums">
                        {String(step.number).padStart(2, "0")}
                      </span>
                    )}
                  </span>

                  <span>{step.label}</span>
                </button>
              </div>
            );
          })}

          {/* Checkout — always shown as upcoming */}
          <span className="text-black/25" aria-hidden>·</span>
          <span className="flex items-center gap-1.5 text-black/30">
            <span className="tabular-nums">03</span>
            <span>Checkout</span>
          </span>
        </div>

        {/* Logo — right-aligned */}
        <Image
          src="/conka.png"
          alt="CONKA"
          width={80}
          height={22}
          priority
          className="lg:w-[100px] h-auto"
        />
      </div>
    </header>
  );
}
