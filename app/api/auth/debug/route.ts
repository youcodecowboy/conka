import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Debug endpoint to check authentication state
 * This helps diagnose issues with the Customer Account API
 */
export async function GET(request: NextRequest) {
  const shopId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID;
  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;
  const idToken = cookieStore.get('customer_id_token')?.value;
  const expiresAt = cookieStore.get('customer_token_expires')?.value;

  // Decode ID token to see what's in it
  let idTokenPayload = null;
  if (idToken) {
    try {
      idTokenPayload = JSON.parse(
        Buffer.from(idToken.split('.')[1], 'base64').toString()
      );
    } catch (e) {
      idTokenPayload = { error: 'Failed to decode' };
    }
  }

  // Check if access token is expired
  const isExpired = expiresAt ? new Date(expiresAt) < new Date() : null;

  // Test the Customer Account API
  let apiTestResult = null;
  if (shopId && accessToken) {
    try {
      const apiUrl = `https://shopify.com/${shopId}/account/customer/api/2024-10/graphql`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
        body: JSON.stringify({
          query: `query { customer { id email firstName lastName } }`,
        }),
      });

      const responseText = await response.text();
      
      apiTestResult = {
        status: response.status,
        statusText: response.statusText,
        body: responseText.substring(0, 1000),
      };
    } catch (e) {
      apiTestResult = { error: String(e) };
    }
  }

  return NextResponse.json({
    config: {
      shopIdConfigured: !!shopId,
      clientIdConfigured: !!clientId,
      shopId: shopId ? `${shopId.substring(0, 5)}...` : null,
    },
    tokens: {
      hasAccessToken: !!accessToken,
      accessTokenLength: accessToken?.length || 0,
      accessTokenPreview: accessToken ? `${accessToken.substring(0, 20)}...` : null,
      hasIdToken: !!idToken,
      expiresAt,
      isExpired,
    },
    idTokenPayload: idTokenPayload ? {
      sub: idTokenPayload.sub,
      email: idTokenPayload.email,
      iss: idTokenPayload.iss,
      aud: idTokenPayload.aud,
      exp: idTokenPayload.exp,
      iat: idTokenPayload.iat,
    } : null,
    apiTest: apiTestResult,
  });
}

