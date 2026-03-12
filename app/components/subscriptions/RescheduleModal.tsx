'use client';

import { useState } from 'react';

const MAX_RESCHEDULE_DAYS = 90;

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (newDateEpoch: number) => Promise<boolean>;
  subscriptionName: string;
  currentNextBillingDate?: string;
  hasUnfulfilledOrder?: boolean;
}

function formatDateForInput(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDateForDisplay(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function RescheduleModal({
  isOpen,
  onClose,
  onReschedule,
  subscriptionName,
  currentNextBillingDate,
  hasUnfulfilledOrder = false,
}: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = formatDateForInput(tomorrow);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + MAX_RESCHEDULE_DAYS);
  const maxDateStr = formatDateForInput(maxDate);

  const currentDateFormatted = currentNextBillingDate
    ? new Date(currentNextBillingDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const handleConfirm = async () => {
    if (!selectedDate) return;
    setLoading(true);
    setError(null);

    // Convert selected date to epoch (start of day UTC)
    const epoch = Math.floor(new Date(selectedDate + 'T00:00:00Z').getTime() / 1000);

    try {
      const success = await onReschedule(epoch);
      if (success) {
        handleClose();
      } else {
        setError('Unable to reschedule your delivery right now. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedDate('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Reschedule Delivery</h2>
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

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {hasUnfulfilledOrder && (
            <div className="mb-4 p-3 bg-[var(--color-neuro-blue-light)]/30 border border-[var(--color-neuro-blue-light)] rounded-lg">
              <p className="text-sm text-[var(--color-neuro-blue-dark)]">
                Your next order is already being prepared. Rescheduling will move the <strong>following</strong> delivery after that.
              </p>
            </div>
          )}

          {currentDateFormatted && (
            <p className="text-gray-600 mb-2">
              Currently scheduled for <span className="font-semibold">{currentDateFormatted}</span>.
            </p>
          )}

          <p className="text-gray-600 mb-4">
            Choose a new date for your next delivery.
          </p>

          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">New delivery date</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={minDate}
                max={maxDateStr}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-neuro-blue-dark)]/30 focus:border-[var(--color-neuro-blue-dark)] transition-colors"
              />
            </label>
            <p className="text-xs text-gray-400">
              You can reschedule up to {MAX_RESCHEDULE_DAYS} days ahead.
            </p>
          </div>

          {selectedDate && (
            <div className="mt-4 p-3 bg-[var(--color-neuro-blue-light)]/30 border border-[var(--color-neuro-blue-light)] rounded-lg">
              <p className="text-sm text-gray-700">
                Your next delivery will move to{' '}
                <span className="font-semibold">
                  {formatDateForDisplay(selectedDate)}
                </span>
                .
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-6">
            <button
              onClick={handleClose}
              disabled={loading}
              className="flex-1 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Keep Current Date
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedDate || loading}
              className="flex-1 py-3 bg-[var(--color-neuro-blue-dark)] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Rescheduling...
                </span>
              ) : (
                'Confirm Reschedule'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
