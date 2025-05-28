import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('[TEST API] Test comment endpoint called');
    const body = await request.json();
    console.log('[TEST API] Request body:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Test endpoint working',
      receivedData: body
    });
  } catch (error) {
    console.error('[TEST API] Error:', error);
    return NextResponse.json(
      { error: 'Test endpoint failed' },
      { status: 500 }
    );
  }
}