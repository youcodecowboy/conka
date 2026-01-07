import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface IdTokenPayload {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  iat: number;
  exp: number;
}

/**
 * Session Endpoint
 * 
 * Returns the current customer session info from the ID token.
 * Used by the client to check authentication status.
 */
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;
  const idToken = cookieStore.get('customer_id_token')?.value;
  const expiresAt = cookieStore.get('customer_token_expires')?.value;

  if (!accessToken || !idToken) {
    return NextResponse.json({ authenticated: false, customer: null });
  }

  // Check if token is expired
  if (expiresAt && new Date(expiresAt) < new Date()) {
    // Token expired - could implement refresh here
    return NextResponse.json({ authenticated: false, customer: null, expired: true });
  }

  try {
    // Decode the ID token to get customer info (without verification for simplicity)
    const payload: IdTokenPayload = JSON.parse(
      Buffer.from(idToken.split('.')[1], 'base64').toString()
    );

    return NextResponse.json({
      authenticated: true,
      customer: {
        id: payload.sub,
        email: payload.email,
        firstName: payload.given_name || '',
        lastName: payload.family_name || '',
        name: payload.name || '',
      },
      expiresAt,
    });
  } catch (error) {
    console.error('Failed to decode ID token:', error);
    return NextResponse.json({ authenticated: false, customer: null });
  }
}

