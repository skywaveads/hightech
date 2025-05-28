import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import Admin from '@/models/Admin';

// بيانات المسؤول الافتراضي
const DEFAULT_ADMIN = {
  email: 'admin@hightech.com',
  password: 'StrongP@ss123'  // سيتم تشفيرها قبل التخزين
};

// إنشاء حساب مسؤول أولي
export async function GET() {
  console.log('بدء عملية إنشاء حساب المسؤول الأولي...');
  
  try {
    // الاتصال بقاعدة البيانات
    await dbConnect();
    console.log('تم الاتصال بقاعدة البيانات');
    
    // البحث عن المسؤولين الموجودين
    const adminCount = await Admin.countDocuments();
    console.log(`عدد حسابات المسؤولين الموجودة: ${adminCount}`);
    
    if (adminCount === 0) {
      console.log('لا يوجد مسؤولين، جاري إنشاء حساب جديد');
      
      // إنشاء كلمة مرور مشفرة
      const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
      console.log('تم تشفير كلمة المرور');
      
      // إنشاء حساب المسؤول
      const adminData = {
        email: DEFAULT_ADMIN.email,
        password: hashedPassword
      };
      
      console.log('جاري إنشاء المسؤول بالبيانات:', { email: adminData.email, password: '******' });
      const admin = await (Admin as any).create(adminData);
      console.log('تم إنشاء حساب المسؤول بنجاح:', admin.email);
      
      return NextResponse.json({ 
        success: true, 
        message: 'تم إنشاء حساب المسؤول بنجاح',
        email: admin.email
      });
    } else {
      console.log('حساب المسؤول موجود بالفعل');
      
      // البحث عن بيانات المسؤول الحالي
      const admin = await (Admin as any).findOne();
      
      return NextResponse.json({ 
        success: true, 
        message: 'حساب المسؤول موجود بالفعل',
        email: admin?.email || DEFAULT_ADMIN.email
      });
    }
  } catch (error: any) {
    console.error('خطأ في إنشاء حساب المسؤول:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'فشل في إنشاء حساب المسؤول',
        error: error.toString()
      },
      { status: 500 }
    );
  }
} 