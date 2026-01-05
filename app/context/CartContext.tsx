'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Cart, CartLine } from '@/app/lib/shopify';

const CART_ID_KEY = 'shopify_cart_id';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (variantId: string, quantity?: number, sellingPlanId?: string) => Promise<void>;
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

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (savedCartId) {
      fetchCart(savedCartId);
    }
  }, [fetchCart]);

  // Create a new cart
  const createCart = async (variantId?: string, quantity?: number, sellingPlanId?: string): Promise<Cart | null> => {
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
        return data.cart;
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
  const addToCart = useCallback(async (variantId: string, quantity: number = 1, sellingPlanId?: string): Promise<void> => {
    if (!variantId) {
      setError('Invalid product variant');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cartId = cart?.id || localStorage.getItem(CART_ID_KEY);

      if (!cartId) {
        // No cart exists - create one with the item
        await createCart(variantId, quantity, sellingPlanId);
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
          setCart(data.cart);
        } else if (response.status === 404) {
          // Cart expired - create new one
          await createCart(variantId, quantity, sellingPlanId);
        } else {
          throw new Error(data.error || 'Failed to add item');
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

