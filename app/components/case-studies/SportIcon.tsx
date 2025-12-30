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

    case "tennis":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3c-2.5 3-4 6-4 9s1.5 6 4 9" />
          <path d="M12 3c2.5 3 4 6 4 9s-1.5 6-4 9" />
          <path d="M3 12h18" />
        </svg>
      );

    case "golf":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="18" r="3" />
          <path d="M12 15V3" />
          <path d="M12 3l6 4-6 2" />
        </svg>
      );

    case "running":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="4" r="2" />
          <path d="M4 17l3-3 2.5 2.5L15 11l4 4" />
          <path d="M9 11l-2 6" />
          <path d="M15 11l2 6" />
          <path d="M7 21l2-4" />
          <path d="M17 21l-2-4" />
        </svg>
      );

    case "cycling":
      return (
        <svg {...iconProps}>
          <circle cx="6" cy="17" r="3" />
          <circle cx="18" cy="17" r="3" />
          <path d="M6 17l6-8 3 3 3-6" />
          <path d="M12 9l6 8" />
        </svg>
      );

    case "swimming":
      return (
        <svg {...iconProps}>
          <path d="M2 12c1.5-1.5 3-2 5-2s3.5.5 5 2c1.5-1.5 3-2 5-2s3.5.5 5 2" />
          <path d="M2 17c1.5-1.5 3-2 5-2s3.5.5 5 2c1.5-1.5 3-2 5-2s3.5.5 5 2" />
          <circle cx="12" cy="6" r="2" />
          <path d="M8 10l4-2 4 2" />
        </svg>
      );

    case "boxing":
      return (
        <svg {...iconProps}>
          <path d="M4 8c0-2 1-3 3-3h3c2 0 3 1 3 3v6c0 2-1 3-3 3H7c-2 0-3-1-3-3V8z" />
          <path d="M13 9h4c2 0 3 1 3 3v2c0 2-1 3-3 3h-4" />
          <path d="M7 8v6" />
          <path d="M10 8v6" />
        </svg>
      );

    case "esports":
      return (
        <svg {...iconProps}>
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 12h4" />
          <path d="M8 10v4" />
          <circle cx="17" cy="10" r="1" />
          <circle cx="15" cy="14" r="1" />
          <circle cx="19" cy="14" r="1" />
        </svg>
      );

    case "chess":
      return (
        <svg {...iconProps}>
          <path d="M8 16l1-4h6l1 4" />
          <path d="M12 4v4" />
          <path d="M9 8h6" />
          <path d="M10 12h4" />
          <path d="M6 20h12" />
          <path d="M7 16h10" />
          <circle cx="12" cy="4" r="1" />
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

    case "creative":
      return (
        <svg {...iconProps}>
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
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

