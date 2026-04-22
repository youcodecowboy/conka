"use client";

export default function ShopHeroMobile() {
  return (
    <div className="flex flex-col items-start text-left">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 tabular-nums mb-3">
        01 · Shop · 03 formulas
      </p>
      <h1
        className="brand-h1 text-black mb-3"
        style={{ letterSpacing: "-0.02em" }}
      >
        Clarity and focus you can feel.
      </h1>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
        Start simple · Feel the difference · 100-day guarantee
      </p>
    </div>
  );
}
