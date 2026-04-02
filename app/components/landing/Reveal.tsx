"use client";

import { useInView } from "@/app/hooks/useInView";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  variant?: "default" | "fade" | "scale";
}

/**
 * Thin wrapper that fades content in when it scrolls into view.
 * Uses GPU-composited transform + opacity only.
 * For sections that animate as a single block (no internal staggering).
 * Components that need card-level stagger should use useInView directly.
 */
export default function Reveal({
  children,
  className = "",
  stagger,
  variant = "default",
}: RevealProps) {
  const [ref, isInView] = useInView();

  const baseClass =
    variant === "fade"
      ? "reveal-fade"
      : variant === "scale"
        ? "reveal-scale"
        : "reveal";

  return (
    <div
      ref={ref}
      className={`${baseClass} ${isInView ? "revealed" : ""} ${className}`}
      {...(stagger !== undefined ? { "data-stagger": stagger } : {})}
    >
      {children}
    </div>
  );
}
