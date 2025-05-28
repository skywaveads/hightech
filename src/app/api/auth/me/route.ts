import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// المفتاح السري لـ JWT
const JWT_SECRET = process.env.JWT_SECRET || 'SuperStrongSecretKey_!234';

// التحقق من حالة المصادقة
export async function GET(request: NextRequest) {
  try {
    // الحصول على الرمز من الكوكيز
    const token = cookies().get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'غير مصادق عليه' },
        { status: 401 }
      );
    }
    
    // التحقق من صحة الرمز
    try {
      // @ts-ignore
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // التحقق من انتهاء صلاحية الرمز
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return NextResponse.json(
          { message: 'انتهت صلاحية الجلسة' },
          { status: 401 }
        );
      }
      
      // إرجاع معلومات المستخدم
      return NextResponse.json({
        success: true,
        user: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role || 'admin',
          loginTime: decoded.loginTime,
          fingerprint: decoded.fingerprint
        }
      });
      
    } catch (jwtError) {
      console.error('خطأ في التحقق من JWT:', jwtError);
      return NextResponse.json(
        { message: 'رمز غير صالح' },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('خطأ في التحقق من المصادقة:', error);
    return NextResponse.json(
      { message: 'خطأ في الخادم' },
      { status: 500 }
    );
  }
}
