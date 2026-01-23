"use client";

import Link from "next/link";
import Image from "next/image";
import { ProtocolId } from "@/app/lib/productData";
import { ProtocolSelectorData } from "./protocolSelectorData";
import { getProtocolImage } from "@/app/components/navigation/protocolImageConfig";

// Situational cues mapping
const situationalCues: Record<ProtocolId, string> = {
  "1": "Long days • stress builds up • steady energy needed",
  "2": "Thinking is demanding • accuracy matters • mental fatigue shows up",
  "3": "Training hard • thinking hard • recovery matters",
  "4": "You want everything working, every day",
};

interface ProtocolCardMobileProps {
  protocol: ProtocolSelectorData;
  isFirst?: boolean;
}

export default function ProtocolCardMobile({
  protocol,
  isFirst = false,
}: ProtocolCardMobileProps) {
  // Limit benefits to 3 max and format with "This helps when..." prefix
  const formattedBenefits = protocol.benefits.slice(0, 3).map((benefit) => {
    // Convert benefit to "This helps when..." format
    const lowerBenefit = benefit.toLowerCase();
    return `This helps when you need ${lowerBenefit}`;
  });

  return (
    <div className="flex flex-col h-full border-2 border-black/10 rounded-lg overflow-hidden bg-white">
      {/* Protocol Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={getProtocolImage(protocol.id)}
          alt={`${protocol.name} - ${protocol.outcome}`}
          fill
          className="object-cover"
          style={{ objectPosition: "50% 30%" }}
          sizes="85vw"
          priority={isFirst}
          loading={isFirst ? undefined : "lazy"}
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        {/* Product Name */}
        <p className="font-primary text-xs uppercase tracking-wide opacity-60 mb-1">
          {protocol.name}
        </p>

        {/* Outcome Headline */}
        <h3 className="text-2xl font-bold leading-tight mb-2">
          {protocol.outcome}
        </h3>

        {/* Qualifier (single line, not a block) */}
        <p className="font-primary text-sm opacity-70 mb-5">
          {situationalCues[protocol.id]}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <p className="font-clinical text-sm opacity-90 mb-3">
          {protocol.startingPrice}
        </p>

        {/* CTA */}
        <Link
          href={`/protocol/${protocol.id}`}
          className="neo-button w-full py-3 rounded-full font-bold text-base flex items-center justify-center gap-2"
        >
          View product
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
