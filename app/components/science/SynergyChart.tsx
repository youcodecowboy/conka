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

interface SynergyChartProps {
  isMobile?: boolean;
}

export default function SynergyChart({ isMobile = false }: SynergyChartProps) {
  return (
    <section
      className={`${isMobile ? "px-4 py-8" : "px-16 py-16"} bg-current/5`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`${isMobile ? "mb-6" : "mb-10"} text-center`}>
          <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
            Formula Synergy
          </p>
          <h2
            className={`font-bold ${
              isMobile ? "text-2xl" : "text-3xl lg:text-4xl"
            }`}
          >
            Better Together
          </h2>
          <p
            className={`font-commentary opacity-80 mt-2 max-w-xl mx-auto ${
              isMobile ? "text-base" : "text-lg"
            }`}
          >
            See how CONKA Flow and CONKA Clear complement each other across all
            five pillars
          </p>
        </div>

        {/* Chart Container */}
        <div className="neo-box p-4 lg:p-8">
          <div className={`${isMobile ? "h-72" : "h-96"}`}>
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
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="CONKA Clear"
                  dataKey="clarity"
                  stroke="#AAB9BC"
                  fill="#AAB9BC"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Combined Protocol"
                  dataKey="combined"
                  stroke="#000"
                  fill="#000"
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
                    backgroundColor: "var(--background)",
                    border: "2px solid var(--foreground)",
                    borderRadius: 0,
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: 12,
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Explanation */}
          <div
            className={`grid gap-4 mt-6 ${
              isMobile ? "grid-cols-1" : "grid-cols-3"
            }`}
          >
            <div className="flex items-center gap-3 p-3 border-2 border-amber-500/30 rounded">
              <span className="w-4 h-4 bg-amber-500 rounded-sm flex-shrink-0"></span>
              <div>
                <p className="font-bold text-sm">CONKA Flow</p>
                <p className="font-clinical text-xs opacity-70">
                  Adaptogenic foundation for stress resilience
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border-2 border-[#AAB9BC]/30 rounded">
              <span className="w-4 h-4 bg-[#AAB9BC] rounded-sm flex-shrink-0"></span>
              <div>
                <p className="font-bold text-sm">CONKA Clear</p>
                <p className="font-clinical text-xs opacity-70">
                  Nootropic power for peak performance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border-2 border-current/20 rounded">
              <span className="w-4 h-4 bg-black rounded-sm flex-shrink-0"></span>
              <div>
                <p className="font-bold text-sm">Combined Protocol</p>
                <p className="font-clinical text-xs opacity-70">
                  Complete cognitive coverage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
