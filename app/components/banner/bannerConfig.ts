"use client";

import { useMemo, useState, useEffect } from "react";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import type { BannerConfig } from "./types";

const FOUNDING_MEMBER_DEADLINE = new Date("2026-03-31T23:59:59");

/**
 * Founding Member banner configuration
 */
export const foundingMemberConfig: BannerConfig = {
  id: "founding-member",
  enabled: true,
  deadline: FOUNDING_MEMBER_DEADLINE,
  dismissible: true,
  variant: "marquee",
  dismissalKey: "foundingMemberBannerDismissed",
  content: {
    text: "Founding Member • Use code FOUNDING1000 for 20% off any subscription for an entire year • ",
    secondaryText: "492 spots remaining",
    button: {
      text: "Learn More",
      href: "/our-story#founding-members",
    },
    mobileContent: {
      text: "Founding Member • Code: FOUNDING1000 • 20% off subscriptions",
    },
  },
  styling: {
    bgColor: "bg-black",
    textColor: "text-white",
    borderColor: "border-black",
  },
};

/**
 * Hook to get active banner configuration
 * Handles deadline checking and dismissal state
 */
export function useBannerConfig(bannerId: string): BannerConfig | null {
  const isMobile = useIsMobile();
  const [dismissed, setDismissed] = useState(false);

  // Get config based on bannerId
  const config = useMemo(() => {
    if (bannerId === "founding-member") {
      return foundingMemberConfig;
    }
    return null;
  }, [bannerId]);

  // Check if deadline has passed
  const isPastDeadline = useMemo(() => {
    if (!config?.deadline) return false;
    return new Date() > config.deadline;
  }, [config?.deadline]);

  // Check localStorage for dismissal (only on mobile)
  useEffect(() => {
    if (typeof window !== "undefined" && isMobile === true && config?.dismissible) {
      const dismissalKey = config.dismissalKey || `${config.id}BannerDismissed`;
      const wasDismissed = localStorage.getItem(dismissalKey);
      if (wasDismissed === "true") {
        setDismissed(true);
      }
    }
  }, [isMobile, config?.dismissible, config?.dismissalKey, config?.id]);

  // Return null if banner should not be shown
  if (!config || !config.enabled || isPastDeadline || dismissed) {
    return null;
  }

  return config;
}
