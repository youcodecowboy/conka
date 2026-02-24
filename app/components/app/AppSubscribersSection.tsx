"use client";

export function AppSubscribersSection() {
  return (
    <section
      className="w-full px-[var(--premium-gutter-mobile)] py-[var(--space-section-padding)] text-center md:px-[var(--premium-gutter-desktop)]"
      style={{
        background: "var(--color-bone)",
        color: "var(--color-ink)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[var(--premium-max-width)] flex-col items-center">
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
    </section>
  );
}

export default AppSubscribersSection;
