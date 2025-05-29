import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('[VercelDiagnosis] Starting comprehensive diagnosis...');
    
    const diagnosis = {
      timestamp: new Date().toISOString(),
      environment: 'vercel',
      status: 'checking',
      checks: {} as any
    };

    // 1. Environment Variables Check
    console.log('[VercelDiagnosis] Checking environment variables...');
    diagnosis.checks.environmentVariables = {
      GOOGLE_SHEETS_PRIVATE_KEY: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      GOOGLE_SHEETS_CLIENT_EMAIL: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      GOOGLE_SHEETS_CLIENT_ID: !!process.env.GOOGLE_SHEETS_CLIENT_ID,
      PRODUCTS_SHEET_ID: !!process.env.PRODUCTS_SHEET_ID,
      GOOGLE_DRIVE_FOLDER_ID: !!process.env.GOOGLE_DRIVE_FOLDER_ID,
      values: {
        GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        PRODUCTS_SHEET_ID: process.env.PRODUCTS_SHEET_ID,
        GOOGLE_DRIVE_FOLDER_ID: process.env.GOOGLE_DRIVE_FOLDER_ID,
        PRIVATE_KEY_LENGTH: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.length || 0
      }
    };

    // 2. Google Sheets Import Test
    console.log('[VercelDiagnosis] Testing Google Sheets import...');
    try {
      const { GoogleSheetsProductsDatabase } = await import('@/lib/google-products');
      diagnosis.checks.googleSheetsImport = {
        success: true,
        class: 'GoogleSheetsProductsDatabase imported successfully'
      };

      // 3. Google Sheets Connection Test
      console.log('[VercelDiagnosis] Testing Google Sheets connection...');
      try {
        const products = await GoogleSheetsProductsDatabase.getAllProducts();
        diagnosis.checks.googleSheetsConnection = {
          success: true,
          productsCount: products.length,
          firstProduct: products[0] ? {
            id: products[0]._id,
            name: products[0].name_ar,
            slug: products[0].slug
          } : null
        };
      } catch (connectionError: any) {
        console.error('[VercelDiagnosis] Google Sheets connection failed:', connectionError);
        diagnosis.checks.googleSheetsConnection = {
          success: false,
          error: connectionError.message,
          stack: connectionError.stack
        };
      }
    } catch (importError: any) {
      console.error('[VercelDiagnosis] Google Sheets import failed:', importError);
      diagnosis.checks.googleSheetsImport = {
        success: false,
        error: importError.message,
        stack: importError.stack
      };
    }

    // 4. JWT Library Test
    console.log('[VercelDiagnosis] Testing JWT library...');
    try {
      const { JWT } = await import('google-auth-library');
      diagnosis.checks.jwtLibrary = {
        success: true,
        message: 'JWT library imported successfully'
      };
    } catch (jwtError: any) {
      console.error('[VercelDiagnosis] JWT library failed:', jwtError);
      diagnosis.checks.jwtLibrary = {
        success: false,
        error: jwtError.message
      };
    }

    // 5. Google Spreadsheet Library Test
    console.log('[VercelDiagnosis] Testing GoogleSpreadsheet library...');
    try {
      const { GoogleSpreadsheet } = await import('google-spreadsheet');
      diagnosis.checks.googleSpreadsheetLibrary = {
        success: true,
        message: 'GoogleSpreadsheet library imported successfully'
      };
    } catch (spreadsheetError: any) {
      console.error('[VercelDiagnosis] GoogleSpreadsheet library failed:', spreadsheetError);
      diagnosis.checks.googleSpreadsheetLibrary = {
        success: false,
        error: spreadsheetError.message
      };
    }

    // 6. Runtime Environment Check
    diagnosis.checks.runtime = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime()
    };

    // 7. Network Test (basic)
    console.log('[VercelDiagnosis] Testing network connectivity...');
    try {
      const response = await fetch('https://www.googleapis.com/auth/spreadsheets', {
        method: 'HEAD'
      });
      diagnosis.checks.networkConnectivity = {
        success: response.ok,
        status: response.status,
        statusText: response.statusText
      };
    } catch (networkError: any) {
      diagnosis.checks.networkConnectivity = {
        success: false,
        error: networkError.message
      };
    }

    // Determine overall status
    const hasErrors = Object.values(diagnosis.checks).some((check: any) => 
      check.success === false
    );
    
    diagnosis.status = hasErrors ? 'failed' : 'passed';

    console.log('[VercelDiagnosis] Diagnosis completed:', diagnosis.status);
    
    return NextResponse.json(diagnosis, { 
      status: hasErrors ? 500 : 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error: any) {
    console.error('[VercelDiagnosis] Critical error during diagnosis:', error);
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: 'vercel',
      status: 'critical_error',
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      }
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}