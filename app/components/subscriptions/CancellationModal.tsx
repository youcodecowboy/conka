'use client';

import { useState } from 'react';

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

// Retention suggestions mapped to cancellation reasons
const RETENTION_OFFERS: Record<string, {
  title: string;
  description: string;
  actionLabel: string;
  actionType: 'pause' | 'edit' | 'reschedule';
}> = {
  too_expensive: {
    title: 'Try a smaller plan instead?',
    description: 'You could switch to a Starter pack (4 shots/week) at a lower price. You can always upgrade again later.',
    actionLabel: 'Change my plan',
    actionType: 'edit',
  },
  not_seeing_results: {
    title: 'Take a break instead?',
    description: 'Pausing your subscription lets you take a break without losing your plan. You can resume anytime — no need to set up a new subscription.',
    actionLabel: 'Pause instead',
    actionType: 'pause',
  },
  too_frequent: {
    title: 'Adjust your delivery schedule?',
    description: 'You can switch to a less frequent delivery — bi-weekly or monthly — so you only get what you need.',
    actionLabel: 'Change my plan',
    actionType: 'edit',
  },
  too_infrequent: {
    title: 'Get deliveries more often?',
    description: 'You can switch to weekly or bi-weekly deliveries so you never run out.',
    actionLabel: 'Change my plan',
    actionType: 'edit',
  },
  no_longer_needed: {
    title: 'Pause for a while instead?',
    description: 'If you might want to come back later, pausing keeps your subscription ready. Resume whenever you like.',
    actionLabel: 'Pause instead',
    actionType: 'pause',
  },
};

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: (reason: string, comment?: string) => Promise<boolean>;
  subscriptionName: string;
  currentPlan?: string;
  /** Called when user chooses "pause instead" from retention step */
  onPauseInstead?: () => void;
  /** Called when user chooses "edit plan" from retention step */
  onEditInstead?: () => void;
}

type Step = 'reason' | 'retention' | 'confirm';

export function CancellationModal({
  isOpen,
  onClose,
  onCancel,
  subscriptionName,
  currentPlan,
  onPauseInstead,
  onEditInstead,
}: CancellationModalProps) {
  const [step, setStep] = useState<Step>('reason');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const retentionOffer = RETENTION_OFFERS[selectedReason];

  const handleReasonSubmit = () => {
    if (!selectedReason) return;
    // Show retention step if there's a relevant offer, otherwise go straight to confirm
    if (retentionOffer) {
      setStep('retention');
    } else {
      setStep('confirm');
    }
  };

  const handleRetentionAction = () => {
    if (!retentionOffer) return;
    handleClose();
    if (retentionOffer.actionType === 'pause' && onPauseInstead) {
      onPauseInstead();
    } else if ((retentionOffer.actionType === 'edit' || retentionOffer.actionType === 'reschedule') && onEditInstead) {
      onEditInstead();
    }
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
    } catch {
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
              {step === 'retention' && 'Before you go'}
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

          {/* Step 2: Retention Offer */}
          {step === 'retention' && retentionOffer && (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{retentionOffer.title}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  {retentionOffer.description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {(onPauseInstead || onEditInstead) && (
                  <button
                    onClick={handleRetentionAction}
                    className="w-full py-3 bg-[var(--color-neuro-blue-dark)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    {retentionOffer.actionLabel}
                  </button>
                )}
                <button
                  onClick={() => setStep('confirm')}
                  className="w-full py-3 border border-gray-200 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  I still want to cancel
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Never mind, keep my subscription
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

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  You can reactivate your subscription at any time from your account page.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(retentionOffer ? 'retention' : 'reason')}
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
