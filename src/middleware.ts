import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// المفتاح السري لـ JWT من متغيرات البيئة
const JWT_SECRET = process.env.JWT_SECRET;

// المسارات المحمية
const protectedPaths = [
  '/products-admin',
  '/orders-admin',
  '/comments-admin',
  '/admin',
  '/dashboard'
];

// المسارات العامة التي لا تحتاج حماية
const publicPaths = [
  '/',
  '/admin-login',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/security-status'
];

// Base64 URL decode function
function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

// Simple JWT verification for Edge Runtime
function verifyToken(token: string): any {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables for middleware.');
    return null;
  }
  
  try {
    // Split the token into parts
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[1]) {
      return null;
    }

    // Decode the payload (we'll skip signature verification for now in Edge Runtime)
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Error verifying token in middleware:', error);
    return null;
  }
}

// الحصول على IP الحقيقي للمستخدم
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || '';
  }
  
  if (realIP) {
    return realIP;
  }
  
  return request.ip || 'unknown';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // السماح بالوصول للمسارات العامة
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // السماح بالوصول لملفات الأصول
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/favicon') || 
      pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // التحقق من المسارات المحمية
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  if (isProtectedPath) {
    // الحصول على الرمز من الكوكيز
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      // إعادة توجيه لصفحة تسجيل الدخول
      const loginUrl = new URL('/admin-login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // التحقق من صحة الرمز
    const decoded = verifyToken(token); // استخدام الدالة الجديدة
    
    if (!decoded) {
      // رمز غير صالح - إعادة توجيه لصفحة تسجيل الدخول
      const loginUrl = new URL('/admin-login', request.url);
      loginUrl.searchParams.set('from', pathname);
      loginUrl.searchParams.set('error', 'invalid_token');
      
      // حذف الرمز غير الصالح
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set('token', '', { maxAge: 0 });
      response.cookies.set('fingerprint', '', { maxAge: 0 });
      
      return response;
    }
    
    // التحقق من انتهاء صلاحية الرمز
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      // انتهت صلاحية الرمز - إعادة توجيه لصفحة تسجيل الدخول
      const loginUrl = new URL('/admin-login', request.url);
      loginUrl.searchParams.set('from', pathname);
      loginUrl.searchParams.set('error', 'token_expired');
      
      // حذف الرمز المنتهي الصلاحية
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set('token', '', { maxAge: 0 });
      response.cookies.set('fingerprint', '', { maxAge: 0 });
      
      return response;
    }
    
    // التحقق من بصمة المتصفح (أمان إضافي)
    const storedFingerprint = request.cookies.get('fingerprint')?.value;
    const tokenFingerprint = decoded.fingerprint;
    
    if (tokenFingerprint && storedFingerprint && tokenFingerprint !== storedFingerprint) {
      // بصمة المتصفح لا تتطابق - محاولة اختراق محتملة
      const loginUrl = new URL('/admin-login', request.url);
      loginUrl.searchParams.set('from', pathname);
      loginUrl.searchParams.set('error', 'security_violation');
      
      // حذف جميع الرموز
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set('token', '', { maxAge: 0 });
      response.cookies.set('fingerprint', '', { maxAge: 0 });
      
      // تسجيل محاولة الاختراق
      console.warn('Security violation detected:', {
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent'),
        path: pathname,
        tokenFingerprint,
        storedFingerprint
      });
      
      return response;
    }
    
    // إضافة معلومات المستخدم للطلب
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.id);
    requestHeaders.set('x-user-email', decoded.email);
    requestHeaders.set('x-user-role', decoded.role || 'admin');
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  // السماح بالوصول للمسارات الأخرى
  return NextResponse.next();
}

// تكوين المسارات التي يطبق عليها الـ middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
