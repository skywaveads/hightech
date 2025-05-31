import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // التحقق من وجود البيانات
    if (!email || !password) {
      return NextResponse.json(
        { 
          message: 'البريد الإلكتروني وكلمة المرور مطلوبان',
          code: 'MISSING_CREDENTIALS'
        },
        { status: 400 }
      );
    }
    
    // بيانات الإدمن
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!@#';
    const adminEmail = 'admin@hightech.com';
    
    // التحقق من صحة بيانات الإدمن
    if ((email === adminEmail || email === adminUsername) && password === adminPassword) {
      // إنشاء session token بسيط
      const sessionToken = `admin-session-${Date.now()}`;
      
      // إعداد كوكي آمن
      const cookieStore = cookies();
      cookieStore.set('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 24 * 60 * 60, // 24 ساعة
      });
      
      return NextResponse.json({
        success: true,
        user: { 
          id: 'admin-001', 
          email: adminEmail,
          role: 'admin'
        },
        sessionToken
      });
    } else {
      return NextResponse.json(
        { 
          message: 'بيانات الدخول غير صحيحة',
          code: 'INVALID_CREDENTIALS'
        },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    return NextResponse.json(
      { 
        message: 'حدث خطأ في الخادم',
        code: 'SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}
