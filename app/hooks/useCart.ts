'use client';

import { useState, useEffect, useCallback } from 'react';
import { Cart, CartLine } from '@/app/lib/shopify';

const CART_ID_KEY = 'shopify_cart_id';

interface UseCartReturn {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  itemCount: number;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clearCart: () => void;
  getCartItems: () => CartLine[];
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate item count
  const itemCount = cart?.totalQuantity || 0;

  // Get cart items as flat array
  const getCartItems = useCallback((): CartLine[] => {
    if (!cart?.lines?.edges) return [];
    return cart.lines.edges.map((edge) => edge.node);
  }, [cart]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (savedCartId) {
      fetchCart(savedCartId);
    }
  }, []);

  // Fetch cart from Shopify
  const fetchCart = async (cartId: string): Promise<Cart | null> => {
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
  };

  // Create a new cart
  const createCart = async (variantId?: string, quantity?: number): Promise<Cart | null> => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          variantId,
          quantity,
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
  const addToCart = useCallback(async (variantId: string, quantity: number = 1): Promise<void> => {
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
        await createCart(variantId, quantity);
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
          }),
        });

        const data = await response.json();

        if (response.ok && data.cart) {
          setCart(data.cart);
        } else if (response.status === 404) {
          // Cart expired - create new one
          await createCart(variantId, quantity);
        } else {
          throw new Error(data.error || 'Failed to add item');
        }
      }
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
    if (!cart?.id) {
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
          cartId: cart.id,
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
    if (!cart?.id) {
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
          cartId: cart.id,
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

  return {
    cart,
    loading,
    error,
    itemCount,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getCartItems,
  };
}

