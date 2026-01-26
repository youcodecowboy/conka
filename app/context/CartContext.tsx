'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Cart, CartLine } from '@/app/lib/shopify';
import { trackAddToCart } from '@/app/lib/tripleWhale';
import { trackPurchaseAddToCart } from '@/app/lib/analytics';
import { extractProductMetadata } from '@/app/lib/productMetadata';

const CART_ID_KEY = 'shopify_cart_id';

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Calculate item count
  const itemCount = cart?.totalQuantity || 0;

  // Cart drawer controls
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
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
        setCart(data.cart);
        return data.cart;
      } else {
        // Cart not found or expired - clear storage
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
  }, []);

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

    try {
      const cartId = cart?.id || localStorage.getItem(CART_ID_KEY);
      let warning: string | undefined;
      let updatedCart: Cart | null = null;

      if (!cartId) {
        // No cart exists - create one with the item
        const result = await createCart(variantId, quantity, sellingPlanId);
        warning = result.warning;
        updatedCart = result.cart;
      } else {
        // Add to existing cart
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
          // Cart expired - create new one
          const result = await createCart(variantId, quantity, sellingPlanId);
          warning = result.warning;
          updatedCart = result.cart;
        } else {
          throw new Error(data.error || 'Failed to add item');
        }
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
      
      // Open cart drawer after adding item
      setIsOpen(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add item to cart';
      setError(message);
      console.error('Add to cart error:', err);
    } finally {
      setLoading(false);
    }
  }, [cart?.id]);

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
        setCart(data.cart);
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
  }, [cart?.id]);

  // Remove item from cart
  const removeItem = useCallback(async (lineId: string): Promise<void> => {
    const cartId = cart?.id || localStorage.getItem(CART_ID_KEY);
    
    if (!cartId) {
      setError('No cart found');
      return;
    }

    setLoading(true);
    setError(null);

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
        setCart(data.cart);
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
  }, [cart?.id]);

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

