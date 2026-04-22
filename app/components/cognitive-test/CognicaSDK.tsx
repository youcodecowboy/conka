"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { TestResult, CognicaSDKProps } from "./types";

/**
 * CognicaSDK
 *
 * Iframe wrapper for the Cognetivity WebSDK cognitive assessment.
 * Handles postMessage communication to capture test results.
 */
export default function CognicaSDK({ onComplete, subjectId }: CognicaSDKProps) {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sdkUrl = new URL("https://conkasdkdev.cognetivity.com/");
  sdkUrl.searchParams.set("shortVersion", "true");
  sdkUrl.searchParams.set("websiteExperience", "true");
  if (subjectId) {
    sdkUrl.searchParams.set("subjectId", subjectId);
  }
  sdkUrl.searchParams.set("_cb", Date.now().toString());

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (
          data.type === "cognetivity-test-complete" &&
          data.score !== undefined
        ) {
          const result: TestResult = {
            score: Math.round(data.score),
            accuracy: Math.round(data.accuracy),
            speed: Math.round(data.speed),
            testInstanceId: data.testInstanceId?.toString(),
          };
          console.log("Test completed:", result);
          onComplete(result);
        }
      } catch {
        // Ignore non-JSON or unrelated messages
      }
    },
    [onComplete],
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-white">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 flex items-center justify-center bg-[#1B2757] text-white mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="square"
                strokeLinejoin="miter"
                className="animate-pulse"
              >
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
              </svg>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/45 tabular-nums">
              Initialising assessment
            </p>
            <div className="mt-5 h-px w-32 bg-black/10 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-[#1B2757] animate-pulse" />
            </div>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={sdkUrl.toString()}
        title="Cognitive Assessment"
        className="w-full h-full min-h-[500px]"
        style={{
          border: "none",
          display: "block",
          overflow: "hidden",
        }}
        scrolling="no"
        allow="fullscreen"
        onLoad={handleIframeLoad}
      />
    </div>
  );
}
