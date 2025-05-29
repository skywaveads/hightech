import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import {
  checkUserRateLimit,
  checkIPRateLimit,
  recordFailedAttempt,
  recordFailedIPAttempt,
  clearUserAttempts,
  generateBrowserFingerprint,
  logSecurityEvent,
  detectSuspiciousActivity
} from '@/lib/security';

// المفتاح السري لـ JWT
const JWT_SECRET = process.env.JWT_SECRET || 'SuperStrongSecretKey_!234';
const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || '2h';

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

// تسجيل الدخول
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  console.log('=================');
  console.log('بدء محاولة تسجيل الدخول محسنة...');
  
  try {
    // استخراج معلومات الطلب
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    const acceptLanguage = request.headers.get('accept-language') || '';
    const browserFingerprint = request.headers.get('x-browser-fingerprint') || '';
    const csrfToken = request.headers.get('x-csrf-token') || '';
    
    // استخراج بيانات الإدخال
    const body = await request.json();
    const { email, password, captchaToken } = body;
    
    // التحقق الأولي من صحة البيانات
    if (!email || !password) {
      logSecurityEvent({
        type: 'LOGIN_FAILED',
        email,
        ip: clientIP,
        userAgent,
        timestamp: Date.now(),
        details: { reason: 'missing_credentials' }
      });
      
      return NextResponse.json(
        { 
          message: 'البريد الإلكتروني وكلمة المرور مطلوبان',
          code: 'MISSING_CREDENTIALS'
        },
        { status: 400 }
      );
    }

    // فحص النشاط المشبوه
    if (detectSuspiciousActivity(clientIP, userAgent)) {
      logSecurityEvent({
        type: 'SUSPICIOUS_ACTIVITY',
        email,
        ip: clientIP,
        userAgent,
        timestamp: Date.now(),
        details: { reason: 'suspicious_pattern' }
      });
      
      return NextResponse.json(
        { 
          message: 'تم اكتشاف نشاط مشبوه. يرجى المحاولة لاحقاً',
          code: 'SUSPICIOUS_ACTIVITY'
        },
        { status: 429 }
      );
    }

    // فحص معدل المحاولات لـ IP
    const ipRateLimit = checkIPRateLimit(clientIP);
    if (!ipRateLimit.allowed) {
      const timeLeft = ipRateLimit.blockedUntil ? Math.ceil((ipRateLimit.blockedUntil - Date.now()) / 1000 / 60) : 0;
      
      logSecurityEvent({
        type: 'IP_BLOCKED',
        email,
        ip: clientIP,
        userAgent,
        timestamp: Date.now(),
        details: { timeLeft }
      });
      
      return NextResponse.json(
        { 
          message: `عنوان IP محظور. المحاولة مرة أخرى خلال ${timeLeft} دقيقة`,
          code: 'IP_BLOCKED',
          timeLeft
        },
        { status: 429 }
      );
    }

    // فحص معدل المحاولات للمستخدم
    const userRateLimit = checkUserRateLimit(email);
    if (!userRateLimit.allowed) {
      const timeLeft = userRateLimit.lockedUntil ? Math.ceil((userRateLimit.lockedUntil - Date.now()) / 1000 / 60) : 0;
      
      logSecurityEvent({
        type: 'ACCOUNT_LOCKED',
        email,
        ip: clientIP,
        userAgent,
        timestamp: Date.now(),
        details: { timeLeft }
      });
      
      return NextResponse.json(
        { 
          message: `الحساب محظور مؤقتاً. المحاولة مرة أخرى خلال ${timeLeft} دقيقة`,
          code: 'ACCOUNT_LOCKED',
          timeLeft
        },
        { status: 429 }
      );
    }

    // التحقق من CAPTCHA إذا كان مطلوباً
    if (userRateLimit.requiresCaptcha && !captchaToken) {
      return NextResponse.json(
        { 
          message: 'رمز التحقق مطلوب',
          code: 'CAPTCHA_REQUIRED',
          requiresCaptcha: true,
          remainingAttempts: userRateLimit.remainingAttempts
        },
        { status: 400 }
      );
    }

    // التحقق من بيانات الإدمن من متغيرات البيئة
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminEmail = 'admin@hightech.com';
    
    console.log('🔍 التحقق من بيانات الإدمن...');
    console.log('📧 البريد المدخل:', email);
    console.log('👤 اسم المستخدم المطلوب:', adminUsername);
    
    // التحقق من صحة بيانات الإدمن
    if ((email === adminEmail || email === adminUsername) && password === adminPassword) {
      console.log('✅ تم التحقق من الإدمن بنجاح');
      
      // مسح محاولات المستخدم عند النجاح
      clearUserAttempts(email);
      
      // تسجيل حدث النجاح
      logSecurityEvent({
        type: 'LOGIN_SUCCESS',
        email,
        ip: clientIP,
        userAgent,
        timestamp: Date.now(),
        details: {
          loginType: 'environment_variables',
          responseTime: Date.now() - startTime,
          browserFingerprint
        }
      });
      
      return generateTokenAndRespond('admin-001', email, clientIP, userAgent);
    } else {
      console.log('❌ بيانات الإدمن غير صحيحة');
      
      // تسجيل المحاولة الفاشلة
      recordFailedAttempt(email);
      recordFailedIPAttempt(clientIP);
      
      // تسجيل حدث الفشل
      logSecurityEvent({
        type: 'LOGIN_FAILED',
        email,
        ip: clientIP,
        userAgent,
        timestamp: Date.now(),
        details: {
          reason: 'invalid_credentials',
          responseTime: Date.now() - startTime
        }
      });
      
      return unauthorizedResponse(userRateLimit.remainingAttempts - 1);
    }
    
  } catch (error: any) {
    console.error('خطأ في تسجيل الدخول:', error);
    
    // تسجيل حدث الخطأ
    logSecurityEvent({
      type: 'LOGIN_FAILED',
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent') || '',
      timestamp: Date.now(),
      details: { 
        reason: 'server_error',
        error: error.message
      }
    });
    
    return NextResponse.json(
      { 
        message: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً',
        code: 'SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}

// إنشاء رمز JWT والاستجابة
function generateTokenAndRespond(userId: string, email: string, clientIP: string, userAgent: string) {
  try {
    // إنشاء بصمة المتصفح
    const browserFingerprint = generateBrowserFingerprint(userAgent, 'ar', clientIP);
    
    // إنشاء رمز JWT مع معلومات إضافية
    const payload = { 
      id: userId, 
      role: 'admin',
      email,
      fingerprint: browserFingerprint,
      loginTime: Date.now()
    };
    
    // @ts-ignore
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
    
    // إعداد كوكي آمن
    const cookieOptions = {
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 2 * 60 * 60, // ساعتان
    };
    
    cookies().set(cookieOptions);
    
    // إعداد كوكي إضافي للبصمة
    cookies().set({
      name: 'fingerprint',
      value: browserFingerprint,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 2 * 60 * 60,
    });
    
    return NextResponse.json({
      success: true,
      user: { 
        id: userId, 
        email,
        role: 'admin'
      },
      security: {
        fingerprint: browserFingerprint,
        loginTime: Date.now(),
        expiresIn: TOKEN_EXPIRES
      },
      sessionOnly: false
    });
  } catch (error) {
    console.error('خطأ في إنشاء رمز JWT:', error);
    throw error;
  }
}

// استجابة غير مصرح محسنة
function unauthorizedResponse(remainingAttempts: number = 0) {
  return NextResponse.json(
    { 
      message: 'بيانات الدخول غير صحيحة',
      code: 'INVALID_CREDENTIALS',
      remainingAttempts,
      requiresCaptcha: remainingAttempts <= 2
    },
    { status: 401 }
  );
}
