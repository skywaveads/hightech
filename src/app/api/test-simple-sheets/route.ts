import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  console.log('🔍 Starting simple Google Sheets connection test...');
  
  try {
    // فحص متغيرات البيئة المطلوبة
    const requiredEnvVars = [
      'GOOGLE_SERVICE_ACCOUNT_EMAIL',
      'GOOGLE_PRIVATE_KEY',
      'GOOGLE_SHEETS_COMMENTS_ID'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing environment variables:', missingVars);
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        missingVars,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    console.log('✅ All required environment variables are present');

    // محاولة استيراد مكتبات Google
    let GoogleSpreadsheet, JWT;
    try {
      const sheetsModule = await import('google-spreadsheet');
      const authModule = await import('google-auth-library');
      GoogleSpreadsheet = sheetsModule.GoogleSpreadsheet;
      JWT = authModule.JWT;
      console.log('✅ Successfully imported google libraries');
    } catch (importError) {
      console.error('❌ Failed to import google libraries:', importError);
      return NextResponse.json({
        success: false,
        error: 'Failed to import google libraries',
        details: (importError as Error).message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    console.log('🔐 Creating JWT auth client...');
    
    // إنشاء JWT auth client
    let auth;
    try {
      auth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
        key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      console.log('✅ JWT auth client created');
    } catch (authError) {
      console.error('❌ Failed to create JWT auth client:', authError);
      return NextResponse.json({
        success: false,
        error: 'Failed to create JWT auth client',
        details: (authError as Error).message,
        timestamp: new Date().toISOString()
      }, { status: 401 });
    }

    // إنشاء كائن الاتصال مع المصادقة
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_COMMENTS_ID!, auth);
    console.log('✅ Created GoogleSpreadsheet instance with auth');

    // محاولة تحميل معلومات الجدول
    console.log('📊 Loading spreadsheet info...');
    try {
      await doc.loadInfo();
      console.log('✅ Spreadsheet info loaded successfully');
      console.log(`📋 Spreadsheet title: ${doc.title}`);
      console.log(`📄 Number of sheets: ${doc.sheetsByIndex.length}`);
    } catch (loadError) {
      console.error('❌ Failed to load spreadsheet info:', loadError);
      return NextResponse.json({
        success: false,
        error: 'Failed to load spreadsheet info',
        details: (loadError as Error).message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // جمع معلومات الأوراق
    const sheetsInfo = doc.sheetsByIndex.map(sheet => ({
      title: sheet.title,
      sheetId: sheet.sheetId,
      rowCount: sheet.rowCount,
      columnCount: sheet.columnCount
    }));

    console.log('🎉 All tests passed successfully!');

    return NextResponse.json({
      success: true,
      message: 'Google Sheets connection test successful',
      spreadsheet: {
        title: doc.title,
        spreadsheetId: doc.spreadsheetId,
        sheetsCount: doc.sheetsByIndex.length
      },
      sheets: sheetsInfo,
      environment: {
        hasServiceAccountEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
        hasSheetsId: !!process.env.GOOGLE_SHEETS_COMMENTS_ID,
        runtime: 'edge'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('💥 Unexpected error in sheets connection test:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Unexpected error during connection test',
      details: (error as Error).message,
      stack: (error as Error).stack,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}