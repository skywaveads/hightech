import bcrypt from 'bcryptjs';
import { GoogleSheetsDatabase } from './google-sheets';

/**
 * إنشاء حساب مسؤول أولي باستخدام Google Sheets
 */
export async function seedAdmin() {
  try {
    console.log('🔧 بدء إنشاء حساب المسؤول باستخدام Google Sheets...');
    
    // التحقق من متغيرات البيئة
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'StrongP@ss123';
    const adminEmail = 'admin@hightech.com';
    
    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      console.warn('⚠️ Google Sheets غير مُعد بشكل صحيح');
      return null;
    }
    
    // إنشاء كلمة مرور مشفرة
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // بيانات المسؤول
    const adminData = {
      id: 'admin-001',
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: null
    };
    
    try {
      // محاولة إضافة المسؤول إلى Google Sheets
      await GoogleSheetsDatabase.addAdmin(adminData);
      console.log('✅ تم إنشاء حساب المسؤول بنجاح في Google Sheets:', adminEmail);
      return adminData;
    } catch (error) {
      // إذا فشل، فربما المسؤول موجود بالفعل
      console.log('ℹ️ حساب المسؤول موجود بالفعل أو حدث خطأ:', (error as Error).message);
      return null;
    }
  } catch (error) {
    console.error('❌ فشل في إنشاء حساب المسؤول:', error);
    throw error;
  }
}

/**
 * التحقق من بيانات اعتماد المسؤول
 */
export async function verifyAdmin(email: string, password: string) {
  try {
    console.log('🔍 التحقق من بيانات المسؤول:', email);
    
    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      console.warn('⚠️ Google Sheets غير مُعد بشكل صحيح');
      return null;
    }
    
    // البحث عن المسؤول في Google Sheets
    const admin = await GoogleSheetsDatabase.getAdminByEmail(email);
    
    if (!admin) {
      console.log('❌ المسؤول غير موجود:', email);
      return null;
    }
    
    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      console.log('❌ كلمة المرور غير صحيحة للمسؤول:', email);
      return null;
    }
    
    console.log('✅ تم التحقق من المسؤول بنجاح:', email);
    
    // تحديث آخر تسجيل دخول
    await GoogleSheetsDatabase.updateAdminLastLogin(admin.id);
    
    return {
      id: admin.id,
      email: admin.email,
      username: admin.username,
      role: admin.role
    };
  } catch (error) {
    console.error('❌ خطأ في التحقق من المسؤول:', error);
    return null;
  }
}