import { ContactSupportLink } from "@/app/components/ContactSupportLink";

export function SubscriptionsHelpCard() {
  return (
    <div className="mt-14 rounded-[var(--premium-radius-card)] bg-[var(--color-ink)] border border-[var(--color-ink)] p-8 text-center">
      <h3
        className="font-semibold text-lg text-[var(--color-bone)] mb-2"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Need help?
      </h3>
      <p className="premium-body text-[var(--color-bone)]/80 mb-6 max-w-[50ch] mx-auto">
        We can help with any subscription questions.
      </p>
      <ContactSupportLink variant="button-secondary" />
    </div>
  );
}
