"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { BannerConfig } from "./types";

const FOUNDING_MEMBER_DEADLINE = new Date("2026-03-31T23:59:59");

/**
 * Hook to get active banner configuration
 * Handles deadline checking and fetches dynamic data from Convex
 */
export function useBannerConfig(bannerId: string): BannerConfig | null {
  // Fetch spots remaining from Convex
  const counter = useQuery(api.foundingMemberCounter.getCounter);
  const spotsRemaining = counter?.spotsRemaining ?? 492; // Fallback to 492

  // Get config based on bannerId
  const config = useMemo(() => {
    if (bannerId === "founding-member") {
      return {
        id: "founding-member",
        enabled: true,
        deadline: FOUNDING_MEMBER_DEADLINE,
        dismissible: true,
        variant: "marquee" as const,
        dismissalKey: "foundingMemberBannerDismissed",
        content: {
          text: [
            { text: "Founding Member • Use code " },
            { text: "FOUNDING1000", bold: true, isCode: true },
            { text: " for 20% off any subscription for an entire year • " },
          ],
          secondaryText: [
            { text: `${spotsRemaining} spots remaining`, bold: true },
          ],
          button: {
            text: "Copy Code",
            copyText: "FOUNDING1000",
          },
          mobileContent: {
            text: [
              { text: "Founding Member • Use code " },
              { text: "FOUNDING1000", bold: true, isCode: true },
              { text: " for 20% off subscriptions for an entire year • " },
            ],
            secondaryText: [
              { text: `${spotsRemaining} spots remaining`, bold: true },
            ],
          },
        },
        styling: {
          bgColor: "bg-black",
          textColor: "text-white",
          borderColor: "border-black",
        },
      } as BannerConfig;
    }
    return null;
  }, [bannerId, spotsRemaining]);

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
