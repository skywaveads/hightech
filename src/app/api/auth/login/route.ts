import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// المفتاح السري لـ JWT
const JWT_SECRET = process.env.JWT_SECRET || 'g#Pz7@rM!aW^84qL*v2ZxT$kNdYh1sB9';

// Base64 URL encode function
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Simple JWT creation compatible with Vercel
function createToken(payload: any): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const now = Math.floor(Date.now() / 1000);
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + (24 * 60 * 60) // 24 hours
  };
  
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(tokenPayload));
  
  // For simplicity, we'll use a basic signature (in production, use proper HMAC)
  const signature = base64UrlEncode(`${encodedHeader}.${encodedPayload}.${JWT_SECRET}`);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, browserFingerprint } = body;
    
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
    
    // بيانات الإدمن - تم تحديث كلمة المرور مباشرة
    const adminUsername = 'admin';
    const adminPassword = 'Admin123!@#';
    const adminEmail = 'admin@hightech.com';

    const emailMatch = (email === adminEmail || email === adminUsername);
    const passwordMatch = (password === adminPassword);
    
    // التحقق من صحة بيانات الإدمن
    if (emailMatch && passwordMatch) {
      // إنشاء JWT token
      const tokenPayload = {
        id: 'admin-001',
        email: adminEmail,
        role: 'admin',
        loginTime: Date.now(),
        fingerprint: browserFingerprint || ''
      };
      
      const token = createToken(tokenPayload);
      
      // إعداد كوكي آمن
      const cookieStore = cookies();
      cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 24 * 60 * 60, // 24 ساعة
      });
      
      return NextResponse.json({
        success: true,
        user: tokenPayload,
        token
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
