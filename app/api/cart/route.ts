import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch, Cart } from '@/app/lib/shopify';
import {
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART_LINES,
  REMOVE_FROM_CART,
  GET_CART,
} from '@/app/lib/shopifyQueries';

// Types for API responses
interface CartCreateResponse {
  cartCreate: {
    cart: Cart | null;
    userErrors: Array<{ field: string[]; message: string }>;
  };
}

interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart | null;
    userErrors: Array<{ field: string[]; message: string }>;
  };
}

interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: Cart | null;
    userErrors: Array<{ field: string[]; message: string }>;
  };
}

interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: Cart | null;
    userErrors: Array<{ field: string[]; message: string }>;
  };
}

interface GetCartResponse {
  cart: Cart | null;
}

// GET - Fetch cart by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cartId');

    if (!cartId) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    const response = await shopifyFetch<GetCartResponse>(GET_CART, {
      id: cartId,
    });

    if (!response.data?.cart) {
      return NextResponse.json(
        { error: 'Cart not found or expired' },
        { status: 404 }
      );
    }

    return NextResponse.json({ cart: response.data.cart });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// POST - Cart operations (create, add, update, remove)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, cartId, variantId, sellingPlanId, quantity, lineId, lines } = body;

    switch (action) {
      case 'create': {
        // Create a new cart, optionally with initial items
        // sellingPlanId is optional - used for subscription products
        interface CartLineInput {
          merchandiseId: string;
          quantity: number;
          sellingPlanId?: string;
        }
        
        const input: { lines?: CartLineInput[] } = {};
        
        if (variantId) {
          const line: CartLineInput = {
            merchandiseId: variantId,
            quantity: quantity || 1,
          };
          
          // Add selling plan for subscription
          if (sellingPlanId) {
            line.sellingPlanId = sellingPlanId;
          }
          
          input.lines = [line];
        }

        const response = await shopifyFetch<CartCreateResponse>(CREATE_CART, {
          input,
        });

        if (response.data?.cartCreate?.userErrors?.length > 0) {
          return NextResponse.json(
            { error: response.data.cartCreate.userErrors[0].message },
            { status: 400 }
          );
        }

        return NextResponse.json({ cart: response.data?.cartCreate?.cart });
      }

      case 'add': {
        // Add item to existing cart
        // sellingPlanId is optional - used for subscription products
        if (!cartId || !variantId) {
          return NextResponse.json(
            { error: 'Cart ID and variant ID are required' },
            { status: 400 }
          );
        }

        interface CartLineInput {
          merchandiseId: string;
          quantity: number;
          sellingPlanId?: string;
        }

        const line: CartLineInput = {
          merchandiseId: variantId,
          quantity: quantity || 1,
        };
        
        // Add selling plan for subscription
        if (sellingPlanId) {
          line.sellingPlanId = sellingPlanId;
        }

        const response = await shopifyFetch<CartLinesAddResponse>(ADD_TO_CART, {
          cartId,
          lines: [line],
        });

        if (response.data?.cartLinesAdd?.userErrors?.length > 0) {
          return NextResponse.json(
            { error: response.data.cartLinesAdd.userErrors[0].message },
            { status: 400 }
          );
        }

        return NextResponse.json({ cart: response.data?.cartLinesAdd?.cart });
      }

      case 'update': {
        // Update quantity of a line item
        if (!cartId || !lineId) {
          return NextResponse.json(
            { error: 'Cart ID and line ID are required' },
            { status: 400 }
          );
        }

        const response = await shopifyFetch<CartLinesUpdateResponse>(UPDATE_CART_LINES, {
          cartId,
          lines: [
            {
              id: lineId,
              quantity: quantity || 1,
            },
          ],
        });

        if (response.data?.cartLinesUpdate?.userErrors?.length > 0) {
          return NextResponse.json(
            { error: response.data.cartLinesUpdate.userErrors[0].message },
            { status: 400 }
          );
        }

        return NextResponse.json({ cart: response.data?.cartLinesUpdate?.cart });
      }

      case 'updateMultiple': {
        // Update multiple line items at once
        if (!cartId || !lines) {
          return NextResponse.json(
            { error: 'Cart ID and lines are required' },
            { status: 400 }
          );
        }

        const response = await shopifyFetch<CartLinesUpdateResponse>(UPDATE_CART_LINES, {
          cartId,
          lines,
        });

        if (response.data?.cartLinesUpdate?.userErrors?.length > 0) {
          return NextResponse.json(
            { error: response.data.cartLinesUpdate.userErrors[0].message },
            { status: 400 }
          );
        }

        return NextResponse.json({ cart: response.data?.cartLinesUpdate?.cart });
      }

      case 'remove': {
        // Remove a line item from cart
        if (!cartId || !lineId) {
          return NextResponse.json(
            { error: 'Cart ID and line ID are required' },
            { status: 400 }
          );
        }

        const response = await shopifyFetch<CartLinesRemoveResponse>(REMOVE_FROM_CART, {
          cartId,
          lineIds: [lineId],
        });

        if (response.data?.cartLinesRemove?.userErrors?.length > 0) {
          return NextResponse.json(
            { error: response.data.cartLinesRemove.userErrors[0].message },
            { status: 400 }
          );
        }

        return NextResponse.json({ cart: response.data?.cartLinesRemove?.cart });
      }

      default:
        return NextResponse.json(
          { error: `Invalid action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Cart operation error:', error);
    return NextResponse.json(
      { error: 'Failed to perform cart operation' },
      { status: 500 }
    );
  }
}

