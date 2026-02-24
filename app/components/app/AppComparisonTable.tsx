"use client";

/**
 * AppComparisonTable — Us vs Them differentiation table.
 * Content only; page wraps in premium-section-luxury + premium-bg-ink + premium-track.
 */
export function AppComparisonTable() {
  return (
    <>
      <h2
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Why our App has the best functionality
      </h2>
      {/* Placeholder: replace with Us vs Them device silhouettes or icon strip */}
      <div
        className="mb-8 flex aspect-[4/1] max-w-xl items-center justify-center rounded-[var(--premium-radius-nested)] border border-dashed border-white/20 bg-white/5 mx-auto"
        aria-hidden
      >
        <p className="px-4 text-center text-xs opacity-60">
          Asset: Us vs Them — two device silhouettes or icons. Replace with final image.
        </p>
      </div>
      <div
        className="overflow-x-auto rounded-[var(--premium-radius-card)] p-6"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              <th className="text-left p-4 font-bold" style={{ padding: "var(--premium-space-m)" }}>Feature</th>
              <th className="text-left p-4 font-bold" style={{ padding: "var(--premium-space-m)" }}>Us</th>
              <th className="text-left p-4 font-bold" style={{ padding: "var(--premium-space-m)" }}>Them</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <td className="p-4 font-semibold" style={{ padding: "var(--premium-space-m)" }}>Purpose</td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Measures and trains your brain for real performance improvement
              </td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Tracks general wellness or gives broad lifestyle advice
              </td>
            </tr>
            <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <td className="p-4 font-semibold" style={{ padding: "var(--premium-space-m)" }}>Measurement</td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Objective cognitive data that shows when you&apos;re actually underperforming
              </td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Relies on how you feel or surface-level metrics
              </td>
            </tr>
            <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <td className="p-4 font-semibold" style={{ padding: "var(--premium-space-m)" }}>Focus</td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Brain-first. The organ that drives everything
              </td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Mostly heart rate, steps, sleep or mood tracking
              </td>
            </tr>
            <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <td className="p-4 font-semibold" style={{ padding: "var(--premium-space-m)" }}>Scientific Backing</td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                FDA cleared medical device with clinical grounding
              </td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Often unverified or loosely science-informed
              </td>
            </tr>
            <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <td className="p-4 font-semibold" style={{ padding: "var(--premium-space-m)" }}>Testing Method</td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Uses visual tests (animals) to avoid learning, language or education bias
              </td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Many tests are affected by prior knowledge or IQ factors
              </td>
            </tr>
            <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <td className="p-4 font-semibold" style={{ padding: "var(--premium-space-m)" }}>Progress Over Time</td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Shows measurable cognitive improvement without learning effects
              </td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Score increases are often just familiarity with the test
              </td>
            </tr>
            <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <td className="p-4 font-semibold" style={{ padding: "var(--premium-space-m)" }}>Guidance</td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Pairs data with the CONKA formula to actively improve performance
              </td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Gives numbers with little direction or actionable change
              </td>
            </tr>
            <tr>
              <td className="p-4 font-semibold" style={{ padding: "var(--premium-space-m)" }}>Motivation</td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                Keeps you competitive by benchmarking against pro athletes
              </td>
              <td className="p-4 opacity-90" style={{ padding: "var(--premium-space-m)" }}>
                No high-performance comparison or motivational challenge
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AppComparisonTable;
