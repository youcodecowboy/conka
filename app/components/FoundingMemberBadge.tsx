"use client";

import { useEffect, useState } from "react";

const FOUNDING_MEMBER_DEADLINE = new Date("2026-03-31T23:59:59");

interface FoundingMemberBadgeProps {
  /** Badge size variant */
  size?: "sm" | "md" | "lg";
  /** Position variant */
  position?: "inline" | "absolute";
}

export default function FoundingMemberBadge({
  size = "sm",
  position = "inline",
}: FoundingMemberBadgeProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (new Date() > FOUNDING_MEMBER_DEADLINE) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  const positionClasses = {
    inline: "",
    absolute: "absolute top-2 right-2",
  };

  return (
    <span
      className={`${sizeClasses[size]} ${positionClasses[position]} bg-teal-500 text-white font-clinical font-medium rounded-lg z-10`}
    >
      Founding Member £50
    </span>
  );
}
