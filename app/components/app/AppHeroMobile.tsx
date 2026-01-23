"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { AppInstallButtons } from "@/app/components/AppInstallButtons";

// Screenshot paths in order
const SCREENSHOTS = [
  "/app/1.png",
  "/app/2.png",
  "/app/3.png",
  "/app/4.png",
  "/app/5.png",
];

export function AppHeroMobile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SCREENSHOTS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  }, []);

  // Touch handlers for swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - next
      goToNext();
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [goToNext, goToPrev]);

  return (
    <div className="w-full">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-3">
          Discover How Your Brain Performs Today
        </h1>
        <p className="text-sm mb-4 max-w-lg mx-auto">
          Take the CONKA Cognitive Test to identify strengths and weaknesses,
          then unlock personalised strategies to improve your score.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-md mx-auto mb-4">
        <div
          className="relative w-full overflow-hidden rounded-3xl"
          style={{ minHeight: '400px' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Screenshot Images */}
          <div
            className="flex transition-transform duration-300 ease-out h-full"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {SCREENSHOTS.map((src, index) => (
              <div
                key={src}
                className="relative flex-shrink-0 w-full h-full flex items-center justify-center"
              >
                <div className="relative w-full h-full max-w-sm mx-auto">
                  <Image
                    src={src}
                    alt={`CONKA App screenshot ${index + 1}`}
                    fill
                    className="object-contain rounded-3xl"
                    priority={index === 0}
                    sizes="100vw"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          {SCREENSHOTS.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {SCREENSHOTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "w-3 h-3 bg-white"
                      : "w-2 h-2 bg-white/40"
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Install Buttons */}
      <div className="text-center">
        <AppInstallButtons inverted={true} iconSize={18} buttonClassName="px-6 py-3 text-sm" />
      </div>
    </div>
  );
}

export default AppHeroMobile;
