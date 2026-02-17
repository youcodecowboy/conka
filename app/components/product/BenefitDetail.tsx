"use client";

import {
  FormulaId,
  StruggleId,
  formulaContent,
  FORMULA_COLORS,
  RadarDataPoint,
} from "@/app/lib/productData";
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface BenefitDetailProps {
  formulaId: FormulaId;
  struggleId: StruggleId;
}

// Custom tick component for better label positioning
const CustomTick = ({
  x,
  y,
  payload,
  isDark,
}: {
  x: number;
  y: number;
  payload: { value: string };
  isDark: boolean;
}) => {
  // Shorten labels for better fit
  const shortLabels: Record<string, string> = {
    "Concentration": "Focus",
    "Processing Speed": "Speed",
    "Attention Span": "Attention",
    "Mental Clarity": "Clarity",
    "Working Memory": "Memory",
    "Task Switching": "Switching",
    "Sleep Quality": "Sleep",
    "REM Duration": "REM",
    "Sleep Onset": "Onset",
    "Night Waking": "Waking",
    "Morning Energy": "Morning",
    "Recovery": "Recovery",
    "Energy Levels": "Energy",
    "Endurance": "Endurance",
    "Motivation": "Motivation",
    "Stamina": "Stamina",
    "Vitality": "Vitality",
    "Energy Stability": "Stability",
    "Afternoon Focus": "Afternoon",
    "Blood Sugar": "Sugar",
    "Cortisol Balance": "Cortisol",
    "Mood Stability": "Mood",
    "Stress Response": "Stress",
    "Cortisol Levels": "Cortisol",
    "Resilience": "Resilience",
    "Calm Focus": "Calm",
    "Recovery Speed": "Recovery",
    "Emotional Balance": "Emotion",
    "Calm State": "Calm",
    "Social Ease": "Social",
    "Physical Calm": "Physical",
    "Focus Intensity": "Intensity",
    "Reaction Time": "Reaction",
    "Neural Speed": "Neural",
    "Mental Acuity": "Acuity",
  };

  const shortLabel = shortLabels[payload.value] || payload.value;

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"}
      fontSize={11}
      fontFamily="var(--font-ibm-plex-mono)"
    >
      {shortLabel}
    </text>
  );
};

function MiniRadarChart({
  data,
  dataKey,
  label,
  color,
  isDark,
}: {
  data: RadarDataPoint[];
  dataKey: "before" | "after";
  label: string;
  color: string;
  isDark: boolean;
}) {
  return (
    <div className="flex flex-col items-center overflow-visible w-full" aria-hidden="true">
      <div className="w-full min-w-[180px] min-h-[180px] aspect-square max-w-[280px] mx-auto overflow-visible">
        <ResponsiveContainer width="100%" height="100%" minWidth={180} minHeight={180}>
          <RechartsRadarChart
            data={data}
            outerRadius="60%"
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <PolarGrid
              stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}
              strokeWidth={1}
            />
            <PolarAngleAxis
              dataKey="category"
              tick={(props: any) => {
                if (
                  typeof props.x === "number" &&
                  typeof props.y === "number" &&
                  props.payload
                ) {
                  return (
                    <CustomTick
                      x={props.x}
                      y={props.y}
                      payload={props.payload}
                      isDark={isDark}
                    />
                  );
                }
                return <g />;
              }}
              tickLine={false}
            />
            <PolarRadiusAxis angle={90} domain={[0, 50]} tick={false} axisLine={false} />
            <Radar
              name={label}
              dataKey={dataKey}
              stroke={color}
              fill={color}
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
      <p
        className={`font-clinical text-lg font-semibold -mt-6 ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {label}
      </p>
      <p className={`font-commentary text-base -mt-1 ${isDark ? "text-white/60" : "text-black/60"}`}>
        {dataKey === "before" && "baseline"}
        {dataKey === "after" && "90 days"}
      </p>
    </div>
  );
}

export default function BenefitDetail({
  formulaId,
  struggleId,
}: BenefitDetailProps) {
  const formula = formulaContent[formulaId];
  const solution = formula.struggleSolutions[struggleId];
  const accentColor = FORMULA_COLORS[formulaId];
  const study = solution.clinicalStudy;
  const isDark = false; // Both formulas use light mode

  // Get first result for display
  const firstResult = study.results[0];

  return (
    <div aria-live="polite">
      <div 
        key={struggleId} 
        className="premium-card-soft p-8 rounded-[var(--premium-radius-card)] bg-white [animation:fadeIn_0.3s_ease]"
      >
        {/* Struggle question */}
        <p className="premium-body-sm opacity-50 uppercase tracking-wider mb-2">
          {solution.question}
        </p>

        {/* Stat + label */}
        <div className="flex items-baseline gap-3 mb-4">
          <span
            className={`text-6xl lg:text-7xl font-bold tracking-tight ${accentColor.text}`}
          >
            {solution.stat}
          </span>
          <span className="premium-body-sm opacity-60">{solution.statLabel}</span>
        </div>

        {/* Outcome description */}
        <p className="premium-body opacity-80 leading-relaxed mb-6">
          {solution.description}
        </p>

        {/* Radar charts - 2 only (Before + After) */}
        <div className="premium-card-soft p-6 rounded-[20px] mb-6">
          <p className="premium-body-sm opacity-50 mb-4 uppercase tracking-wider">
            Performance over time
          </p>
          <div className="grid grid-cols-2 gap-4">
            <MiniRadarChart
              data={solution.radarData}
              dataKey="before"
              label="Baseline"
              color={isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}
              isDark={isDark}
            />
            <MiniRadarChart
              data={solution.radarData}
              dataKey="after"
              label="90 days"
              color={accentColor.hex}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Single result row */}
        {firstResult && (
          <div
            className="flex items-center justify-between px-5 py-4 rounded-[20px] mb-6"
            style={{
              background: "var(--color-premium-bg-soft)",
              border: "1px solid var(--color-premium-stroke)",
            }}
          >
            <div>
              <p className="premium-body font-semibold">{firstResult.metric}</p>
              <p className="premium-body-sm opacity-50">{firstResult.description}</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${accentColor.text}`}>{firstResult.value}</p>
              <p className="premium-body-sm opacity-40">{firstResult.pValue}</p>
            </div>
          </div>
        )}

        {/* Study footnote */}
        <p className="premium-body-sm opacity-40">
          {study.name} — {study.university}, {study.year}
        </p>
      </div>
    </div>
  );
}
