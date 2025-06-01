/**
 * مكتبة إدارة تخزين السلة في الكوكيز و localStorage
 * Cart Storage Management Library for Cookies and localStorage
 */

export interface CartStorageOptions {
  cookieName?: string;
  localStorageKey?: string;
  backupKey?: string;
  timestampKey?: string;
  maxAge?: number; // بالسنوات
}

const DEFAULT_OPTIONS: Required<CartStorageOptions> = {
  cookieName: 'cart',
  localStorageKey: 'cart_backup',
  backupKey: 'cart_backup',
  timestampKey: 'cart_timestamp',
  maxAge: 10, // 10 سنوات
};

export class CartStorage {
  private options: Required<CartStorageOptions>;

  constructor(options: CartStorageOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  /**
   * حفظ بيانات السلة في الكوكيز و localStorage
   */
  save(data: any): boolean {
    try {
      const jsonData = JSON.stringify(data);
      
      // حفظ في الكوكيز
      const success = this.saveToCookies(jsonData);
      
      // حفظ نسخة احتياطية في localStorage
      this.saveToLocalStorage(jsonData);
      
      return success;
    } catch (error) {
      console.error('خطأ في حفظ بيانات السلة:', error);
      return false;
    }
  }

  /**
   * تحميل بيانات السلة من الكوكيز أو localStorage
   */
  load(): any | null {
    try {
      // محاولة تحميل من الكوكيز أولاً
      let data = this.loadFromCookies();
      let source = 'cookies';
      
      if (!data) {
        // إذا لم توجد في الكوكيز، محاولة تحميل من localStorage
        data = this.loadFromLocalStorage();
        source = 'localStorage';
        
        if (data) {
          console.log('تم تحميل السلة من localStorage كنسخة احتياطية');
          // إعادة حفظ في الكوكيز
          this.saveToCookies(JSON.stringify(data));
        }
      }
      
      return data;
    } catch (error) {
      console.error('خطأ في تحميل بيانات السلة:', error);
      this.clear();
      return null;
    }
  }

  /**
   * مسح جميع بيانات السلة
   */
  clear(): void {
    try {
      // مسح الكوكيز
      this.clearCookies();
      
      // مسح localStorage
      this.clearLocalStorage();
    } catch (error) {
      console.error('خطأ في مسح بيانات السلة:', error);
    }
  }

  /**
   * التحقق من وجود بيانات السلة
   */
  exists(): boolean {
    return this.cookieExists() || this.localStorageExists();
  }

  /**
   * الحصول على معلومات حالة التخزين
   */
  getStorageInfo(): {
    cookieExists: boolean;
    localStorageExists: boolean;
    timestamp: string | null;
    dataSize: number;
  } {
    const cookieData = this.loadFromCookies();
    const localStorageData = this.loadFromLocalStorage();
    const timestamp = this.getTimestamp();
    
    return {
      cookieExists: !!cookieData,
      localStorageExists: !!localStorageData,
      timestamp,
      dataSize: cookieData ? JSON.stringify(cookieData).length : 0,
    };
  }

  // الطرق الخاصة

  private saveToCookies(jsonData: string): boolean {
    try {
      if (typeof window === 'undefined') return false;
      
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + this.options.maxAge);
      
      const cookieOptions = [
        `${this.options.cookieName}=${encodeURIComponent(jsonData)}`,
        `expires=${expiryDate.toUTCString()}`,
        'path=/',
        'SameSite=Lax',
        // إضافة Secure في بيئة الإنتاج
        ...(window.location.protocol === 'https:' ? ['Secure'] : [])
      ].join('; ');
      
      document.cookie = cookieOptions;
      return true;
    } catch (error) {
      console.error('خطأ في حفظ الكوكيز:', error);
      return false;
    }
  }

  private loadFromCookies(): any | null {
    try {
      if (typeof window === 'undefined') return null;
      
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${this.options.cookieName}=`))
        ?.split('=')[1];
      
      if (cookieValue) {
        return JSON.parse(decodeURIComponent(cookieValue));
      }
      
      return null;
    } catch (error) {
      console.error('خطأ في تحميل الكوكيز:', error);
      return null;
    }
  }

  private saveToLocalStorage(jsonData: string): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      
      localStorage.setItem(this.options.backupKey, jsonData);
      localStorage.setItem(this.options.timestampKey, new Date().toISOString());
    } catch (error) {
      console.error('خطأ في حفظ localStorage:', error);
    }
  }

  private loadFromLocalStorage(): any | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      
      const data = localStorage.getItem(this.options.backupKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('خطأ في تحميل localStorage:', error);
      return null;
    }
  }

  private clearCookies(): void {
    try {
      if (typeof window === 'undefined') return;
      
      document.cookie = `${this.options.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (error) {
      console.error('خطأ في مسح الكوكيز:', error);
    }
  }

  private clearLocalStorage(): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      
      localStorage.removeItem(this.options.backupKey);
      localStorage.removeItem(this.options.timestampKey);
    } catch (error) {
      console.error('خطأ في مسح localStorage:', error);
    }
  }

  private cookieExists(): boolean {
    try {
      if (typeof window === 'undefined') return false;
      
      return document.cookie
        .split('; ')
        .some(row => row.startsWith(`${this.options.cookieName}=`));
    } catch {
      return false;
    }
  }

  private localStorageExists(): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      
      return localStorage.getItem(this.options.backupKey) !== null;
    } catch {
      return false;
    }
  }

  private getTimestamp(): string | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      
      return localStorage.getItem(this.options.timestampKey);
    } catch {
      return null;
    }
  }
}

// إنشاء مثيل افتراضي للاستخدام المباشر
export const cartStorage = new CartStorage();

// دوال مساعدة للاستخدام السريع
export const saveCart = (data: any) => cartStorage.save(data);
export const loadCart = () => cartStorage.load();
export const clearCart = () => cartStorage.clear();
export const cartExists = () => cartStorage.exists();
export const getCartStorageInfo = () => cartStorage.getStorageInfo();