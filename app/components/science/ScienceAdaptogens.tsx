"use client";

import Image from "next/image";

interface ScienceAdaptogensProps {
  isMobile?: boolean;
}

const TAGS = [
  "HPA Axis Modulation",
  "Cortisol Regulation",
  "Non-Sedating",
];

export default function ScienceAdaptogens({
  isMobile = false,
}: ScienceAdaptogensProps) {
  return (
    <div
      className={`grid gap-8 lg:gap-12 ${
        isMobile ? "grid-cols-1" : "lg:grid-cols-2 lg:items-center"
      }`}
    >
      {/* Text */}
      <div className={isMobile ? "order-2" : ""}>
        <p className="brand-caption uppercase tracking-widest text-black mb-3">
          The Foundation
        </p>
        <div className="mb-6">
          <h2 className="brand-h2 mb-0 tracking-tight">
            What Are Adaptogens?
          </h2>
        </div>

        <div
          className="space-y-4"
          style={{ maxWidth: "var(--brand-body-max-width)" }}
        >
          <p className="brand-body text-black">
            Adaptogens are natural compounds that help your body &ldquo;adapt&rdquo;
            to stress. Unlike stimulants that force a response, adaptogens work by
            normalizing physiological functions and maintaining homeostasis.
          </p>
          <p className="brand-body text-black">
            Your stress response was designed for acute threats, not 12-hour
            workdays. Adaptogens modulate the HPA axis to normalize cortisol, so
            you stay sharp under pressure without the crash.
          </p>
          <p className="brand-body text-black">
            Key adaptogens in our formulas include{" "}
            <strong>Ashwagandha</strong>, <strong>Rhodiola rosea</strong>, and{" "}
            <strong>Lemon Balm</strong> — each clinically proven to reduce cortisol
            and improve stress resilience.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 lg:gap-3 mt-6">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="brand-caption px-3 py-1.5 rounded-full border border-black/10 text-black"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div
        className={isMobile ? "order-1" : ""}
        style={{ borderRadius: "var(--brand-radius-card)", overflow: "hidden" }}
      >
        <div
          className={`relative overflow-hidden ${isMobile ? "aspect-video" : "aspect-square"}`}
        >
          <Image
            src="/lifestyle/FlowLeaf.jpg"
            alt="CONKA Flow bottle held among leaves, showing natural ingredient origin"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 text-white">
            <p className="brand-caption text-white/70 mb-1">
              CONKA Flow Contains
            </p>
            <p className="font-bold text-lg lg:text-xl">
              3 Research-Backed Adaptogens
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
