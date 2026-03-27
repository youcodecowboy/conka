"use client";

import Image from "next/image";
import {
  type FunnelProduct,
  type FunnelCadence,
  FUNNEL_CADENCE_HERO,
  FUNNEL_HERO_IMAGES,
  FUNNEL_PRODUCT_SLIDESHOW,
} from "@/app/lib/funnelData";
import ProductImageSlideshow from "@/app/components/product/ProductImageSlideshow";

interface FunnelHeroAssetProps {
  product: FunnelProduct;
  cadence: FunnelCadence;
  /** "static" = single image per cadence (step 1). "carousel" = product slideshow (step 2). */
  mode: "static" | "carousel";
}

export default function FunnelHeroAsset({
  product,
  cadence,
  mode,
}: FunnelHeroAssetProps) {
  // --- Carousel mode (step 2): product slideshow ---
  if (mode === "carousel") {
    const images = FUNNEL_PRODUCT_SLIDESHOW[product];
    const heroInfo = FUNNEL_HERO_IMAGES[product];

    return (
      <div className="w-full bg-[#FAFAFA] rounded-2xl lg:rounded-none overflow-hidden [&_.mt-3]:hidden lg:[&_.mt-3]:flex">
        {/* Hide thumbnails on mobile to keep sticky hero compact */}
        <ProductImageSlideshow
          images={images}
          alt={heroInfo.alt}
          fullBleedThumbnails
        />
      </div>
    );
  }

  // --- Static mode (step 1): single image per cadence ---
  return (
    <div className="relative w-full aspect-square max-h-[65vw] lg:max-h-none lg:aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-none bg-gray-50">
      {/* Render all cadence images, crossfade on selection */}
      {(Object.keys(FUNNEL_CADENCE_HERO) as FunnelCadence[]).map((key) => {
        const img = FUNNEL_CADENCE_HERO[key];
        return (
          <Image
            key={key}
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover transition-opacity duration-500 ${
              key === cadence ? "opacity-100" : "opacity-0"
            }`}
            priority={key === "monthly-sub"}
          />
        );
      })}

    </div>
  );
}
