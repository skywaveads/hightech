import { NextRequest } from 'next/server';

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

// المفتاح السري لـ JWT - يجب أن يتطابق مع المستخدم في واجهة برمجة تطبيقات تسجيل الدخول
const JWT_SECRET = process.env.JWT_SECRET || 'g#Pz7@rM!aW^84qL*v2ZxT$kNdYh1sB9';

// دالة لفك ترميز Base64 URL
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  try {
    return atob(base64);
  } catch (e) {
    console.error("Failed to decode base64 string:", base64, e);
    throw new Error("Invalid base64 string for decoding");
  }
}

// دالة لترميز Base64 URL (مطابقة لتلك الموجودة في login route)
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// دالة لإعادة إنشاء التوقيع للتحقق (مطابقة لتلك الموجودة في login route)
function recreateSignature(encodedHeader: string, encodedPayload: string, secret: string): string {
  return base64UrlEncode(`${encodedHeader}.${encodedPayload}.${secret}`);
}


/**
 * Verify admin authentication from request using custom JWT-like token
 */
export async function verifyAdmin(request: NextRequest): Promise<AdminUser | null> {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      console.log('[Auth] No token found in cookies');
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log('[Auth] Invalid token format (not 3 parts)');
      return null;
    }

    const encodedHeader = parts[0];
    const encodedPayload = parts[1];
    const signatureFromToken = parts[2];

    // التأكد من أن الأجزاء ليست فارغة قبل استخدامها
    if (!encodedHeader || !encodedPayload || !signatureFromToken) {
      console.log('[Auth] Invalid token structure (empty parts)');
      return null;
    }

    const expectedSignature = recreateSignature(encodedHeader, encodedPayload, JWT_SECRET);

    if (signatureFromToken !== expectedSignature) {
      console.log('[Auth] Invalid signature.');
      return null;
    }
    
    const payloadString = base64UrlDecode(encodedPayload);
    const payload = JSON.parse(payloadString) as AdminUser & { exp: number, iat?:number, fingerprint?: string };

    // التحقق من تاريخ انتهاء الصلاحية
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      console.log('[Auth] Token expired');
      return null;
    }
    
    // (اختياري) التحقق من بصمة المتصفح إذا كانت موجودة
    const requestFingerprint = request.headers.get('X-Browser-Fingerprint');
    if (payload.fingerprint && requestFingerprint && payload.fingerprint !== requestFingerprint) {
        console.warn('[Auth] Browser fingerprint mismatch.');
        // يمكنك اختيار إرجاع null هنا لرفض الجلسة
    }

    console.log('[Auth] ✅ Token validated successfully for:', payload.email);
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

  } catch (error) {
    console.error('[Auth] Token verification failed:', error);
    return null;
  }
}

/**
 * Check if request is from authenticated admin
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const admin = await verifyAdmin(request);
  return admin !== null;
}

/**
 * Get admin user from request
 */
export async function getAdminUser(request: NextRequest): Promise<AdminUser | null> {
  return await verifyAdmin(request);
}