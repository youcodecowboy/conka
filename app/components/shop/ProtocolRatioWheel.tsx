"use client";

import { useEffect, useState, ReactNode } from "react";

interface ProtocolRatioWheelProps {
  flowPercentage: number;
  clarityPercentage: number;
  size?: "xsmall" | "small" | "medium" | "large";
  isUltimate?: boolean;
  animate?: boolean;
  icon?: ReactNode;
}

const SIZE_CONFIG = {
  xsmall: {
    diameter: 36,
    strokeWidth: 4,
    fontSize: "text-[6px]",
    iconSize: 14,
  },
  small: { diameter: 48, strokeWidth: 6, fontSize: "text-[8px]", iconSize: 18 },
  medium: { diameter: 80, strokeWidth: 8, fontSize: "text-xs", iconSize: 24 },
  large: { diameter: 140, strokeWidth: 12, fontSize: "text-sm", iconSize: 32 },
};

const FLOW_COLOR = "#f59e0b"; // Amber
const CLARITY_COLOR = "#AAB9BC"; // Teal

export default function ProtocolRatioWheel({
  flowPercentage,
  clarityPercentage,
  size = "medium",
  isUltimate = false,
  animate = true,
  icon,
}: ProtocolRatioWheelProps) {
  const [animatedFlow, setAnimatedFlow] = useState(
    animate ? 0 : flowPercentage,
  );
  const config = SIZE_CONFIG[size];
  const radius = (config.diameter - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = config.diameter / 2;

  // Animate on mount/change
  useEffect(() => {
    if (!animate) {
      setAnimatedFlow(flowPercentage);
      return;
    }

    // Reset and animate
    setAnimatedFlow(0);
    const timer = setTimeout(() => {
      setAnimatedFlow(flowPercentage);
    }, 50);

    return () => clearTimeout(timer);
  }, [flowPercentage, animate]);

  // Calculate stroke dasharray for each segment
  const flowDash = (animatedFlow / 100) * circumference;
  const clarityDash = ((100 - animatedFlow) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={config.diameter}
        height={config.diameter}
        viewBox={`0 0 ${config.diameter} ${config.diameter}`}
        className="transform -rotate-90"
        role="img"
        aria-label={`${flowPercentage}% CONKA Flow, ${clarityPercentage}% CONKA Clarity`}
      >
        {/* Background circle (Clarity segment - starts where Flow ends) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={CLARITY_COLOR}
          strokeWidth={config.strokeWidth}
          className="transition-all duration-700 ease-out"
        />

        {/* Flow segment (foreground) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={FLOW_COLOR}
          strokeWidth={config.strokeWidth}
          strokeDasharray={`${flowDash} ${circumference}`}
          strokeLinecap="butt"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isUltimate ? (
          <div className="flex flex-col items-center">
            {/* Crown icon for Ultimate */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={config.iconSize * 0.75}
              height={config.iconSize * 0.75}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {(size === "large" || size === "medium") && (
              <span
                className={`font-clinical ${config.fontSize} mt-0.5 opacity-70`}
              >
                Both daily
              </span>
            )}
          </div>
        ) : (size === "xsmall" || size === "small") && icon ? (
          // Render passed icon for small/xsmall sizes
          <div
            className="flex items-center justify-center opacity-80"
            style={{ width: config.iconSize, height: config.iconSize }}
          >
            <div
              className="[&>svg]:w-full [&>svg]:h-full"
              style={{
                width: config.iconSize * 0.7,
                height: config.iconSize * 0.7,
              }}
            >
              {icon}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {size === "large" && (
              <>
                <span className="font-clinical text-xs opacity-60 mb-0.5">
                  Flow
                </span>
                <span className="font-bold text-lg">{flowPercentage}%</span>
                <span className="font-clinical text-[10px] opacity-50 mt-1">
                  {clarityPercentage}% Clarity
                </span>
              </>
            )}
            {size === "medium" && (
              <span className="font-clinical text-xs font-semibold">
                {flowPercentage}/{clarityPercentage}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend for large size - always show for both standard and Ultimate */}
      {size === "large" && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: FLOW_COLOR }}
            />
            <span className="font-clinical text-[10px]">Flow</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: CLARITY_COLOR }}
            />
            <span className="font-clinical text-[10px]">Clarity</span>
          </div>
        </div>
      )}
    </div>
  );
}
