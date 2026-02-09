"use client";

import { FormulaId, formulaContent, FORMULA_COLORS } from "@/app/lib/productData";

interface HowItWorksProps {
  formulaId: FormulaId;
  usePremium?: boolean;
}

export default function HowItWorks({ formulaId, usePremium = false }: HowItWorksProps) {
  const formula = formulaContent[formulaId];
  const accentColor = FORMULA_COLORS[formulaId];

  const sectionClass = usePremium ? "premium-section bg-current/5" : "px-6 md:px-16 py-24 bg-current/5";
  const containerClass = usePremium ? "premium-container" : "max-w-6xl mx-auto";
  const boxClass = usePremium ? "premium-box p-8 mt-16" : "mt-16 neo-box p-8";
  const headingClass = usePremium ? "premium-heading mb-2" : "text-3xl md:text-4xl font-bold mb-2";
  const subheadingClass = usePremium ? "premium-annotation" : "font-commentary text-xl";
  const stepTitleClass = usePremium ? "premium-heading mb-2" : "text-xl font-bold mb-2";
  const stepBodyClass = usePremium ? "premium-body opacity-80" : "opacity-80";

  const steps = [
    {
      number: "01",
      title: "Choose Your Pack",
      description: "Select between 4, 12, or 28 shots based on your usage needs.",
    },
    {
      number: "02",
      title: "Take Daily",
      description: formula.whenToTake,
    },
    {
      number: "03",
      title: "Feel the Difference",
      description: "Most users notice improvements within the first week of consistent use.",
    },
  ];

  return (
    <section className={sectionClass}>
      <div className={containerClass}>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={headingClass}>How It Works</h2>
          <p className={subheadingClass}>simple, effective, proven</p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 ${accentColor.bg} text-white rounded-full flex items-center justify-center`}
              >
                <span className="font-clinical text-xl font-bold">{step.number}</span>
              </div>
              <h3 className={stepTitleClass}>{step.title}</h3>
              <p className={stepBodyClass}>{step.description}</p>
            </div>
          ))}
        </div>

        {/* When to Take Box */}
        <div className={boxClass}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 text-center">
              <div
                className={`w-20 h-20 mx-auto ${accentColor.bg} text-white rounded-full flex items-center justify-center mb-4`}
              >
                {formulaId === "01" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </div>
              <p className="font-clinical text-sm uppercase opacity-70">
                {formulaId === "01" ? "Morning Ritual" : "Evening Boost"}
              </p>
            </div>
            <div className="md:w-2/3">
              <h3 className={usePremium ? "premium-heading mb-4" : "text-2xl font-bold mb-4"}>When to Take {formula.name}</h3>
              <p className={usePremium ? "premium-body opacity-80 mb-4" : "text-lg opacity-80 mb-4"}>{formula.whenToTake}</p>
              <div className="flex flex-wrap gap-2">
                {formula.keyPoints.map((point, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-current rounded-full font-clinical text-xs"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

