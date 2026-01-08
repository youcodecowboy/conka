'use client';

import { useState, useEffect, useRef } from 'react';

type TierType = 'starter' | 'pro' | 'max';
type ProductType = 'protocol' | 'formula';
type FormulaPackSize = '4' | '8' | '12' | '28';

// Protocol data with actual product info
const PROTOCOLS = [
  {
    id: '1',
    name: 'Resilience',
    subtitle: 'Build Resilience, Stay Sharp',
    description: 'Daily adaptogen support with stress management',
    tiers: ['starter', 'pro', 'max'] as TierType[],
    icon: 'shield',
  },
  {
    id: '2',
    name: 'Precision',
    subtitle: 'Peak Cognition, Zero Burnout',
    description: 'Sustained mental clarity for demanding work',
    tiers: ['starter', 'pro', 'max'] as TierType[],
    icon: 'bolt',
  },
  {
    id: '3',
    name: 'Balance',
    subtitle: 'The Best of Both Worlds',
    description: 'Comprehensive support with both formulas',
    tiers: ['starter', 'pro', 'max'] as TierType[],
    icon: 'balance',
  },
  {
    id: '4',
    name: 'Ultimate',
    subtitle: 'Maximum Power, Every Day',
    description: 'Peak performance with daily dual-formula stack',
    tiers: ['pro', 'max'] as TierType[],
    icon: 'crown',
  },
];

// Individual formulas
const FORMULAS = [
  {
    id: 'flow',
    name: 'Conka Flow',
    subtitle: 'Caffeine-Free Focus',
    description: 'Adaptogen blend for stress resilience & recovery',
    color: 'amber',
  },
  {
    id: 'clarity',
    name: 'Conka Clarity',
    subtitle: 'Sharp Mind, Clear Head',
    description: 'Nootropic blend for mental clarity & focus',
    color: 'teal',
  },
];

// Protocol tier pricing and info - Standard Protocols (1, 2, 3)
interface TierInfo {
  name: string;
  frequency: string;
  shots: number;
  price: number;
  pricePerShot: number;
  billing: string;
}

const STANDARD_TIERS: Record<TierType, TierInfo> = {
  starter: {
    name: 'Starter',
    frequency: 'Weekly',
    shots: 4,
    price: 11.99,
    pricePerShot: 3.00,
    billing: 'Billed weekly',
  },
  pro: {
    name: 'Pro',
    frequency: 'Bi-Weekly',
    shots: 12,
    price: 31.99,
    pricePerShot: 2.67,
    billing: 'Billed every 2 weeks',
  },
  max: {
    name: 'Max',
    frequency: 'Monthly',
    shots: 28,
    price: 63.99,
    pricePerShot: 2.29,
    billing: 'Billed monthly',
  },
};

// Ultimate Protocol (4) has different pricing and shot counts
const ULTIMATE_TIERS: Partial<Record<TierType, TierInfo>> = {
  pro: {
    name: 'Pro',
    frequency: 'Bi-Weekly',
    shots: 28,
    price: 63.99,
    pricePerShot: 2.29,
    billing: 'Billed every 2 weeks',
  },
  max: {
    name: 'Max',
    frequency: 'Monthly',
    shots: 56,
    price: 115.99,
    pricePerShot: 2.07,
    billing: 'Billed monthly',
  },
};

// Formula pack sizes with pricing
interface FormulaPackInfo {
  shots: number;
  frequency: string;
  price: number;
  pricePerShot: number;
  billing: string;
}

const FORMULA_PACKS: Record<FormulaPackSize, FormulaPackInfo> = {
  '4': {
    shots: 4,
    frequency: 'Weekly',
    price: 11.99,
    pricePerShot: 3.00,
    billing: 'Billed weekly',
  },
  '8': {
    shots: 8,
    frequency: 'Bi-Weekly',
    price: 23.19,
    pricePerShot: 2.90,
    billing: 'Billed every 2 weeks',
  },
  '12': {
    shots: 12,
    frequency: 'Bi-Weekly',
    price: 31.99,
    pricePerShot: 2.67,
    billing: 'Billed every 2 weeks',
  },
  '28': {
    shots: 28,
    frequency: 'Monthly',
    price: 63.99,
    pricePerShot: 2.29,
    billing: 'Billed monthly',
  },
};

