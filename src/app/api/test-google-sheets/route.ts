import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('[TEST-GS] Starting Google Sheets test...');
    
    // Import GoogleSheetsDatabase
    const { GoogleSheetsDatabase } = await import('@/lib/google-sheets');
    console.log('[TEST-GS] GoogleSheetsDatabase imported successfully');
    
    // Test comment data
    const testCommentData = {
      productId: 'test-product',
      userName: 'Test User',
      userEmail: 'test@example.com',
      comment: 'This is a test comment for Google Sheets',
      rating: 5,
      title: 'Test Title',
      pros: ['Good quality'],
      cons: ['Expensive'],
      status: 'pending' as const,
      verified: false,
      helpful: {
        count: 0,
        users: []
      }
    };
    
    console.log('[TEST-GS] Test comment data:', JSON.stringify(testCommentData, null, 2));
    
    // Try to add comment
    console.log('[TEST-GS] Calling GoogleSheetsDatabase.addComment...');
    const result = await GoogleSheetsDatabase.addComment(testCommentData);
    console.log('[TEST-GS] Comment added successfully:', result);
    
    return NextResponse.json({
      success: true,
      message: 'Google Sheets test successful',
      result: result
    });
    
  } catch (error) {
    console.error('[TEST-GS] Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Google Sheets test failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}