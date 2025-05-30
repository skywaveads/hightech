import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await verifyAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check environment variables
    const envCheck = {
      JWT_SECRET: !!process.env.JWT_SECRET,
      GOOGLE_SHEETS_CLIENT_EMAIL: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      GOOGLE_SHEETS_PRIVATE_KEY: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      PRODUCTS_SHEET_ID: !!process.env.PRODUCTS_SHEET_ID,
      ORDERS_SHEET_ID: !!process.env.ORDERS_SHEET_ID,
      COMMENTS_SHEET_ID: !!process.env.COMMENTS_SHEET_ID,
    };

    // Test Google Sheets connection
    let googleSheetsTest = null;
    try {
      const { GoogleAuth } = require('google-auth-library');
      const { google } = require('googleapis');

      const auth = new GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });
      
      // Test reading from products sheet
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.PRODUCTS_SHEET_ID,
        range: 'Products!A1:B1',
      });

      googleSheetsTest = {
        success: true,
        message: 'Google Sheets connection successful',
        rowCount: response.data.values?.length || 0,
      };
    } catch (error: any) {
      googleSheetsTest = {
        success: false,
        error: error.message,
        details: error.toString(),
      };
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      envVariables: envCheck,
      googleSheetsTest,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error: any) {
    console.error('[Debug] Google Sheets test failed:', error);
    return NextResponse.json({
      error: 'Debug test failed',
      message: error.message,
      details: error.toString(),
    }, { status: 500 });
  }
}