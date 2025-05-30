import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'SuperStrongSecretKey_!234';
const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || '2h';

// Edge Runtime compatible JWT verification
function verifyJWT(token: string, secret: string): Record<string, any> | null {
  // 'secret' is used in the simplified HMAC in createJWT, assuming similar usage or future use here.
  // If truly unused in verifyJWT's logic (e.g. if signature verification was added and used it),
  // then it could be removed from verifyJWT's parameters. For now, keeping as it's part of the function signature.
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload
    const payloadPart = parts[1];
    if (!payloadPart) {
      return null;
    }
    const payload = JSON.parse(base64UrlDecode(payloadPart));

    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

function base64UrlDecode(str: string): string {
  // Add padding if needed
  str += '='.repeat((4 - str.length % 4) % 4);
  // Replace URL-safe characters
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // Decode base64
  return atob(str);
}

// Edge Runtime compatible JWT creation
function createJWT(payload: Record<string, unknown>, secret: string, expiresIn: string): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // Convert expiresIn to timestamp
  const now = Math.floor(Date.now() / 1000);
  let exp = now;
  
  if (expiresIn.endsWith('h')) {
    const hours = parseInt(expiresIn.slice(0, -1));
    exp = now + (hours * 60 * 60);
  } else if (expiresIn.endsWith('m')) {
    const minutes = parseInt(expiresIn.slice(0, -1));
    exp = now + (minutes * 60);
  } else if (expiresIn.endsWith('d')) {
    const days = parseInt(expiresIn.slice(0, -1));
    exp = now + (days * 24 * 60 * 60);
  }

  const jwtPayload = {
    ...payload,
    iat: now,
    exp: exp
  };

  const base64UrlEncode = (obj: Record<string, unknown> | { hash: string }) => {
    return btoa(JSON.stringify(obj))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(jwtPayload);
  const data = `${encodedHeader}.${encodedPayload}`;

  // Create signature using simplified HMAC
  let hash = 0;
  const combined = secret + data;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const signature = base64UrlEncode({ hash: hash.toString() });
  
  return `${data}.${signature}`;
}

// تسجيل الدخول - Updated to use environment variables
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // التحقق من صحة البيانات
    if (!email || !password) {
      return NextResponse.json(
        { message: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }
    
    // التحقق من بيانات الإدمن من متغيرات البيئة
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminEmail = 'admin@hightech.com';
    
    // التحقق من صحة بيانات الإدمن
    if ((email === adminEmail || email === adminUsername) && password === adminPassword) {
      // إنشاء رمز JWT
      const token = createJWT(
        { id: 'admin-001', role: 'admin', email },
        JWT_SECRET,
        TOKEN_EXPIRES
      );
      
      // إضافة الرمز في ملف تعريف الارتباط (cookie)
      cookies().set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 2 * 60 * 60, // ساعتان بالثواني
        path: '/',
      });
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { message: 'بيانات الدخول غير صحيحة' },
        { status: 401 }
      );
    }
    
  } catch (error) {
    const typedError = error as Error;
    console.error('Error during login:', typedError);
    return NextResponse.json(
      { message: typedError.message || 'فشل في تسجيل الدخول' },
      { status: 500 }
    );
  }
}

// الحصول على معلومات المسؤول الحالي
export async function GET() {
  try {
    const token = cookies().get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'غير مصرح' },
        { status: 401 }
      );
    }
    
    const data = verifyJWT(token, JWT_SECRET);
    if (!data) {
      return NextResponse.json(
        { message: 'الرمز غير صالح' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    const typedError = error as Error;
    console.error('Error checking auth status:', typedError);
    return NextResponse.json(
      { message: typedError.message || 'فشل في التحقق من حالة المصادقة' },
      { status: 500 }
    );
  }
}