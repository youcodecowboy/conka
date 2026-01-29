'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Cart, CartLine } from '@/app/lib/shopify';
import { trackAddToCart } from '@/app/lib/tripleWhale';
import { trackPurchaseAddToCart } from '@/app/lib/analytics';
import { extractProductMetadata } from '@/app/lib/productMetadata';
import { getB2BCartTierUpdates } from '@/app/lib/b2bCartTier';
import type { B2BTier } from '@/app/lib/productData';

const CART_ID_KEY = 'shopify_cart_id';
const B2B_NORMALIZE_ERROR_MSG = "Couldn't update volume pricing. Please try again.";

interface AddToCartMetadata {
  location?: string;  // "hero", "sticky_footer", "results_page", "calendar"
  source?: string;   // "quiz", "menu", "direct", "cta"
  sessionId?: string; // Quiz session ID
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (
    variantId: string,
    quantity?: number,
    sellingPlanId?: string,
    metadata?: AddToCartMetadata
  ) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clearCart: () => void;
  getCartItems: () => CartLine[];
  b2bTierUpdatedTo: B2BTier | null;
  b2bNormalizeError: string | null;
  clearB2BTierMessage: () => void;
  clearB2BNormalizeError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [b2bTierUpdatedTo, setB2bTierUpdatedTo] = useState<B2BTier | null>(null);
  const [b2bNormalizeError, setB2bNormalizeError] = useState<string | null>(null);

  const clearB2BTierMessage = useCallback(() => setB2bTierUpdatedTo(null), []);
  const clearB2BNormalizeError = useCallback(() => setB2bNormalizeError(null), []);

