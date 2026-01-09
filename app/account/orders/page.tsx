'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { useAuth } from '@/app/context/AuthContext';

interface OrderLineItem {
  title: string;
  quantity: number;
  image?: {
    url: string;
    altText?: string;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
}

interface ShippingAddress {
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  orderName?: string;
  processedAt: string;
  cancelledAt?: string;
  cancelReason?: string;
  fulfillmentStatus: string;
  financialStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  subtotal?: {
    amount: string;
    currencyCode: string;
  };
  totalShipping?: {
    amount: string;
    currencyCode: string;
  };
  totalTax?: {
    amount: string;
    currencyCode: string;
  };
  shippingAddress?: ShippingAddress | null;
  lineItems: OrderLineItem[];
}

// Order status steps for timeline
const ORDER_STEPS = ['Placed', 'Paid', 'Processing', 'Shipped', 'Delivered'];

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/account/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch orders from Customer Account API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/auth/orders', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
          setError(null);
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to load orders');
          setOrders([]);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

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

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // Get current step index based on order status
  // Returns: { current: number, completed: number[] }
  const getOrderProgress = (order: Order) => {
    const { financialStatus, fulfillmentStatus, cancelledAt } = order;
    
    // If cancelled, show special state
    if (cancelledAt) {
      return { current: -1, completed: [], cancelled: true };
    }
    
    const completed: number[] = [];
    let current = 0;
    
    // Step 0: Placed - always completed once order exists
    completed.push(0);
    current = 0;
    
    // Step 1: Paid
    const isPaid = financialStatus?.toLowerCase() === 'paid';
    if (isPaid) {
      completed.push(1);
      current = 1;
    }
    
    // Step 2: Processing - we're here if paid but not yet shipped
    const fulfillment = fulfillmentStatus?.toLowerCase() || 'unfulfilled';
    if (isPaid && (fulfillment === 'unfulfilled' || fulfillment === 'in_progress')) {
      current = 2;
    }
    
    // Step 3: Shipped
    if (fulfillment === 'partially_fulfilled' || fulfillment === 'in_transit') {
      completed.push(2); // Processing done
      current = 3;
    }
    
    // Step 4: Delivered
    if (fulfillment === 'fulfilled' || fulfillment === 'delivered') {
      completed.push(2); // Processing done
      completed.push(3); // Shipped done
      completed.push(4); // Delivered
      current = 4;
    }
    
    return { current, completed, cancelled: false };
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'fulfilled':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'unfulfilled':
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'fulfilled':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        );
      case 'paid':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
        );
      case 'unfulfilled':
      case 'in_progress':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
    }
  };

  // Toggle order expansion
  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
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

      <main className="pt-24 pb-24 lg:pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-2">
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
            <div>
              <p className="font-commentary text-lg opacity-70">your</p>
              <h1 className="text-3xl font-bold">Order History</h1>
            </div>
          </div>

          {/* Summary Stats */}
          {orders.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-8 mt-6">
              <div className="neo-box p-4 text-center">
                <p className="font-clinical text-2xl font-bold">{orders.length}</p>
                <p className="font-clinical text-xs opacity-50 uppercase">Total Orders</p>
              </div>
              <div className="neo-box p-4 text-center">
                <p className="font-clinical text-2xl font-bold text-green-600">
                  {orders.filter(o => o.fulfillmentStatus?.toLowerCase() === 'fulfilled').length}
                </p>
                <p className="font-clinical text-xs opacity-50 uppercase">Delivered</p>
              </div>
              <div className="neo-box p-4 text-center">
                <p className="font-clinical text-2xl font-bold text-blue-600">
                  {orders.filter(o => 
                    o.fulfillmentStatus?.toLowerCase() !== 'fulfilled' && 
                    o.financialStatus?.toLowerCase() === 'paid'
                  ).length}
                </p>
                <p className="font-clinical text-xs opacity-50 uppercase">In Progress</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="neo-box p-6 text-center mb-6 border-red-200 bg-red-50">
              <p className="text-red-600 font-clinical">{error}</p>
            </div>
          )}

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="neo-box p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h2 className="font-bold text-2xl mb-2">No orders yet</h2>
              <p className="font-clinical text-sm opacity-70 mb-8 max-w-sm mx-auto">
                Once you place an order, you&apos;ll be able to track it here and see your complete order history.
              </p>
              
              {/* Product Recommendations */}
              <div className="border-t-2 border-current/10 pt-8 mt-8">
                <p className="font-clinical text-xs uppercase opacity-50 mb-4">Start Shopping</p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <Link 
                    href="/conka-flow"
                    className="neo-box p-4 hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all text-left"
                  >
                    <div className="w-8 h-8 bg-amber-500 rounded mb-3"></div>
                    <p className="font-bold text-sm">Conka Flow</p>
                    <p className="font-clinical text-xs opacity-70">Caffeine-Free Focus</p>
                  </Link>
                  <Link 
                    href="/conka-clarity"
                    className="neo-box p-4 hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all text-left"
                  >
                    <div className="w-8 h-8 bg-[#AAB9BC] rounded mb-3"></div>
                    <p className="font-bold text-sm">Conka Clarity</p>
                    <p className="font-clinical text-xs opacity-70">Peak Performance</p>
                  </Link>
                </div>
                <Link 
                  href="/quiz"
                  className="neo-button px-8 py-3 font-bold mt-6 inline-flex items-center gap-2"
                >
                  Find Your Protocol
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const isExpanded = expandedOrder === order.id;
                const progress = getOrderProgress(order);
                const firstItemImage = order.lineItems[0]?.image;
                
                return (
                  <div key={order.id} className="neo-box overflow-hidden">
                    {/* Order Header - Clickable */}
                    <button
                      onClick={() => toggleOrder(order.id)}
                      className="w-full p-6 text-left hover:bg-current/5 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {/* Product Image or Icon */}
                          {firstItemImage?.url ? (
                            <div className="w-16 h-16 rounded-lg bg-current/5 flex-shrink-0 overflow-hidden">
                              <img
                                src={firstItemImage.url}
                                alt={firstItemImage.altText || 'Order item'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex-shrink-0 flex items-center justify-center">
                              {getStatusIcon(order.fulfillmentStatus || order.financialStatus)}
                            </div>
                          )}
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">
                                Order #{order.orderNumber}
                              </h3>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                  progress.cancelled 
                                    ? 'bg-red-100 text-red-800'
                                    : getStatusColor(order.fulfillmentStatus || order.financialStatus)
                                }`}
                              >
                                {progress.cancelled ? 'Cancelled' : (order.fulfillmentStatus || order.financialStatus || 'Processing')}
                              </span>
                            </div>
                            <p className="font-clinical text-sm opacity-70">
                              {formatDate(order.processedAt)} · {formatRelativeTime(order.processedAt)}
                            </p>
                            {/* Quick summary of items */}
                            <p className="font-clinical text-xs opacity-50 mt-1">
                              {order.lineItems.map(item => item.title).slice(0, 2).join(', ')}
                              {order.lineItems.length > 2 && ` +${order.lineItems.length - 2} more`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              {formatPrice(
                                order.totalPrice.amount,
                                order.totalPrice.currencyCode
                              )}
                            </p>
                            <p className="font-clinical text-xs opacity-50">
                              {order.lineItems.reduce((acc, item) => acc + item.quantity, 0)} item{order.lineItems.reduce((acc, item) => acc + item.quantity, 0) !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t-2 border-current/10">
                        {/* Status Timeline - Improved */}
                        <div className="p-6 bg-gray-50">
                          <p className="font-clinical text-xs uppercase opacity-50 mb-4">Order Status</p>
                          
                          {progress.cancelled ? (
                            <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="15" y1="9" x2="9" y2="15"/>
                                <line x1="9" y1="9" x2="15" y2="15"/>
                              </svg>
                              <div>
                                <p className="font-bold text-sm text-red-800">Order Cancelled</p>
                                {order.cancelReason && (
                                  <p className="font-clinical text-xs text-red-700 mt-0.5">
                                    Reason: {order.cancelReason}
                                  </p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="relative">
                              {/* Progress bar background */}
                              <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200 mx-[calc(10%)]" />
                              {/* Progress bar fill */}
                              <div 
                                className="absolute top-3 left-0 h-0.5 bg-green-500 mx-[calc(10%)] transition-all duration-500"
                                style={{ 
                                  width: `calc(${Math.min(progress.current, 4) / 4 * 80}%)`,
                                }}
                              />
                              
                              <div className="relative flex items-start justify-between">
                                {ORDER_STEPS.map((step, index) => {
                                  const isCompleted = progress.completed.includes(index);
                                  const isCurrent = progress.current === index;
                                  const isPast = index < progress.current;
                                  const isActive = isCompleted || isCurrent;
                                  
                                  return (
                                    <div key={step} className="flex flex-col items-center" style={{ width: '20%' }}>
                                      {/* Step Circle */}
                                      <div 
                                        className={`w-6 h-6 rounded-full flex items-center justify-center relative z-10 transition-all ${
                                          isCompleted || isPast
                                            ? 'bg-green-500 text-white' 
                                            : isCurrent
                                              ? 'bg-green-500 text-white ring-4 ring-green-100'
                                              : 'bg-gray-200 text-gray-400'
                                        }`}
                                      >
                                        {isCompleted || isPast ? (
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"/>
                                          </svg>
                                        ) : (
                                          <span className="text-xs font-bold">{index + 1}</span>
                                        )}
                                      </div>
                                      {/* Step Label */}
                                      <p className={`font-clinical text-xs mt-2 text-center ${
                                        isActive ? 'opacity-100 font-semibold' : 'opacity-40'
                                      }`}>
                                        {step}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Shipping Address */}
                        {order.shippingAddress && (
                          <div className="p-6">
                            <div className="p-4 bg-current/5 border-2 border-current/10 rounded-lg">
                              <div className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0 mt-0.5">
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                  <circle cx="12" cy="10" r="3"/>
                                </svg>
                                <div>
                                  <p className="font-bold text-sm mb-1">Delivery Address</p>
                                  <div className="font-clinical text-sm opacity-70 space-y-0.5">
                                    {order.shippingAddress.address1 && (
                                      <p>{order.shippingAddress.address1}</p>
                                    )}
                                    {order.shippingAddress.address2 && (
                                      <p>{order.shippingAddress.address2}</p>
                                    )}
                                    <p>
                                      {[
                                        order.shippingAddress.city,
                                        order.shippingAddress.province,
                                        order.shippingAddress.zip
                                      ].filter(Boolean).join(', ')}
                                    </p>
                                    {order.shippingAddress.country && (
                                      <p>{order.shippingAddress.country}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Order Items */}
                        <div className="p-6 pt-0">
                          <p className="font-clinical text-xs uppercase opacity-50 mb-4">Items</p>
                          <div className="space-y-3">
                            {order.lineItems.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-current/5 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  {item.image?.url ? (
                                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                      <img 
                                        src={item.image.url} 
                                        alt={item.image.altText || item.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-12 h-12 rounded bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center flex-shrink-0">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                                        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                                        <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                                      </svg>
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-bold text-sm block">
                                      {item.title}
                                    </span>
                                    <span className="font-clinical text-xs opacity-50">
                                      {formatPrice(item.price.amount, item.price.currencyCode)} each
                                    </span>
                                  </div>
                                </div>
                                <span className="font-clinical text-sm opacity-70">
                                  × {item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Order Summary */}
                          <div className="mt-6 pt-4 border-t-2 border-current/10">
                            <p className="font-clinical text-xs uppercase opacity-50 mb-3">Order Summary</p>
                            <div className="space-y-2">
                              {order.subtotal && (
                                <div className="flex justify-between font-clinical text-sm">
                                  <span className="opacity-70">Subtotal</span>
                                  <span>{formatPrice(order.subtotal.amount, order.subtotal.currencyCode)}</span>
                                </div>
                              )}
                              {order.totalShipping && parseFloat(order.totalShipping.amount) > 0 && (
                                <div className="flex justify-between font-clinical text-sm">
                                  <span className="opacity-70">Shipping</span>
                                  <span>{formatPrice(order.totalShipping.amount, order.totalShipping.currencyCode)}</span>
                                </div>
                              )}
                              {order.totalShipping && parseFloat(order.totalShipping.amount) === 0 && (
                                <div className="flex justify-between font-clinical text-sm">
                                  <span className="opacity-70">Shipping</span>
                                  <span className="text-green-600">Free</span>
                                </div>
                              )}
                              {order.totalTax && parseFloat(order.totalTax.amount) > 0 && (
                                <div className="flex justify-between font-clinical text-sm">
                                  <span className="opacity-70">Tax</span>
                                  <span>{formatPrice(order.totalTax.amount, order.totalTax.currencyCode)}</span>
                                </div>
                              )}
                              <div className="flex justify-between items-center pt-2 border-t border-current/10">
                                <span className="font-bold">Total</span>
                                <span className="font-bold text-xl">
                                  {formatPrice(
                                    order.totalPrice.amount,
                                    order.totalPrice.currencyCode
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 mt-6">
                            <Link
                              href="/quiz"
                              className="neo-button px-6 py-2.5 text-sm font-semibold flex items-center gap-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                                <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                              </svg>
                              Order Again
                            </Link>
                            <a
                              href={`mailto:support@conka.com?subject=Order%20%23${order.orderNumber}`}
                              className="neo-button-outline px-6 py-2.5 text-sm font-semibold flex items-center gap-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                <line x1="12" y1="17" x2="12.01" y2="17"/>
                              </svg>
                              Get Help
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Help Section */}
          {orders.length > 0 && (
            <div className="mt-12 neo-box p-6 text-center">
              <h3 className="font-bold text-lg mb-2">Questions About Your Order?</h3>
              <p className="font-clinical text-sm opacity-70 mb-4">
                Our team is here to help with tracking, returns, or any other questions
              </p>
              <a
                href="mailto:support@conka.com"
                className="neo-button-outline px-6 py-2 font-semibold text-sm inline-flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Contact Support
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
