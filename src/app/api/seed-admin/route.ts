import { NextResponse } from 'next/server';

// إعداد حساب المسؤول باستخدام متغيرات البيئة
export async function GET() {
  console.log('🔧 فحص إعداد حساب المسؤول...');
  
  try {
    // الحصول على بيانات الإدمن من متغيرات البيئة
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const jwtSecret = process.env.JWT_SECRET;
    
    console.log('📋 فحص متغيرات البيئة...');
    console.log('👤 اسم المستخدم:', adminUsername);
    console.log('🔐 كلمة المرور:', adminPassword ? '✅ مُعدة' : '❌ غير مُعدة');
    console.log('🔑 JWT Secret:', jwtSecret ? '✅ مُعد' : '❌ غير مُعد');
    
    // التحقق من وجود المتغيرات المطلوبة
    const missingVars = [];
    if (!process.env.ADMIN_USERNAME) missingVars.push('ADMIN_USERNAME');
    if (!process.env.ADMIN_PASSWORD) missingVars.push('ADMIN_PASSWORD');
    if (!process.env.JWT_SECRET) missingVars.push('JWT_SECRET');
    
    if (missingVars.length > 0) {
      console.warn('⚠️ متغيرات البيئة المفقودة:', missingVars);
      return NextResponse.json({
        success: false,
        message: 'بعض متغيرات البيئة مفقودة',
        missingVars,
        recommendations: [
          'تأكد من إضافة ADMIN_USERNAME في Vercel',
          'تأكد من إضافة ADMIN_PASSWORD في Vercel',
          'تأكد من إضافة JWT_SECRET في Vercel'
        ]
      }, { status: 500 });
    }
    
    console.log('✅ جميع متغيرات البيئة مُعدة بشكل صحيح');
    
    return NextResponse.json({
      success: true,
      message: 'حساب المسؤول مُعد بشكل صحيح',
      admin: {
        username: adminUsername,
        email: 'admin@hightech.com',
        authMethod: 'Environment Variables'
      },
      database: 'Google Sheets (للتعليقات والطلبات)',
      authentication: 'Environment Variables'
    });
    
  } catch (error: any) {
    console.error('❌ خطأ في فحص إعداد المسؤول:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'فشل في فحص إعداد المسؤول',
        error: error.toString()
      },
      { status: 500 }
    );
  }
}