import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: 'vercel',
    tests: [] as any[]
  };

  // Test 1: Environment Variables Check
  const envTest = {
    name: 'Environment Variables',
    status: 'unknown',
    details: {} as any
  };

  try {
    const requiredEnvVars = [
      'GOOGLE_SHEETS_PRIVATE_KEY',
      'GOOGLE_SHEETS_CLIENT_EMAIL',
      'PRODUCTS_SHEET_ID'
    ];

    const envStatus = {} as any;
    let allPresent = true;

    for (const envVar of requiredEnvVars) {
      const value = process.env[envVar];
      envStatus[envVar] = {
        present: !!value,
        length: value ? value.length : 0,
        preview: value ? `${value.substring(0, 10)}...` : 'MISSING'
      };
      if (!value) allPresent = false;
    }

    envTest.status = allPresent ? 'pass' : 'fail';
    envTest.details = envStatus;
  } catch (error) {
    envTest.status = 'error';
    envTest.details = { error: error instanceof Error ? error.message : 'Unknown error' };
  }

  diagnostics.tests.push(envTest);

  // Test 2: Google Libraries Import
  const importTest = {
    name: 'Google Libraries Import',
    status: 'unknown',
    details: {} as any
  };

  try {
    const { JWT } = await import('google-auth-library');
    const { google } = await import('googleapis');
    importTest.status = 'pass';
    importTest.details = {
      libraries: ['google-auth-library', 'googleapis'],
      imported: true,
      jwtConstructor: typeof JWT,
      googleObject: typeof google
    };
  } catch (error) {
    importTest.status = 'fail';
    importTest.details = {
      error: error instanceof Error ? error.message : 'Unknown error',
      suggestion: 'Install google-auth-library and googleapis packages'
    };
  }

  diagnostics.tests.push(importTest);

  // Test 3: Service Account Credentials Format
  const credentialsTest = {
    name: 'Service Account Credentials Format',
    status: 'unknown',
    details: {} as any
  };

  try {
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

    if (!privateKey || !clientEmail) {
      credentialsTest.status = 'fail';
      credentialsTest.details = {
        error: 'Missing credentials',
        privateKey: !!privateKey,
        clientEmail: !!clientEmail
      };
    } else {
      // Check private key format
      const keyFormatValid = privateKey.includes('-----BEGIN PRIVATE KEY-----') &&
                           privateKey.includes('-----END PRIVATE KEY-----');
      
      // Check email format
      const emailFormatValid = clientEmail.includes('@') &&
                              clientEmail.includes('.iam.gserviceaccount.com');

      credentialsTest.status = keyFormatValid && emailFormatValid ? 'pass' : 'fail';
      credentialsTest.details = {
        privateKeyFormat: keyFormatValid,
        emailFormat: emailFormatValid,
        emailDomain: clientEmail.split('@')[1] || 'invalid'
      };
    }
  } catch (error) {
    credentialsTest.status = 'error';
    credentialsTest.details = { error: error instanceof Error ? error.message : 'Unknown error' };
  }

  diagnostics.tests.push(credentialsTest);

  // Test 4: JWT Authentication
  const authTest = {
    name: 'JWT Authentication',
    status: 'unknown',
    details: {} as any
  };

  try {
    const { JWT } = await import('google-auth-library');
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    
    if (!privateKey || !clientEmail) {
      authTest.status = 'fail';
      authTest.details = { error: 'Missing credentials for JWT' };
    } else {
      const authClient = new JWT({
        email: clientEmail,
        key: privateKey,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive'
        ],
      });

      // Test authentication
      await authClient.authorize();
      
      authTest.status = 'pass';
      authTest.details = {
        email: authClient.email,
        scopes: authClient.scopes,
        authenticated: true
      };
    }
  } catch (error) {
    authTest.status = 'fail';
    authTest.details = {
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown'
    };
  }

  diagnostics.tests.push(authTest);

  // Test 5: Google Sheets API Access
  const sheetsApiTest = {
    name: 'Google Sheets API Access',
    status: 'unknown',
    details: {} as any
  };

  try {
    const { JWT } = await import('google-auth-library');
    const { google } = await import('googleapis');
    
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const sheetId = process.env.PRODUCTS_SHEET_ID || '1RXql2CacN5haqIEq7DM3ZgSLj8ml_KR8PzRJbjDb-As';
    
    if (authTest.status === 'pass' && privateKey && clientEmail) {
      const authClient = new JWT({
        email: clientEmail,
        key: privateKey,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive'
        ],
      });

      await authClient.authorize();
      
      const sheets = google.sheets({ version: 'v4', auth: authClient });
      
      // Get spreadsheet metadata
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: sheetId,
      });
      
      // Try to read some data
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Products!A1:Z10',
      });
      
      sheetsApiTest.status = 'pass';
      sheetsApiTest.details = {
        spreadsheetTitle: spreadsheet.data.properties?.title,
        sheetCount: spreadsheet.data.sheets?.length || 0,
        sheets: spreadsheet.data.sheets?.map(sheet => ({
          title: sheet.properties?.title,
          sheetId: sheet.properties?.sheetId
        })) || [],
        dataRows: response.data.values?.length || 0,
        sampleData: response.data.values?.slice(0, 3) || []
      };
    } else {
      sheetsApiTest.status = 'skip';
      sheetsApiTest.details = { reason: 'Authentication test failed' };
    }
  } catch (error) {
    sheetsApiTest.status = 'fail';
    sheetsApiTest.details = {
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown'
    };
  }

  diagnostics.tests.push(sheetsApiTest);

  // Test 6: Products Database Class
  const productsDbTest = {
    name: 'Products Database Class',
    status: 'unknown',
    details: {} as any
  };

  try {
    const { GoogleSheetsProductsDatabase } = await import('@/lib/google-products');
    
    // Test static method
    const products = await GoogleSheetsProductsDatabase.getAllProducts();
    
    productsDbTest.status = 'pass';
    productsDbTest.details = {
      productsCount: products.length,
      sampleProducts: products.slice(0, 2).map(p => ({
        id: p._id,
        name: p.name_ar,
        price: p.price,
        category: p.category
      }))
    };
  } catch (error) {
    productsDbTest.status = 'fail';
    productsDbTest.details = {
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown'
    };
  }

  diagnostics.tests.push(productsDbTest);

  // Overall Status
  const passedTests = diagnostics.tests.filter(test => test.status === 'pass').length;
  const totalTests = diagnostics.tests.filter(test => test.status !== 'skip').length;
  
  const overallStatus = {
    passed: passedTests,
    total: totalTests,
    success: passedTests === totalTests,
    summary: `${passedTests}/${totalTests} tests passed`
  };

  return NextResponse.json({
    ...diagnostics,
    overall: overallStatus
  }, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}