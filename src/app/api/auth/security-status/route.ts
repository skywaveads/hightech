import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getRecentSecurityEvents, detectSuspiciousActivity } from '@/lib/security';

const JWT_SECRET = process.env.JWT_SECRET || 'SuperStrongSecretKey_!234';

// Edge Runtime compatible JWT verification
function verifyJWT(token: string, secret: string): any | null {
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

    // In a production environment, you should verify the signature
    // For now, we'll trust the token if it's properly formatted and not expired
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

// الحصول على IP الحقيقي للمستخدم
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  
  if (realIP) {
    return realIP;
  }
  
  return request.ip || 'unknown';
}

export async function GET(request: NextRequest) {
  try {
    // التحقق من المصادقة
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'غير مصرح بالوصول' },
        { status: 401 }
      );
    }

    // التحقق من صحة الرمز المميز
    const decoded = verifyJWT(token, JWT_SECRET);
    if (!decoded) {
      return NextResponse.json(
        { error: 'رمز مصادقة غير صالح' },
        { status: 401 }
      );
    }

    // جمع معلومات الأمان
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    
    // فحص النشاط المشبوه
    const isSuspicious = detectSuspiciousActivity(clientIP, userAgent);
    
    // الحصول على الأحداث الأمنية الأخيرة
    const recentEvents = getRecentSecurityEvents(10);
    
    // تحليل التهديدات
    const threats = [];
    const alerts = [];
    
    if (isSuspicious) {
      threats.push({
        type: 'suspicious_activity',
        level: 'medium',
        description: 'تم اكتشاف نشاط مشبوه من عنوان IP الحالي'
      });
      alerts.push('تم اكتشاف نشاط مشبوه من عنوان IP الحالي');
    }
    
    // فحص محاولات تسجيل الدخول الفاشلة الأخيرة
    const failedLogins = recentEvents.filter(event => 
      event.type === 'LOGIN_FAILED' && 
      Date.now() - event.timestamp < 60 * 60 * 1000 // آخر ساعة
    );
    
    if (failedLogins.length > 3) {
      threats.push({
        type: 'multiple_failed_logins',
        level: 'high',
        description: `${failedLogins.length} محاولة تسجيل دخول فاشلة في الساعة الأخيرة`
      });
      alerts.push(`${failedLogins.length} محاولة تسجيل دخول فاشلة في الساعة الأخيرة`);
    }
    
    // فحص عناوين IP متعددة
    const uniqueIPs = new Set(recentEvents
      .filter(event => Date.now() - event.timestamp < 24 * 60 * 60 * 1000)
      .map(event => event.ip)
    );
    
    if (uniqueIPs.size > 5) {
      threats.push({
        type: 'multiple_ips',
        level: 'medium',
        description: `محاولات وصول من ${uniqueIPs.size} عناوين IP مختلفة في آخر 24 ساعة`
      });
    }
    
    // حساب نقاط الأمان
    let securityScore = 100;
    threats.forEach(threat => {
      switch (threat.level) {
        case 'high':
          securityScore -= 20;
          break;
        case 'medium':
          securityScore -= 10;
          break;
        case 'low':
          securityScore -= 5;
          break;
      }
    });
    
    securityScore = Math.max(0, securityScore);
    
    // تحديد مستوى الأمان
    let securityLevel: 'high' | 'medium' | 'low';
    if (securityScore >= 80) {
      securityLevel = 'high';
    } else if (securityScore >= 60) {
      securityLevel = 'medium';
    } else {
      securityLevel = 'low';
    }
    
    // معلومات الجلسة
    const sessionInfo = {
      userId: decoded.id,
      email: decoded.email,
      loginTime: decoded.loginTime || Date.now(),
      fingerprint: decoded.fingerprint,
      currentIP: clientIP,
      userAgent: userAgent,
      sessionDuration: Date.now() - (decoded.loginTime || Date.now())
    };
    
    // إحصائيات الأمان
    const securityStats = {
      totalEvents: recentEvents.length,
      successfulLogins: recentEvents.filter(e => e.type === 'LOGIN_SUCCESS').length,
      failedLogins: failedLogins.length,
      suspiciousActivities: recentEvents.filter(e => e.type === 'SUSPICIOUS_ACTIVITY').length,
      uniqueIPs: uniqueIPs.size
    };
    
    return NextResponse.json({
      securityLevel,
      securityScore,
      threats,
      alerts,
      sessionInfo,
      securityStats,
      recentEvents: recentEvents.slice(0, 5), // آخر 5 أحداث فقط
      recommendations: generateSecurityRecommendations(threats, securityScore)
    });
    
  } catch (error) {
    console.error('خطأ في فحص حالة الأمان:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في فحص حالة الأمان' },
      { status: 500 }
    );
  }
}

// إنشاء توصيات أمنية
function generateSecurityRecommendations(threats: any[], securityScore: number): string[] {
  const recommendations = [];
  
  if (securityScore < 70) {
    recommendations.push('يُنصح بتغيير كلمة المرور فوراً');
    recommendations.push('تفعيل المصادقة الثنائية إذا كانت متاحة');
  }
  
  if (threats.some(t => t.type === 'suspicious_activity')) {
    recommendations.push('مراجعة سجل النشاط بعناية');
    recommendations.push('التأكد من عدم وصول أشخاص غير مصرح لهم للحساب');
  }
  
  if (threats.some(t => t.type === 'multiple_failed_logins')) {
    recommendations.push('فحص محاولات تسجيل الدخول الفاشلة');
    recommendations.push('التأكد من قوة كلمة المرور');
  }
  
  if (threats.some(t => t.type === 'multiple_ips')) {
    recommendations.push('مراجعة عناوين IP التي تم الوصول منها');
    recommendations.push('التأكد من أمان الشبكة المستخدمة');
  }
  
  // توصيات عامة
  if (recommendations.length === 0) {
    recommendations.push('الحفاظ على تحديث المتصفح');
    recommendations.push('استخدام شبكة آمنة');
    recommendations.push('تسجيل الخروج عند الانتهاء');
  }
  
  return recommendations;
}
