import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // التحقق من متغيرات Vercel النظامية
    const vercelEnv = {
      VERCEL: process.env.VERCEL || 'Not set',
      VERCEL_ENV: process.env.VERCEL_ENV || 'Not set',
      VERCEL_URL: process.env.VERCEL_URL || 'Not set',
      VERCEL_REGION: process.env.VERCEL_REGION || 'Not set',
      CI: process.env.CI || 'Not set',
    };

    // التحقق من متغيرات Google Sheets (بدون إظهار القيم الحساسة)
    const googleSheetsEnv = {
      GOOGLE_SHEETS_PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY ? '✅ Set' : '❌ Not set',
      GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL ? '✅ Set' : '❌ Not set',
      GOOGLE_SHEETS_CLIENT_ID: process.env.GOOGLE_SHEETS_CLIENT_ID ? '✅ Set' : '❌ Not set',
      GOOGLE_SHEETS_SHEET_ID: process.env.GOOGLE_SHEETS_SHEET_ID || '❌ Not set',
      PRODUCTS_SHEET_ID: process.env.PRODUCTS_SHEET_ID || '❌ Not set',
      ORDERS_SHEET_ID: process.env.ORDERS_SHEET_ID || '❌ Not set',
      GOOGLE_DRIVE_FOLDER_ID: process.env.GOOGLE_DRIVE_FOLDER_ID || '❌ Not set',
    };

    // التحقق من متغيرات الأمان
    const securityEnv = {
      ADMIN_USERNAME: process.env.ADMIN_USERNAME ? '✅ Set' : '❌ Not set',
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? '✅ Set' : '❌ Not set',
      JWT_SECRET: process.env.JWT_SECRET ? '✅ Set' : '❌ Not set',
    };

    // فحص الاتصال بـ Google Sheets
    let googleSheetsStatus = 'Unknown';
    try {
      if (process.env.GOOGLE_SHEETS_PRIVATE_KEY && process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
        // محاولة بسيطة للتحقق من صحة المتغيرات
        const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n');
        if (privateKey.includes('BEGIN PRIVATE KEY') && privateKey.includes('END PRIVATE KEY')) {
          googleSheetsStatus = '✅ Credentials format valid';
        } else {
          googleSheetsStatus = '⚠️ Private key format invalid';
        }
      } else {
        googleSheetsStatus = '❌ Missing credentials';
      }
    } catch (error) {
      googleSheetsStatus = `❌ Error: ${(error as Error).message}`;
    }

    // معلومات إضافية
    const additionalInfo = {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
      userAgent: request.headers.get('user-agent') || 'Unknown',
    };

    // تحديد حالة النشر
    const deploymentStatus = {
      isVercel: process.env.VERCEL === '1',
      isProduction: process.env.VERCEL_ENV === 'production',
      isPreview: process.env.VERCEL_ENV === 'preview',
      isDevelopment: process.env.VERCEL_ENV === 'development',
    };

    // حساب نقاط الصحة
    const healthScore = {
      vercelVars: Object.values(vercelEnv).filter(v => v !== 'Not set').length,
      googleVars: Object.values(googleSheetsEnv).filter(v => v.includes('✅')).length,
      securityVars: Object.values(securityEnv).filter(v => v.includes('✅')).length,
      total: Object.values(vercelEnv).length + Object.values(googleSheetsEnv).length + Object.values(securityEnv).length,
    };

    const healthPercentage = Math.round(
      ((healthScore.vercelVars + healthScore.googleVars + healthScore.securityVars) / healthScore.total) * 100
    );

    return NextResponse.json({
      status: 'success',
      message: 'Environment variables check completed',
      healthScore: `${healthPercentage}%`,
      deploymentStatus,
      vercelEnvironment: vercelEnv,
      googleSheetsEnvironment: googleSheetsEnv,
      securityEnvironment: securityEnv,
      googleSheetsStatus,
      additionalInfo,
      recommendations: generateRecommendations(vercelEnv, googleSheetsEnv, securityEnv),
    });

  } catch (error) {
    console.error('Environment check error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to check environment variables',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

function generateRecommendations(vercelEnv: Record<string, string>, googleEnv: Record<string, string>, securityEnv: Record<string, string>): string[] {
  const recommendations: string[] = [];

  // فحص متغيرات Vercel
  if (vercelEnv.VERCEL !== '1') {
    recommendations.push('⚠️ Not running on Vercel - some features may not work correctly');
  }

  if (vercelEnv.VERCEL_ENV === 'Not set') {
    recommendations.push('❌ Enable "Automatically expose System Environment Variables" in Vercel settings');
  }

  // فحص متغيرات Google Sheets
  const missingGoogleVars = Object.entries(googleEnv)
    .filter(([key, value]: [string, string]) => value.includes('❌'))
    .map(([key]) => key);

  if (missingGoogleVars.length > 0) {
    recommendations.push(`❌ Missing Google Sheets variables: ${missingGoogleVars.join(', ')}`);
  }

  // فحص متغيرات الأمان
  const missingSecurityVars = Object.entries(securityEnv)
    .filter(([key, value]: [string, string]) => value.includes('❌'))
    .map(([key]) => key);

  if (missingSecurityVars.length > 0) {
    recommendations.push(`❌ Missing security variables: ${missingSecurityVars.join(', ')}`);
  }

  // توصيات عامة
  if (vercelEnv.VERCEL_ENV === 'production') {
    recommendations.push('✅ Running in production mode');
  } else {
    recommendations.push('ℹ️ Not in production mode - ensure all variables are set for production deployment');
  }

  if (recommendations.length === 0) {
    recommendations.push('🎉 All environment variables are properly configured!');
  }

  return recommendations;
}