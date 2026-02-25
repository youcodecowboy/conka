'use client';

/**
 * Content-only block: section heading, subtitle, and benefits grid.
 * Page wraps in <section className="premium-section-luxury premium-bg-*"> + <div className="premium-track">.
 */
const BENEFITS = [
  { icon: 'orders' as const, title: 'Track Orders', desc: 'Real-time shipment updates', bg: 'bg-amber-100', text: 'text-amber-600' },
  { icon: 'subscriptions' as const, title: 'Subscriptions', desc: 'Pause, skip, or cancel', bg: 'bg-green-100', text: 'text-green-600' },
  { icon: 'checkout' as const, title: 'Fast Checkout', desc: 'Saved payment & address', bg: 'bg-blue-100', text: 'text-blue-600' },
  { icon: 'access' as const, title: 'Early Access', desc: 'New products & offers', bg: 'bg-purple-100', text: 'text-purple-600' },
];

function IconOrders({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}

function IconSubscriptions({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
    </svg>
  );
}

function IconCheckout({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function IconAccess({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

export default function LoginBenefits() {
  return (
    <>
      <div className="premium-header-group" style={{ marginBottom: 'var(--space-header-gap)' }}>
        <h2
          className="premium-section-heading mb-2"
          style={{ letterSpacing: 'var(--letter-spacing-premium-title)' }}
          id="login-benefits-heading"
        >
          Why sign in
        </h2>
        <p className="premium-section-subtitle opacity-80" style={{ maxWidth: 'var(--premium-body-max-width)' }}>
          One account for orders, subscriptions, and faster checkout.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {BENEFITS.map((item) => (
          <div
            key={item.title}
            className="rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] p-4 md:p-5"
            style={{ border: '1px solid var(--color-premium-stroke)' }}
          >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-[var(--premium-radius-nested)] ${item.bg}`}>
              {item.icon === 'orders' && <IconOrders className={item.text} />}
              {item.icon === 'subscriptions' && <IconSubscriptions className={item.text} />}
              {item.icon === 'checkout' && <IconCheckout className={item.text} />}
              {item.icon === 'access' && <IconAccess className={item.text} />}
            </div>
            <p className="font-semibold text-[var(--color-ink)] text-sm mb-1">{item.title}</p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
