"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { CartLine } from "@/app/lib/shopify";
import { trackMetaInitiateCheckout, toContentId } from "@/app/lib/metaPixel";
import { cartHasB2BLines, getB2BLinesTotalIncVat } from "@/app/lib/b2bCartTier";
import { incVatToExVat, getVatFromIncVat } from "@/app/lib/productData";
import Image from "next/image";

// Fallback product images when Shopify doesn't provide one
const PRODUCT_FALLBACK_IMAGES: Record<string, string> = {
  "conka flow": "/CONKA_01x.jpg",
  "conka clarity": "/CONKA_02x.jpg",
  flow: "/CONKA_01x.jpg",
  clarity: "/CONKA_02x.jpg",
};

// Get fallback image based on product title
function getProductFallbackImage(productTitle: string): string {
  const lowerTitle = productTitle.toLowerCase();
  for (const [key, image] of Object.entries(PRODUCT_FALLBACK_IMAGES)) {
    if (lowerTitle.includes(key)) {
      return image;
    }
  }
  return "/bottle2.png"; // Default fallback
}

const B2B_TIER_MESSAGE_MS = 8000;
const SUBSCRIPTION_DISCOUNT = 0.2;

/** Price to display for one line (matches what the customer pays and what subtotal uses). */
function getLineDisplayPrice(
  item: CartLine,
): { amount: string; currencyCode: string } {
  const isSub = !!item.sellingPlanAllocation;
  const adjustment = item.sellingPlanAllocation?.priceAdjustments?.[0];

  if (isSub && adjustment?.price) {
    return {
      amount: adjustment.price.amount,
      currencyCode: adjustment.price.currencyCode,
    };
  }
  if (isSub && item.cost?.totalAmount?.amount && item.quantity > 0) {
    const perUnit = parseFloat(item.cost.totalAmount.amount) / item.quantity;
    return {
      amount: perUnit.toFixed(2),
      currencyCode: item.cost.totalAmount.currencyCode,
    };
  }
  return {
    amount: item.merchandise.price.amount,
    currencyCode: item.merchandise.price.currencyCode,
  };
}

/** Compare-at / original price for strikethrough. Uses currentDisplayAmount when deriving for subscriptions. */
function getCompareAtPrice(
  item: CartLine,
  currentDisplayAmount?: string,
): { amount: string; currencyCode: string } | null {
  if (item.sellingPlanAllocation?.priceAdjustments?.[0]?.compareAtPrice) {
    return item.sellingPlanAllocation.priceAdjustments[0].compareAtPrice;
  }
  if (item.merchandise.compareAtPrice) return item.merchandise.compareAtPrice;
  if (item.cost?.compareAtAmountPerQuantity) return item.cost.compareAtAmountPerQuantity;

  if (item.sellingPlanAllocation) {
    const discounted = parseFloat(
      currentDisplayAmount ?? item.merchandise.price.amount,
    );
    const original = discounted / (1 - SUBSCRIPTION_DISCOUNT);
    return {
      amount: original.toFixed(2),
      currencyCode: item.merchandise.price.currencyCode,
    };
  }
  return null;
}

/** Everything needed to render a line item's price (subscription or one-time). */
function getLinePriceInfo(item: CartLine) {
  const display = getLineDisplayPrice(item);
  const compareAt = getCompareAtPrice(item, display.amount);
  const showCompare =
    compareAt != null && parseFloat(compareAt.amount) > parseFloat(display.amount);
  return { display, compareAt, showCompare };
}

function LineItemPrice({
  item,
  formatPrice,
}: {
  item: CartLine;
  formatPrice: (amount: string, currencyCode: string) => string;
}) {
  const { display, compareAt, showCompare } = getLinePriceInfo(item);
  return (
    <div className="flex items-center gap-2">
      {showCompare && compareAt && (
        <span className="text-xs line-through opacity-50">
          {formatPrice(compareAt.amount, compareAt.currencyCode)}
        </span>
      )}
      <span
        className={`font-bold text-sm ${showCompare ? "text-amber-600" : ""}`}
      >
        {formatPrice(display.amount, display.currencyCode)}
      </span>
      {showCompare && (
        <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1 py-0.5 rounded">
          SAVE 20%
        </span>
      )}
    </div>
  );
}

