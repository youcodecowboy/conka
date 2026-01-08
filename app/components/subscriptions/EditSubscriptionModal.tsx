'use client';

import { useState, useEffect } from 'react';

// Protocol definitions with their available tiers and pricing
const PROTOCOLS = [
  {
    id: '1',
    name: 'Resilience',
    description: 'Stress & recovery support',
    icon: '🛡️',
    color: 'amber',
    tiers: ['starter', 'pro', 'max'],
  },
  {
    id: '2',
    name: 'Precision',
    description: 'Focus & mental clarity',
    icon: '🎯',
    color: 'blue',
    tiers: ['starter', 'pro', 'max'],
  },
  {
    id: '3',
    name: 'Balance',
    description: 'Mood & energy balance',
    icon: '⚖️',
    color: 'green',
    tiers: ['starter', 'pro', 'max'],
  },
  {
    id: '4',
    name: 'Ultimate',
    description: 'Complete optimization',
    icon: '⚡',
    color: 'purple',
    tiers: ['pro', 'max'], // No starter tier
  },
] as const;

type TierType = 'starter' | 'pro' | 'max';
type ProtocolId = '1' | '2' | '3' | '4';

interface TierInfoItem {
  name: string;
  frequency: string;
  description: string;
  price: string;
  interval: string;
  badge?: string;
}

const TIER_INFO: Record<TierType, TierInfoItem> = {
  starter: {
    name: 'Starter',
    frequency: 'Weekly',
    description: '4 shots per delivery',
    price: '£14.99',
    interval: 'Every week',
  },
  pro: {
    name: 'Pro',
    frequency: 'Bi-Weekly',
    description: '12 shots per delivery',
    price: '£39.99',
    interval: 'Every 2 weeks',
    badge: 'Popular',
  },
  max: {
    name: 'Max',
    frequency: 'Monthly',
    description: '28 shots per delivery',
    price: '£79.99',
    interval: 'Every month',
    badge: 'Best Value',
  },
};

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (protocolId: string, tier: TierType) => Promise<{ success: boolean; message?: string }>;
  currentProtocolId?: string;
  currentTier?: TierType;
  subscriptionName: string;
  loading?: boolean;
}

