import mongoose from 'mongoose';

/**
 * تعريف النوع لحالة الاتصال بقاعدة البيانات
 */
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Mongoose> | null;
}

// عنوان قاعدة البيانات - يمكن تعديله حسب التكوين المحلي
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hightech';

// وقت المهلة للاتصال بقاعدة البيانات (بالميلي ثانية) - 5 ثواني
const DB_TIMEOUT = 5000;

// متغير للاحتفاظ بحالة الاتصال
declare global {
  var mongoose: { conn: any; promise: any } | undefined;
}

let cached: { conn: any; promise: any } = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * الاتصال بقاعدة البيانات MongoDB مع مهلة زمنية
 */
export default async function dbConnect() {
  console.log('محاولة الاتصال بقاعدة البيانات:', MONGODB_URI);
  
  if (cached.conn) {
    console.log('استخدام اتصال قاعدة البيانات الموجود');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      connectTimeoutMS: DB_TIMEOUT,
      serverSelectionTimeoutMS: DB_TIMEOUT,
      socketTimeoutMS: DB_TIMEOUT,
    };

    console.log('إنشاء اتصال جديد بقاعدة البيانات...');
    
    // إنشاء وعد مع مهلة زمنية
    const connectWithTimeout = async () => {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('انتهت مهلة الاتصال بقاعدة البيانات')), DB_TIMEOUT);
      });
      
      const connectionPromise = mongoose.connect(MONGODB_URI, opts);
      
      try {
        // استخدام سباق بين الوعدين - أيهما يكتمل أولاً
        return await Promise.race([connectionPromise, timeoutPromise]) as mongoose.Mongoose;
      } catch (error) {
        console.error('فشل الاتصال بقاعدة البيانات بسبب انتهاء المهلة:', error);
        throw error;
      }
    };
    
    cached.promise = connectWithTimeout()
      .then(mongoose => {
        console.log('تم الاتصال بقاعدة البيانات بنجاح!');
        return mongoose;
      })
      .catch(error => {
        console.error('فشل الاتصال بقاعدة البيانات:', error);
        cached.promise = null;
        throw error;
      });
  } else {
    console.log('استخدام وعد اتصال قاعدة البيانات الحالي');
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error('خطأ في الاتصال بقاعدة البيانات:', e);
    throw e;
  }
} 