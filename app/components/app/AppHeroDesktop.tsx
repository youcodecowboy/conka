"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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

export function AppHeroDesktop() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SCREENSHOTS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  }, []);

  // Auto-scroll to center active image
  useEffect(() => {
    const activeImage = imageRefs.current[currentIndex];
    const container = scrollContainerRef.current;
    if (activeImage && container) {
      const containerRect = container.getBoundingClientRect();
      const imageRect = activeImage.getBoundingClientRect();
      const scrollLeft = activeImage.offsetLeft - containerRect.width / 2 + imageRect.width / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          Discover How Your Brain Performs Today
        </h1>
      </div>

      {/* Carousel Container - Horizontal Scroll View */}
      <div className="relative mb-6 pb-12" style={{ height: '874px' }}>
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-30" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-30" />
        
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-full"
        >
          <div className="flex items-center gap-6 px-8 h-full" style={{ width: 'max-content' }}>
            {SCREENSHOTS.map((src, index) => {
              const distance = Math.abs(index - currentIndex);
              const isActive = index === currentIndex;
              const isVisible = distance <= 2; // Show 2 images on each side

              return (
                <div
                  key={src}
                  ref={(el) => (imageRefs.current[index] = el)}
                  className={`flex-shrink-0 transition-all duration-500 ease-out ${
                    isActive
                      ? "scale-100 opacity-100 z-10"
                      : isVisible
                      ? "scale-75 opacity-60 z-0"
                      : "scale-50 opacity-0 z-0 pointer-events-none"
                  }`}
                  style={{
                    width: isActive ? '403px' : '302px', // 806px / 2 for active, 75% for others
                    height: isActive ? '874px' : '655px', // 1748px / 2 for active, 75% for others
                    cursor: isActive ? 'default' : 'pointer',
                  }}
                  onClick={() => !isActive && setCurrentIndex(index)}
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden">
                    <Image
                      src={src}
                      alt={`CONKA App screenshot ${index + 1}`}
                      fill
                      className="object-contain rounded-3xl"
                      priority={index === 0}
                      sizes="403px"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {SCREENSHOTS.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 z-40"
              aria-label="Previous screenshot"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 z-40"
              aria-label="Next screenshot"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {SCREENSHOTS.length > 1 && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {SCREENSHOTS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "w-3 h-3 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Install Buttons */}
      <div className="text-center">
        <AppInstallButtons inverted={true} />
      </div>
    </div>
  );
}

export default AppHeroDesktop;