export function EditSubscriptionModal({
  isOpen,
  onClose,
  onSave,
  currentProtocolId = '1',
  currentTier = 'pro',
  subscriptionName,
  loading = false,
}: EditSubscriptionModalProps) {
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolId>(currentProtocolId as ProtocolId);
  const [selectedTier, setSelectedTier] = useState<TierType>(currentTier);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [mobileView, setMobileView] = useState<'protocol' | 'tier'>('protocol');

  // Reset selections when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedProtocol(currentProtocolId as ProtocolId);
      setSelectedTier(currentTier);
      setError(null);
      setMobileView('protocol');
    }
  }, [isOpen, currentProtocolId, currentTier]);

  // Get selected protocol's available tiers
  const selectedProtocolData = PROTOCOLS.find(p => p.id === selectedProtocol);
  const availableTiers: TierType[] = (selectedProtocolData?.tiers || ['starter', 'pro', 'max']) as TierType[];

  // Adjust tier if not available in selected protocol
  useEffect(() => {
    if (!availableTiers.includes(selectedTier)) {
      setSelectedTier(availableTiers[0]);
    }
  }, [selectedProtocol, availableTiers, selectedTier]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    try {
      const result = await onSave(selectedProtocol, selectedTier);
      if (result.success) {
        onClose();
      } else {
        setError(result.message || 'Failed to update subscription');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = selectedProtocol !== currentProtocolId || selectedTier !== currentTier;

  if (!isOpen) return null;

  const getProtocolColorClass = (color: string, isSelected: boolean) => {
    const colors: Record<string, { border: string; bg: string; text: string }> = {
      amber: { border: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
      blue: { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
      green: { border: 'border-green-500', bg: 'bg-green-50', text: 'text-green-700' },
      purple: { border: 'border-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
    };
    return isSelected ? colors[color] : { border: 'border-gray-200', bg: '', text: '' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal - Desktop */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden hidden md:flex flex-col">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Edit Plan</h2>
            <p className="text-sm text-gray-500">{subscriptionName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content - Two Columns */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Column - Protocol Selection */}
          <div className="w-1/2 border-r p-6 overflow-y-auto">
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-4">Select Protocol</h3>
            <div className="space-y-3">
              {PROTOCOLS.map((protocol) => {
                const isSelected = selectedProtocol === protocol.id;
                const colorClasses = getProtocolColorClass(protocol.color, isSelected);
                
                return (
                  <button
                    key={protocol.id}
                    onClick={() => setSelectedProtocol(protocol.id as ProtocolId)}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      isSelected 
                        ? `${colorClasses.border} ${colorClasses.bg}` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{protocol.icon}</span>
                      <div className="flex-1">
                        <div className={`font-semibold ${isSelected ? colorClasses.text : ''}`}>
                          {protocol.name}
                        </div>
                        <div className="text-sm text-gray-500">{protocol.description}</div>
                      </div>
                      {isSelected && (
                        <svg className={`w-5 h-5 ${colorClasses.text}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column - Tier/Frequency Selection */}
          <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-4">Select Frequency</h3>
            <div className="space-y-3">
              {availableTiers.map((tier) => {
                const tierInfo = TIER_INFO[tier as TierType];
                const isSelected = selectedTier === tier;
                
                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier as TierType)}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      isSelected 
                        ? 'border-gray-900 bg-white shadow-sm' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{tierInfo.name}</span>
                          {tierInfo.badge && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              tierInfo.badge === 'Popular' 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {tierInfo.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{tierInfo.interval}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{tierInfo.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{tierInfo.price}</div>
                        <div className="text-xs text-gray-400">per delivery</div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>20% subscription discount applied</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-white">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {hasChanges ? (
                <span className="text-amber-600 font-medium">
                  Changing to {selectedProtocolData?.name} • {TIER_INFO[selectedTier].name}
                </span>
              ) : (
                'No changes made'
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving || loading}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-h-[90vh] overflow-hidden flex flex-col md:hidden">
        {/* Header */}
        <div className="border-b px-4 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Edit Plan</h2>
            <p className="text-xs text-gray-500">{subscriptionName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setMobileView('protocol')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mobileView === 'protocol'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500'
            }`}
          >
            1. Protocol
          </button>
          <button
            onClick={() => setMobileView('tier')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mobileView === 'tier'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500'
            }`}
          >
            2. Frequency
          </button>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {mobileView === 'protocol' ? (
            <div className="space-y-3">
              {PROTOCOLS.map((protocol) => {
                const isSelected = selectedProtocol === protocol.id;
                const colorClasses = getProtocolColorClass(protocol.color, isSelected);
                
                return (
                  <button
                    key={protocol.id}
                    onClick={() => {
                      setSelectedProtocol(protocol.id as ProtocolId);
                      setMobileView('tier');
                    }}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      isSelected 
                        ? `${colorClasses.border} ${colorClasses.bg}` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{protocol.icon}</span>
                      <div className="flex-1">
                        <div className={`font-semibold ${isSelected ? colorClasses.text : ''}`}>
                          {protocol.name}
                        </div>
                        <div className="text-sm text-gray-500">{protocol.description}</div>
                      </div>
                      {isSelected && (
                        <svg className={`w-5 h-5 ${colorClasses.text}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <div className="text-xs text-gray-500 uppercase">Selected Protocol</div>
                <div className="font-medium flex items-center gap-2">
                  <span>{selectedProtocolData?.icon}</span>
                  <span>{selectedProtocolData?.name}</span>
                </div>
              </div>
              
              {availableTiers.map((tier) => {
                const tierInfo = TIER_INFO[tier as TierType];
                const isSelected = selectedTier === tier;
                
                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier as TierType)}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                      isSelected 
                        ? 'border-gray-900 bg-white shadow-sm' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{tierInfo.name}</span>
                          {tierInfo.badge && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              tierInfo.badge === 'Popular' 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {tierInfo.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{tierInfo.interval}</div>
                      </div>
                      <div className="font-bold">{tierInfo.price}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile Footer */}
        <div className="border-t p-4 bg-white">
          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving || loading}
            className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Updating...
              </span>
            ) : hasChanges ? (
              `Save: ${selectedProtocolData?.name} • ${TIER_INFO[selectedTier].name}`
            ) : (
              'No changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
