"use client";

import { AppInstallButtons } from "@/app/components/AppInstallButtons";

const GRAIN_DATA_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" /></filter><rect width="100%" height="100%" filter="url(%23n)" /></svg>`
  );

export function AppHeroMobile() {
  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col text-white px-[var(--premium-gutter-mobile)] py-[clamp(2rem,6vw,4rem)]"
      style={{ background: "var(--color-ink)" }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("${GRAIN_DATA_URI}")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-[var(--premium-max-width)] flex-1 flex-col items-center gap-8 text-center">
        {/* 1. Eyebrow pill */}
        <div
          className="hero-mount-left inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest"
          style={{
            backgroundColor: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--color-bone)",
          }}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full"
            style={{ backgroundColor: "#4058bb" }}
          />
          Free · iOS &amp; Android
        </div>

        {/* 2. Title */}
        <h1
          className="hero-mount-left max-w-[14ch] font-bold leading-[1.08] text-white"
          style={{
            fontSize: "clamp(2.6rem, 5.5vw, 4.25rem)",
            letterSpacing: "-0.035em",
          }}
        >
          The only supplement you can{" "}
          <span
            style={{
              background: "var(--gradient-neuro-blue-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            measure working.
          </span>
        </h1>

        {/* 3. Image under title */}
        <div className="hero-mount-right relative flex justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "60%",
              height: "60%",
              background:
                "radial-gradient(circle, rgba(64,88,187,0.25) 0%, transparent 70%)",
              filter: "blur(48px)",
            }}
          />
          <img
            src="/app/AppConkaRing.png"
            alt="CONKA app on iPhone"
            className="relative z-[1] h-auto w-[clamp(220px,70vw,320px)]"
            style={{ animation: "floatPhone 5s ease-in-out infinite" }}
          />
        </div>

        {/* 4. Subheadline */}
        <p
          className="max-w-[38ch] leading-[1.65]"
          style={{
            color: "var(--color-bone)",
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
          }}
        >
          3-minute cognitive test. Wellness tracking. Measurable progress —
          tracked against your own data over time.
        </p>

        {/* 5. Stats row */}
        <div className="flex flex-wrap justify-center gap-8">
          <div>
            <div className="font-bold text-white" style={{ fontSize: "1.35rem" }}>
              800+
            </div>
            <div className="text-[0.75rem]" style={{ color: "var(--color-bone)" }}>
              Active users
            </div>
          </div>
          <div>
            <div className="font-bold text-white" style={{ fontSize: "1.35rem" }}>
              16%
            </div>
            <div className="text-[0.75rem]" style={{ color: "var(--color-bone)" }}>
              Avg. improvement in 30 days
            </div>
          </div>
          <div>
            <div className="font-bold text-white" style={{ fontSize: "1.35rem" }}>
              Free
            </div>
            <div className="text-[0.75rem]" style={{ color: "var(--color-bone)" }}>
              Always
            </div>
          </div>
        </div>

        {/* 6. CTA */}
        <AppInstallButtons inverted={false} />

        {/* 7. Credibility line */}
        <p
          className="max-w-[36ch] text-[0.75rem]"
          style={{ color: "var(--color-bone)" }}
        >
          Powered by clinically validated cognitive assessment technology
          developed from Cambridge University research. FDA cleared.
        </p>
      </div>
    </section>
  );
}
