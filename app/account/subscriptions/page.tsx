"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useSubscriptions, Subscription } from "@/app/hooks/useSubscriptions";
import { CancellationModal } from "@/app/components/subscriptions/CancellationModal";
import { EditSubscriptionModal } from "@/app/components/subscriptions/EditSubscriptionModal";
import { SubscriptionsPageHeader } from "@/app/components/subscriptions/SubscriptionsPageHeader";
import { SubscriptionSummaryStats } from "@/app/components/subscriptions/SubscriptionSummaryStats";
import { EmptySubscriptionsState } from "@/app/components/subscriptions/EmptySubscriptionsState";
import { SubscriptionCard } from "@/app/components/subscriptions/SubscriptionCard";
import { PastSubscriptionCard } from "@/app/components/subscriptions/PastSubscriptionCard";
import { SubscriptionsHelpCard } from "@/app/components/subscriptions/SubscriptionsHelpCard";
import {
  getProtocolFromSubscription,
  getCurrentPlan,
  getTierDisplayInfo,
  getSubscriptionType,
  getCurrentFormulaId,
  getCurrentPackSizeForFormula,
} from "@/app/account/subscriptions/utils";

type SubscriptionTier = "starter" | "pro" | "max";

export default function SubscriptionsPage() {
  const router = useRouter();
  const { customer, isAuthenticated, loading: authLoading } = useAuth();
  const {
    subscriptions,
    loading,
    error,
    fetchSubscriptions,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    changePlan,
  } = useSubscriptions();

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState<Subscription | null>(null);
  const [successMessage, setSuccessMessage] = useState<{
    subscriptionId: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/account/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (customer) {
      fetchSubscriptions();
    }
  }, [customer, fetchSubscriptions]);

  const handleTogglePause = async (subscription: Subscription) => {
    setActionLoading(subscription.id);
    if (subscription.status === "paused") {
      await resumeSubscription(subscription.id);
    } else {
      await pauseSubscription(subscription.id);
    }
    await fetchSubscriptions();
    setActionLoading(null);
  };

  const getTierFromQuantity = (quantity: number): SubscriptionTier => {
    if (quantity >= 28) return "max";
    if (quantity >= 12) return "pro";
    return "starter";
  };

  const handleCancelFromModal = async (
    reason: string,
    _comment?: string
  ): Promise<boolean> => {
    if (!showCancelModal) return false;
    const success = await cancelSubscription(showCancelModal, reason);
    if (success) {
      await fetchSubscriptions();
    }
    return success;
  };

  const handleChangePlan = async (
    protocolId: string,
    plan: "starter" | "pro" | "max"
  ): Promise<{ success: boolean; message?: string }> => {
    if (!showEditModal)
      return { success: false, message: "No subscription selected" };
    const subscriptionId = showEditModal.id;
    setActionLoading(subscriptionId);
    const result = await changePlan(subscriptionId, plan, protocolId);
    setActionLoading(null);

    if (result.success) {
      setShowEditModal(null);
      setSuccessMessage({
        subscriptionId,
        message: "Plan updated successfully!",
      });
      await fetchSubscriptions();
      setTimeout(() => setSuccessMessage(null), 5000);
    }

    return result;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--color-ink)]/20 border-t-[var(--color-ink)] rounded-full animate-spin mx-auto mb-4" />
          <p className="premium-body-sm text-[var(--text-on-light-muted)]">
            Loading subscriptions...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const activeSubscriptions = subscriptions.filter(
    (s) => s.status === "active" || s.status === "paused"
  );
  const inactiveSubscriptions = subscriptions.filter(
    (s) => s.status === "cancelled" || s.status === "expired"
  );

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <Navigation />

      <main className="pt-3 pb-24 lg:pt-4">
        <section
          className="premium-section-luxury bg-[var(--color-surface)]"
          aria-labelledby="subscriptions-heading"
        >
          <div className="premium-track">
            <SubscriptionsPageHeader />

            {subscriptions.length > 0 && (
              <SubscriptionSummaryStats
                activeCount={activeSubscriptions.filter((s) => s.status === "active").length}
                pausedCount={activeSubscriptions.filter((s) => s.status === "paused").length}
                pastCount={inactiveSubscriptions.length}
              />
            )}

            {error && (
              <div className="rounded-[var(--premium-radius-card)] border border-red-200 bg-red-50 p-6 mb-8">
                <p className="premium-body text-red-700">{error}</p>
              </div>
            )}

            {subscriptions.length === 0 ? (
              <EmptySubscriptionsState />
            ) : (
              <div className="space-y-6">
                {activeSubscriptions.length > 0 && (
                  <div>
                    <h2 className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-6">
                      Active & paused
                    </h2>
                    <div className="space-y-6">
                      {activeSubscriptions.map((subscription) => (
                        <SubscriptionCard
                          key={subscription.id}
                          subscription={subscription}
                          tierInfo={getTierDisplayInfo(subscription)}
                          successMessage={
                            successMessage?.subscriptionId === subscription.id
                              ? successMessage.message
                              : null
                          }
                          isActionLoading={actionLoading === subscription.id}
                          onEdit={() => setShowEditModal(subscription)}
                          onTogglePause={() => handleTogglePause(subscription)}
                          onCancel={() => setShowCancelModal(subscription.id)}
                          onDismissSuccess={() => setSuccessMessage(null)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {inactiveSubscriptions.length > 0 && (
                  <div className="mt-10">
                    <h2 className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-6">
                      Past subscriptions
                    </h2>
                    <div className="space-y-4">
                      {inactiveSubscriptions.map((subscription) => (
                        <PastSubscriptionCard
                          key={subscription.id}
                          subscription={subscription}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <SubscriptionsHelpCard />
          </div>
        </section>
      </main>

      <CancellationModal
        isOpen={!!showCancelModal}
        onClose={() => setShowCancelModal(null)}
        onCancel={handleCancelFromModal}
        subscriptionName={
          subscriptions.find((s) => s.id === showCancelModal)?.product.title ||
          "Subscription"
        }
        currentPlan={
          showCancelModal
            ? getTierFromQuantity(
                subscriptions.find((s) => s.id === showCancelModal)?.quantity ??
                  12
              )
            : undefined
        }
      />

      <EditSubscriptionModal
        isOpen={!!showEditModal}
        onClose={() => setShowEditModal(null)}
        onSave={handleChangePlan}
        subscriptionName={showEditModal?.product.title || "Subscription"}
        subscriptionType={showEditModal ? getSubscriptionType(showEditModal) : "protocol"}
        currentProtocolId={
          showEditModal ? getProtocolFromSubscription(showEditModal) : "1"
        }
        currentTier={showEditModal ? getCurrentPlan(showEditModal) : "pro"}
        currentFormulaId={showEditModal ? getCurrentFormulaId(showEditModal) : undefined}
        currentPackSize={showEditModal ? getCurrentPackSizeForFormula(showEditModal) : undefined}
        nextBillingDate={showEditModal?.nextBillingDate}
        loading={actionLoading === showEditModal?.id}
        hasUnfulfilledFirstOrder={showEditModal?.hasUnfulfilledOrder ?? false}
      />
    </div>
  );
}
