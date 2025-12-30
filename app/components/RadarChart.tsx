"use client";

import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

interface RadarChartProps {
  data: { category: string; baseline: number; improved: number }[];
  mainValue: number;
}

export default function RadarChart({ data, mainValue }: RadarChartProps) {
  return (
    <div className="w-full overflow-visible">
      <div className="w-full aspect-square overflow-visible">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart 
            data={data}
            outerRadius="60%"
            margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
          >
          <PolarGrid 
            stroke="currentColor" 
            strokeWidth={1}
            strokeOpacity={0.15}
          />
          <PolarAngleAxis 
            dataKey="category" 
            tick={{ fill: "currentColor", fontSize: 11, fontFamily: "var(--font-ibm-plex-mono)" }}
            className="font-clinical"
            tickLine={false}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 50]} 
            tick={false}
            axisLine={false}
          />
          {/* Baseline (human baseline) */}
          <Radar
            name="Baseline"
            dataKey="baseline"
            stroke="currentColor"
            fill="currentColor"
            fillOpacity={0.05}
            strokeWidth={1}
            strokeDasharray="5 5"
            strokeOpacity={0.4}
          />
          {/* Improved (with Conka) */}
          <Radar
            name="With Conka"
            dataKey="improved"
            stroke="currentColor"
            fill="currentColor"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}

