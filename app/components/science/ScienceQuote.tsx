"use client";

interface ScienceQuoteProps {
  isMobile?: boolean;
}

export default function ScienceQuote({ isMobile = false }: ScienceQuoteProps) {
  return (
    <div className="max-w-4xl">
      <p
        className={`leading-relaxed ${
          isMobile ? "text-2xl" : "text-3xl lg:text-4xl"
        }`}
        style={{ lineHeight: 1.3 }}
      >
        <span className="text-[1.5em] font-bold leading-none">&ldquo;</span>
        The brain is the most complex organ in the known universe. We believe it
        deserves ingredients backed by rigorous science, not marketing hype.
        <span className="text-[1.5em] font-bold leading-none">&rdquo;</span>
      </p>
      <p className="brand-caption text-black mt-4 lg:mt-6">
        — The CONKA Research Philosophy
      </p>
    </div>
  );
}
