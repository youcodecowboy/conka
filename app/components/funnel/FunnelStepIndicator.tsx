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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/6">
      <div className="flex items-center justify-between h-12 px-4 lg:h-14 lg:px-8">
        {/* Step breadcrumb — left */}
        <div className="flex items-center gap-2">
          {STEPS.map((step, i) => {
            const isActive = step.number === currentStep;
            const isCompleted = step.number < currentStep;
            const isClickable = isCompleted && onStepClick;

            return (
              <div key={step.number} className="flex items-center gap-2">
                {/* Chevron separator */}
                {i > 0 && (
                  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" className="text-black/30">
                    <path d="M1 7L4 4L1 1" stroke="currentColor" />
                  </svg>
                )}

                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(step.number)}
                  disabled={!isClickable}
                  className={`text-xs lg:text-sm flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "text-[var(--brand-black)] font-semibold"
                      : isCompleted
                        ? "text-[var(--brand-black)] cursor-pointer"
                        : "text-black/30 cursor-default"
                  } ${!isClickable ? "cursor-default" : ""}`}
                >
                  {/* Step number with tick for completed */}
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] leading-none border transition-all duration-300 ${
                      isCompleted
                        ? "border-[var(--brand-black)] bg-[var(--brand-black)] text-white"
                        : isActive
                          ? "border-[var(--brand-black)]"
                          : "border-black/30"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8.5L6.5 12L13 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="20"
                          strokeDashoffset="0"
                          style={{
                            animation: "checkmark-draw 0.3s ease-out forwards",
                          }}
                        />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </span>

                  <span className={isActive ? "underline underline-offset-4" : ""}>
                    {step.label}
                  </span>
                </button>
              </div>
            );
          })}

          {/* Checkout — always shown as upcoming */}
          <div className="flex items-center gap-2">
            <svg width="5" height="8" viewBox="0 0 5 8" fill="none" className="text-black/30">
              <path d="M1 7L4 4L1 1" stroke="currentColor" />
            </svg>
            <span className="text-xs lg:text-sm text-black/30">Checkout</span>
          </div>
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
