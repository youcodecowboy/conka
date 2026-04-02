"use client";

import { useRef, useEffect, useCallback } from "react";

/** easeOutCubic: fast start, smooth deceleration */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number counting up from 0 to `target` using requestAnimationFrame.
 * Updates the DOM directly via textContent (no React re-renders during animation).
 * Respects prefers-reduced-motion (shows final value immediately).
 *
 * @returns A ref callback to attach to the element displaying the number.
 */
export function useCountUp(
  target: number,
  isActive: boolean,
  options?: { duration?: number; decimals?: number; prefix?: string; suffix?: string }
): React.RefCallback<HTMLElement> {
  const { duration = 1200, decimals = 0, prefix = "", suffix = "" } = options ?? {};
  const elementRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  const formatValue = useCallback(
    (value: number) => `${prefix}${value.toFixed(decimals)}${suffix}`,
    [prefix, decimals, suffix]
  );

  useEffect(() => {
    if (!isActive || hasAnimatedRef.current || !elementRef.current) return;

    const el = elementRef.current;

    // Reduced motion: set final value immediately
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.textContent = formatValue(target);
      hasAnimatedRef.current = true;
      return;
    }

    hasAnimatedRef.current = true;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = easedProgress * target;

      el.textContent = formatValue(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    // Start from 0
    el.textContent = formatValue(0);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isActive, target, duration, formatValue]);

  const ref = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  return ref;
}
