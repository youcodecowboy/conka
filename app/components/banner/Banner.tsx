"use client";

import type { BannerConfig } from "./types";

interface BannerDesktopProps {
  /** Banner configuration */
  config: BannerConfig;
}

function renderTextSegments(
  segments: { text: string; bold?: boolean }[],
  className: string,
) {
  return (
    <span className={`${className} flex items-center`}>
      {segments.map((segment, i) => (
        <span key={i} className={segment.bold ? "font-bold" : ""}>
          {segment.text}
        </span>
      ))}
    </span>
  );
}

export default function BannerDesktop({ config }: BannerDesktopProps) {
  return (
    <div
      className={`w-full ${config.styling.bgColor} ${config.styling.textColor} border-b-2 ${config.styling.borderColor || config.styling.bgColor}`}
    >
      <div className="px-6 md:px-16 py-4 md:py-5 flex items-center min-h-[56px]">
        {config.variant === "marquee" ? (
          <>
            <div className="flex-1 overflow-hidden relative min-w-0">
              <div className="marquee flex items-center gap-4">
                {/* Duplicate content for seamless loop */}
                {renderTextSegments(
                  [
                    ...config.content.text,
                    ...(config.content.secondaryText || []).map((seg) => ({ ...seg, text: ` ${seg.text}` })),
                  ],
                  "font-clinical text-xs md:text-sm whitespace-nowrap text-white"
                )}
                {renderTextSegments(
                  [
                    ...config.content.text,
                    ...(config.content.secondaryText || []).map((seg) => ({ ...seg, text: ` ${seg.text}` })),
                  ],
                  "font-clinical text-xs md:text-sm whitespace-nowrap text-white"
                )}
              </div>
            </div>
            {config.content.button && (
              <a
                href={config.content.button.href}
                onClick={config.content.button.onClick}
                className="ml-6 px-4 py-2 md:px-6 md:py-2.5 font-semibold text-xs md:text-sm whitespace-nowrap border-2 border-white text-white hover:bg-white hover:text-black transition-all rounded-full flex-shrink-0 flex items-center justify-center"
              >
                {config.content.button.text}
              </a>
            )}
          </>
        ) : (
          <>
            <div className="flex-1">
              {renderTextSegments(
                [
                  ...config.content.text,
                  ...(config.content.secondaryText || []).map((seg) => ({ ...seg, text: ` ${seg.text}` })),
                ],
                "font-clinical text-xs md:text-sm"
              )}
            </div>
            {config.content.button && (
              <a
                href={config.content.button.href}
                onClick={config.content.button.onClick}
                className="ml-6 px-4 py-2 md:px-6 md:py-2.5 font-semibold text-xs md:text-sm whitespace-nowrap border-2 border-white text-white hover:bg-white hover:text-black transition-all rounded-full flex-shrink-0 flex items-center justify-center"
              >
                {config.content.button.text}
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}
