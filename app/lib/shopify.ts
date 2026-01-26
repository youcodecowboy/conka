import { createStorefrontApiClient, StorefrontApiClient } from '@shopify/storefront-api-client';
import { env } from './env';

// Lazy initialization of Shopify client to avoid build-time errors
let _client: StorefrontApiClient | null = null;

function getClient(): StorefrontApiClient {
  if (!_client) {
    _client = createStorefrontApiClient({
      storeDomain: env.shopifyStoreDomain,
      apiVersion: '2025-10',
      publicAccessToken: env.shopifyStorefrontAccessToken,
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
      id: string;
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

// Response type for Shopify queries
export type ShopifyResponse<T> = { data: T; errors?: Array<{ message: string }> };

// Simple in-memory cache for read operations
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_CACHE_TTL = 60 * 1000; // 60 seconds default TTL

/**
 * Generate a cache key from query and variables
 */
function getCacheKey(query: string, variables?: Record<string, unknown>): string {
  const normalizedQuery = query.replace(/\s+/g, ' ').trim();
  const variablesKey = variables ? JSON.stringify(variables) : '';
  return `${normalizedQuery}:${variablesKey}`;
}

/**
 * Clear expired cache entries (runs periodically)
 */
function cleanupCache(): void {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now - entry.timestamp > DEFAULT_CACHE_TTL * 2) {
      cache.delete(key);
    }
  }
}

// Cleanup cache every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupCache, 5 * 60 * 1000);
}

/**
 * GraphQL request helper (no caching)
 * Use this for mutations and user-specific data
 */
export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<ShopifyResponse<T>> {
  try {
    const client = getClient();
    const response = await client.request(query, { variables });
    return response as ShopifyResponse<T>;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

/**
 * Cached GraphQL request helper
 * Use this for read-only queries that don't change frequently
 * (e.g., product listings, collections, shop info)
 * 
 * @param query - GraphQL query string
 * @param variables - Query variables
 * @param ttl - Cache TTL in milliseconds (default: 60 seconds)
 */
export async function shopifyFetchCached<T>(
  query: string,
  variables?: Record<string, unknown>,
  ttl: number = DEFAULT_CACHE_TTL
): Promise<ShopifyResponse<T>> {
  const cacheKey = getCacheKey(query, variables);
  const now = Date.now();

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && now - cached.timestamp < ttl) {
    return cached.data as ShopifyResponse<T>;
  }

  // Fetch fresh data
  const response = await shopifyFetch<T>(query, variables);

  // Cache successful responses only
  if (response.data && !response.errors?.length) {
    cache.set(cacheKey, { data: response, timestamp: now });
  }

  return response;
}

/**
 * Invalidate cache entries matching a pattern
 * Useful after mutations that affect cached data
 */
export function invalidateCache(pattern?: string): void {
  if (!pattern) {
    cache.clear();
    return;
  }

  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
}

// Export a getter for the client (for backwards compatibility)
export const client = {
  get instance() {
    return getClient();
  }
};
