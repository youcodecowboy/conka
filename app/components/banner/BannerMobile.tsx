"use client";

import { useCallback } from "react";
import type { BannerConfig } from "./types";

interface BannerMobileProps {
  /** Banner configuration */
  config: BannerConfig;
}

export default function BannerMobile({ config }: BannerMobileProps) {
  const handleDismiss = useCallback(() => {
    if (typeof window !== "undefined" && config.dismissible) {
      const dismissalKey = config.dismissalKey || `${config.id}BannerDismissed`;
      localStorage.setItem(dismissalKey, "true");
      // Trigger re-render by reloading or using state management
      // For now, we rely on the parent component to handle this
      window.location.reload();
    }
  }, [config.dismissible, config.dismissalKey, config.id]);

  const mobileContent = config.content.mobileContent || config.content;

  return (
    <div
      className={`fixed top-0 left-0 right-0 ${config.styling.bgColor} ${config.styling.textColor} border-b-2 ${config.styling.borderColor || config.styling.bgColor}`}
    >
      <div className="px-4 py-3 flex items-center min-h-[56px]">
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-clinical text-xs opacity-80">
                {mobileContent.text}
              </span>
            </div>
            {mobileContent.secondaryText && (
              <div className="flex items-baseline gap-2">
                <span className="font-clinical text-xs opacity-80">
                  {mobileContent.secondaryText}
                </span>
              </div>
            )}
            {config.content.button && (
              <a
                href={config.content.button.href}
                onClick={config.content.button.onClick}
                className="inline-block mt-1 text-xs underline opacity-80 hover:opacity-100 transition-opacity"
              >
                {config.content.button.text}
              </a>
            )}
          </div>
          {config.dismissible && (
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity flex items-center justify-center"
              aria-label="Dismiss banner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
