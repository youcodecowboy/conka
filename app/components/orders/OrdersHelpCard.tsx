import { ContactSupportLink } from "@/app/components/ContactSupportLink";

export function OrdersHelpCard() {
  return (
    <div className="mt-14 bg-white border border-black/12 p-8 text-center">
      <h3
        className="font-semibold text-lg text-black mb-2"
        style={{ letterSpacing: "-0.02em" }}
      >
        Questions about your order?
      </h3>
      <p className="text-sm text-black/60 mb-6 max-w-[50ch] mx-auto">
        Our team is here to help with tracking, returns, or any other questions.
      </p>
      <ContactSupportLink variant="button-primary" />
    </div>
  );
}
