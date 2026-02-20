"use client";

import { AppInstallButtons } from "@/app/components/AppInstallButtons";

const GRAIN_DATA_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" /></filter><rect width="100%" height="100%" filter="url(%23n)" /></svg>`
  );

export function AppHeroDesktop() {
  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col text-white lg:flex-row lg:items-center px-[var(--premium-gutter-mobile)] lg:px-[var(--premium-gutter-desktop)] py-[clamp(2rem,6vw,4rem)]"
      style={{ background: "var(--color-ink)" }}
    >
      {/* Section-level radial glow behind mockup (right side) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[70%] w-[50%] -translate-y-1/2 lg:block"
        style={{
          background:
            "radial-gradient(circle at 70% 50%, rgba(64,88,187,0.18) 0%, transparent 60%)",
          filter: "blur(32px)",
        }}
      />

      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("${GRAIN_DATA_URI}")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-[var(--premium-max-width)] flex-1 flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
        {/* Left column — copy */}
        <div className="hero-mount-left flex flex-1 flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
          {/* Eyebrow pill */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full"
              style={{ backgroundColor: "#4058bb" }}
            />
            Free · iOS &amp; Android
          </div>

          <h1
            className="mb-6 max-w-[14ch] font-bold leading-[1.08] text-white"
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

          <p
            className="mb-8 max-w-[38ch] leading-[1.65]"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            }}
          >
            3-minute cognitive test. Wellness tracking. Measurable progress —
            tracked against your own data over time.
          </p>

          {/* Stats row */}
          <div className="mb-8 flex flex-wrap justify-center gap-8 lg:justify-start">
            <div>
              <div className="font-bold text-white" style={{ fontSize: "1.35rem" }}>
                800+
              </div>
              <div className="text-[0.75rem]" style={{ color: "rgba(255,255,255,0.4)" }}>
                Active users
              </div>
            </div>
            <div>
              <div className="font-bold text-white" style={{ fontSize: "1.35rem" }}>
                16%
              </div>
              <div className="text-[0.75rem]" style={{ color: "rgba(255,255,255,0.4)" }}>
                Avg. improvement in 30 days
              </div>
            </div>
            <div>
              <div className="font-bold text-white" style={{ fontSize: "1.35rem" }}>
                Free
              </div>
              <div className="text-[0.75rem]" style={{ color: "rgba(255,255,255,0.4)" }}>
                Always
              </div>
            </div>
          </div>

          <AppInstallButtons inverted={false} />

          <p
            className="mt-8 max-w-[36ch] text-[0.75rem]"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Powered by clinically validated cognitive assessment technology
            developed from Cambridge University research. FDA cleared.
          </p>
        </div>

        {/* Right column — mockup */}
        <div className="hero-mount-right relative flex flex-1 justify-center lg:w-1/2 lg:justify-end">
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
            className="relative z-[1] h-auto w-[clamp(260px,38vw,480px)]"
            style={{ animation: "floatPhone 5s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
