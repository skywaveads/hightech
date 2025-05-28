'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// أنواع البيانات
interface SecurityContextType {
  isSecure: boolean;
  requiresCaptcha: boolean;
  remainingAttempts: number;
  isLocked: boolean;
  lockedUntil?: number;
  browserFingerprint: string;
  csrfToken: string;
  refreshSecurity: () => void;
}

// إنشاء السياق
const SecurityContext = createContext<SecurityContextType>({
  isSecure: true,
  requiresCaptcha: false,
  remainingAttempts: 5,
  isLocked: false,
  browserFingerprint: '',
  csrfToken: '',
  refreshSecurity: () => {}
});

// Hook لاستخدام السياق
export function useSecurity() {
  return useContext(SecurityContext);
}

// مزود السياق
export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [isSecure, setIsSecure] = useState(true);
  const [requiresCaptcha, setRequiresCaptcha] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [isLocked, setIsLocked] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<number | undefined>();
  const [browserFingerprint, setBrowserFingerprint] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  // إنشاء بصمة المتصفح
  useEffect(() => {
    const generateFingerprint = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Security fingerprint', 2, 2);
      }
      
      const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        canvas.toDataURL()
      ].join('|');
      
      // تشفير بسيط للبصمة
      const hash = btoa(fingerprint).substring(0, 16);
      setBrowserFingerprint(hash);
    };

    generateFingerprint();
  }, []);

  // إنشاء رمز CSRF
  useEffect(() => {
    const generateCSRF = () => {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
      setCsrfToken(token);
    };

    generateCSRF();
  }, []);

  // تحديث حالة الأمان
  const refreshSecurity = async () => {
    try {
      const response = await fetch('/api/auth/security-status', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'X-Browser-Fingerprint': browserFingerprint,
          'X-CSRF-Token': csrfToken
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsSecure(data.isSecure);
        setRequiresCaptcha(data.requiresCaptcha);
        setRemainingAttempts(data.remainingAttempts);
        setIsLocked(data.isLocked);
        setLockedUntil(data.lockedUntil);
      }
    } catch (error) {
      console.error('Error refreshing security status:', error);
    }
  };

  // فحص حالة الأمان عند التحميل
  useEffect(() => {
    if (browserFingerprint && csrfToken) {
      refreshSecurity();
    }
  }, [browserFingerprint, csrfToken]);

  const value = {
    isSecure,
    requiresCaptcha,
    remainingAttempts,
    isLocked,
    lockedUntil: lockedUntil || 0,
    browserFingerprint,
    csrfToken,
    refreshSecurity
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}

// مكون CAPTCHA بسيط
export function SimpleCaptcha({ 
  onVerify, 
  onError 
}: { 
  onVerify: (token: string) => void;
  onError: (error: string) => void;
}) {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // إنشاء رمز CAPTCHA جديد
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setUserInput('');
    setIsVerified(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // التحقق من CAPTCHA
  const verifyCaptcha = () => {
    if (userInput.toUpperCase() === captchaCode) {
      setIsVerified(true);
      onVerify('captcha-verified');
    } else {
      onError('رمز التحقق غير صحيح');
      generateCaptcha();
    }
  };

  return (
    <div className="space-y-3">
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <div className="text-2xl font-mono font-bold text-gray-700 tracking-wider select-none">
          {captchaCode}
        </div>
        <button
          type="button"
          onClick={generateCaptcha}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          تجديد الرمز
        </button>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          placeholder="أدخل رمز التحقق"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          maxLength={6}
          disabled={isVerified}
        />
        <button
          type="button"
          onClick={verifyCaptcha}
          disabled={userInput.length !== 6 || isVerified}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerified ? '✓' : 'تحقق'}
        </button>
      </div>
      
      {isVerified && (
        <div className="text-sm text-green-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          تم التحقق بنجاح
        </div>
      )}
    </div>
  );
}

// مكون عرض حالة الأمان
export function SecurityStatus() {
  const { isSecure, remainingAttempts, isLocked, lockedUntil } = useSecurity();

  if (isLocked && lockedUntil) {
    const timeLeft = Math.ceil((lockedUntil - Date.now()) / 1000 / 60);
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">الحساب محظور مؤقتاً</span>
        </div>
        <p className="mt-1 text-sm">
          سيتم إلغاء الحظر خلال {timeLeft} دقيقة
        </p>
      </div>
    );
  }

  if (!isSecure || remainingAttempts < 3) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">تحذير أمني</span>
        </div>
        <p className="mt-1 text-sm">
          متبقي {remainingAttempts} محاولات قبل حظر الحساب
        </p>
      </div>
    );
  }

  return null;
}
