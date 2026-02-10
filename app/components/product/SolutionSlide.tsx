"use client";

import { useMemo } from "react";
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import {
  FormulaId,
  StruggleId,
  formulaContent,
  FORMULA_COLORS,
  RadarDataPoint,
} from "@/app/lib/productData";

interface SolutionSlideProps {
  formulaId: FormulaId;
  struggleId: StruggleId;
}

// Mini radar chart for the triple display
// Custom tick component for better label positioning
const CustomTick = ({ 
  x, 
  y, 
  payload, 
  isDark 
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
  dataKey: "before" | "during" | "after";
  label: string;
  color: string;
  isDark: boolean;
}) {
  return (
    <div className="flex flex-col items-center overflow-visible w-full">
      <div className="w-full min-w-[200px] min-h-[200px] aspect-square max-w-[280px] mx-auto overflow-visible">
        <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={200}>
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
                if (typeof props.x === 'number' && typeof props.y === 'number' && props.payload) {
                  return <CustomTick x={props.x} y={props.y} payload={props.payload} isDark={isDark} />;
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
      <p className={`font-clinical text-lg font-semibold -mt-6 ${isDark ? "text-white" : "text-black"}`}>
        {label}
      </p>
      <p className={`font-commentary text-base -mt-1 ${isDark ? "text-white/60" : "text-black/60"}`}>
        {dataKey === "before" && "baseline"}
        {dataKey === "during" && "30 days"}
        {dataKey === "after" && "90 days"}
      </p>
    </div>
  );
}

export default function SolutionSlide({ formulaId, struggleId }: SolutionSlideProps) {
  const formula = formulaContent[formulaId];
  const solution = formula.struggleSolutions[struggleId];
  const accentColor = FORMULA_COLORS[formulaId];
  const isDark = false; // Both formulas use light mode

  // Calculate peak improvement value for display
  const peakImprovement = useMemo(() => {
    const afterValues = solution.radarData.map((d) => d.after);
    return Math.max(...afterValues);
  }, [solution.radarData]);

  return (
    <div
      className={`py-16 px-6 md:px-16 transition-all duration-500 ${
        isDark ? "bg-[#1a1a1a]" : "bg-[#f8f8f8]"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Left: Title and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`font-clinical text-5xl md:text-6xl font-bold ${accentColor.text}`}
              >
                {solution.stat}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">{solution.title}</h3>
            <p className="font-commentary text-lg opacity-70">{solution.statLabel}</p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed">
              {solution.description}
            </p>

            {/* Key Ingredients */}
            <div className="pt-4">
              <p className="font-clinical text-xs uppercase opacity-50 mb-2">
                Key Ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {solution.keyIngredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className={`
                      px-3 py-1 rounded-full font-clinical text-xs
                      ${isDark ? "bg-white/10 text-white" : "bg-black/10 text-black"}
                    `}
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Research Explanation */}
          <div
            className={`neo-box p-6 ${
              isDark ? "bg-white/5 border-white/20" : "bg-white border-black/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg
                className={`w-5 h-5 ${isDark ? "text-white/70" : "text-black/70"}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <p className="font-clinical text-sm uppercase opacity-70">
                The Science
              </p>
            </div>
            <p className="text-sm md:text-base leading-relaxed opacity-90">
              {solution.researchExplanation}
            </p>
          </div>
        </div>

        {/* Triple Radar Charts Section */}
        <div className="mb-12 overflow-visible">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold mb-2">Performance Over Time</h4>
            <p className="font-commentary text-sm opacity-60">
              visualizing improvement across key metrics
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-3 md:gap-4 overflow-visible w-full">
            <MiniRadarChart
              data={solution.radarData}
              dataKey="before"
              label="Before"
              color={isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}
              isDark={isDark}
            />
            <MiniRadarChart
              data={solution.radarData}
              dataKey="during"
              label="During"
              color={accentColor.hex}
              isDark={isDark}
            />
            <MiniRadarChart
              data={solution.radarData}
              dataKey="after"
              label="After"
              color={accentColor.hex}
              isDark={isDark}
            />
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isDark ? "bg-white/30" : "bg-black/30"
                }`}
              />
              <span className="font-clinical text-xs opacity-60">Baseline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${accentColor.bg}`} />
              <span className="font-clinical text-xs opacity-60">With Formula {formulaId}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-lg ${
            isDark ? "bg-white/5" : "bg-black/5"
          }`}
        >
          {solution.clinicalStudy.results.slice(0, 4).map((result, idx) => (
            <div key={idx} className="text-center">
              <p className={`font-clinical text-2xl md:text-3xl font-bold ${accentColor.text}`}>
                {result.value}
              </p>
              <p className="font-clinical text-xs mt-1 opacity-70">{result.metric}</p>
              <p className="font-clinical text-xs opacity-50">{result.pValue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

