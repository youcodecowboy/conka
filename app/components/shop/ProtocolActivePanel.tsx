"use client";

import Link from "next/link";
import { ProtocolId } from "@/app/lib/productData";
import ProtocolRatioWheel from "./ProtocolRatioWheel";
import { protocolSelectorData } from "./protocolSelectorData";

interface ProtocolActivePanelProps {
  protocolId: ProtocolId;
  isMobile?: boolean;
}

export default function ProtocolActivePanel({
  protocolId,
  isMobile = false,
}: ProtocolActivePanelProps) {
  const protocol = protocolSelectorData[protocolId];

  if (!protocol) return null;

  return (
    <div
      className={`neo-box ${isMobile ? "p-5" : "p-8"} transition-all duration-300`}
      role="region"
      aria-label={`${protocol.name} details`}
    >
      <div
        className={`flex ${
          isMobile ? "flex-col gap-6" : "flex-row gap-12 items-start"
        }`}
      >
        {/* Left: Ratio Wheel */}
        <div
          className={`flex flex-col items-center ${
            isMobile ? "order-2" : "flex-shrink-0"
          }`}
        >
          <ProtocolRatioWheel
            flowPercentage={protocol.flowPercentage}
            clarityPercentage={protocol.clarityPercentage}
            size="large"
            isUltimate={protocol.isUltimate}
            animate={true}
          />
          {/* Legend spacing for large wheel */}
          <div className="h-10" />
        </div>

        {/* Right: Content */}
        <div className={`flex-1 ${isMobile ? "order-1" : ""}`}>
          {/* Outcome Headline */}
          <h3
            className={`font-bold leading-tight mb-2 ${
              isMobile ? "text-2xl" : "text-3xl"
            }`}
          >
            {protocol.outcome}
          </h3>

          {/* For people who... */}
          <p
            className={`font-commentary opacity-80 mb-4 ${
              isMobile ? "text-lg" : "text-xl"
            }`}
          >
            For people who {protocol.forPeopleWho}
          </p>

          {/* Premium Badge for Ultimate */}
          {protocol.isPremium && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4">
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
                className="text-amber-500"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="font-clinical text-xs text-amber-600">
                Most Advanced Protocol
              </span>
            </div>
          )}

          {/* Benefits */}
          <ul className={`space-y-3 ${isMobile ? "mb-5" : "mb-6"}`}>
            {protocol.benefits.map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 font-clinical text-sm"
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
                  className="flex-shrink-0 mt-0.5 text-teal-500"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Protocol Name (secondary) */}
          <p className="font-clinical text-xs opacity-50 uppercase tracking-wider mb-4">
            {protocol.name}
          </p>

          {/* Footer: Price + CTA */}
          <div
            className={`flex items-center gap-4 pt-4 border-t-2 border-current border-opacity-10 ${
              isMobile ? "flex-col" : "flex-row justify-between"
            }`}
          >
            <span className="font-clinical text-sm opacity-70">
              {protocol.startingPrice}
            </span>
            <Link
              href={`/protocol/${protocol.id}`}
              className={`neo-button px-6 py-3 rounded-lg lg:rounded-full font-semibold text-sm inline-flex items-center gap-2 hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all ${
                isMobile ? "w-full justify-center" : ""
              }`}
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
    </div>
  );
}
