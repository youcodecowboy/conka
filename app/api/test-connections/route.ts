import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/app/lib/shopify';

// Simple query to test Shopify connection
const TEST_QUERY = `
  query {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`;

interface ShopQueryResponse {
  shop: {
    name: string;
    primaryDomain: {
      url: string;
    };
  };
}

export async function GET() {
  const results: {
    shopify: { success: boolean; data?: unknown; error?: string };
    loop: { success: boolean; data?: unknown; error?: string };
    env: { shopifyDomain: boolean; shopifyToken: boolean; loopKey: boolean };
  } = {
    shopify: { success: false },
    loop: { success: false },
    env: {
      shopifyDomain: !!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
      shopifyToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      loopKey: !!process.env.LOOP_API_KEY,
    },
  };

  // Test Shopify connection
  try {
    const response = await shopifyFetch<ShopQueryResponse>(TEST_QUERY);
    
    if (response.data?.shop) {
      results.shopify = {
        success: true,
        data: {
          shopName: response.data.shop.name,
          domain: response.data.shop.primaryDomain?.url,
        },
      };
    } else if (response.errors) {
      results.shopify = {
        success: false,
        error: response.errors[0]?.message || 'Unknown error',
      };
    }
  } catch (error) {
    results.shopify = {
      success: false,
      error: error instanceof Error ? error.message : 'Connection failed',
    };
  }

  // Test Loop connection (just check if credentials exist for now)
  // Loop API requires a valid subscription to test, so we'll just verify config
  if (process.env.LOOP_API_KEY) {
    results.loop = {
      success: true,
      data: {
        message: 'Loop API key configured',
        keyLength: process.env.LOOP_API_KEY.length,
      },
    };
  } else {
    results.loop = {
      success: false,
      error: 'LOOP_API_KEY not configured',
    };
  }

  return NextResponse.json(results);
}

