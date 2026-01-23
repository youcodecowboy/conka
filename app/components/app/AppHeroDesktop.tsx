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

// Fixed dimensions - all images maintain same size to prevent layout shifts
const ACTIVE_WIDTH = 300;
const ACTIVE_HEIGHT = 650;
const INACTIVE_SCALE = 0.75; // 75% scale for inactive images

export function AppHeroDesktop() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingProgrammatically = useRef(false);
  const hasInitialized = useRef(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SCREENSHOTS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  }, []);

  // Find which image is closest to center
  const findCenteredImage = useCallback((): number => {
    const container = scrollContainerRef.current;
    if (!container) return 0;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    imageRefs.current.forEach((image, index) => {
      if (!image) return;
      const imageRect = image.getBoundingClientRect();
      const imageCenter = imageRect.left + imageRect.width / 2;
      const distance = Math.abs(containerCenter - imageCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

  // Handle scroll to detect centered image
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return;

      const centeredIndex = findCenteredImage();
      if (centeredIndex !== currentIndex) {
        setCurrentIndex(centeredIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, findCenteredImage]);

  // Auto-scroll to center active image
  useEffect(() => {
    const activeImage = imageRefs.current[currentIndex];
    const container = scrollContainerRef.current;
    if (activeImage && container) {
      isScrollingProgrammatically.current = true;
      
      // Calculate scroll position to center the active image
      // The center point is fixed at the center of the viewport
      const containerWidth = container.clientWidth;
      const containerCenter = containerWidth / 2;
      
      // Get the image's position relative to the scroll container's content
      const imageLeft = activeImage.offsetLeft;
      const imageWidth = activeImage.offsetWidth;
      const imageCenter = imageLeft + (imageWidth / 2);
      
      // Calculate scroll position to center the image
      const scrollLeft = imageCenter - containerCenter;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });

      // Reset flag after scroll completes
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 500);
    }
  }, [currentIndex]);

  // Center first image on mount
  useEffect(() => {
    if (hasInitialized.current) return;

    const centerFirstImage = () => {
      const container = scrollContainerRef.current;
      const firstImage = imageRefs.current[0];
      
      if (container && firstImage && firstImage.offsetWidth > 0) {
        isScrollingProgrammatically.current = true;
        
        // Calculate center point - fixed at viewport center
        const containerWidth = container.clientWidth;
        const containerCenter = containerWidth / 2;
        
        // Get first image position
        const imageLeft = firstImage.offsetLeft;
        const imageWidth = firstImage.offsetWidth;
        const imageCenter = imageLeft + (imageWidth / 2);
        
        // Calculate scroll to center the image
        const scrollLeft = imageCenter - containerCenter;
        
        // Use scrollTo with instant behavior for initial positioning
        container.scrollTo({
          left: scrollLeft,
          behavior: 'auto',
        });

        setTimeout(() => {
          isScrollingProgrammatically.current = false;
          hasInitialized.current = true;
        }, 100);
        return true;
      }
      return false;
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      if (!centerFirstImage()) {
        setTimeout(() => {
          if (!centerFirstImage()) {
            setTimeout(centerFirstImage, 500);
          }
        }, 200);
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

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
      <div className="relative mb-6">
        <div 
          className="relative" 
          style={{ 
            height: `${ACTIVE_HEIGHT}px`,
            minHeight: `${ACTIVE_HEIGHT}px`,
            maxHeight: `${ACTIVE_HEIGHT}px`,
          }}
        >
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-30" />
          
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-30" />
          
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-full"
            style={{ height: `${ACTIVE_HEIGHT}px` }}
          >
            <div 
              className="flex items-center gap-6 px-8 h-full" 
              style={{ 
                width: 'max-content',
                height: `${ACTIVE_HEIGHT}px`,
                alignItems: 'center',
              }}
            >
              {SCREENSHOTS.map((src, index) => {
                const distance = Math.abs(index - currentIndex);
                const isActive = index === currentIndex;
                const isVisible = distance <= 2; // Show 2 images on each side

                // Calculate actual dimensions - active uses full size, inactive uses scaled size
                const width = isActive ? ACTIVE_WIDTH : ACTIVE_WIDTH * INACTIVE_SCALE;
                const height = isActive ? ACTIVE_HEIGHT : ACTIVE_HEIGHT * INACTIVE_SCALE;
                
                return (
                  <div
                    key={src}
                    ref={(el) => { imageRefs.current[index] = el; }}
                    className={`flex-shrink-0 transition-all duration-500 ease-out ${
                      isActive
                        ? "opacity-100 z-10"
                        : isVisible
                        ? "opacity-60 z-0"
                        : "opacity-0 z-0 pointer-events-none"
                    }`}
                    style={{
                      // Actual dimensions change based on active state
                      width: `${width}px`,
                      height: `${height}px`,
                      cursor: isActive ? 'default' : 'pointer',
                    }}
                    onClick={() => !isActive && setCurrentIndex(index)}
                  >
                    <div 
                      className="relative w-full h-full rounded-3xl overflow-hidden"
                      style={{
                        width: `${width}px`,
                        height: `${height}px`,
                      }}
                    >
                      <Image
                        src={src}
                        alt={`CONKA App screenshot ${index + 1}`}
                        fill
                        className="object-contain rounded-3xl"
                        priority={index === 0}
                        loading={index === 0 ? undefined : "lazy"}
                        sizes={`${width}px`}
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
        </div>

        {/* Dot Indicators - moved outside container to avoid overlap */}
        {SCREENSHOTS.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
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
