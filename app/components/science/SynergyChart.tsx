"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formulaStrengths } from "@/app/lib/scienceData";
import { FORMULA_COLORS } from "@/app/lib/productColors";

// Product accent colours: Flow, Clear. Protocol = neuro blue (--color-neuro-blue-end)
const FLOW_COLOR = FORMULA_COLORS["01"].hex; // #f59e0b
const CLEAR_COLOR = FORMULA_COLORS["02"].hex; // #94b9ff
const PROTOCOL_COLOR = "#4058bb"; // var(--color-neuro-blue-end)

interface SynergyChartProps {
  isMobile?: boolean;
}

export default function SynergyChart({ isMobile = false }: SynergyChartProps) {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div className="text-center">
        <p className="premium-body-sm uppercase tracking-widest opacity-50 mb-2">
          Formula Synergy
        </p>
        <h2
          className={`premium-section-heading font-bold ${
            isMobile ? "text-2xl" : "text-3xl lg:text-4xl"
          }`}
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Better Together
        </h2>
        <p
          className="premium-section-subtitle opacity-80 mt-2 max-w-xl mx-auto"
          style={{ maxWidth: "var(--premium-body-max-width)" }}
        >
          See how CONKA Flow and CONKA Clear complement each other across all
          five pillars
        </p>
      </div>

      <div
        className="premium-card-soft premium-card-soft-stroke p-4 lg:p-8"
        style={{ borderRadius: "var(--premium-radius-card)" }}
      >
        <div className={isMobile ? "h-72" : "h-96"}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={formulaStrengths}
              margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            >
              <PolarGrid stroke="currentColor" strokeOpacity={0.2} />
              <PolarAngleAxis
                dataKey="pillar"
                tick={{
                  fill: "currentColor",
                  fontSize: isMobile ? 10 : 12,
                  fontFamily: "var(--font-ibm-plex-mono)",
                }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{
                  fill: "currentColor",
                  fontSize: 10,
                  fontFamily: "var(--font-ibm-plex-mono)",
                }}
                tickCount={5}
              />
              <Radar
                name="CONKA Flow"
                dataKey="flow"
                stroke={FLOW_COLOR}
                fill={FLOW_COLOR}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="CONKA Clear"
                dataKey="clarity"
                stroke={CLEAR_COLOR}
                fill={CLEAR_COLOR}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Combined Protocol"
                dataKey="combined"
                stroke={PROTOCOL_COLOR}
                fill={PROTOCOL_COLOR}
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="4 4"
              />
              <Legend
                wrapperStyle={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: isMobile ? 10 : 12,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-premium-bg-soft)",
                  border: "1px solid var(--color-premium-stroke)",
                  borderRadius: "var(--premium-radius-nested)",
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: 12,
                }}
                formatter={(value: number) => [`${value}%`, ""]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`grid gap-4 mt-6 ${
            isMobile ? "grid-cols-1" : "grid-cols-3"
          }`}
        >
          <div
            className="flex items-center gap-3 p-3 rounded-[var(--premium-radius-nested)] border"
            style={{
              borderColor: "rgba(245, 158, 11, 0.4)",
            }}
          >
            <span
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: FLOW_COLOR }}
            />
            <div>
              <p className="font-bold text-sm">CONKA Flow</p>
              <p className="premium-body-sm opacity-70">
                Adaptogenic foundation for stress resilience
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-3 p-3 rounded-[var(--premium-radius-nested)] border"
            style={{ borderColor: "rgba(148, 185, 255, 0.5)" }}
          >
            <span
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: CLEAR_COLOR }}
            />
            <div>
              <p className="font-bold text-sm">CONKA Clear</p>
              <p className="premium-body-sm opacity-70">
                Nootropic power for peak performance
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-3 p-3 rounded-[var(--premium-radius-nested)] border border-[var(--color-premium-stroke)]"
          >
            <span
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: PROTOCOL_COLOR }}
            />
            <div>
              <p className="font-bold text-sm">Combined Protocol</p>
              <p className="premium-body-sm opacity-70">
                Complete cognitive coverage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
