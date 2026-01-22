"use client";

import Image from "next/image";
import { protocolContent } from "@/app/lib/productData";
import { protocolSelectorData } from "@/app/components/shop/protocolSelectorData";
import type { ProtocolCardProps } from "./types";

export default function ProtocolCard({
  protocolId,
  onClick,
}: ProtocolCardProps) {
  const protocol = protocolContent[protocolId];
  const selectorData = protocolSelectorData[protocolId];

  return (
    <a
      href={`/protocol/${protocolId}`}
      className="group block"
      onClick={onClick}
    >
      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-current transition-all">
        <Image
          src={protocol.image}
          alt={protocol.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-20"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-black">
          <h4 className="font-bold text-lg mb-3 text-center">{protocol.subtitle}</h4>
          <ul className="space-y-2 text-sm font-clinical">
            {selectorData.benefits.slice(0, 3).map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-2">
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
                  className="flex-shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="neo-button px-6 py-2.5 rounded-full font-bold text-sm inline-flex items-center gap-2 w-full justify-center">
        {protocol.name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
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
      </div>
    </a>
  );
}
