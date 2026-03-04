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
        <div
          className="mb-4 p-3 rounded-[var(--premium-radius-nested)] border border-[var(--color-neuro-blue-start)]"
          style={{ backgroundColor: 'var(--color-neuro-blue-light)' }}
        >
          <div className="flex items-center gap-2 premium-body-sm">
            <SubscriptionIcon name="calendar" className="w-4 h-4 text-[var(--color-neuro-blue-dark)]" />
            <span className="text-[var(--color-neuro-blue-dark)]">Next billing:</span>
            <span className="font-semibold text-[var(--color-neuro-blue-dark)]">
              {formattedNextBilling}
            </span>
          </div>
        </div>
      )}

      {isProtocol ? (
        <>
          <h3 className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-3">
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
                  className={`w-full p-4 text-left rounded-[var(--premium-radius-nested)] border-2 ${
                    isSelected
                      ? 'bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] border-[var(--color-neuro-blue-dark)]'
                      : isCurrent
                        ? 'bg-[var(--color-bone)] border-[var(--color-neuro-blue-dark)] hover:border-[var(--color-neuro-blue-dark)]'
                        : 'bg-[var(--color-bone)] border-[var(--color-premium-stroke)] hover:border-[var(--color-neuro-blue-start)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold">{tierInfo.deliveryShots} shots per delivery</span>
                        {isCurrent && (
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              isSelected
                                ? 'bg-white/20'
                                : 'bg-[var(--color-premium-stroke)] text-[var(--color-ink)]'
                            }`}
                          >
                            CURRENT
                          </span>
                        )}
                        {tier === 'pro' && !isCurrent && (
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              isSelected
                                ? 'bg-white/20'
                                : 'bg-[var(--color-neuro-blue-light)] text-[var(--color-neuro-blue-dark)]'
                            }`}
                          >
                            POPULAR
                          </span>
                        )}
                      </div>
                      <p
                        className={`premium-body-sm mt-1 ${
                          isSelected ? 'opacity-90' : 'text-[var(--text-on-light-muted)]'
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
                        className={`premium-body-sm mt-2 ${
                          isSelected ? 'opacity-80' : 'text-[var(--text-on-light-muted)]'
                        }`}
                      >
                        {tierInfo.billing}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">£{tierInfo.price.toFixed(2)}</div>
                      <div
                        className={`premium-body-sm ${
                          isSelected ? 'opacity-80' : 'text-[var(--text-on-light-muted)]'
                        }`}
                      >
                        £{tierInfo.pricePerShot.toFixed(2)}/shot
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2 premium-body-sm">
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
          <h3 className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-3">
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
                  className={`p-4 text-left rounded-[var(--premium-radius-nested)] border-2 ${
                    isSelected
                      ? 'bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] border-[var(--color-neuro-blue-dark)]'
                      : isCurrent
                        ? 'bg-[var(--color-bone)] border-[var(--color-neuro-blue-dark)] hover:border-[var(--color-neuro-blue-dark)]'
                        : 'bg-[var(--color-bone)] border-[var(--color-premium-stroke)] hover:border-[var(--color-neuro-blue-start)]'
                  }`}
                >
                  <span className="font-bold">{FORMULA_PACK_LABELS[size]}</span>
                  {isCurrent && (
                    <span
                      className={`block text-xs font-bold mt-1 ${
                        isSelected ? 'opacity-90' : 'text-[var(--text-on-light-muted)]'
                      }`}
                    >
                      CURRENT
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