// Helper to get tier info based on protocol
const getTierInfo = (protocolId: string, tier: TierType): TierInfo | undefined => {
  if (protocolId === '4') {
    return ULTIMATE_TIERS[tier];
  }
  return STANDARD_TIERS[tier];
};

// Icons component
const Icon = ({ name, className = '' }: { name: string; className?: string }) => {
  switch (name) {
    case 'shield':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      );
    case 'bolt':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      );
    case 'balance':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18"/>
          <path d="M5 8l7-2 7 2"/>
          <circle cx="5" cy="11" r="3"/>
          <circle cx="19" cy="11" r="3"/>
        </svg>
      );
    case 'crown':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
          <path d="M4 21h16"/>
        </svg>
      );
    case 'beaker':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 3h15"/>
          <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/>
          <path d="M6 14h12"/>
        </svg>
      );
    case 'check':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      );
    case 'close':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      );
    case 'checkCircle':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      );
    case 'calendar':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      );
    case 'package':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16.5 9.4 7.55 4.24"/>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      );
    default:
      return null;
  }
};

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (protocolId: string, tier: TierType) => Promise<{ success: boolean; message?: string }>;
  currentProtocolId?: string;
  currentTier?: TierType;
  subscriptionName: string;
  nextBillingDate?: string;
  loading?: boolean;
}