export default function CartDrawer() {
  const {
    cart,
    loading,
    isOpen,
    closeCart,
    itemCount,
    updateQuantity,
    removeItem,
    getCartItems,
    b2bTierUpdatedTo,
    b2bNormalizeError,
    clearB2BTierMessage,
    clearB2BNormalizeError,
  } = useCart();

  const cartItems = getCartItems();

  const b2bTotalIncVat =
    cart && cartItems.length > 0 && cartHasB2BLines(cartItems)
      ? getB2BLinesTotalIncVat(cartItems)
      : null;
  const b2bVatBreakdown =
    b2bTotalIncVat !== null && cart
      ? {
          currencyCode: cart.cost.subtotalAmount.currencyCode ?? "GBP",
          net: incVatToExVat(b2bTotalIncVat),
          vat: getVatFromIncVat(b2bTotalIncVat),
          total: b2bTotalIncVat,
        }
      : null;

  useEffect(() => {
    if (!b2bTierUpdatedTo) return;
    const t = setTimeout(clearB2BTierMessage, B2B_TIER_MESSAGE_MS);
    return () => clearTimeout(t);
  }, [b2bTierUpdatedTo, clearB2BTierMessage]);

  // Format price from Shopify format
  const formatPrice = (amount: string, currencyCode: string = "GBP") => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const isSubscription = (item: CartLine) => !!item.sellingPlanAllocation;

  const getSavingsPercentage = (item: CartLine) => {
    if (isSubscription(item)) return 20;
    const compareAt = getCompareAtPrice(item);
    if (!compareAt) return 0;
    const original = parseFloat(compareAt.amount);
    const current = parseFloat(getLineDisplayPrice(item).amount);
    if (original <= 0) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--background)] border-l-2 border-current shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b-2 border-current">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">Your Cart</h2>
            {itemCount > 0 && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Close cart"
          >
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
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* B2B tier / error message */}
        {b2bTierUpdatedTo && (
          <div className="px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20">
            <p className="font-clinical text-sm text-black">
              Pricing tier updated to {b2bTierUpdatedTo.charAt(0).toUpperCase() + b2bTierUpdatedTo.slice(1)}.
            </p>
          </div>
        )}
        {b2bNormalizeError && (
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between gap-2">
            <p className="font-clinical text-sm text-black">
              {b2bNormalizeError}
            </p>
            <button
              type="button"
              onClick={clearB2BNormalizeError}
              className="shrink-0 font-clinical text-xs underline"
              aria-label="Dismiss"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {loading && cartItems.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center opacity-50">
                <div className="w-8 h-8 border-2 border-current/20 border-t-current rounded-full animate-spin mx-auto mb-2" />
                <p className="font-clinical text-sm">Loading cart...</p>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex items-center justify-center h-full p-4 text-center opacity-50">
              <div>
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
                  className="mx-auto mb-4 opacity-50"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <p className="font-clinical text-sm">Your cart is empty</p>
                <p className="font-commentary text-sm mt-1">
                  add some brain fuel!
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 border-2 border-current/10 rounded-lg"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-current/5 rounded overflow-hidden">
                    <Image
                      src={
                        item.merchandise.product.featuredImage?.url ||
                        getProductFallbackImage(item.merchandise.product.title)
                      }
                      alt={
                        item.merchandise.product.featuredImage?.altText ||
                        item.merchandise.product.title
                      }
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">
                      {item.merchandise.product.title}
                    </h3>
                    <p className="font-clinical text-xs opacity-70 truncate">
                      {item.merchandise.title}
                    </p>

                    <div className="mt-1">
                      {isSubscription(item) && (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 text-[10px] font-bold px-1.5 py-0.5 rounded mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                          SUBSCRIPTION
                        </span>
                      )}
                      <LineItemPrice item={item} formatPrice={formatPrice} />
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={loading}
                        className="w-7 h-7 flex items-center justify-center border-2 border-current rounded hover:bg-current/10 transition-colors disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                      <span className="font-clinical text-sm w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={loading}
                        className="w-7 h-7 flex items-center justify-center border-2 border-current rounded hover:bg-current/10 transition-colors disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={loading}
                        className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                        aria-label="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-current bg-[var(--background)]">
          {cart && cartItems.length > 0 && (
            <>
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-clinical text-sm">Subtotal</span>
                <span className="font-bold text-lg">
                  {formatPrice(
                    cart.cost.subtotalAmount.amount,
                    cart.cost.subtotalAmount.currencyCode,
                  )}
                </span>
              </div>

              {/* B2B VAT message and breakdown */}
              {b2bVatBreakdown && (
                <div className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
                  <p className="font-clinical text-xs text-black mb-2">
                    Prices include VAT at 20%. Please email sales@conka.io for an invoice after purchase.
                  </p>
                  <p className="font-clinical text-[11px] opacity-80">
                    Breakdown: {formatPrice(b2bVatBreakdown.net.toFixed(2), b2bVatBreakdown.currencyCode)} net + {formatPrice(b2bVatBreakdown.vat.toFixed(2), b2bVatBreakdown.currencyCode)} VAT (20%) = {formatPrice(b2bVatBreakdown.total.toFixed(2), b2bVatBreakdown.currencyCode)} (included in subtotal above)
                  </p>
                </div>
              )}

              {/* Shipping Note */}
              <p className="font-clinical text-xs text-center opacity-60 mb-4">
                Shipping & taxes calculated at checkout
              </p>
            </>
          )}

          {/* Checkout Button */}
          <a
            href={cart?.checkoutUrl || "#"}
            onClick={(e) => {
              if (!cart?.checkoutUrl || cartItems.length === 0) {
                e.preventDefault();
                return;
              }
              // Meta Pixel + CAPI InitiateCheckout (non-blocking)
              trackMetaInitiateCheckout({
                content_ids: cartItems.map((line) =>
                  toContentId(line.merchandise.id)
                ),
                value: parseFloat(cart.cost.subtotalAmount.amount),
                currency: cart.cost.subtotalAmount.currencyCode ?? "GBP",
                num_items: cart.totalQuantity ?? 0,
              });
            }}
            className={`block w-full neo-button py-3 font-semibold text-center ${
              cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full animate-spin" />
                Updating...
              </span>
            ) : cartItems.length === 0 ? (
              "Cart is Empty"
            ) : (
              "Checkout"
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
