"use client";

import Image from "next/image";

// Image configuration with focal points for proper centering
const slideshowImages = [
  {
    src: "/CONKA_19.jpg",
    alt: "Conka Flow with natural ingredients",
    focalX: 50,
    focalY: 60, // Focus lower where the bottle and ingredients are
  },
  {
    src: "/CONKA_16.jpg",
    alt: "Both Conka formulas",
    focalX: 50,
    focalY: 55, // Center on the bottles
  },
  {
    src: "/CONKA_22.jpg",
    alt: "Conka product packaging",
    focalX: 50,
    focalY: 65, // Focus on bottles at bottom
  },
];

export default function ProductSlideshowMobile() {
  return (
    <section className="py-6 md:hidden">
      {/* Image Carousel - Edge to Edge */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4">
          {slideshowImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                style={{
                  objectPosition: `${image.focalX}% ${image.focalY}%`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
