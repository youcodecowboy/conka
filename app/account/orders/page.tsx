"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import { useAuth } from "@/app/context/AuthContext";
import type { Order } from "@/app/account/orders/utils";
import { OrdersPageHeader } from "@/app/components/orders/OrdersPageHeader";
import { OrderSummaryStats } from "@/app/components/orders/OrderSummaryStats";
import { EmptyOrdersState } from "@/app/components/orders/EmptyOrdersState";
import { OrderCard } from "@/app/components/orders/OrderCard";
import { OrdersHelpCard } from "@/app/components/orders/OrdersHelpCard";

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/account/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/auth/orders", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
          setError(null);
        } else {
          const data = await response.json();
          setError(data.error || "Failed to load orders");
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--color-ink)]/20 border-t-[var(--color-ink)] rounded-full animate-spin mx-auto mb-4" />
          <p className="premium-body-sm text-[var(--text-on-light-muted)]">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const deliveredCount = orders.filter(
    (o) => o.fulfillmentStatus?.toLowerCase() === "fulfilled"
  ).length;
  const inProgressCount = orders.filter(
    (o) =>
      o.fulfillmentStatus?.toLowerCase() !== "fulfilled" &&
      o.financialStatus?.toLowerCase() === "paid"
  ).length;

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <Navigation />

      <main className="pt-3 pb-24 lg:pt-4">
        <section
          className="premium-section-luxury premium-bg-bone"
          aria-labelledby="orders-heading"
        >
          <div className="premium-track">
            <OrdersPageHeader />

          {orders.length > 0 && (
              <OrderSummaryStats
                totalCount={orders.length}
                deliveredCount={deliveredCount}
                inProgressCount={inProgressCount}
              />
            )}

          {error && (
              <div className="rounded-[var(--premium-radius-card)] border border-red-200 bg-red-50 p-6 mb-8">
                <p className="premium-body text-red-700">{error}</p>
            </div>
          )}

          {orders.length === 0 ? (
              <EmptyOrdersState />
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    isExpanded={expandedOrder === order.id}
                    onToggle={() => toggleOrder(order.id)}
                  />
                ))}
            </div>
          )}

            {orders.length > 0 && <OrdersHelpCard />}
            </div>
        </section>
      </main>
    </div>
  );
}
