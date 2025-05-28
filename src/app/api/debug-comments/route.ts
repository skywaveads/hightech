import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('[DEBUG] Starting debug endpoint...');
    
    // Test 1: Basic functionality
    console.log('[DEBUG] Test 1: Basic functionality - OK');
    
    // Test 2: Environment variables
    console.log('[DEBUG] Test 2: Checking environment variables...');
    const hasSheetId = !!process.env.GOOGLE_SHEETS_SHEET_ID;
    const hasClientEmail = !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    console.log('[DEBUG] GOOGLE_SHEETS_SHEET_ID:', hasSheetId ? 'SET' : 'NOT SET');
    console.log('[DEBUG] GOOGLE_SHEETS_CLIENT_EMAIL:', hasClientEmail ? 'SET' : 'NOT SET');
    
    // Test 3: Try importing CommentDatabase
    console.log('[DEBUG] Test 3: Importing CommentDatabase...');
    try {
      const { CommentDatabase } = await import('@/lib/database');
      console.log('[DEBUG] CommentDatabase imported successfully');
      
      // Test 4: Try importing GoogleSheetsDatabase
      console.log('[DEBUG] Test 4: Importing GoogleSheetsDatabase...');
      try {
        const { GoogleSheetsDatabase } = await import('@/lib/google-sheets');
        console.log('[DEBUG] GoogleSheetsDatabase imported successfully');
        
        return NextResponse.json({
          success: true,
          message: 'All imports successful',
          tests: {
            basic: true,
            envVars: { hasSheetId, hasClientEmail },
            commentDatabase: true,
            googleSheetsDatabase: true
          }
        });
      } catch (gsError) {
        console.error('[DEBUG] GoogleSheetsDatabase import failed:', gsError);
        return NextResponse.json({
          success: false,
          error: 'GoogleSheetsDatabase import failed',
          details: gsError instanceof Error ? gsError.message : String(gsError)
        }, { status: 500 });
      }
    } catch (dbError) {
      console.error('[DEBUG] CommentDatabase import failed:', dbError);
      return NextResponse.json({
        success: false,
        error: 'CommentDatabase import failed',
        details: dbError instanceof Error ? dbError.message : String(dbError)
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('[DEBUG] General error:', error);
    return NextResponse.json({
      success: false,
      error: 'General error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}