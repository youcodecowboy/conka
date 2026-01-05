import { createStorefrontApiClient, StorefrontApiClient } from '@shopify/storefront-api-client';

// Lazy initialization of Shopify client to avoid build-time errors
let _client: StorefrontApiClient | null = null;

function getClient(): StorefrontApiClient {
  if (!_client) {
    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    
    if (!storeDomain || !accessToken) {
      throw new Error('Shopify environment variables are not configured');
    }
    
    _client = createStorefrontApiClient({
      storeDomain,
      apiVersion: '2025-10',
      publicAccessToken: accessToken,
    });
  }
  return _client;
}

// Types for cart operations
export interface PriceAmount {
  amount: string;
  currencyCode: string;
}

export interface SellingPlanAllocation {
  sellingPlan: {
    id: string;
    name: string;
  };
  priceAdjustments: Array<{
    price: PriceAmount;
    compareAtPrice: PriceAmount | null;
    perDeliveryPrice: PriceAmount;
  }>;
}

export interface CartLine {
  id: string;
  quantity: number;
  cost?: {
    totalAmount: PriceAmount;
    compareAtAmountPerQuantity?: PriceAmount | null;
  };
  merchandise: {
    id: string;
    title: string;
    sku?: string;
    product: {
      title: string;
      handle: string;
      featuredImage?: {
        url: string;
        altText?: string;
      };
    };
    price: PriceAmount;
    compareAtPrice?: PriceAmount | null;
  };
  sellingPlanAllocation?: SellingPlanAllocation | null;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
}

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing: boolean;
  orders: {
    edges: Array<{
      node: {
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
      };
    }>;
  };
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

// GraphQL request helper
export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<{ data: T; errors?: Array<{ message: string }> }> {
  try {
    const client = getClient();
    const response = await client.request(query, { variables });
    return response as { data: T; errors?: Array<{ message: string }> };
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

// Export a getter for the client (for backwards compatibility)
export const client = {
  get instance() {
    return getClient();
  }
};
