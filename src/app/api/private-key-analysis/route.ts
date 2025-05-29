import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('[PrivateKeyAnalysis] Starting detailed private key analysis...');
    
    const rawKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY || '';
    
    // تحليل شامل للمفتاح الخام
    const analysis = {
      timestamp: new Date().toISOString(),
      environment: 'vercel',
      rawKeyAnalysis: {
        exists: !!rawKey,
        length: rawKey.length,
        isEmpty: rawKey.trim() === '',
        startsWithQuote: rawKey.startsWith('"') || rawKey.startsWith("'"),
        endsWithQuote: rawKey.endsWith('"') || rawKey.endsWith("'"),
        containsEscapedNewlines: rawKey.includes('\\n'),
        containsRealNewlines: rawKey.includes('\n'),
        containsBeginHeader: rawKey.includes('-----BEGIN PRIVATE KEY-----'),
        containsEndHeader: rawKey.includes('-----END PRIVATE KEY-----'),
        firstChars: rawKey.substring(0, 100),
        lastChars: rawKey.substring(Math.max(0, rawKey.length - 100)),
        lineCount: rawKey.split('\n').length,
        escapedLineCount: rawKey.split('\\n').length,
        hasCarriageReturn: rawKey.includes('\r'),
        hasTab: rawKey.includes('\t'),
        encoding: 'unknown'
      },
      processingSteps: [],
      finalResult: {
        success: false,
        processedKey: '',
        error: ''
      }
    };

    // خطوة 1: تحليل الترميز المحتمل
    let processedKey = rawKey.trim();
    analysis.processingSteps.push({
      step: 1,
      name: 'Initial Trim',
      before: rawKey.length,
      after: processedKey.length,
      changed: rawKey.length !== processedKey.length
    });

    // خطوة 2: معالجة JSON-escaped strings
    if (processedKey.includes('\\n')) {
      const beforeLength = processedKey.length;
      processedKey = processedKey.replace(/\\n/g, '\n');
      analysis.processingSteps.push({
        step: 2,
        name: 'JSON Escape Processing',
        before: beforeLength,
        after: processedKey.length,
        changed: beforeLength !== processedKey.length
      });
    }

    // خطوة 3: إزالة علامات الاقتباس
    if ((processedKey.startsWith('"') && processedKey.endsWith('"')) ||
        (processedKey.startsWith("'") && processedKey.endsWith("'"))) {
      const beforeLength = processedKey.length;
      processedKey = processedKey.slice(1, -1);
      analysis.processingSteps.push({
        step: 3,
        name: 'Quote Removal',
        before: beforeLength,
        after: processedKey.length,
        changed: beforeLength !== processedKey.length
      });
    }

    // خطوة 4: محاولة فك تشفير base64
    if (!processedKey.includes('-----BEGIN PRIVATE KEY-----') && processedKey.length > 100) {
      try {
        const decoded = Buffer.from(processedKey, 'base64').toString('utf8');
        if (decoded.includes('-----BEGIN PRIVATE KEY-----')) {
          const beforeLength = processedKey.length;
          processedKey = decoded;
          analysis.processingSteps.push({
            step: 4,
            name: 'Base64 Decode',
            before: beforeLength,
            after: processedKey.length,
            changed: true,
            success: true
          });
        }
      } catch (error) {
        analysis.processingSteps.push({
          step: 4,
          name: 'Base64 Decode',
          before: processedKey.length,
          after: processedKey.length,
          changed: false,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // خطوة 5: إصلاح فواصل الأسطر
    if (processedKey.includes('-----BEGIN PRIVATE KEY-----') && processedKey.includes('-----END PRIVATE KEY-----')) {
      const beforeLength = processedKey.length;
      processedKey = processedKey
        .replace(/-----BEGIN PRIVATE KEY-----\s*/g, '-----BEGIN PRIVATE KEY-----\n')
        .replace(/\s*-----END PRIVATE KEY-----/g, '\n-----END PRIVATE KEY-----')
        .replace(/\n\n+/g, '\n');
      analysis.processingSteps.push({
        step: 5,
        name: 'Line Break Fixing',
        before: beforeLength,
        after: processedKey.length,
        changed: beforeLength !== processedKey.length
      });
    }

    // تحليل النتيجة النهائية
    analysis.finalResult = {
      success: processedKey.includes('-----BEGIN PRIVATE KEY-----') && processedKey.includes('-----END PRIVATE KEY-----'),
      processedKey: processedKey.substring(0, 200) + '...' + processedKey.substring(Math.max(0, processedKey.length - 200)),
      length: processedKey.length,
      lineCount: processedKey.split('\n').length,
      error: ''
    };

    // محاولة إنشاء JWT للاختبار
    try {
      const { JWT } = await import('google-auth-library');
      const testJWT = new JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: processedKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });
      
      // محاولة الحصول على access token
      await testJWT.authorize();
      analysis.finalResult.jwtTest = { success: true, error: '' };
    } catch (error) {
      analysis.finalResult.jwtTest = { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown JWT error'
      };
    }

    console.log('[PrivateKeyAnalysis] Analysis completed');
    
    return NextResponse.json(analysis, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    console.error('[PrivateKeyAnalysis] Analysis failed:', error);
    return NextResponse.json(
      { 
        error: 'Private key analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}