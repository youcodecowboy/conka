'use client';

import { SUPPORT_EMAIL } from '@/app/lib/supportEmail';
import { ContactSupportLink } from '@/app/components/ContactSupportLink';

interface SaveErrorBannerProps {
  error: string;
  errorPartial: boolean;
  errorMultiLine: boolean;
  subscriptionName: string;
  subscriptionId?: string;
  /** true = mobile (button-primary-small-full variant), false = desktop */
  compact?: boolean;
}

export function SaveErrorBanner({
  error,
  errorPartial,
  errorMultiLine,
  subscriptionName,
  subscriptionId,
  compact = false,
}: SaveErrorBannerProps) {
  const supportSubject = errorMultiLine
    ? 'Multi-product subscription change'
    : `Subscription support: ${subscriptionName}${subscriptionId ? ` (${subscriptionId})` : ''}`;

  const colorClasses = errorMultiLine
    ? 'border-[var(--color-neuro-blue-dark)]/30 bg-[var(--color-neuro-blue-light)] text-[var(--color-neuro-blue-dark)]'
    : errorPartial
      ? 'border-amber-500 bg-amber-50 text-amber-900'
      : 'border-red-300 bg-red-50 text-red-800';

  const heading = errorMultiLine
    ? 'Multiple products on this subscription'
    : errorPartial
      ? 'Your plan was partially updated'
      : 'Something went wrong';

  const body = errorMultiLine
    ? `Your subscription contains multiple products and needs to be updated manually. Please contact us at ${SUPPORT_EMAIL} and we'll sort it for you quickly.`
    : errorPartial
      ? "We updated your product and pack size, but we couldn't update your billing schedule. Please contact support so we can fix this for you."
      : "We couldn't update your plan. Please try again or contact support.";

  return (
    <div
      className={`${compact ? 'mb-3' : 'mb-4'} p-4 rounded-[var(--premium-radius-nested)] border-2 ${colorClasses}`}
    >
      <p className="font-semibold mb-2">{heading}</p>
      <p className={`premium-body-sm ${compact ? 'mb-3' : 'mb-4'}`}>{body}</p>
      <ContactSupportLink
        subject={supportSubject}
        variant={compact ? 'button-primary-small-full' : 'button-primary-small'}
        icon="envelope-small"
        {...(compact ? { className: 'mb-0' } : {})}
      />
    </div>
  );
}
