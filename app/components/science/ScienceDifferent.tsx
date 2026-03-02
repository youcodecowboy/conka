"use client";

interface ScienceDifferentProps {
  isMobile?: boolean;
}

const CARDS = [
  {
    title: "Clinical Dosing",
    description:
      'We use the same doses proven effective in clinical trials, not underdosed "proprietary blends" that hide inadequate amounts.',
    descriptionMobile:
      "Same doses proven effective in clinical trials, not underdosed blends.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    iconBg: "var(--color-neuro-blue-end)",
  },
  {
    title: "Bioavailability First",
    description:
      "Black pepper increases curcumin absorption by 2000%. We include synergistic compounds that ensure maximum nutrient delivery.",
    descriptionMobile:
      "Black pepper increases curcumin absorption by 2000%.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    iconBg: "var(--color-neuro-blue-end)",
  },
  {
    title: "Full Transparency",
    description:
      "Every statistic links to its PubMed source. No exaggerated claims, just real science you can verify yourself.",
    descriptionMobile:
      "Every stat links to its PubMed source. Real science you can verify.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    iconBg: "var(--color-neuro-blue-end)",
  },
];

export default function ScienceDifferent({
  isMobile = false,
}: ScienceDifferentProps) {
  return (
    <>
      <div className="text-center mb-10 md:mb-12">
        <p className="premium-body-sm uppercase tracking-widest opacity-50 mb-2">
          Our Approach
        </p>
        <h2
          className="premium-section-heading"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          What Makes CONKA Different
        </h2>
      </div>

      <div
        className={
          isMobile
            ? "space-y-4 w-full"
            : "grid md:grid-cols-3 gap-6 w-full"
        }
      >
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="premium-card-soft premium-card-soft-stroke"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            {isMobile ? (
              <div className="flex items-start gap-4 p-4">
                <div
                  className="w-10 h-10 rounded-lg text-white flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: card.iconBg }}
                >
                  {card.icon}
                </div>
                <div>
                  <h3 className="premium-heading mb-1">{card.title}</h3>
                  <p className="premium-body-sm opacity-80">
                    {card.descriptionMobile}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div
                  className="w-12 h-12 rounded-lg text-white flex items-center justify-center mb-4"
                  style={{ backgroundColor: card.iconBg }}
                >
                  {card.icon}
                </div>
                <h3 className="premium-heading mb-2">{card.title}</h3>
                <p className="premium-body-sm opacity-80">{card.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
