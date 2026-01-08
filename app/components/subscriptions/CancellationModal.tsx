'use client';

import { useState } from 'react';

// Loop Customer Portal URL - users are redirected here for edit functionality
const LOOP_PORTAL_URL = 'https://conka-6770.myshopify.com/a/loop_subscriptions/customer-portal';

// Cancellation reasons
const CANCELLATION_REASONS = [
  { id: 'too_expensive', label: 'Too expensive' },
  { id: 'not_seeing_results', label: 'Not seeing results' },
  { id: 'too_frequent', label: 'Deliveries too frequent' },
  { id: 'too_infrequent', label: 'Deliveries too infrequent' },
  { id: 'switching_product', label: 'Switching to a different product' },
  { id: 'no_longer_needed', label: 'No longer needed' },
  { id: 'other', label: 'Other reason' },
] as const;


interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: (reason: string, comment?: string) => Promise<boolean>;
  subscriptionName: string;
  currentPlan?: string;
}

type Step = 'reason' | 'offer' | 'confirm';

export function CancellationModal({
  isOpen,
  onClose,
  onCancel,
  subscriptionName,
  currentPlan,
}: CancellationModalProps) {
  const [step, setStep] = useState<Step>('reason');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReasonSubmit = () => {
    if (!selectedReason) return;
    setStep('offer');
  };

  // Open Loop portal to change plan - closes modal and opens in new tab
  const handleChangePlan = () => {
    window.open(LOOP_PORTAL_URL, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleConfirmCancel = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await onCancel(selectedReason, comment);
      if (success) {
        onClose();
      } else {
        setError('Failed to cancel subscription. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('reason');
    setSelectedReason('');
    setComment('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {step === 'reason' && 'Cancel Subscription'}
              {step === 'offer' && 'Before You Go...'}
              {step === 'confirm' && 'Confirm Cancellation'}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">{subscriptionName}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Reason Selection */}
          {step === 'reason' && (
            <div className="space-y-4">
              <p className="text-gray-600">
                We&apos;re sorry to see you go. Please let us know why you&apos;re cancelling:
              </p>
              
              <div className="space-y-2">
                {CANCELLATION_REASONS.map((reason) => (
                  <label
                    key={reason.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedReason === reason.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={reason.id}
                      checked={selectedReason === reason.id}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedReason === reason.id
                        ? 'border-amber-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedReason === reason.id && (
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </div>
                    <span className="text-sm">{reason.label}</span>
                  </label>
                ))}
              </div>

              {selectedReason === 'other' && (
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Please tell us more..."
                  className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={3}
                />
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleReasonSubmit}
                  disabled={!selectedReason}
                  className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Alternative Offer */}
          {step === 'offer' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Try a Different Protocol?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Instead of cancelling, would you prefer a different plan that might suit you better?
                </p>
              </div>

              {/* Single button to open Loop portal for all plan changes */}
              <button
                onClick={handleChangePlan}
                disabled={loading}
                className="w-full p-4 border-2 border-amber-500 bg-amber-50 rounded-xl text-left hover:bg-amber-100 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Change Your Plan</div>
                    <div className="text-sm text-gray-600">
                      Edit frequency, quantity, or product in our subscription portal
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 flex-shrink-0">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
              </button>

              <div className="border-t pt-4 mt-6">
                <button
                  onClick={() => setStep('confirm')}
                  disabled={loading}
                  className="w-full py-3 text-gray-500 text-sm hover:text-gray-700 transition-colors disabled:opacity-50"
                >
                  No thanks, I still want to cancel
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Final Confirmation */}
          {step === 'confirm' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Are you sure?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  This will cancel your subscription immediately. You won&apos;t receive any more deliveries.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm">
                  <div className="font-medium">Cancellation reason:</div>
                  <div className="text-gray-600">
                    {CANCELLATION_REASONS.find(r => r.id === selectedReason)?.label}
                  </div>
                  {comment && (
                    <div className="text-gray-500 mt-1 italic">&quot;{comment}&quot;</div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep('offer')}
                  disabled={loading}
                  className="flex-1 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirmCancel}
                  disabled={loading}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Cancelling...
                    </span>
                  ) : (
                    'Confirm Cancellation'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

