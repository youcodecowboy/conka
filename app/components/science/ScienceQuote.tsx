"use client";

interface ScienceQuoteProps {
  isMobile?: boolean;
}

export default function ScienceQuote({ isMobile = false }: ScienceQuoteProps) {
  return (
    <div
      className="premium-card-soft premium-card-soft-stroke flex items-center gap-6 md:gap-8"
      style={{ borderRadius: "var(--premium-radius-card)" }}
    >
      <div
        className="w-1 h-16 md:h-24 flex-shrink-0"
        style={{ backgroundColor: "var(--color-neuro-blue-end)" }}
      />
      <div>
        <p
          className={`premium-body leading-relaxed ${
            isMobile ? "text-lg" : "text-2xl"
          }`}
          style={{ color: "inherit" }}
        >
          &ldquo;The brain is the most complex organ in the known universe. We
          believe it deserves ingredients backed by rigorous science, not
          marketing hype.&rdquo;
        </p>
        <p className="premium-body-sm opacity-70 mt-3 md:mt-4">
          - The CONKA Research Philosophy
        </p>
      </div>
    </div>
  );
}
