"use client";

import type { BannerConfig } from "./types";

interface BannerDesktopProps {
  /** Banner configuration */
  config: BannerConfig;
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
                <span className="font-clinical text-xs md:text-sm whitespace-nowrap">
                  {config.content.text}
                  {config.content.secondaryText && (
                    <span className="font-bold"> {config.content.secondaryText}</span>
                  )}
                </span>
                <span className="font-clinical text-xs md:text-sm whitespace-nowrap">
                  {config.content.text}
                  {config.content.secondaryText && (
                    <span className="font-bold"> {config.content.secondaryText}</span>
                  )}
                </span>
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
              <span className="font-clinical text-xs md:text-sm">
                {config.content.text}
                {config.content.secondaryText && (
                  <span className="font-bold"> {config.content.secondaryText}</span>
                )}
              </span>
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
