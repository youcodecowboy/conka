import { NextRequest, NextResponse } from 'next/server';
import { skipNextOrder } from '@/app/lib/loop';

// POST - Skip next order
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await skipNextOrder(id);

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Skip order error:', error);
    return NextResponse.json(
      { error: 'Failed to skip order' },
      { status: 500 }
    );
  }
}

