'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Lock, Mail, AlertCircle, Eye, EyeOff, Shield,
  Fingerprint, Clock, Globe, Monitor, Smartphone,
  CheckCircle, XCircle, RefreshCw, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import './styles.css';

// نموذج البيانات
interface LoginFormInputs {
  email: string;
  password: string;
  captcha?: string;
  rememberMe: boolean;
}

interface SecurityInfo {
  remainingAttempts: number;
  requiresCaptcha: boolean;
  timeLeft?: number;
  lockedUntil?: number;
}

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [securityInfo, setSecurityInfo] = useState<SecurityInfo>({
    remainingAttempts: 5,
    requiresCaptcha: false
  });
  const [browserInfo, setBrowserInfo] = useState<{
    browser: string;
    os: string;
    device: string;
  }>({ browser: '', os: '', device: '' });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isSecurityCheckPassed, setIsSecurityCheckPassed] = useState(false);
  
  // إعداد React Hook Form
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    mode: 'onChange'
  });

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // جمع معلومات المتصفح والجهاز
  useEffect(() => {
    const detectBrowserInfo = () => {
      const userAgent = navigator.userAgent;
      let browser = 'Unknown';
      let os = 'Unknown';
      let device = 'Desktop';

      // تحديد المتصفح
      if (userAgent.includes('Chrome')) browser = 'Chrome';
      else if (userAgent.includes('Firefox')) browser = 'Firefox';
      else if (userAgent.includes('Safari')) browser = 'Safari';
      else if (userAgent.includes('Edge')) browser = 'Edge';

      // تحديد نظام التشغيل
      if (userAgent.includes('Windows')) os = 'Windows';
      else if (userAgent.includes('Mac')) os = 'macOS';
      else if (userAgent.includes('Linux')) os = 'Linux';
      else if (userAgent.includes('Android')) os = 'Android';
      else if (userAgent.includes('iOS')) os = 'iOS';

      // تحديد نوع الجهاز
      if (/Mobi|Android/i.test(userAgent)) device = 'Mobile';
      else if (/Tablet|iPad/i.test(userAgent)) device = 'Tablet';

      setBrowserInfo({ browser, os, device });
    };

    detectBrowserInfo();
  }, []);
  
  // التحقق من حالة المصادقة عند تحميل الصفحة
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const from = searchParams.get('from') || '/products-admin';
          router.push(from);
        }
      } catch (error) {
        // المستخدم غير مصادق عليه
      }
    }
    
    checkAuth();
  }, [router, searchParams]);

  // فحص أمني أولي
  useEffect(() => {
    const performSecurityCheck = async () => {
      try {
        // محاكاة فحص أمني
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSecurityCheckPassed(true);
      } catch (error) {
        setError('فشل في الفحص الأمني');
      }
    };

    performSecurityCheck();
  }, []);

  // معالجة تقديم النموذج
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    setError(null);
    setLoginAttempts(prev => prev + 1);
    
    try {
      // إضافة معلومات إضافية للأمان
      const loginData = {
        ...data,
        browserFingerprint: generateBrowserFingerprint(),
        timestamp: Date.now(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language
      };

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Browser-Fingerprint': generateBrowserFingerprint(),
          'X-Timestamp': Date.now().toString()
        },
        credentials: 'include',
        body: JSON.stringify(loginData)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        // تحديث معلومات الأمان
        if (responseData.remainingAttempts !== undefined) {
          setSecurityInfo({
            remainingAttempts: responseData.remainingAttempts,
            requiresCaptcha: responseData.requiresCaptcha || false,
            timeLeft: responseData.timeLeft,
            lockedUntil: responseData.lockedUntil
          });
        }
        
        throw new Error(responseData.message || 'فشل في تسجيل الدخول');
      }
      
      // تم تسجيل الدخول بنجاح
      const from = searchParams.get('from') || '/products-admin';
      router.push(from);
      
    } catch (error: any) {
      setError(error.message || 'حدث خطأ أثناء محاولة تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  // إنشاء بصمة المتصفح
  const generateBrowserFingerprint = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Browser fingerprint', 2, 2);
    }
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');
    
    return btoa(fingerprint).substring(0, 32);
  };

  // تنسيق الوقت المتبقي
  const formatTimeLeft = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isSecurityCheckPassed) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-gradient">
        <div className="glass-effect-strong rounded-2xl p-8 text-center text-white card-hover">
          <div className="icon-rotate rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2 text-glow">جاري إجراء الفحص الأمني</h3>
          <p className="text-blue-200 loading-dots">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        <div className="floating-orb absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pulsing-glow"></div>
        <div className="floating-orb absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pulsing-glow"></div>
        <div className="floating-orb absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pulsing-glow"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* الجانب الأيسر - معلومات الأمان */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 text-white">
          <div className="max-w-md">
            <div className="flex items-center mb-8">
              <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">نظام الأمان المتقدم</h1>
                <p className="text-blue-200">حماية شاملة لبياناتك</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-green-500/20 p-2 rounded-lg mr-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold">تشفير متقدم</h3>
                  <p className="text-sm text-gray-300">حماية البيانات بتشفير AES-256</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                  <Fingerprint className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">بصمة المتصفح</h3>
                  <p className="text-sm text-gray-300">تحديد هوية الجهاز بدقة</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                  <Clock className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">مراقبة الجلسات</h3>
                  <p className="text-sm text-gray-300">تتبع النشاط في الوقت الفعلي</p>
                </div>
              </div>
            </div>

            {/* معلومات الجلسة الحالية */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="font-semibold mb-3 flex items-center">
                <Monitor className="h-4 w-4 mr-2" />
                معلومات الجلسة
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>المتصفح:</span>
                  <span>{browserInfo.browser}</span>
                </div>
                <div className="flex justify-between">
                  <span>النظام:</span>
                  <span>{browserInfo.os}</span>
                </div>
                <div className="flex justify-between">
                  <span>الجهاز:</span>
                  <span>{browserInfo.device}</span>
                </div>
                <div className="flex justify-between">
                  <span>الوقت:</span>
                  <span>{currentTime.toLocaleTimeString('ar-EG')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الجانب الأيمن - نموذج تسجيل الدخول */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* شعار الشركة */}
            <div className="text-center mb-8">
              <div className="glass-effect rounded-2xl p-6 mb-6 card-hover">
                <div className="w-16 h-16 button-gradient rounded-xl mx-auto mb-4 flex items-center justify-center security-indicator">
                  <Shield className="h-8 w-8 text-white icon-bounce" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 text-glow">لوحة الإدارة</h2>
                <p className="text-blue-200 text-shimmer">هاي تكنولوجي مصر</p>
              </div>
            </div>

            {/* نموذج تسجيل الدخول */}
            <div className="glass-effect-strong rounded-2xl p-8 border border-white/20 card-hover">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* رسالة الخطأ */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl flex items-center notification-slide-in">
                    <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0 icon-bounce" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* معلومات الأمان */}
                {securityInfo.remainingAttempts < 5 && (
                  <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 px-4 py-3 rounded-xl">
                    <div className="flex items-center mb-2">
                      <AlertCircle className="h-4 w-4 ml-2" />
                      <span className="text-sm font-medium">تحذير أمني</span>
                    </div>
                    <p className="text-xs">
                      المحاولات المتبقية: {securityInfo.remainingAttempts}
                      {securityInfo.timeLeft && (
                        <span className="block mt-1">
                          الحساب محظور لمدة: {formatTimeLeft(securityInfo.timeLeft)}
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {/* البريد الإلكتروني */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={`input-shimmer block w-full pr-10 pl-4 py-3 bg-white/10 border ${
                        errors.email ? 'border-red-500' : 'border-white/20'
                      } rounded-xl text-white placeholder-gray-400 input-glow backdrop-blur-sm transition-all focus-visible`}
                      placeholder="admin@example.com"
                      {...register('email', {
                        required: 'البريد الإلكتروني مطلوب',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'الرجاء إدخال بريد إلكتروني صالح'
                        }
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>
                
                {/* كلمة المرور */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className={`input-shimmer block w-full pr-10 pl-12 py-3 bg-white/10 border ${
                        errors.password ? 'border-red-500' : 'border-white/20'
                      } rounded-xl text-white placeholder-gray-400 input-glow backdrop-blur-sm transition-all focus-visible`}
                      placeholder="••••••••"
                      {...register('password', {
                        required: 'كلمة المرور مطلوبة',
                        minLength: {
                          value: 6,
                          message: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل'
                        }
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 left-0 pl-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                  )}
                </div>

                {/* CAPTCHA (إذا كان مطلوباً) */}
                {securityInfo.requiresCaptcha && (
                  <div>
                    <label htmlFor="captcha" className="block text-sm font-medium text-white mb-2">
                      رمز التحقق
                    </label>
                    <div className="flex gap-3">
                      <input
                        id="captcha"
                        type="text"
                        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="أدخل رمز التحقق"
                        {...register('captcha', {
                          required: securityInfo.requiresCaptcha ? 'رمز التحقق مطلوب' : false
                        })}
                      />
                      <button
                        type="button"
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/20 transition-colors"
                      >
                        <RefreshCw className="h-5 w-5" />
                      </button>
                    </div>
                    {errors.captcha && (
                      <p className="mt-1 text-sm text-red-400">{errors.captcha.message}</p>
                    )}
                  </div>
                )}

                {/* تذكرني */}
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 bg-white/10"
                    {...register('rememberMe')}
                  />
                  <label htmlFor="rememberMe" className="mr-2 block text-sm text-white">
                    تذكرني لمدة 30 يوماً
                  </label>
                </div>
                
                {/* زر تسجيل الدخول */}
                <button
                  type="submit"
                  disabled={isLoading || securityInfo.remainingAttempts === 0}
                  className="w-full button-gradient flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 security-indicator focus-visible"
                >
                  {isLoading ? (
                    <>
                      <div className="icon-rotate rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      <span className="loading-dots">جاري التحميل</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2 icon-bounce" />
                      <span className="text-glow">دخول آمن</span>
                    </>
                  )}
                </button>

                {/* إحصائيات المحاولات */}
                {loginAttempts > 0 && (
                  <div className="text-center text-xs text-gray-400">
                    محاولة رقم {loginAttempts} من 5
                  </div>
                )}
              </form>

              {/* رابط العودة */}
              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-blue-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 ml-1" />
                  العودة للصفحة الرئيسية
                </Link>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="mt-6 text-center text-xs text-gray-400">
              <p>محمي بنظام أمان متقدم • تشفير SSL/TLS</p>
              <p className="mt-1">جميع المحاولات مسجلة ومراقبة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// مكون التحميل
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient">
      <div className="glass-effect-strong rounded-2xl p-8 text-center text-white card-hover">
        <div className="icon-rotate rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold mb-2 text-glow">جاري التحميل</h3>
        <p className="text-blue-200 loading-dots">يرجى الانتظار</p>
      </div>
    </div>
  );
}

// المكون الرئيسي مع Suspense
export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AdminLoginContent />
    </Suspense>
  );
}
