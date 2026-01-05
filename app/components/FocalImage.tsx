"use client";

import Image from "next/image";

interface FocalImageProps {
  src: string;
  alt: string;
  // Focal point coordinates (0-100)
  // 50, 50 = center (default)
  focalX?: number;
  focalY?: number;
  // Container sizing
  className?: string;
  // Optional priority loading
  priority?: boolean;
}

/**
 * FocalImage - An image component with configurable focal point
 * 
 * Uses object-fit: cover with object-position to ensure the focal point
 * (typically the center of the bottle) stays visible regardless of
 * the container's aspect ratio.
 * 
 * @example
 * // Center the image on the bottle which is at 55% from left, 50% from top
 * <FocalImage src="/CONKA_04.jpg" alt="Product" focalX={55} focalY={50} />
 */
export default function FocalImage({
  src,
  alt,
  focalX = 50,
  focalY = 50,
  className = "",
  priority = false,
}: FocalImageProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{
          objectPosition: `${focalX}% ${focalY}%`,
        }}
        priority={priority}
      />
    </div>
  );
}

