'use client';

import {
  FORMULA_PACK_SIZES,
  FORMULA_PACK_LABELS,
  type TierType,
  type PackSize,
} from '@/app/lib/subscriptionProduct';
import { getTierInfo, getFormulaBreakdown, getAvailableTiers } from '@/app/lib/subscriptionProduct';
import { FormulaBreakdown } from './FormulaBreakdown';
import { SubscriptionIcon } from './SubscriptionIcon';

interface TierSelectorPanelProps {
  isProtocol: boolean;
  selectedProtocol: string;
  currentProtocolId: string;
  selectedTier: TierType;
  currentTier: TierType;
  selectedPackSize: PackSize;
  currentPackSize: PackSize;
  onSelectTier: (tier: TierType) => void;
  onSelectPackSize: (size: PackSize) => void;
  formattedNextBilling?: string | null;
  initialTier: TierType;
  initialPackSize: PackSize;
  initialProtocolId: string;
}

export function TierSelectorPanel({
  isProtocol,
  selectedProtocol,
  selectedTier,
  selectedPackSize,
  onSelectTier,
  onSelectPackSize,
  formattedNextBilling,
  initialTier,
  initialPackSize,
  initialProtocolId,
}: TierSelectorPanelProps) {
  const availableTiers = getAvailableTiers(selectedProtocol);

  return (
    <>
      {formattedNextBilling && (
        <div className="mb-4 p-3 border border-[#1B2757]/20 bg-[#1B2757]/5">
          <div className="flex items-center gap-2 text-sm">
            <SubscriptionIcon name="calendar" className="w-4 h-4 text-[#1B2757]" />
            <span className="text-[#1B2757]">Next billing:</span>
            <span className="font-semibold text-[#1B2757] tabular-nums">
              {formattedNextBilling}
            </span>
          </div>
        </div>
      )}

      {isProtocol ? (
        <>
          <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-3">
            Pack size
          </h3>
          <div className="space-y-3">
            {availableTiers.map((tier) => {
              const tierInfo = getTierInfo(selectedProtocol, tier);
              const formulaBreakdown = getFormulaBreakdown(selectedProtocol, tier);
              if (!tierInfo || !formulaBreakdown) return null;
              const isSelected = selectedTier === tier;
              const isCurrent = tier === initialTier && selectedProtocol === initialProtocolId;
              const isUltimate = selectedProtocol === '4';
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => onSelectTier(tier)}
                  className={`w-full p-4 text-left border ${
                    isSelected
                      ? 'bg-[#1B2757] text-white border-[#1B2757]'
                      : isCurrent
                        ? 'bg-white border-[#1B2757] hover:border-[#1B2757]'
                        : 'bg-white border-black/12 hover:border-black/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{tierInfo.deliveryShots} shots per delivery</span>
                        {isCurrent && (
                          <span
                            className={`font-mono text-[9px] uppercase tracking-[0.16em] tabular-nums px-2 py-0.5 ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-[#f5f5f5] border border-black/12 text-black/60'
                            }`}
                          >
                            Current
                          </span>
                        )}
                        {tier === 'pro' && !isCurrent && (
                          <span
                            className={`font-mono text-[9px] uppercase tracking-[0.16em] tabular-nums px-2 py-0.5 ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-[#1B2757]/5 border border-[#1B2757]/20 text-[#1B2757]'
                            }`}
                          >
                            Popular
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm mt-1 ${
                          isSelected ? 'opacity-90' : 'text-black/60'
                        }`}
                      >
                        {tierInfo.name} · {tierInfo.frequency}
                      </p>
                      <FormulaBreakdown
                        flowCount={formulaBreakdown.flowCount}
                        clarityCount={formulaBreakdown.clarityCount}
                        isSelected={isSelected}
                        isUltimate={isUltimate}
                      />
                      <p
                        className={`text-sm mt-2 ${
                          isSelected ? 'opacity-80' : 'text-black/60'
                        }`}
                      >
                        {tierInfo.billing}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg tabular-nums">£{tierInfo.price.toFixed(2)}</div>
                      <div
                        className={`font-mono text-[10px] tabular-nums ${
                          isSelected ? 'opacity-80' : 'text-black/60'
                        }`}
                      >
                        £{tierInfo.pricePerShot.toFixed(2)}/shot
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] tabular-nums">
                      <SubscriptionIcon name="check" className="w-4 h-4" />
                      <span>20% subscription discount applied</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-3">
            Pack size
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {FORMULA_PACK_SIZES.map((size) => {
              const isSelected = selectedPackSize === size;
              const isCurrent = size === initialPackSize;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSelectPackSize(size)}
                  className={`p-4 text-left border ${
                    isSelected
                      ? 'bg-[#1B2757] text-white border-[#1B2757]'
                      : isCurrent
                        ? 'bg-white border-[#1B2757] hover:border-[#1B2757]'
                        : 'bg-white border-black/12 hover:border-black/40'
                  }`}
                >
                  <span className="font-semibold text-sm tabular-nums">{FORMULA_PACK_LABELS[size]}</span>
                  {isCurrent && (
                    <span
                      className={`block font-mono text-[9px] uppercase tracking-[0.16em] tabular-nums mt-1 ${
                        isSelected ? 'opacity-90' : 'text-black/50'
                      }`}
                    >
                      Current
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
