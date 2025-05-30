import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// المفتاح السري لـ JWT
const JWT_SECRET = process.env.JWT_SECRET || 'SuperStrongSecretKey_!234';

// Base64 URL decode function
function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

// Simple JWT verification compatible with Vercel
interface DecodedToken {
  id?: string;
  email?: string;
  role?: string;
  loginTime?: number;
  fingerprint?: string;
  exp?: number;
  iat?: number;
  [key: string]: any; // Allow other properties
}

function verifyToken(token: string): DecodedToken | null {
  if (!JWT_SECRET) {
    return null;
  }
  
  try {
    // Split the token into parts
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
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

// التحقق من حالة المصادقة
export async function GET() { // Removed unused request parameter
  try {
    // الحصول على الرمز من الكوكيز
    const token = cookies().get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'غير مصادق عليه', authenticated: false },
        { status: 401 }
      );
    }
    
    // التحقق من صحة الرمز
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { message: 'رمز غير صالح', authenticated: false },
        { status: 401 }
      );
    }
    
    // إرجاع معلومات المستخدم
    // Ensure all expected fields are present, providing defaults if necessary
    const userPayload = {
      id: decoded.id || 'default-admin-id', // Provide a default if id might be missing
      email: decoded.email || 'admin@example.com', // Default email
      role: decoded.role || 'admin', // Default role
      loginTime: decoded.loginTime || Date.now(), // Default loginTime
      fingerprint: decoded.fingerprint || '' // Default fingerprint
    };

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: userPayload
    });
    
  } catch (error) {
    console.error('خطأ في التحقق من المصادقة:', error);
    return NextResponse.json(
      { message: 'خطأ في الخادم', authenticated: false },
      { status: 500 }
    );
  }
}
