"use client";

export function AppSubscribersSection() {
  return (
    <section
      className="w-full px-[var(--premium-gutter-mobile)] py-[var(--space-section-padding)] md:px-[var(--premium-gutter-desktop)]"
      style={{
        background: "var(--color-bone)",
        color: "var(--color-ink)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[var(--premium-max-width)] flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12 lg:text-left">
        {/* Left: copy */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <p
            className="mb-4 text-xs uppercase tracking-widest opacity-60"
            style={{ color: "var(--color-ink)" }}
          >
            For subscribers
          </p>
          <h2
            className="mb-6 max-w-[28ch] font-bold leading-tight"
            style={{
              color: "var(--color-ink)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "var(--letter-spacing-premium-title)",
            }}
          >
            Exclusive rewards for CONKA subscribers.
          </h2>
          <p
            className="mb-6 max-w-[52ch] leading-[1.6]"
            style={{
              color: "var(--color-ink)",
              fontSize: "var(--premium-font-body-size)",
            }}
          >
            Subscribers earn tokens every time they complete a cognitive test. Use
            them to unlock exclusive merch and rewards. The more consistently you
            test, the more you earn.
          </p>
          <p
            className="font-semibold italic"
            style={{
              color: "var(--color-ink)",
              fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            }}
          >
            The more you test, the more you earn.
          </p>
        </div>
        {/* Right: rewards app screenshot */}
        <div className="flex flex-1 justify-center lg:justify-end">
          <img
            src="/app/AppRewards.png"
            alt="CONKA app rewards screen showing token balance and exclusive merch"
            className="w-full max-w-[280px] lg:max-w-[320px]"
            style={{ height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}

export default AppSubscribersSection;
