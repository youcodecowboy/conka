"use client";

interface ScienceQuoteProps {
  isMobile?: boolean;
}

export default function ScienceQuote({ isMobile = false }: ScienceQuoteProps) {
  return (
    <div
      className="brand-card-bordered flex items-center gap-6 md:gap-8"
      style={{ borderRadius: "var(--brand-radius-card)" }}
    >
      <div
        className="w-1 h-16 md:h-24 flex-shrink-0"
        style={{ backgroundColor: "var(--brand-accent)" }}
      />
      <div>
        <p
          className={`brand-body leading-relaxed ${
            isMobile ? "text-lg" : "text-2xl"
          }`}
          style={{ color: "inherit" }}
        >
          &ldquo;The brain is the most complex organ in the known universe. We
          believe it deserves ingredients backed by rigorous science, not
          marketing hype.&rdquo;
        </p>
        <p className="brand-caption opacity-70 mt-3 md:mt-4">
          - The CONKA Research Philosophy
        </p>
      </div>
    </div>
  );
}
