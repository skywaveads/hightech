import bcrypt from 'bcryptjs';
import dbConnect from './dbConnect';
import Admin from '@/models/Admin';

/**
 * إنشاء حساب مسؤول أولي
 */
export async function seedAdmin() {
  try {
    await dbConnect();
    
    // التحقق من وجود مسؤول بالفعل
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      // إنشاء كلمة مرور مشفرة
      const hashedPassword = await bcrypt.hash('StrongP@ss123', 10);
      
      // إنشاء حساب المسؤول
      const admin = await (Admin as any).create({
        email: 'admin@hightech.com',
        password: hashedPassword
      });
      
      console.log('تم إنشاء حساب المسؤول بنجاح:', admin.email);
      return admin;
    } else {
      console.log('حساب المسؤول موجود بالفعل، تم تخطي الإنشاء');
      return null;
    }
  } catch (error) {
    console.error('فشل في إنشاء حساب المسؤول:', error);
    throw error;
  }
} 