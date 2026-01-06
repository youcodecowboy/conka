"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the viewport is below the lg breakpoint (1024px)
 * This matches the Navigation component's mobile breakpoint
 * 
 * Returns undefined during SSR/initial render to avoid hydration mismatch,
 * then returns the actual boolean value after client-side hydration.
 */
export function useIsMobile(breakpoint: number = 1024): boolean | undefined {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Check initial state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Run on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;


