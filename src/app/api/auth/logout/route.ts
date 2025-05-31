import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// تسجيل الخروج بنظام بسيط
export async function POST(request: NextRequest) {
  try {
    // حذف كوكي الجلسة
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 0, // حذف فوري
    };
    
    cookies().set('admin-session', '', cookieOptions);
    
    console.log('✅ تم تسجيل الخروج بنجاح');
    
    return NextResponse.json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    });
    
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    
    // حتى لو حدث خطأ، نحذف الكوكي
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 0,
    };
    
    cookies().set('admin-session', '', cookieOptions);
    
    return NextResponse.json(
      { 
        success: true,
        message: 'تم تسجيل الخروج'
      },
      { status: 200 }
    );
  }
}

// دعم GET أيضاً لسهولة الاستخدام
export async function GET(request: NextRequest) {
  return POST(request);
}
