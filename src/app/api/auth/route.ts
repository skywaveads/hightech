import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'SuperStrongSecretKey_!234';
const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || '2h';

// تسجيل الدخول
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();
    
    // التحقق من صحة البيانات
    if (!email || !password) {
      return NextResponse.json(
        { message: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }
    
    // البحث عن المسؤول
    const admin = await (Admin as any).findOne({ email });
    
    // التحقق من وجود المسؤول وصحة كلمة المرور
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json(
        { message: 'بيانات الدخول غير صحيحة' },
        { status: 401 }
      );
    }
    
    // إنشاء رمز JWT
    // @ts-ignore
    const token = jwt.sign(
      { id: admin._id, role: 'admin' }, 
      JWT_SECRET, 
      { expiresIn: TOKEN_EXPIRES }
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
    
  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: error.message || 'فشل في تسجيل الدخول' },
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
    
    try {
      // @ts-ignore
      const data = jwt.verify(token, JWT_SECRET);
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json(
        { message: 'الرمز غير صالح' },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error('Error checking auth status:', error);
    return NextResponse.json(
      { message: error.message || 'فشل في التحقق من حالة المصادقة' },
      { status: 500 }
    );
  }
} 