"use client";

import Image from "next/image";
import { type FunnelProduct, FUNNEL_HERO_IMAGES } from "@/app/lib/funnelData";

interface FunnelHeroAssetProps {
  product: FunnelProduct;
}

export default function FunnelHeroAsset({ product }: FunnelHeroAssetProps) {
  const heroImage = FUNNEL_HERO_IMAGES[product];

  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-2xl lg:rounded-[var(--premium-radius-card)] bg-gray-50">
      {/* Render all three images, crossfade by toggling opacity */}
      {(Object.keys(FUNNEL_HERO_IMAGES) as FunnelProduct[]).map((key) => {
        const img = FUNNEL_HERO_IMAGES[key];
        return (
          <Image
            key={key}
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover transition-opacity duration-500 ${
              key === product ? "opacity-100" : "opacity-0"
            }`}
            priority={key === "both"}
          />
        );
      })}

      {/* Product label overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-[var(--color-ink)]">
          {heroImage.alt.split("—")[0].trim()}
        </span>
      </div>
    </div>
  );
}
