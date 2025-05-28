'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut, User, Settings, Shield, Bell, Search, Menu, X,
  Monitor, Clock, Globe, Activity, Lock, AlertTriangle,
  CheckCircle, Wifi, WifiOff, Battery, Signal,
  Package, MessageSquare, ShoppingCart // Added icons
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Added Link import

interface AdminHeaderProps {
  adminData?: {
    id: string;
    email: string;
    role: string;
    loginTime?: number;
  } | undefined;
  onLogout: () => void;
}

interface SystemStatus {
  cpu: number;
  memory: number;
  network: boolean;
  lastUpdate: Date;
}

export default function AdminHeader({ adminData, onLogout }: AdminHeaderProps) {
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpu: 45,
    memory: 62,
    network: true,
    lastUpdate: new Date()
  });
  const [notifications] = useState([
    {
      id: 1,
      type: 'security',
      title: 'محاولة دخول جديدة',
      message: 'تم تسجيل محاولة دخول من IP جديد',
      time: '5 دقائق',
      read: false
    },
    {
      id: 2,
      type: 'system',
      title: 'تحديث النظام',
      message: 'تم تحديث قاعدة البيانات بنجاح',
      time: '15 دقيقة',
      read: true
    },
    {
      id: 3,
      type: 'product',
      title: 'منتج جديد',
      message: 'تم إضافة منتج جديد للمتجر',
      time: '1 ساعة',
      read: true
    }
  ]);

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // محاكاة تحديث حالة النظام
  useEffect(() => {
    const statusTimer = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 30) + 30, // 30-60%
        memory: Math.floor(Math.random() * 20) + 50, // 50-70%
        lastUpdate: new Date()
      }));
    }, 5000);
    return () => clearInterval(statusTimer);
  }, []);

  const getSessionDuration = () => {
    if (!adminData?.loginTime) return 'غير محدد';
    const duration = Date.now() - adminData.loginTime;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}س ${minutes}د`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <Shield className="h-4 w-4 text-red-500" />;
      case 'system':
        return <Settings className="h-4 w-4 text-blue-500" />;
      case 'product':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* الجانب الأيمن - الشعار والعنوان */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">لوحة الإدارة</h1>
                <p className="text-xs text-gray-500">هاي تكنولوجي مصر</p>
              </div>
            </div>
          </div>

          {/* الوسط - معلومات النظام */}
          {/* Admin Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2 space-x-reverse">
            <Link href="/products-admin" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
              <Package size={18} className="mr-2 text-blue-500" />
              إدارة المنتجات
            </Link>
            <Link href="/comments-admin" className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-lg transition-colors">
              <MessageSquare size={18} className="mr-2 text-purple-500" />
              إدارة التعليقات
            </Link>
            <Link href="/orders-admin" className="flex items-center text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors">
              <ShoppingCart size={18} className="mr-2 text-green-500" />
              إدارة الطلبات
            </Link>
          </div>

          {/* الجانب الأيسر - الإشعارات والملف الشخصي */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* الإشعارات */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* قائمة الإشعارات */}
              {isNotificationOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">الإشعارات</h3>
                      <span className="text-sm text-gray-500">{unreadCount} غير مقروء</span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="mr-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              منذ {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                      عرض جميع الإشعارات
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* الملف الشخصي */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 space-x-reverse p-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-gray-900">المسؤول</div>
                  <div className="text-xs text-gray-500">{adminData?.email}</div>
                </div>
              </button>

              {/* قائمة الملف الشخصي */}
              {isProfileMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  {/* معلومات المستخدم */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="mr-3">
                        <div className="text-sm font-medium text-gray-900">
                          مسؤول النظام
                        </div>
                        <div className="text-sm text-gray-500">{adminData?.email}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          الدور: {adminData?.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* إحصائيات الجلسة */}
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">إحصائيات الجلسة</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">مدة الجلسة:</span>
                        <span className="text-gray-900 font-medium">{getSessionDuration()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">آخر نشاط:</span>
                        <span className="text-gray-900 font-medium">الآن</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">حالة الأمان:</span>
                        <span className="text-green-600 font-medium flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          آمن
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* خيارات القائمة */}
                  <div className="p-2">
                    <Link href="/products-admin" className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <Package className="h-4 w-4 mr-3 text-blue-500" />
                      إدارة المنتجات
                    </Link>
                    <Link href="/comments-admin" className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <MessageSquare className="h-4 w-4 mr-3 text-purple-500" />
                      إدارة التعليقات
                    </Link>
                    <Link href="/orders-admin" className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <ShoppingCart className="h-4 w-4 mr-3 text-green-500" />
                      إدارة الطلبات
                    </Link>
                    <div className="border-t border-gray-100 my-2"></div>
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* شريط الحالة السفلي (للشاشات الصغيرة) - Removed as per request to simplify header */}

      {/* خلفية شفافة لإغلاق القوائم */}
      {(isProfileMenuOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsProfileMenuOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
}