  // B2B: normalize cart to one tier; returns updated cart or null on API failure
  const normalizeB2BTier = useCallback(async (c: Cart): Promise<Cart | null> => {
    const lines = c.lines?.edges?.map((e) => e.node) ?? [];
    const { updates, tier } = getB2BCartTierUpdates(lines);
    if (updates.length === 0) return c;
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateMultiple',
          cartId: c.id,
          lines: updates.map((u) => ({
            id: u.lineId,
            merchandiseId: u.merchandiseId,
            ...(u.sellingPlanId != null && { sellingPlanId: u.sellingPlanId }),
          })),
        }),
      });
      const data = await response.json();
      if (response.ok && data.cart) {
        setB2bTierUpdatedTo(tier);
        setB2bNormalizeError(null);
        return data.cart;
      }
    } catch {
      // ignore
    }
    setB2bNormalizeError(B2B_NORMALIZE_ERROR_MSG);
    return null;
  }, []);

  // Calculate item count
  const itemCount = cart?.totalQuantity || 0;

  // Cart drawer controls (clear B2B message when closing)
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => {
    setIsOpen(false);
    setB2bTierUpdatedTo(null);
  }, []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  // Get cart items as flat array
  const getCartItems = useCallback((): CartLine[] => {
    if (!cart?.lines?.edges) return [];
    return cart.lines.edges.map((edge) => edge.node);
  }, [cart]);

  // Fetch cart from Shopify
  const fetchCart = useCallback(async (cartId: string): Promise<Cart | null> => {
    try {
      const response = await fetch(`/api/cart?cartId=${encodeURIComponent(cartId)}`);
      const data = await response.json();

      if (response.ok && data.cart) {
        const next = await normalizeB2BTier(data.cart);
        setCart(next ?? data.cart);
        return next ?? data.cart;
      } else {
        localStorage.removeItem(CART_ID_KEY);
        setCart(null);
        return null;
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      localStorage.removeItem(CART_ID_KEY);
      setCart(null);
      return null;
    }
  }, [normalizeB2BTier]);

  // Load cart from localStorage on mount - deferred to not block initial render
  useEffect(() => {
    // Use requestIdleCallback to defer cart fetch until browser is idle
    // This prevents blocking the main thread during initial page load
    const loadCart = () => {
      const savedCartId = localStorage.getItem(CART_ID_KEY);
      if (savedCartId) {
        fetchCart(savedCartId);
      }
    };

    // Defer cart loading to after initial render and paint
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadCart, { timeout: 2000 });
    } else {
      // Fallback for Safari - defer by 100ms
      setTimeout(loadCart, 100);
    }
  }, [fetchCart]);

  // Create a new cart
  const createCart = async (variantId?: string, quantity?: number, sellingPlanId?: string): Promise<{ cart: Cart | null; warning?: string }> => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          variantId,
          quantity,
          sellingPlanId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.cart) {
        setCart(data.cart);
        localStorage.setItem(CART_ID_KEY, data.cart.id);
        return { cart: data.cart, warning: data.warning };
      } else {
        throw new Error(data.error || 'Failed to create cart');
      }
    } catch (err) {
      console.error('Failed to create cart:', err);
      throw err;
    }
  };

  // Add item to cart
  // sellingPlanId is optional - used for subscription products (e.g., Loop Subscriptions)
  // metadata is optional - used for analytics tracking (location, source, sessionId)
  const addToCart = useCallback(async (
    variantId: string,
    quantity: number = 1,
    sellingPlanId?: string,
    metadata?: AddToCartMetadata
  ): Promise<void> => {
    if (!variantId) {
      setError('Invalid product variant');
      return;
    }

    setLoading(true);
    setError(null);
    setB2bNormalizeError(null);

    try {
      const cartId = cart?.id || localStorage.getItem(CART_ID_KEY);
      let warning: string | undefined;
      let updatedCart: Cart | null = null;

      if (!cartId) {
        const result = await createCart(variantId, quantity, sellingPlanId);
        warning = result.warning;
        updatedCart = result.cart;
      } else {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'add',
            cartId,
            variantId,
            quantity,
            sellingPlanId,
          }),
        });

        const data = await response.json();

        if (response.ok && data.cart) {
          updatedCart = data.cart;
          setCart(data.cart);
          warning = data.warning;
        } else if (response.status === 404) {
          const result = await createCart(variantId, quantity, sellingPlanId);
          warning = result.warning;
          updatedCart = result.cart;
        } else {
          throw new Error(data.error || 'Failed to add item');
        }
      }

      if (updatedCart) {
        const next = await normalizeB2BTier(updatedCart);
        if (next) setCart(next);
      }
      
      // Show warning if subscription wasn't available (as console log for now)
      if (warning) {
        console.warn('Cart warning:', warning);
        // Could display this in UI via a toast notification in the future
      }
      
      // Track analytics events after successful cart update
      if (updatedCart) {
        // Get the newly added line item (first item in cart or last added)
        const lineItems = updatedCart.lines?.edges || [];
        const newLineItem = lineItems[lineItems.length - 1]?.node;

        if (newLineItem?.merchandise) {
          const merchandise = newLineItem.merchandise;
          
          // Track Triple Whale AddToCart (e-commerce)
          if (merchandise.product?.id && merchandise.id) {
            trackAddToCart({
              productId: merchandise.product.id,
              variantId: merchandise.id,
              quantity: quantity,
              cartToken: updatedCart.id,
            });
          }

          // Track Vercel Analytics purchase:add_to_cart (funnel)
          const productMetadata = extractProductMetadata(variantId);
          if (productMetadata) {
            trackPurchaseAddToCart({
              productType: productMetadata.productType,
              productId: productMetadata.productId,
              variantId: variantId,
              packSize: productMetadata.packSize,
              tier: productMetadata.tier,
              purchaseType: sellingPlanId ? "subscription" : "one-time",
              location: metadata?.location || "unknown",
              source: metadata?.source || "direct",
              price: parseFloat(merchandise.price.amount),
              sessionId: metadata?.sessionId,
            });
          }
        }
      }
      
      setIsOpen(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add item to cart';
      setError(message);
      console.error('Add to cart error:', err);
    } finally {
      setLoading(false);
    }
  }, [cart?.id, normalizeB2BTier]);

  // Update item quantity
  const updateQuantity = useCallback(async (lineId: string, quantity: number): Promise<void> => {
    const cartId = cart?.id || localStorage.getItem(CART_ID_KEY);
    
    if (!cartId) {
      setError('No cart found');
      return;
    }

    if (quantity < 1) {
      // If quantity is 0 or less, remove the item
      await removeItem(lineId);
      return;
    }

    setLoading(true);
    setError(null);
    setB2bNormalizeError(null);

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          cartId,
          lineId,
          quantity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.cart) {
        const next = await normalizeB2BTier(data.cart);
        setCart(next ?? data.cart);
      } else {
        throw new Error(data.error || 'Failed to update quantity');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update cart';
      setError(message);
      console.error('Update quantity error:', err);
    } finally {
      setLoading(false);
    }
  }, [cart?.id, normalizeB2BTier]);

  // Remove item from cart
  const removeItem = useCallback(async (lineId: string): Promise<void> => {
    const cartId = cart?.id || localStorage.getItem(CART_ID_KEY);
    
    if (!cartId) {
      setError('No cart found');
      return;
    }

    setLoading(true);
    setError(null);
    setB2bNormalizeError(null);

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'remove',
          cartId,
          lineId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.cart) {
        const next = await normalizeB2BTier(data.cart);
        setCart(next ?? data.cart);
      } else {
        throw new Error(data.error || 'Failed to remove item');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove item';
      setError(message);
      console.error('Remove item error:', err);
    } finally {
      setLoading(false);
    }
  }, [cart?.id, normalizeB2BTier]);

  // Clear cart (local only - for after checkout)
  const clearCart = useCallback((): void => {
    localStorage.removeItem(CART_ID_KEY);
    setCart(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        itemCount,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getCartItems,
        b2bTierUpdatedTo,
        b2bNormalizeError,
        clearB2BTierMessage,
        clearB2BNormalizeError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

