/**
 * Shared API Utilities
 * 
 * Provides standardized error handling, response formatting, and logging
 * for all API routes in the application.
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

// Standard API response types
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Error codes for categorization
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  RATE_LIMITED: 'RATE_LIMITED',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

/**
 * Create a standardized success response
 */
export function successResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json(
    { success: true, data } as ApiSuccessResponse<T>,
    { status }
  );
}

/**
 * Create a standardized error response
 */
export function errorResponse(
  code: ErrorCode,
  message: string,
  status: number = 500
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: { code, message },
    } as ApiErrorResponse,
    { status }
  );
}

/**
 * Handle and log API errors with appropriate responses
 * 
 * @param error - The caught error
 * @param context - Context string for logging (e.g., 'Cart operation')
 * @returns NextResponse with appropriate error message and status
 */
export function handleApiError(
  error: unknown,
  context: string = 'API operation'
): NextResponse {
  // Log the error with context
  console.error(`[API Error] ${context}:`, error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const firstError = error.issues[0];
    return errorResponse(
      ErrorCodes.VALIDATION_ERROR,
      firstError?.message || 'Validation failed',
      400
    );
  }

  // Handle known error types
  if (error instanceof Error) {
    // Check for authentication errors
    if (
      error.message.toLowerCase().includes('unauthorized') ||
      error.message.toLowerCase().includes('access token')
    ) {
      return errorResponse(
        ErrorCodes.AUTHENTICATION_ERROR,
        'Authentication required',
        401
      );
    }

    // Check for not found errors
    if (error.message.toLowerCase().includes('not found')) {
      return errorResponse(
        ErrorCodes.NOT_FOUND,
        error.message,
        404
      );
    }

    // Check for configuration errors
    if (error.message.toLowerCase().includes('not configured')) {
      return errorResponse(
        ErrorCodes.INTERNAL_ERROR,
        'Service not configured',
        503
      );
    }

    // Return the error message for other known errors
    return errorResponse(
      ErrorCodes.INTERNAL_ERROR,
      error.message,
      500
    );
  }

  // Default error response for unknown error types
  return errorResponse(
    ErrorCodes.INTERNAL_ERROR,
    `Failed to complete ${context}`,
    500
  );
}

/**
 * Validate request body with Zod schema
 * Returns parsed data or throws ZodError
 */
export async function parseRequestBody<T>(
  request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: { parse: (data: unknown) => T; safeParse: (data: unknown) => any }
): Promise<T> {
  const body = await request.json();
  return schema.parse(body);
}

/**
 * Safely parse request body with Zod schema
 * Returns result object with success flag
 */
export async function safeParseRequestBody<T>(
  request: Request,
  schema: { safeParse: (data: unknown) => { success: boolean; data?: T; error?: ZodError } }
): Promise<{ success: true; data: T } | { success: false; error: ZodError }> {
  const body = await request.json();
  const result = schema.safeParse(body);
  
  if (result.success) {
    return { success: true, data: result.data as T };
  }
  
  return { success: false, error: result.error as ZodError };
}

