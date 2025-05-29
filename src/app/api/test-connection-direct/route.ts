import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  console.log('🔍 Starting direct Google Sheets connection test...');
  
  try {
    // فحص متغيرات البيئة المطلوبة
    const requiredEnvVars = [
      'GOOGLE_SERVICE_ACCOUNT_EMAIL',
      'GOOGLE_PRIVATE_KEY', 
      'GOOGLE_SHEETS_COMMENTS_ID'
    ];

    const envStatus = requiredEnvVars.map(varName => ({
      name: varName,
      exists: !!process.env[varName],
      length: process.env[varName]?.length || 0
    }));

    const missingVars = envStatus.filter(env => !env.exists);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing environment variables:', missingVars.map(v => v.name));
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        envStatus,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    console.log('✅ All required environment variables are present');

    // محاولة استيراد المكتبات
    console.log('📦 Importing Google libraries...');
    const { GoogleSpreadsheet } = await import('google-spreadsheet');
    const { JWT } = await import('google-auth-library');
    console.log('✅ Libraries imported successfully');

    // إنشاء JWT auth client
    console.log('🔐 Creating JWT auth client...');
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('✅ JWT auth client created');

    // إنشاء كائن Google Spreadsheet
    console.log('📊 Creating GoogleSpreadsheet instance...');
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_COMMENTS_ID!, auth);
    console.log('✅ GoogleSpreadsheet instance created');

    // محاولة تحميل معلومات الجدول
    console.log('📋 Loading spreadsheet info...');
    await doc.loadInfo();
    console.log('✅ Spreadsheet info loaded successfully');

    // جمع معلومات الجدول
    const spreadsheetInfo = {
      title: doc.title,
      spreadsheetId: doc.spreadsheetId,
      sheetsCount: doc.sheetsByIndex.length,
      sheets: doc.sheetsByIndex.map(sheet => ({
        title: sheet.title,
        sheetId: sheet.sheetId,
        rowCount: sheet.rowCount,
        columnCount: sheet.columnCount
      }))
    };

    console.log(`📋 Spreadsheet: "${doc.title}" with ${doc.sheetsByIndex.length} sheets`);

    // محاولة قراءة بيانات من الورقة الأولى
    let firstSheetData = null;
    if (doc.sheetsByIndex.length > 0) {
      const firstSheet = doc.sheetsByIndex[0];
      if (firstSheet) {
        console.log(`📄 Testing first sheet: "${firstSheet.title}"`);
        
        try {
          await firstSheet.loadHeaderRow();
          const rows = await firstSheet.getRows({ limit: 3 });
          
          firstSheetData = {
            sheetTitle: firstSheet.title,
            headers: firstSheet.headerValues || [],
            rowCount: rows.length,
            sampleData: rows.map(row => {
              const data = row.toObject();
              return Object.keys(data).slice(0, 5).reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
              }, {} as any);
            })
          };
          
          console.log(`✅ Successfully read ${rows.length} rows from "${firstSheet.title}"`);
        } catch (sheetError) {
          console.warn(`⚠️ Could not read data from "${firstSheet.title}":`, sheetError);
          firstSheetData = {
            sheetTitle: firstSheet.title,
            error: 'Could not read sheet data',
            details: (sheetError as Error).message
          };
        }
      }
    }

    console.log('🎉 Connection test completed successfully!');

    return NextResponse.json({
      success: true,
      message: 'Google Sheets connection test successful',
      spreadsheet: spreadsheetInfo,
      firstSheetTest: firstSheetData,
      environment: {
        runtime: 'edge',
        envVarsStatus: envStatus
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('💥 Connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Connection test failed',
      details: (error as Error).message,
      stack: (error as Error).stack,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}