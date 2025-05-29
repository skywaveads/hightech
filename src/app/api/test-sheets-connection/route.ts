import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing Google Sheets connection...');
    
    // التحقق من متغيرات البيئة
    const requiredEnvVars = {
      GOOGLE_SHEETS_PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      GOOGLE_SHEETS_SHEET_ID: process.env.GOOGLE_SHEETS_SHEET_ID,
    };

    console.log('📋 Environment variables check:');
    for (const [key, value] of Object.entries(requiredEnvVars)) {
      console.log(`${key}: ${value ? '✅ Set' : '❌ Missing'}`);
    }

    // التحقق من وجود جميع المتغيرات المطلوبة
    const missingVars = Object.entries(requiredEnvVars)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        missingVars,
        message: 'Please set all required environment variables in Vercel dashboard'
      }, { status: 500 });
    }

    // محاولة الاتصال بـ Google Sheets
    const { GoogleSpreadsheet } = await import('google-spreadsheet');
    const { JWT } = await import('google-auth-library');

    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL!;
    const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID!;

    console.log('🔑 Creating JWT auth...');
    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    console.log('📊 Connecting to Google Sheets...');
    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    
    console.log('📖 Loading document info...');
    await doc.loadInfo();
    
    console.log('✅ Successfully connected to Google Sheets!');
    console.log(`📄 Document title: ${doc.title}`);
    console.log(`📋 Number of sheets: ${doc.sheetCount}`);

    // جلب معلومات الأوراق
    const sheetsInfo = doc.sheetsByIndex.map(sheet => ({
      title: sheet.title,
      sheetId: sheet.sheetId,
      rowCount: sheet.rowCount,
      columnCount: sheet.columnCount,
    }));

    // محاولة قراءة البيانات من الورقة الأولى
    let sampleData = null;
    if (doc.sheetsByIndex.length > 0) {
      const firstSheet = doc.sheetsByIndex[0];
      if (firstSheet) {
        console.log(`📋 Loading data from first sheet: ${firstSheet.title}`);
        
        try {
          await firstSheet.loadHeaderRow();
          const rows = await firstSheet.getRows({ limit: 5 });
          
          sampleData = {
            headers: firstSheet.headerValues || [],
            rowCount: rows.length,
            sampleRows: rows.map(row => {
              // استخدام toObject() بدلاً من _rawData
              const rowData = row.toObject();
              return Object.values(rowData).slice(0, 5);
            })
          };
          
          console.log(`✅ Successfully loaded ${rows.length} sample rows`);
        } catch (dataError) {
          console.warn('⚠️ Could not load data from sheet:', dataError);
          sampleData = { error: 'Could not load sheet data', details: (dataError as Error).message };
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Google Sheets connection successful!',
      document: {
        title: doc.title,
        sheetCount: doc.sheetCount,
        sheets: sheetsInfo,
      },
      sampleData,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Google Sheets connection failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Google Sheets connection failed',
      details: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}