"use client";

import { useCallback } from "react";
import type { BannerConfig } from "./types";

interface BannerMobileProps {
  /** Banner configuration */
  config: BannerConfig;
}

function renderTextSegments(
  segments: { text: string; bold?: boolean }[],
  className: string,
) {
  return (
    <span className={className}>
      {segments.map((segment, i) => (
        <span key={i} className={segment.bold ? "font-bold" : ""}>
          {segment.text}
        </span>
      ))}
    </span>
  );
}

export default function BannerMobile({ config }: BannerMobileProps) {
  const handleDismiss = useCallback(() => {
    if (typeof window !== "undefined" && config.dismissible) {
      const dismissalKey = config.dismissalKey || `${config.id}BannerDismissed`;
      localStorage.setItem(dismissalKey, "true");
      window.location.reload();
    }
  }, [config.dismissible, config.dismissalKey, config.id]);

  const mobileContent = config.content.mobileContent || config.content;
  const mobileSecondaryText =
    mobileContent.secondaryText || config.content.secondaryText;

  return (
    <div
      className={`w-full ${config.styling.bgColor} ${config.styling.textColor} border-b-2 ${config.styling.borderColor || config.styling.bgColor}`}
    >
      <div className="px-4 py-4 flex items-center min-h-[56px]">
        {config.variant === "marquee" ? (
          <>
            <div className="flex-1 overflow-hidden relative min-w-0">
              <div className="marquee flex items-center gap-4">
                {/* Duplicate content for seamless loop */}
                {renderTextSegments(
                  [
                    ...mobileContent.text,
                    ...(mobileSecondaryText || []).map((seg) => ({
                      ...seg,
                      text: ` • ${seg.text}`,
                    })),
                  ],
                  "font-clinical text-xs whitespace-nowrap text-white",
                )}
                {renderTextSegments(
                  [
                    ...mobileContent.text,
                    ...(mobileSecondaryText || []).map((seg) => ({
                      ...seg,
                      text: ` • ${seg.text}`,
                    })),
                  ],
                  "font-clinical text-xs whitespace-nowrap text-white",
                )}
              </div>
            </div>
            {config.content.button && (
              <a
                href={config.content.button.href}
                onClick={config.content.button.onClick}
                className="ml-4 px-3 py-1.5 font-semibold text-xs whitespace-nowrap border-2 border-white text-white hover:bg-white hover:text-black transition-all rounded-full flex-shrink-0 flex items-center justify-center"
              >
                {config.content.button.text}
              </a>
            )}
            {config.dismissible && (
              <button
                onClick={handleDismiss}
                className="ml-2 flex-shrink-0 p-1 hover:opacity-70 transition-opacity flex items-center justify-center"
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
          </>
        ) : (
          <>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-2 flex-wrap">
                {renderTextSegments(
                  mobileContent.text,
                  "font-clinical text-xs text-white",
                )}
              </div>
              {mobileSecondaryText && (
                <div className="flex items-center gap-2 mt-0.5">
                  {renderTextSegments(
                    mobileSecondaryText,
                    "font-clinical text-xs text-white opacity-80",
                  )}
                </div>
              )}
              {config.content.button && (
                <a
                  href={config.content.button.href}
                  onClick={config.content.button.onClick}
                  className="inline-block mt-1 text-xs underline text-white opacity-80 hover:opacity-100 transition-opacity"
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
          </>
        )}
      </div>
    </div>
  );
}
