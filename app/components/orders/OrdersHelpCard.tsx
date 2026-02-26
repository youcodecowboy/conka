import { ContactSupportLink } from "@/app/components/ContactSupportLink";

export function OrdersHelpCard() {
  return (
    <div className="mt-14 rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] bg-[var(--color-bone)] shadow-sm p-8 text-center">
      <h3
        className="font-semibold text-lg text-[var(--color-ink)] mb-2"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Questions about your order?
      </h3>
      <p className="premium-body text-[var(--text-on-light-muted)] mb-6 max-w-[50ch] mx-auto">
        Our team is here to help with tracking, returns, or any other questions.
      </p>
      <ContactSupportLink variant="button-primary" />
    </div>
  );
}
