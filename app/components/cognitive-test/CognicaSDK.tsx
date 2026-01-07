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

  // Build SDK URL with query parameters
  const sdkUrl = new URL("https://conkasdkdev.cognetivity.com/");
  sdkUrl.searchParams.set("shortVersion", "true");
  sdkUrl.searchParams.set("websiteExperience", "true"); // Required for postMessage to work in web iframe
  if (subjectId) {
    sdkUrl.searchParams.set("subjectId", subjectId);
  }
  // Cache bust to force fresh SDK load
  sdkUrl.searchParams.set("_cb", Date.now().toString());

  // Memoize the message handler to avoid recreating on each render
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      try {
        // Parse the message data (could be string or object)
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        // Check if this is a test completion event with the correct type and score data
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
        // Not a JSON message or not our event, ignore silently
      }
    },
    [onComplete],
  );

  // Set up postMessage listener
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)] z-10">
          <div className="text-center">
            {/* Pulsing brain icon */}
            <div className="w-16 h-16 mx-auto mb-4 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
              >
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
              </svg>
            </div>
            <p className="font-clinical text-sm opacity-50">
              Loading assessment...
            </p>
          </div>
        </div>
      )}

      {/* SDK Iframe */}
      <iframe
        ref={iframeRef}
        src={sdkUrl.toString()}
        title="Cognitive Assessment"
        className="w-full flex-1 min-h-[620px]"
        style={{ border: "none" }}
        allow="fullscreen"
        onLoad={handleIframeLoad}
      />
    </div>
  );
}
