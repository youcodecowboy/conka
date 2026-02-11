"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import {
  ProtocolHero,
  ProtocolHeroMobile,
  ProtocolPDPSections,
} from "@/app/components/protocol";
import {
  StickyPurchaseFooter,
  StickyPurchaseFooterMobile,
} from "@/app/components/product";
import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
} from "@/app/lib/productData";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useCart } from "@/app/context/CartContext";
import { getProtocolVariantId } from "@/app/lib/shopifyProductMapping";
import { getAddToCartSource, getQuizSessionId } from "@/app/lib/analytics";
import { trackMetaViewContent, toContentId } from "@/app/lib/metaPixel";

// Valid protocol IDs
const validProtocolIds: ProtocolId[] = ["1", "2", "3", "4"];

export default function ProtocolPage() {
  const params = useParams();
  const router = useRouter();
  const protocolId = params.id as string;
  const isMobile = useIsMobile();
  const { addToCart } = useCart();

  const [selectedTier, setSelectedTier] = useState<ProtocolTier>("pro");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");

  // Validate protocol ID
  useEffect(() => {
    if (!validProtocolIds.includes(protocolId as ProtocolId)) {
      router.push("/protocol/1"); // Redirect to default protocol
    }
  }, [protocolId, router]);

  // Get protocol data
  const protocol = protocolContent[protocolId as ProtocolId];

  // Set default tier based on protocol (Protocol 4 doesn't have starter)
  useEffect(() => {
    if (protocolId === "4" && selectedTier === "starter") {
      setSelectedTier("pro");
    }
  }, [protocolId, selectedTier]);

  if (!protocol) {
    return null; // Will redirect
  }

  // Meta ViewContent (once per page view)
  useEffect(() => {
    if (!validProtocolIds.includes(protocolId as ProtocolId)) return;
    const variantData = getProtocolVariantId(
      protocolId as ProtocolId,
      "pro",
      "subscription"
    );
    if (variantData?.variantId) {
      trackMetaViewContent({
        content_ids: [toContentId(variantData.variantId)],
        content_name: protocol.name,
        content_type: "product",
      });
    }
  }, [protocolId]);

  // Hero section handler
  const handleAddToCartFromHero = async () => {
    const variantData = getProtocolVariantId(
      protocolId as ProtocolId,
      selectedTier,
      purchaseType,
    );
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId, {
        location: "hero",
        source: getAddToCartSource(),
        sessionId: getQuizSessionId(),
      });
    } else {
      console.warn("Variant ID not configured for:", {
        protocol: protocolId,
        tier: selectedTier,
        type: purchaseType,
      });
    }
  };

  // Sticky footer handler
  const handleAddToCartFromFooter = async () => {
    const variantData = getProtocolVariantId(
      protocolId as ProtocolId,
      selectedTier,
      purchaseType,
    );
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId, {
        location: "sticky_footer",
        source: getAddToCartSource(),
        sessionId: getQuizSessionId(),
      });
    } else {
      console.warn("Variant ID not configured for:", {
        protocol: protocolId,
        tier: selectedTier,
        type: purchaseType,
      });
    }
  };

  // Mobile version
  if (isMobile) {
    return (
      <div
        className="min-h-screen theme-conka-flow"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Navigation />
        <div className="premium-pdp">
          <ProtocolHeroMobile
            protocolId={protocolId as ProtocolId}
            selectedTier={selectedTier}
            onTierSelect={setSelectedTier}
            purchaseType={purchaseType}
            onPurchaseTypeChange={setPurchaseType}
            onAddToCart={handleAddToCartFromHero}
          />

          <ProtocolPDPSections
            protocolId={protocolId as ProtocolId}
            selectedTier={selectedTier}
            onTierSelect={setSelectedTier}
            purchaseType={purchaseType}
            onPurchaseTypeChange={setPurchaseType}
            onAddToCart={handleAddToCartFromHero}
            validProtocolIds={validProtocolIds}
            isMobile={true}
          />

          <Footer />

          <StickyPurchaseFooterMobile
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
          onTierSelect={setSelectedTier}
          purchaseType={purchaseType}
          onAddToCart={handleAddToCartFromFooter}
          usePremium
        />
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div
      className="min-h-screen theme-conka-flow lg:pt-8"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Navigation */}
      <Navigation />
      <div className="premium-pdp">
        <ProtocolHero
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
          onTierSelect={setSelectedTier}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCartFromHero}
        />

        <ProtocolPDPSections
          protocolId={protocolId as ProtocolId}
          selectedTier={selectedTier}
          onTierSelect={setSelectedTier}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCartFromHero}
          validProtocolIds={validProtocolIds}
          isMobile={false}
        />

        <Footer />

        <StickyPurchaseFooter
        protocolId={protocolId as ProtocolId}
        selectedTier={selectedTier}
        onTierSelect={setSelectedTier}
        purchaseType={purchaseType}
        onPurchaseTypeChange={setPurchaseType}
        onAddToCart={handleAddToCartFromFooter}
        usePremium
      />
      </div>
    </div>
  );
}
