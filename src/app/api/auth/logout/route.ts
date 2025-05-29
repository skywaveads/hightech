import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logSecurityEvent } from '@/lib/security';

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

// تسجيل الخروج
export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    
    // الحصول على معلومات المستخدم من الكوكيز قبل حذفها
    const token = cookies().get('token')?.value;
    let userEmail = '';
    
    if (token) {
      try {
        // Edge Runtime compatible JWT decoding
        const parts = token.split('.');
        if (parts.length === 3) {
          const payloadPart = parts[1];
          if (payloadPart) {
            // Add padding if needed
            let payload = payloadPart;
            payload += '='.repeat((4 - payload.length % 4) % 4);
            // Replace URL-safe characters
            payload = payload.replace(/-/g, '+').replace(/_/g, '/');
            // Decode base64
            const decoded = JSON.parse(atob(payload));
            userEmail = decoded.email || '';
          }
        }
      } catch (error) {
        // تجاهل أخطاء فك التشفير
      }
    }
    
    // حذف جميع الكوكيز المتعلقة بالمصادقة
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 0, // حذف فوري
    };
    
    cookies().set('token', '', cookieOptions);
    cookies().set('fingerprint', '', cookieOptions);
    
    // تسجيل حدث تسجيل الخروج
    logSecurityEvent({
      type: 'LOGIN_SUCCESS', // نستخدم نفس النوع لأنه لا يوجد LOGOUT في التعريف
      email: userEmail,
      ip: clientIP,
      userAgent,
      timestamp: Date.now(),
      details: { 
        action: 'logout',
        method: 'manual'
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    });
    
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    
    // حتى لو حدث خطأ، نحذف الكوكيز
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 0,
    };
    
    cookies().set('token', '', cookieOptions);
    cookies().set('fingerprint', '', cookieOptions);
    
    return NextResponse.json(
      { 
        success: true,
        message: 'تم تسجيل الخروج (مع أخطاء)'
      },
      { status: 200 } // نرجع 200 حتى لو حدث خطأ لأن الهدف تحقق
    );
  }
}

// دعم GET أيضاً لسهولة الاستخدام
export async function GET(request: NextRequest) {
  return POST(request);
}
