"use client";

import Image from "next/image";

interface SlideshowImage {
  src: string;
  alt: string;
  focalX: number;
  focalY: number;
  scale?: number;
}

// Image configuration with focal points for proper centering
// First slideshow: Hero products with tight framing
const heroImages: SlideshowImage[] = [
  {
    src: "/CONKA_20.jpg",
    alt: "Conka Clarity with fresh lemons and walnuts",
    focalX: 50,
    focalY: 58, // Focus on bottle and ingredients
    scale: 1.5, // Zoom in to make the bottle larger
  },
  {
    src: "/CONKA_30.jpg",
    alt: "Conka Flow bottles - 4-pack",
    focalX: 50,
    focalY: 50, // Bottles fill the frame, centered
  },
  {
    src: "/CONKA_16.jpg",
    alt: "Both Conka formulas - Flow and Clarity",
    focalX: 50,
    focalY: 50, // Bottles nicely centered
  },
  {
    src: "/CONKA_17.jpg",
    alt: "Conka Flow 4-pack",
    focalX: 50,
    focalY: 50, // Bottles fill frame nicely
  },
];

// Second slideshow: Product and packaging variety
const packagingImages: SlideshowImage[] = [
  {
    src: "/CONKA_35.jpg",
    alt: "Conka Flow with packaging box",
    focalX: 60,
    focalY: 55, // Focus on bottle and box
  },
  {
    src: "/CONKA_18.jpg",
    alt: "Conka Clarity 4-pack with white caps",
    focalX: 50,
    focalY: 50, // Bottles nicely centered
  },
  {
    src: "/CONKA_40.jpg",
    alt: "Conka Flow and Clarity with boxes",
    focalX: 40,
    focalY: 60, // Focus on bottles in front
  },
  {
    src: "/CONKA_25.jpg",
    alt: "Conka Flow 8-pack",
    focalX: 50,
    focalY: 50, // Multiple bottles, tightly framed
  },
];

interface ProductSlideshowMobileProps {
  variant?: "hero" | "packaging";
}

export default function ProductSlideshowMobile({ variant = "hero" }: ProductSlideshowMobileProps) {
  const images = variant === "hero" ? heroImages : packagingImages;
  
  return (
    <section className="py-6 md:hidden">
      {/* Image Carousel - Edge to Edge */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 h-48 rounded-xl overflow-hidden relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                style={{
                  objectPosition: `${image.focalX}% ${image.focalY}%`,
                  transform: image.scale ? `scale(${image.scale})` : undefined,
                }}
                sizes="288px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
