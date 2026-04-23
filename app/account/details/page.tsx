"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import { AccountSubNav } from "@/app/components/account/AccountSubNav";
import { EditProfileModal } from "@/app/components/account/EditProfileModal";
import { useAuth } from "@/app/context/AuthContext";
import { ContactSupportLink } from "@/app/components/ContactSupportLink";

export default function AccountDetailsPage() {
  const router = useRouter();
  const { customer, loading, isAuthenticated } = useAuth();
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push("/account/login");
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="brand-clinical min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border border-black/15 border-t-black/50 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-black/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !customer) return null;

  const fullName =
    [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
    customer.displayName ||
    "Not set";
  const addressParts = customer.defaultAddress
    ? [
        customer.defaultAddress.address1,
        customer.defaultAddress.address2,
        customer.defaultAddress.city,
        customer.defaultAddress.zip,
        customer.defaultAddress.country,
      ].filter(Boolean)
    : [];
  const addressFormatted = addressParts.length ? addressParts.join(", ") : "Not set";
  const phone = customer.phone || "Not set";

  return (
    <div className="brand-clinical min-h-screen bg-white text-black">
      <Navigation />
      <AccountSubNav />

      <main className="pt-3 pb-24 lg:pt-4">
        <section
          className="brand-section brand-bg-white"
          aria-labelledby="details-heading"
        >
          <div className="brand-track">
            {/* Header */}
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
                {"// Account · Details"}
              </p>
              <h1
                id="details-heading"
                className="text-3xl lg:text-4xl font-semibold text-black mb-2"
                style={{ letterSpacing: "-0.02em" }}
              >
                Your details.
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
                Contact · Delivery address · Payment
              </p>
            </div>

            {/* Contact card */}
            <DetailsCard
              counter="01"
              category="Contact"
              onEdit={() => setShowEditProfile(true)}
            >
              <DetailRow label="Name" value={fullName} />
              <DetailRow label="Email" value={customer.email} mono />
              <DetailRow label="Phone" value={phone} />
            </DetailsCard>

            <div className="h-5" />

            {/* Delivery address card */}
            <DetailsCard
              counter="02"
              category="Delivery address"
              onEdit={() => setShowEditProfile(true)}
            >
              <DetailRow label="Ships to" value={addressFormatted} isLast />
            </DetailsCard>

            <div className="h-5" />

            {/* Payment placeholder */}
            <div className="bg-white border border-black/12">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/45 tabular-nums">
                  03 · Payment
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1B2757] tabular-nums">
                  MANAGED ON FILE
                </span>
              </div>
              <div className="px-5 lg:px-6 py-5 lg:py-6">
                <p className="text-sm text-black/70 leading-relaxed mb-3">
                  Your card on file is managed directly with the subscription provider. Update it from a subscription on the Subscriptions tab, or request a secure update link by email.
                </p>
                <ContactSupportLink
                  variant="inline"
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1B2757]"
                  icon={false}
                  subject="Payment method update"
                >
                  Request payment update ↗
                </ContactSupportLink>
              </div>
            </div>

            <div className="h-10" />

            {/* Help card */}
            <div className="bg-white border border-black/12 p-5 lg:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
                Need a hand
              </p>
              <h3
                className="text-xl lg:text-2xl font-semibold text-black mb-2"
                style={{ letterSpacing: "-0.02em" }}
              >
                We can help with any account change.
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-6">
                Support · same day reply · UK team
              </p>
              <ContactSupportLink
                variant="inline"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1B2757]"
                icon={false}
              >
                Email support ↗
              </ContactSupportLink>
            </div>
          </div>
        </section>
      </main>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        customer={customer}
      />
    </div>
  );
}

function DetailsCard({
  counter,
  category,
  onEdit,
  children,
}: {
  counter: string;
  category: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-black/12">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/45 tabular-nums">
          {counter} · {category}
        </span>
        <button
          type="button"
          onClick={onEdit}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1B2757] hover:underline min-h-[36px] px-1"
        >
          Edit ↗
        </button>
      </div>
      <div className="px-5 lg:px-6 py-4 lg:py-5">{children}</div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono = false,
  isLast = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 py-3 ${
        isLast ? "" : "border-b border-black/8"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/45 tabular-nums shrink-0">
        {label}
      </p>
      <p
        className={`text-sm font-medium text-black text-right min-w-0 break-words ${
          mono ? "font-mono tracking-[0.01em]" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
