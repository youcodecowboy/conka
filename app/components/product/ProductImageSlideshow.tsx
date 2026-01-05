"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

export interface SlideshowImage {
  src: string;
  focalX?: number; // 0-100, default 50
  focalY?: number; // 0-100, default 50
}

interface ProductImageSlideshowProps {
  images: SlideshowImage[];
  alt: string;
}

export default function ProductImageSlideshow({
  images,
  alt,
}: ProductImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      {/* Image container with cropping - the image is zoomed to focus on the bottle */}
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={`${alt} - view ${index + 1}`}
              fill
              className="object-cover"
              style={{
                objectPosition: `${image.focalX ?? 50}% ${image.focalY ?? 50}%`,
              }}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows - always visible */}
      {images.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full 
                       bg-white/70 hover:bg-white/90 shadow-md
                       transition-all duration-200"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full 
                       bg-white/70 hover:bg-white/90 shadow-md
                       transition-all duration-200"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators - subtle at bottom */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-gray-600 w-3"
                  : "bg-gray-400/50 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

