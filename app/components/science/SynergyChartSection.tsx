"use client";

import SynergyChart from "./SynergyChart";

interface SynergyChartSectionProps {
  isMobile: boolean;
}

export default function SynergyChartSection({
  isMobile,
}: SynergyChartSectionProps) {
  return (
    <section
      className="premium-section-luxury"
      style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
      aria-label="Formula synergy"
    >
      <div className="premium-track">
        <SynergyChart isMobile={isMobile} />
      </div>
    </section>
  );
}
