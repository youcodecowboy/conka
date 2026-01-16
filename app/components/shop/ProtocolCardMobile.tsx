"use client";

import Link from "next/link";
import Image from "next/image";
import { ProtocolId } from "@/app/lib/productData";
import { ProtocolSelectorData } from "./protocolSelectorData";

// Protocol images mapping
const protocolImages: Record<ProtocolId, string> = {
  "1": "/protocols/Resilience.jpg",
  "2": "/protocols/Precision.jpg",
  "3": "/protocols/Balance.jpg",
  "4": "/protocols/Ultimate.jpg",
};

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
          src={protocolImages[protocol.id]}
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
      <div className="p-5 flex-1 flex flex-col">
        {/* Outcome Headline (Primary) */}
        <div className="mb-4 pb-4 border-b border-black/5">
          <h3 className="text-2xl font-bold mb-1">{protocol.outcome}</h3>
          <p className="font-primary text-sm opacity-80 mb-1">
            Commonly chosen when:
          </p>
          <p className="font-primary text-sm opacity-80">
            {situationalCues[protocol.id]}
          </p>
        </div>

        {/* Benefit Bullets */}
        <ul className="space-y-3 mb-6 flex-1">
          {formattedBenefits.map((benefit, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 font-clinical text-sm"
            >
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
                className="flex-shrink-0 mt-0.5 text-teal-500"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="opacity-80">{benefit}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="mt-auto">
          <Link
            href={`/protocol/${protocol.id}`}
            className="neo-button w-full py-3 rounded-full font-bold text-base flex items-center justify-center gap-2"
          >
            View {protocol.name}
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
    </div>
  );
}
