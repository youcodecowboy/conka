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

  // Parse clinical results into stats (with values like +18%, -56%) and text-only items
  const parsedResults = (() => {
    const stats: { value: string; label: string }[] = [];
    const textOnly: string[] = [];

    study.results.forEach((result) => {
      // Match patterns like "+18%", "-56%", "2x", etc. at start of value
      const statMatch = result.value.match(/^([+\-]?\d+\.?\d*[%x]?)\s*(.*)$/i);

      if (statMatch && result.value.match(/^[+\-]?\d/)) {
        stats.push({
          value: result.value, // e.g. "+18%"
          label: result.metric, // e.g. "Memory Performance"
        });
      } else {
        textOnly.push(`${result.metric}: ${result.value}`);
      }
    });

    return { stats, textOnly };
  })();

  return (
    <div aria-live="polite">
      <div 
        key={struggleId} 
        className="premium-card-soft !bg-white p-8 [animation:fadeIn_0.3s_ease]"
      >
        {/* 1. Struggle statement — small, muted, italic */}
        <p className="premium-body-sm italic opacity-50 mb-2 text-[var(--color-ink)]">
          {solution.struggle}
        </p>

        {/* 2. Outcome headline — large, bold, hero text */}
        <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight text-[var(--color-ink)]">
          {solution.outcome}
        </h3>

        {/* 3. Mechanism (description) — smaller, more muted */}
        <p className="premium-body-sm opacity-60 leading-relaxed mb-6 text-[var(--color-ink)]">
          {solution.description}
        </p>

        {/* Stat tiles grid — only render if there are parsed stats */}
        {parsedResults.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {parsedResults.stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-[20px] p-4"
                style={{
                  background: "var(--color-premium-bg-soft)",
                  border: "1px solid var(--color-premium-stroke)",
                }}
              >
                <p
                  className={`text-3xl font-bold mb-1 ${accentColor.text}`}
                  style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
                >
                  {stat.value}
                </p>
                <p className="premium-body-sm opacity-70 text-[var(--color-ink)] leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 5. Radar chart — keep as-is, add explainer line above */}
        <div className="premium-card-soft p-6 rounded-[20px] mb-6" aria-hidden="true">
          <p className="premium-body-sm opacity-50 uppercase tracking-wider mb-1 text-[var(--color-ink)]">
            Performance impact
          </p>
          <p className="premium-body-sm opacity-70 mb-4 text-[var(--color-ink)]">
            How this benefit impacts your overall cognitive performance
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

        {/* 6. Clinical breakdown — keep entirely as-is */}
        <div
          className="rounded-[20px] overflow-hidden mb-2"
          style={{ border: "1px solid var(--color-premium-stroke)" }}
        >
          {/* Header row */}
          <div
            className="px-5 py-3 space-y-1"
            style={{
              background: "var(--color-premium-bg-soft)",
              borderBottom: "1px solid var(--color-premium-stroke)",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="premium-body-sm uppercase tracking-wider opacity-50 text-[var(--color-ink)]">
                Clinical study
              </p>
              <p className="premium-body-sm opacity-40 text-[var(--color-ink)]">
                {study.year}
              </p>
            </div>
            <p className="premium-body-sm opacity-60 text-[var(--color-ink)]">
              {solution.ingredientAsset?.name} • {solution.ingredientAsset?.dosage}
            </p>
          </div>

          {/* Study details */}
          <div className="px-5 py-4 space-y-2 premium-body-sm text-[var(--color-ink)]">
            <p>
              <span className="opacity-50">Study: </span>
              <span className="opacity-80">{study.name}</span>
            </p>
            <p>
              <span className="opacity-50">Participants: </span>
              <span className="opacity-80">{study.participants.total} ({study.participants.ageRange})</span>
            </p>
            <p>
              <span className="opacity-50">Duration: </span>
              <span className="opacity-80">{study.duration}</span>
            </p>
          </div>

          {/* Results list */}
          {study.results.length > 0 && (
            <div className="px-5 pb-5 text-[var(--color-ink)]">
              <p className="premium-body-sm opacity-50 uppercase tracking-wider mb-3">
                Key findings
              </p>
              <ul className="space-y-2">
                {study.results.map((result, idx) => (
                  <li key={idx} className="flex items-start gap-2 premium-body-sm opacity-80">
                    <span className="opacity-40 shrink-0 mt-0.5">—</span>
                    <span>
                      <span className="font-semibold">{result.metric}:</span> {result.value} ({result.pValue})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
