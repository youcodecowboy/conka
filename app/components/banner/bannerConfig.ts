"use client";

import { useMemo } from "react";
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
    text: [
      { text: "Founding Member • Use code " },
      { text: "FOUNDING1000", bold: true },
      { text: " for 20% off any subscription for an entire year • " },
    ],
    secondaryText: [{ text: "492 spots remaining", bold: true }],
    button: {
      text: "Learn More",
      href: "/our-story#founding-members",
    },
    mobileContent: {
      text: [
        { text: "Founding Member • Code: " },
        { text: "FOUNDING1000", bold: true },
        { text: " • 20% off subscriptions" },
      ],
      secondaryText: [{ text: "492 spots remaining", bold: true }],
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
 * Handles deadline checking
 */
export function useBannerConfig(bannerId: string): BannerConfig | null {
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

  // Return null if banner should not be shown
  if (!config || !config.enabled || isPastDeadline) {
    return null;
  }

  return config;
}
