"use client";

import { SportCategory } from "@/app/lib/caseStudiesData";

interface SportIconProps {
  sport: SportCategory;
  size?: number;
  className?: string;
}

export default function SportIcon({ sport, size = 24, className = "" }: SportIconProps) {
  const iconProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (sport) {
    case "rugby":
    case "rugby7s":
      return (
        <svg {...iconProps}>
          {/* Rugby ball shape */}
          <ellipse cx="12" cy="12" rx="10" ry="6" />
          <path d="M12 6v12" />
          <path d="M7 9l10 6" />
          <path d="M7 15l10-6" />
        </svg>
      );

    case "football":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20" />
          <path d="M12 2v20" />
          <path d="M2 12h20" />
          <path d="M4.93 4.93l14.14 14.14" />
          <path d="M19.07 4.93L4.93 19.07" />
        </svg>
      );

    case "motorsport":
      return (
        <svg {...iconProps}>
          {/* Racing helmet / steering wheel shape */}
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v6" />
          <path d="M12 15v6" />
          <path d="M3 12h6" />
          <path d="M15 12h6" />
        </svg>
      );

    case "business":
      return (
        <svg {...iconProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <path d="M6 11h.01" />
          <path d="M18 11h.01" />
          <path d="M12 11h.01" />
          <path d="M6 15h.01" />
          <path d="M18 15h.01" />
          <path d="M12 15h.01" />
        </svg>
      );

    case "other":
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
  }
}
