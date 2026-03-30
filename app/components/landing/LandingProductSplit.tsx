"use client";

import Image from "next/image";

const FUNNEL_URL = "/funnel";

export default function LandingProductSplit() {
  return (
    <div>
      {/* Heading */}
      <div className="text-center mb-8">
        <h2
          className="premium-section-heading"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Designed for 24 hours.
        </h2>
      </div>

      {/* Product image — rounded + shadow */}
      <div className="flex justify-center mb-10">
        <div className="w-full max-w-sm overflow-hidden rounded-[var(--premium-radius-card)] shadow-lg">
          <Image
            src="/formulas/ConkaAmPm.jpg"
            alt="CONKA Flow (morning energy) and CONKA Clear (evening clarity) side by side"
            width={800}
            height={800}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Two-column product cards */}
      <div className="grid grid-cols-2 gap-3 lg:gap-6">
        {/* CONKA Flow */}
        <div
          className="rounded-2xl lg:rounded-[var(--premium-radius-card)] p-4 lg:p-8"
          style={{
            backgroundColor: "white",
            border: "1px solid var(--color-premium-stroke)",
          }}
        >
          {/* Time badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#b45309" }}
          >
            ☀️ Before the day
          </div>

          <h3
            className="text-lg lg:text-xl font-bold"
            style={{ color: "var(--color-ink)" }}
          >
            CONKA Flow
          </h3>

          <p className="text-xs opacity-40 mt-1 mb-5">
            Caffeine-free · Patented formula
          </p>

          {/* Benefits — outcome-led */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#f59e0b" }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>Start how you want to finish</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#f59e0b" }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>Calm focus that builds</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#f59e0b" }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>Win the day before it starts</span>
            </div>
          </div>

          {/* Taste */}
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--color-premium-stroke)" }}>
            <p className="text-xs opacity-50">
              <span className="font-medium opacity-80">Taste:</span> Honey + citrus
            </p>
          </div>
        </div>

        {/* CONKA Clear */}
        <div
          className="rounded-2xl lg:rounded-[var(--premium-radius-card)] p-4 lg:p-8"
          style={{
            backgroundColor: "white",
            border: "1px solid var(--color-premium-stroke)",
          }}
        >
          {/* Time badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: "rgba(14, 165, 233, 0.1)", color: "#0369a1" }}
          >
            🌙 After the day
          </div>

          <h3
            className="text-lg lg:text-xl font-bold"
            style={{ color: "var(--color-ink)" }}
          >
            CONKA Clear
          </h3>

          <p className="text-xs opacity-40 mt-1 mb-5">
            Nootropic · Antioxidant blend
          </p>

          {/* Benefits — outcome-led */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#0ea5e9" }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>Clears the mental debt of a hard day</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#0ea5e9" }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>Beyond physical recovery</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#0ea5e9" }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>Wake up ready to go again</span>
            </div>
          </div>

          {/* Taste */}
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--color-premium-stroke)" }}>
            <p className="text-xs opacity-50">
              <span className="font-medium opacity-80">Taste:</span> Fresh lemon
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <a
          href={FUNNEL_URL}
          className="block w-full lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: "var(--color-ink)" }}
        >
          Get Both →
        </a>
      </div>
    </div>
  );
}
