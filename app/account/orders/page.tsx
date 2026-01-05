'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { useAuth } from '@/app/context/AuthContext';

interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
      };
    }>;
  };
}

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, getAccessToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/account/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      const token = getAccessToken();
      if (!token) return;

      try {
        const response = await fetch('/api/auth/customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessToken: token,
            includeOrders: true,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        } else {
          setError('Failed to load orders');
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, getAccessToken]);

  // Format price
  const formatPrice = (amount: string, currencyCode: string = 'GBP') => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(num);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'fulfilled':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'unfulfilled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <div
        className="min-h-screen theme-conka-flow flex items-center justify-center"
        style={{ background: 'var(--background)', color: 'var(--foreground)' }}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-current/20 border-t-current rounded-full animate-spin mx-auto mb-4" />
          <p className="font-clinical text-sm opacity-50">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <Navigation />

      <main className="pt-8 pb-24 lg:pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/account"
              className="p-2 hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold">Order History</h1>
          </div>

          {/* Error State */}
          {error && (
            <div className="neo-box p-6 text-center mb-6">
              <p className="text-red-600 font-clinical">{error}</p>
            </div>
          )}

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="neo-box p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 opacity-30"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <h2 className="font-bold text-xl mb-2">No orders yet</h2>
              <p className="font-clinical text-sm opacity-70 mb-6">
                Your order history will appear here
              </p>
              <Link href="/conka-flow" className="neo-button px-8 py-3 font-bold">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="neo-box p-6">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-lg">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="font-clinical text-sm opacity-70">
                        {formatDate(order.processedAt)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                          order.financialStatus
                        )}`}
                      >
                        {order.financialStatus}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                          order.fulfillmentStatus
                        )}`}
                      >
                        {order.fulfillmentStatus || 'Processing'}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t-2 border-current/10 pt-4">
                    <div className="space-y-2">
                      {order.lineItems.edges.map((edge, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="font-clinical text-sm">
                            {edge.node.title}
                          </span>
                          <span className="font-clinical text-sm opacity-70">
                            × {edge.node.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-current/10">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-lg">
                        {formatPrice(
                          order.totalPrice.amount,
                          order.totalPrice.currencyCode
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