export function EditSubscriptionModal({
  isOpen,
  onClose,
  onSave,
  currentProtocolId = '1',
  currentTier = 'pro',
  subscriptionName,
  nextBillingDate,
  loading = false,
}: EditSubscriptionModalProps) {
  const [productType, setProductType] = useState<ProductType>('protocol');
  const [selectedProtocol, setSelectedProtocol] = useState(currentProtocolId);
  const [selectedFormula, setSelectedFormula] = useState('flow');
  const [selectedTier, setSelectedTier] = useState<TierType>(currentTier);
  const [selectedFormulaPack, setSelectedFormulaPack] = useState<FormulaPackSize>('12');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [mobileStep, setMobileStep] = useState<'product' | 'tier'>('product');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState<{
    productName: string;
    frequency: string;
    price: number;
    shots: number;
    nextBilling: string;
  } | null>(null);
  
  // Track initial values to show "Current" badge
  const initialProtocolRef = useRef(currentProtocolId);
  const initialTierRef = useRef(currentTier);

  // Only reset when modal opens fresh (not when props change after save)
  useEffect(() => {
    if (isOpen && !showSuccess) {
      setSelectedProtocol(currentProtocolId);
      setSelectedTier(currentTier);
      setError(null);
      setMobileStep('product');
      initialProtocolRef.current = currentProtocolId;
      initialTierRef.current = currentTier;
      // Detect if current subscription is a formula or protocol
      const isFormula = subscriptionName.toLowerCase().includes('flow') || subscriptionName.toLowerCase().includes('clarity');
      setProductType(isFormula ? 'formula' : 'protocol');
      if (isFormula) {
        setSelectedFormula(subscriptionName.toLowerCase().includes('flow') ? 'flow' : 'clarity');
      }
    }
  }, [isOpen]); // Only depend on isOpen, not the changing props

  // Reset success state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
      setSuccessDetails(null);
    }
  }, [isOpen]);

  // Get available tiers for selected protocol
  const selectedProtocolData = PROTOCOLS.find(p => p.id === selectedProtocol);
  const availableTiers = selectedProtocolData?.tiers || ['starter', 'pro', 'max'];

  // Adjust tier if not available
  useEffect(() => {
    if (!availableTiers.includes(selectedTier)) {
      setSelectedTier(availableTiers[0]);
    }
  }, [selectedProtocol, availableTiers, selectedTier]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      // For formulas, we'd need different variant IDs - for now use protocol IDs
      const targetId = productType === 'formula' 
        ? (selectedFormula === 'flow' ? 'flow' : 'clarity')
        : selectedProtocol;
      
      const tier = productType === 'formula'
        ? (selectedFormulaPack === '4' ? 'starter' : selectedFormulaPack === '28' ? 'max' : 'pro')
        : selectedTier;
      
      const result = await onSave(targetId, tier);
      if (result.success) {
        // Calculate next billing date (add interval to current date)
        const nextDate = new Date();
        let frequency: string;
        let price: number;
        let shots: number;
        
        if (productType === 'formula') {
          const pack = FORMULA_PACKS[selectedFormulaPack];
          frequency = pack.frequency;
          price = pack.price;
          shots = pack.shots;
          if (pack.frequency === 'Weekly') nextDate.setDate(nextDate.getDate() + 7);
          else if (pack.frequency === 'Bi-Weekly') nextDate.setDate(nextDate.getDate() + 14);
          else nextDate.setMonth(nextDate.getMonth() + 1);
        } else {
          const tierInfo = getTierInfo(selectedProtocol, selectedTier);
          frequency = tierInfo?.frequency || 'Bi-Weekly';
          price = tierInfo?.price || 31.99;
          shots = tierInfo?.shots || 12;
          if (tierInfo?.frequency === 'Weekly') nextDate.setDate(nextDate.getDate() + 7);
          else if (tierInfo?.frequency === 'Bi-Weekly') nextDate.setDate(nextDate.getDate() + 14);
          else nextDate.setMonth(nextDate.getMonth() + 1);
        }

        // Show success state
        setSuccessDetails({
          productName: productType === 'formula'
            ? FORMULAS.find(f => f.id === selectedFormula)?.name || ''
            : `${PROTOCOLS.find(p => p.id === selectedProtocol)?.name} Protocol`,
          frequency,
          price,
          shots,
          nextBilling: nextDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        });
        setShowSuccess(true);
      } else {
        setError(result.message || 'Failed to update subscription');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Check if anything changed
  const isProtocolChanged = productType === 'protocol' && selectedProtocol !== initialProtocolRef.current;
  const isTierChanged = selectedTier !== initialTierRef.current;
  const hasChanges = isProtocolChanged || isTierChanged;

  // Format next billing date
  const formattedNextBilling = nextBillingDate 
    ? new Date(nextBillingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  if (!isOpen) return null;

  // Success State
  if (showSuccess && successDetails) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <div className="relative bg-white neo-box w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <Icon name="checkCircle" className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Plan Updated</h2>
          <p className="font-clinical text-sm opacity-60 mb-8">Your subscription has been changed successfully</p>
          
          <div className="neo-box p-6 text-left mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Icon name="package" className="w-5 h-5 opacity-50" />
                <div>
                  <p className="font-clinical text-xs uppercase opacity-50">New Plan</p>
                  <p className="font-bold">{successDetails.productName}</p>
                </div>
              </div>
              
              <div className="border-t border-dashed border-gray-200 pt-4 flex items-center gap-3">
                <Icon name="calendar" className="w-5 h-5 opacity-50" />
                <div>
                  <p className="font-clinical text-xs uppercase opacity-50">Delivery</p>
                  <p className="font-bold">{successDetails.frequency} · {successDetails.shots} shots</p>
                </div>
              </div>
              
              <div className="border-t border-dashed border-gray-200 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <div>
                    <p className="font-clinical text-xs uppercase opacity-50">Next Billing</p>
                    <p className="font-bold">{successDetails.nextBilling}</p>
                  </div>
                </div>
                <p className="font-bold text-xl">£{successDetails.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full neo-button py-3 font-bold"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      
      {/* Modal - Desktop */}
      <div className="relative bg-white neo-box w-full max-w-4xl max-h-[90vh] overflow-hidden hidden md:flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-current px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Edit Plan</h2>
            <p className="font-clinical text-sm opacity-60">{subscriptionName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:opacity-70 transition-opacity">
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Column - Product Selection */}
          <div className="w-1/2 border-r-2 border-current p-6 overflow-y-auto">
            {/* Protocols Section */}
            <div className="mb-6">
              <h3 className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3">Protocols</h3>
              <div className="space-y-2">
                {PROTOCOLS.map((protocol) => {
                  const isSelected = productType === 'protocol' && selectedProtocol === protocol.id;
                  const isCurrent = protocol.id === initialProtocolRef.current && productType === 'protocol';
                  return (
                    <button
                      key={protocol.id}
                      onClick={() => {
                        setProductType('protocol');
                        setSelectedProtocol(protocol.id);
                      }}
                      className={`w-full p-4 text-left transition-all ${
                        isSelected 
                          ? 'neo-box-inverted' 
                          : 'neo-box hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-white/20' : 'bg-gray-100'
                        }`}>
                          <Icon name={protocol.icon} className={`w-5 h-5 ${isSelected ? 'text-white' : ''}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold truncate">{protocol.name}</span>
                            {isCurrent && (
                              <span className={`text-xs font-bold px-2 py-0.5 ${
                                isSelected ? 'bg-white/20' : 'bg-gray-200'
                              }`}>
                                CURRENT
                              </span>
                            )}
                          </div>
                          <div className={`font-clinical text-xs truncate ${isSelected ? 'opacity-70' : 'opacity-50'}`}>
                            {protocol.subtitle}
                          </div>
                        </div>
                        {isSelected && (
                          <Icon name="check" className="w-5 h-5 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-dashed border-gray-200 my-6" />

            {/* Individual Formulas Section */}
            <div>
              <h3 className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3">Individual Formulas</h3>
              <div className="space-y-2">
                {FORMULAS.map((formula) => {
                  const isSelected = productType === 'formula' && selectedFormula === formula.id;
                  return (
                    <button
                      key={formula.id}
                      onClick={() => {
                        setProductType('formula');
                        setSelectedFormula(formula.id);
                      }}
                      className={`w-full p-4 text-left transition-all ${
                        isSelected 
                          ? 'neo-box-inverted' 
                          : 'neo-box hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSelected 
                            ? 'bg-white/20' 
                            : formula.color === 'amber' ? 'bg-amber-100' : 'bg-[#AAB9BC]/20'
                        }`}>
                          <Icon name="beaker" className={`w-5 h-5 ${
                            isSelected ? 'text-white' : formula.color === 'amber' ? 'text-amber-600' : 'text-[#AAB9BC]'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold truncate">{formula.name}</div>
                          <div className={`font-clinical text-xs truncate ${isSelected ? 'opacity-70' : 'opacity-50'}`}>
                            {formula.subtitle}
                          </div>
                        </div>
                        {isSelected && (
                          <Icon name="check" className="w-5 h-5 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Tier/Pack Selection */}
          <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
            <h3 className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3">
              {productType === 'formula' ? 'Select Pack Size' : 'Select Frequency'}
            </h3>
            
            {/* Next Billing Info */}
            {formattedNextBilling && (
              <div className="mb-4 p-3 bg-white neo-box">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="calendar" className="w-4 h-4 opacity-50" />
                  <span className="font-clinical opacity-70">Next billing:</span>
                  <span className="font-bold">{formattedNextBilling}</span>
                </div>
              </div>
            )}

            {/* Protocol Tiers */}
            {productType === 'protocol' && (
              <div className="space-y-3">
                {availableTiers.map((tier) => {
                  const tierInfo = getTierInfo(selectedProtocol, tier);
                  if (!tierInfo) return null;
                  
                  const isSelected = selectedTier === tier;
                  const isCurrent = tier === initialTierRef.current && selectedProtocol === initialProtocolRef.current;
                  
                  return (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`w-full p-4 text-left transition-all ${
                        isSelected 
                          ? 'neo-box-inverted' 
                          : 'neo-box bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold">{tierInfo.name}</span>
                            {isCurrent && (
                              <span className={`text-xs font-bold px-2 py-0.5 ${
                                isSelected ? 'bg-white/20' : 'bg-gray-200'
                              }`}>
                                CURRENT
                              </span>
                            )}
                            {tier === 'pro' && !isCurrent && (
                              <span className={`text-xs font-bold px-2 py-0.5 ${
                                isSelected ? 'bg-white/20' : 'bg-amber-100 text-amber-800'
                              }`}>
                                POPULAR
                              </span>
                            )}
                            {tier === 'max' && !isCurrent && (
                              <span className={`text-xs font-bold px-2 py-0.5 ${
                                isSelected ? 'bg-white/20' : 'bg-green-100 text-green-800'
                              }`}>
                                BEST VALUE
                              </span>
                            )}
                          </div>
                          <div className={`font-clinical text-sm mt-1 ${isSelected ? 'opacity-80' : 'opacity-60'}`}>
                            {tierInfo.frequency} · {tierInfo.shots} shots
                          </div>
                          <div className={`font-clinical text-xs mt-0.5 ${isSelected ? 'opacity-60' : 'opacity-40'}`}>
                            {tierInfo.billing}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">£{tierInfo.price.toFixed(2)}</div>
                          <div className={`font-clinical text-xs ${isSelected ? 'opacity-70' : 'opacity-50'}`}>
                            £{tierInfo.pricePerShot.toFixed(2)}/shot
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className={`mt-3 pt-3 border-t flex items-center gap-2 text-sm ${
                          isSelected ? 'border-white/20' : 'border-gray-200'
                        }`}>
                          <Icon name="check" className="w-4 h-4" />
                          <span className="font-clinical">20% subscription discount applied</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Formula Pack Sizes */}
            {productType === 'formula' && (
              <div className="space-y-3">
                {(Object.keys(FORMULA_PACKS) as FormulaPackSize[]).map((packSize) => {
                  const packInfo = FORMULA_PACKS[packSize];
                  const isSelected = selectedFormulaPack === packSize;
                  
                  return (
                    <button
                      key={packSize}
                      onClick={() => setSelectedFormulaPack(packSize)}
                      className={`w-full p-4 text-left transition-all ${
                        isSelected 
                          ? 'neo-box-inverted' 
                          : 'neo-box bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{packInfo.shots} Shots</span>
                            {packSize === '12' && (
                              <span className={`text-xs font-bold px-2 py-0.5 ${
                                isSelected ? 'bg-white/20' : 'bg-amber-100 text-amber-800'
                              }`}>
                                POPULAR
                              </span>
                            )}
                            {packSize === '28' && (
                              <span className={`text-xs font-bold px-2 py-0.5 ${
                                isSelected ? 'bg-white/20' : 'bg-green-100 text-green-800'
                              }`}>
                                BEST VALUE
                              </span>
                            )}
                          </div>
                          <div className={`font-clinical text-sm mt-1 ${isSelected ? 'opacity-80' : 'opacity-60'}`}>
                            {packInfo.frequency} delivery
                          </div>
                          <div className={`font-clinical text-xs mt-0.5 ${isSelected ? 'opacity-60' : 'opacity-40'}`}>
                            {packInfo.billing}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">£{packInfo.price.toFixed(2)}</div>
                          <div className={`font-clinical text-xs ${isSelected ? 'opacity-70' : 'opacity-50'}`}>
                            £{packInfo.pricePerShot.toFixed(2)}/shot
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className={`mt-3 pt-3 border-t flex items-center gap-2 text-sm ${
                          isSelected ? 'border-white/20' : 'border-gray-200'
                        }`}>
                          <Icon name="check" className="w-4 h-4" />
                          <span className="font-clinical">20% subscription discount applied</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-current p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 text-red-700 text-sm font-clinical">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="font-clinical text-sm opacity-60">
              {hasChanges ? (
                <span className="text-green-700 font-medium">
                  → {productType === 'protocol' 
                    ? `${PROTOCOLS.find(p => p.id === selectedProtocol)?.name} · ${getTierInfo(selectedProtocol, selectedTier)?.name}`
                    : `${FORMULAS.find(f => f.id === selectedFormula)?.name} · ${FORMULA_PACKS[selectedFormulaPack].shots} shots`
                  }
                </span>
              ) : (
                'No changes'
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="neo-button-outline px-6 py-2.5 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving || loading}
                className="neo-button px-6 py-2.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Mobile */}
      <div className="relative bg-white neo-box w-full max-h-[90vh] overflow-hidden flex flex-col md:hidden">
        {/* Header */}
        <div className="border-b-2 border-current px-4 py-3 flex items-center justify-between">
          <div>
            <h2 className="font-bold">Edit Plan</h2>
            <p className="font-clinical text-xs opacity-60 truncate">{subscriptionName}</p>
          </div>
          <button onClick={onClose} className="p-2">
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Steps */}
        <div className="flex border-b-2 border-current">
          <button
            onClick={() => setMobileStep('product')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mobileStep === 'product' ? 'bg-black text-white' : ''
            }`}
          >
            1. Product
          </button>
          <button
            onClick={() => setMobileStep('tier')}
            className={`flex-1 py-3 text-sm font-semibold border-l-2 border-current transition-colors ${
              mobileStep === 'tier' ? 'bg-black text-white' : ''
            }`}
          >
            2. {productType === 'formula' ? 'Pack Size' : 'Frequency'}
          </button>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {mobileStep === 'product' ? (
            <div className="space-y-4">
              {/* Protocols */}
              <div>
                <h3 className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-2">Protocols</h3>
                <div className="space-y-2">
                  {PROTOCOLS.map((protocol) => {
                    const isSelected = productType === 'protocol' && selectedProtocol === protocol.id;
                    const isCurrent = protocol.id === initialProtocolRef.current && productType === 'protocol';
                    return (
                      <button
                        key={protocol.id}
                        onClick={() => {
                          setProductType('protocol');
                          setSelectedProtocol(protocol.id);
                          setMobileStep('tier');
                        }}
                        className={`w-full p-3 text-left transition-all ${
                          isSelected ? 'neo-box-inverted' : 'neo-box'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon name={protocol.icon} className="w-5 h-5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">{protocol.name}</span>
                              {isCurrent && (
                                <span className={`text-xs font-bold px-1.5 py-0.5 ${
                                  isSelected ? 'bg-white/20' : 'bg-gray-200'
                                }`}>CURRENT</span>
                              )}
                            </div>
                            <div className="font-clinical text-xs opacity-60">{protocol.subtitle}</div>
                          </div>
                          {isSelected && <Icon name="check" className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-gray-200 my-4" />

              {/* Formulas */}
              <div>
                <h3 className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-2">Individual Formulas</h3>
                <div className="space-y-2">
                  {FORMULAS.map((formula) => {
                    const isSelected = productType === 'formula' && selectedFormula === formula.id;
                    return (
                      <button
                        key={formula.id}
                        onClick={() => {
                          setProductType('formula');
                          setSelectedFormula(formula.id);
                          setMobileStep('tier');
                        }}
                        className={`w-full p-3 text-left transition-all ${
                          isSelected ? 'neo-box-inverted' : 'neo-box'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon name="beaker" className="w-5 h-5" />
                          <div className="flex-1">
                            <div className="font-bold text-sm">{formula.name}</div>
                            <div className="font-clinical text-xs opacity-60">{formula.subtitle}</div>
                          </div>
                          {isSelected && <Icon name="check" className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Selected Product Summary */}
              <div className="p-3 bg-gray-100 neo-box mb-4">
                <div className="font-clinical text-xs uppercase opacity-50">Selected</div>
                <div className="font-bold">
                  {productType === 'protocol' 
                    ? PROTOCOLS.find(p => p.id === selectedProtocol)?.name
                    : FORMULAS.find(f => f.id === selectedFormula)?.name
                  }
                </div>
              </div>

              {/* Next Billing */}
              {formattedNextBilling && (
                <div className="p-3 bg-white neo-box mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-clinical opacity-70">Next billing:</span>
                    <span className="font-bold">{formattedNextBilling}</span>
                  </div>
                </div>
              )}

              {/* Protocol Tiers */}
              {productType === 'protocol' && availableTiers.map((tier) => {
                const tierInfo = getTierInfo(selectedProtocol, tier);
                if (!tierInfo) return null;
                
                const isSelected = selectedTier === tier;
                const isCurrent = tier === initialTierRef.current && selectedProtocol === initialProtocolRef.current;
                
                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`w-full p-4 text-left transition-all ${
                      isSelected ? 'neo-box-inverted' : 'neo-box bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold">{tierInfo.name}</span>
                          {isCurrent && (
                            <span className={`text-xs font-bold px-1.5 py-0.5 ${
                              isSelected ? 'bg-white/20' : 'bg-gray-200'
                            }`}>CURRENT</span>
                          )}
                          {tier === 'pro' && !isCurrent && (
                            <span className={`text-xs font-bold px-1.5 py-0.5 ${
                              isSelected ? 'bg-white/20' : 'bg-amber-100 text-amber-800'
                            }`}>POPULAR</span>
                          )}
                        </div>
                        <div className="font-clinical text-xs opacity-70 mt-1">
                          {tierInfo.frequency} · {tierInfo.shots} shots
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">£{tierInfo.price.toFixed(2)}</div>
                        <div className="font-clinical text-xs opacity-60">
                          £{tierInfo.pricePerShot.toFixed(2)}/shot
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Formula Packs */}
              {productType === 'formula' && (Object.keys(FORMULA_PACKS) as FormulaPackSize[]).map((packSize) => {
                const packInfo = FORMULA_PACKS[packSize];
                const isSelected = selectedFormulaPack === packSize;
                
                return (
                  <button
                    key={packSize}
                    onClick={() => setSelectedFormulaPack(packSize)}
                    className={`w-full p-4 text-left transition-all ${
                      isSelected ? 'neo-box-inverted' : 'neo-box bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{packInfo.shots} Shots</span>
                          {packSize === '12' && (
                            <span className={`text-xs font-bold px-1.5 py-0.5 ${
                              isSelected ? 'bg-white/20' : 'bg-amber-100 text-amber-800'
                            }`}>POPULAR</span>
                          )}
                        </div>
                        <div className="font-clinical text-xs opacity-70 mt-1">
                          {packInfo.frequency} delivery
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">£{packInfo.price.toFixed(2)}</div>
                        <div className="font-clinical text-xs opacity-60">
                          £{packInfo.pricePerShot.toFixed(2)}/shot
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile Footer */}
        <div className="border-t-2 border-current p-4">
          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving || loading}
            className="w-full neo-button py-3 font-semibold disabled:opacity-50"
          >
            {saving ? 'Updating...' : hasChanges ? (
              `Save: ${productType === 'protocol' 
                ? `${PROTOCOLS.find(p => p.id === selectedProtocol)?.name} · ${getTierInfo(selectedProtocol, selectedTier)?.name}`
                : `${FORMULAS.find(f => f.id === selectedFormula)?.name} · ${FORMULA_PACKS[selectedFormulaPack].shots} shots`
              }`
            ) : (
              'No changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
