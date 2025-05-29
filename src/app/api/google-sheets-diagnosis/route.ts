import { NextRequest, NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

// Enhanced helper function to process private key with multiple encoding formats and fallbacks
function processPrivateKey(privateKey: string): string {
  if (!privateKey) {
    throw new Error('Private key is missing');
  }

  let processedKey = privateKey.trim();

  // Method 1: Remove any extra quotes that might be wrapping the key
  processedKey = processedKey.replace(/^["']|["']$/g, '');

  // Method 2: Replace escaped newlines
  processedKey = processedKey.replace(/\\n/g, '\n');

  // Method 3: Try to decode if it looks like URL-encoded
  if (processedKey.includes('%')) {
    try {
      processedKey = decodeURIComponent(processedKey);
    } catch (error) {
      // Continue with original
    }
  }

  // Method 4: If key doesn't have proper headers, it might be base64 encoded
  if (!processedKey.includes('-----BEGIN PRIVATE KEY-----')) {
    try {
      const decoded = Buffer.from(processedKey, 'base64').toString('utf8');
      if (decoded.includes('-----BEGIN PRIVATE KEY-----')) {
        processedKey = decoded;
      }
    } catch (error) {
      // Continue with original
    }
  }

  // Method 5: Try alternative base64 decoding with padding
  if (!processedKey.includes('-----BEGIN PRIVATE KEY-----')) {
    try {
      // Add padding if missing
      let paddedKey = processedKey;
      while (paddedKey.length % 4) {
        paddedKey += '=';
      }
      const decoded = Buffer.from(paddedKey, 'base64').toString('utf8');
      if (decoded.includes('-----BEGIN PRIVATE KEY-----')) {
        processedKey = decoded;
      }
    } catch (error) {
      // Continue with original
    }
  }

  // Method 6: Ensure proper line breaks around headers
  if (processedKey.includes('-----BEGIN PRIVATE KEY-----') && processedKey.includes('-----END PRIVATE KEY-----')) {
    processedKey = processedKey
      .replace(/-----BEGIN PRIVATE KEY-----\s*/g, '-----BEGIN PRIVATE KEY-----\n')
      .replace(/\s*-----END PRIVATE KEY-----/g, '\n-----END PRIVATE KEY-----')
      .replace(/\n\n+/g, '\n');
  }

  // Method 7: If still no proper headers, try to reconstruct
  if (!processedKey.includes('-----BEGIN PRIVATE KEY-----')) {
    const keyContent = processedKey.replace(/\s/g, '');
    if (keyContent.length > 0) {
      const formattedKey = `-----BEGIN PRIVATE KEY-----\n${keyContent.match(/.{1,64}/g)?.join('\n') || keyContent}\n-----END PRIVATE KEY-----`;
      processedKey = formattedKey;
    }
  }

  // Method 8: Final cleanup and validation
  if (processedKey.includes('-----BEGIN PRIVATE KEY-----')) {
    const lines = processedKey.split('\n');
    const cleanLines = lines.map(line => line.trim()).filter(line => line.length > 0);
    
    // Ensure first line is the header
    if (cleanLines[0] !== '-----BEGIN PRIVATE KEY-----') {
      const headerIndex = cleanLines.findIndex(line => line === '-----BEGIN PRIVATE KEY-----');
      if (headerIndex > 0) {
        cleanLines.splice(0, headerIndex);
      }
    }
    
    // Ensure last line is the footer
    if (cleanLines[cleanLines.length - 1] !== '-----END PRIVATE KEY-----') {
      const footerIndex = cleanLines.findIndex(line => line === '-----END PRIVATE KEY-----');
      if (footerIndex >= 0 && footerIndex < cleanLines.length - 1) {
        cleanLines.splice(footerIndex + 1);
      }
    }
    
    processedKey = cleanLines.join('\n');
  }

  return processedKey;
}

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

  // Test 4: JWT Authentication with Enhanced Private Key Processing
  const authTest = {
    name: 'JWT Authentication with Enhanced Private Key Processing',
    status: 'unknown',
    details: {} as any
  };

  try {
    const { JWT } = await import('google-auth-library');
    const rawPrivateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    
    if (!rawPrivateKey || !clientEmail) {
      authTest.status = 'fail';
      authTest.details = { error: 'Missing credentials for JWT' };
    } else {
      // Use simple direct processing as suggested
      const processedPrivateKey = rawPrivateKey.replace(/\\n/g, '\n');
      
      const authClient = new JWT({
        email: clientEmail,
        key: processedPrivateKey,
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
        authenticated: true,
        keyProcessing: {
          originalLength: rawPrivateKey.length,
          processedLength: processedPrivateKey.length,
          hasHeaders: processedPrivateKey.includes('-----BEGIN PRIVATE KEY-----'),
          processingApplied: rawPrivateKey !== processedPrivateKey
        }
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