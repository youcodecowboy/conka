"use client";

/**
 * The Test — editorial section establishing test credibility.
 * Placeholder images used for phone mockups until AppTestDistractor.png and AppTestAnimal.png are available.
 */

export function AppTestSection() {
  return (
    <section
      className="w-full px-[var(--premium-gutter-mobile)] text-white lg:px-[var(--premium-gutter-desktop)]"
      style={{
        background: "var(--color-ink)",
        paddingTop: "var(--space-section-padding)",
        paddingBottom: "var(--space-section-padding)",
      }}
    >
      <div
        className="mx-auto w-full"
        style={{ maxWidth: "var(--premium-max-width)" }}
      >
        {/* Zone 1 — Editorial statement block */}
        <div className="mx-auto flex max-w-[52ch] flex-col items-center text-center">
          {/* Eyebrow pill */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--color-bone)",
            }}
          >
            Not an intelligence test. A processing speed test.
          </div>

          <h2
            className="mx-auto mb-8 max-w-[22ch] font-bold leading-[1.08] text-white"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
              letterSpacing: "-0.035em",
            }}
          >
            Most cognitive tests get easier with practice.
            <br />
            <span
              style={{
                background: "var(--gradient-neuro-blue-accent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              This one can&apos;t.
            </span>
          </h2>

          <p
            className="mb-4 max-w-[52ch] leading-[1.7]"
            style={{
              color: "var(--color-bone)",
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
            }}
          >
            The test measures how quickly your brain processes visual information
            — the same mechanism that&apos;s first affected by cognitive decline. It
            uses natural images rather than words, numbers, or patterns, so
            there&apos;s no way to learn it or game it. Your score only improves if
            your brain actually improves.
          </p>

          <p
            className="max-w-[52ch] text-center italic"
            style={{
              color: "var(--color-bone)",
              fontSize: "0.85rem",
            }}
          >
            It does not measure intelligence — only how efficiently your brain
            processes what it sees.
          </p>
        </div>

        {/* Zone 2 — Two-column split */}
        <div className="mt-16 flex flex-col gap-12 lg:mt-20 lg:flex-row lg:items-start lg:gap-16">
          {/* Left column — credentials block */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div
                className="rounded-[var(--premium-radius-nested)] p-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    background: "var(--gradient-neuro-blue-accent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  93%
                </div>
                <p
                  className="mt-1 leading-[1.4]"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-bone)",
                  }}
                >
                  Sensitivity detecting cognitive impairment
                </p>
                <p
                  className="mt-2 text-[0.65rem] italic"
                  style={{ color: "var(--color-bone)" }}
                >
                  ADePT Study, PMC10533908
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="rounded-[var(--premium-radius-nested)] p-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    background: "var(--gradient-neuro-blue-accent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  87.5%
                </div>
                <p
                  className="mt-1 leading-[1.4]"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-bone)",
                  }}
                >
                  Test-retest reliability
                </p>
                <p
                  className="mt-2 text-[0.65rem] italic"
                  style={{ color: "var(--color-bone)" }}
                >
                  ADePT Study, PMC10533908
                </p>
              </div>

              {/* Card 3 */}
              <div
                className="rounded-[var(--premium-radius-nested)] p-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    background: "var(--gradient-neuro-blue-accent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  14
                </div>
                <p
                  className="mt-1 leading-[1.4]"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-bone)",
                  }}
                >
                  NHS Trusts in clinical validation trials
                </p>
                <p
                  className="mt-2 text-[0.65rem] italic"
                  style={{ color: "var(--color-bone)" }}
                >
                  HRA validation study, ISRCTN95636074
                </p>
              </div>

              {/* Card 4 */}
              <div
                className="rounded-[var(--premium-radius-nested)] p-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    background: "var(--gradient-neuro-blue-accent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  5 min
                </div>
                <p
                  className="mt-1 leading-[1.4]"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-bone)",
                  }}
                >
                  That&apos;s all it takes
                </p>
              </div>
            </div>

            <p
              className="mt-6 max-w-[42ch] italic"
              style={{
                fontSize: "0.7rem",
                color: "var(--color-bone)",
              }}
            >
              Validated across NHS Memory Clinics. Developed from Cambridge
              University research. FDA cleared.
            </p>
          </div>

          {/* Right column — phone mockups (placeholder images until assets ready) */}
          <div className="flex flex-1 flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-8">
            <div className="flex flex-col items-center gap-2">
              <img
                src="/app/AppTestDistractor.png"
                alt="Test screen — ready state"
                className="h-auto w-[clamp(120px,22vw,180px)] lg:w-[clamp(140px,18vw,220px)]"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  const placeholder = t.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "flex";
                }}
              />
              {/* Placeholder when asset missing */}
              <div
                className="hidden flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs text-[var(--color-bone)]"
                style={{
                  width: "clamp(120px,22vw,180px)",
                  aspectRatio: "9/19",
                }}
                aria-hidden
              >
                Ready
              </div>
              <span
                className="text-center text-[0.75rem] uppercase tracking-widest"
                style={{ color: "var(--color-bone)" }}
              >
                Ready
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/app/AppTestAnimal.png"
                alt="Test screen — processing"
                className="h-auto w-[clamp(120px,22vw,180px)] lg:w-[clamp(140px,18vw,220px)]"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  const placeholder = t.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "flex";
                }}
              />
              <div
                className="hidden flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs text-[var(--color-bone)]"
                style={{
                  width: "clamp(120px,22vw,180px)",
                  aspectRatio: "9/19",
                }}
                aria-hidden
              >
                Processing
              </div>
              <span
                className="text-center text-[0.75rem] uppercase tracking-widest"
                style={{ color: "var(--color-bone)" }}
              >
                Processing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppTestSection;
