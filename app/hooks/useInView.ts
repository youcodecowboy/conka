"use client";

import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Scroll-triggered visibility hook using IntersectionObserver.
 * Returns [refCallback, isInView]. Fires once by default.
 * Respects prefers-reduced-motion (shows content immediately).
 * Only uses transform + opacity animations (GPU composited).
 */
export function useInView(
  options?: { threshold?: number; triggerOnce?: boolean }
): [React.RefCallback<Element>, boolean] {
  const { threshold = 0.15, triggerOnce = true } = options ?? {};
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const reducedMotionRef = useRef(false);

  const ref = useCallback(
    (node: Element | null) => {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      // Check reduced motion on first attach (client-side only)
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        reducedMotionRef.current = true;
        setIsInView(true);
        return;
      }

      if (reducedMotionRef.current || isInView) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (triggerOnce && observerRef.current) {
              observerRef.current.disconnect();
              observerRef.current = null;
            }
          }
        },
        { threshold }
      );

      observerRef.current.observe(node);
    },
    [threshold, triggerOnce, isInView]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [ref, isInView];
}
