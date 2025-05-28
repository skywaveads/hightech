"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Package,
  Clock,
  Shield,
  CheckCircle,
  Truck,
  Plane,
  MapPin,
  Globe,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Zap,
  Award,
  Users
} from 'lucide-react';
import { companyInfo } from '@/data/company';

const ShippingPage = () => {
  const [activeTab, setActiveTab] = useState('methods');


  const shippingMethods = [
    {
      id: 'standard',
      name: 'الشحن العادي',
      icon: Truck,
      description: 'شحن اقتصادي مع تتبع كامل',
      time: '3-7 أيام عمل',
      features: ['تتبع الشحنة', 'تأمين كامل', 'خدمة عملاء'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'express',
      name: 'الشحن السريع',
      icon: Zap,
      description: 'توصيل سريع للطلبات العاجلة',
      time: '1-3 أيام عمل',
      features: ['أولوية في التوصيل', 'تتبع مباشر', 'ضمان الوقت'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      premium: true
    },
    {
      id: 'overnight',
      name: 'التوصيل في نفس اليوم',
      icon: Plane,
      description: 'للمدن الرئيسية فقط',
      time: '4-8 ساعات',
      features: ['توصيل فوري', 'متاح للمدن الكبرى', 'خدمة مميزة'],
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      premium: true
    }
  ];

  const trackingSteps = [
    {
      step: 1,
      title: "تأكيد الطلب",
      description: "تم استلام طلبك وبدء المعالجة",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      step: 2,
      title: "التحضير والتغليف",
      description: "جاري تحضير منتجاتك للشحن",
      icon: Package,
      color: "text-blue-500"
    },
    {
      step: 3,
      title: "الشحن",
      description: "تم تسليم الطلب لشركة الشحن",
      icon: Truck,
      color: "text-purple-500"
    },
    {
      step: 4,
      title: "في الطريق",
      description: "طلبك في طريقه إليك",
      icon: MapPin,
      color: "text-orange-500"
    },
    {
      step: 5,
      title: "تم التسليم",
      description: "تم تسليم طلبك بنجاح",
      icon: Star,
      color: "text-yellow-500"
    }
  ];

  const shippingFeatures = [
    {
      icon: Shield,
      title: "تأمين شامل",
      description: "جميع الشحنات مؤمنة ضد التلف والفقدان",
      color: "text-green-600"
    },
    {
      icon: Clock,
      title: "تتبع مباشر",
      description: "تتبع شحنتك لحظة بلحظة عبر الموقع",
      color: "text-blue-600"
    },
    {
      icon: Award,
      title: "ضمان التوصيل",
      description: "نضمن وصول طلبك في الوقت المحدد",
      color: "text-purple-600"
    },
    {
      icon: Users,
      title: "دعم 24/7",
      description: "فريق دعم متاح طوال الوقت لمساعدتك",
      color: "text-orange-600"
    }
  ];


  const tabs = [
    { id: 'methods', label: 'طرق الشحن', icon: Truck },
    { id: 'tracking', label: 'تتبع الطلبات', icon: MapPin },
    { id: 'policies', label: 'سياسات الشحن', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Truck className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
              الشحن والتوصيل
            </h1>
            <p className="text-xl text-blue-100 mb-8 animate-fadeInUp animation-delay-200">
              نوصل منتجاتنا عالية الجودة إلى جميع أنحاء الوطن العربي بأسرع وقت وأفضل الأسعار
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp animation-delay-400">
              <div className="flex items-center space-x-2 space-x-reverse bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Globe className="h-5 w-5" />
                <span>22 دولة عربية</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Zap className="h-5 w-5" />
                <span>توصيل لجميع المحافظات</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Shield className="h-5 w-5" />
                <span>تأمين شامل</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 bg-blue-50'
                    : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">

        {/* Shipping Methods Tab */}
        {activeTab === 'methods' && (
          <div className="animate-fadeInUp">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  طرق الشحن المتاحة
                </h2>
                <p className="text-xl text-gray-600">
                  اختر طريقة الشحن التي تناسب احتياجاتك
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {shippingMethods.map((method) => (
                  <div key={method.id} className={`bg-white rounded-2xl shadow-xl p-8 border-2 ${method.borderColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative`}>
                    {method.premium && (
                      <div className="absolute -top-3 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        مميز
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${method.bgColor} mb-6`}>
                        <method.icon className={`h-8 w-8 ${method.color}`} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {method.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {method.description}
                      </p>
                      
                      <div className={`inline-flex items-center px-4 py-2 rounded-full ${method.bgColor} ${method.color} font-medium mb-6`}>
                        <Clock className="h-4 w-4 mr-2" />
                        {method.time}
                      </div>
                      
                      <div className="text-right">
                        <h4 className="font-medium text-gray-700 mb-3">المميزات:</h4>
                        <ul className="space-y-2">
                          {method.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="animate-fadeInUp">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  تتبع طلبك خطوة بخطوة
                </h2>
                <p className="text-xl text-gray-600">
                  تابع رحلة طلبك من لحظة التأكيد حتى التسليم
                </p>
              </div>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="hidden md:block absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-green-200 via-blue-200 via-purple-200 via-orange-200 to-yellow-200 rounded-full"></div>
                
                <div className="space-y-8 md:space-y-0">
                  {trackingSteps.map((step, index) => (
                    <div key={step.step} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4`}>
                            <step.icon className={`h-8 w-8 ${step.color}`} />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full bg-white border-4 border-gray-200 shadow-lg flex items-center justify-center relative z-10`}>
                          <span className={`text-xl font-bold ${step.color}`}>
                            {step.step}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 hidden md:block"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tracking Input */}
              <div className="mt-16 max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    تتبع طلبك الآن
                  </h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="أدخل رقم الطلب (مثال: HT2505275762)"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                      تتبع
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="animate-fadeInUp">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Shield className="h-8 w-8 text-blue-600 mr-3" />
                  سياسات الشحن والتوصيل
                </h2>
                
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {shippingFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4 space-x-reverse">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <feature.icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                      <h3 className="text-xl font-bold text-blue-900 mb-3">
                        شروط الشحن المجاني
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-blue-800">
                        <li>خدمة توصيل موثوقة لجميع المحافظات</li>
                        <li>ينطبق على جميع الدول العربية المدعومة</li>
                        <li>لا يشمل المناطق النائية أو الجزر</li>
                        <li>قد تختلف المدة حسب الموقع الجغرافي</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                      <h3 className="text-xl font-bold text-yellow-900 mb-3">
                        ملاحظات مهمة
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-yellow-800">
                        <li>أوقات التسليم تشمل أيام العمل فقط (السبت - الخميس)</li>
                        <li>قد تتأخر الشحنات في المواسم والأعياد</li>
                        <li>يجب وجود شخص لاستلام الطلب في العنوان المحدد</li>
                        <li>نحتفظ بحق تغيير أسعار الشحن دون إشعار مسبق</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                      <h3 className="text-xl font-bold text-green-900 mb-3">
                        ضمانات الشحن
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-green-800">
                        <li>تأمين شامل ضد التلف والفقدان</li>
                        <li>تعويض كامل في حالة تلف المنتج أثناء الشحن</li>
                        <li>إعادة توصيل في حالة فشل التسليم لأسباب خارجة عن إرادتك</li>
                        <li>دعم فني متاح 24/7 لحل أي مشاكل في الشحن</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              أسئلة حول الشحن؟
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              فريق خدمة العملاء جاهز لمساعدتك في أي استفسار حول الشحن والتوصيل
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Phone className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">اتصل بنا</h3>
                <p className="text-blue-100">{companyInfo.phones[0]}</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <Mail className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">راسلنا</h3>
                <p className="text-blue-100">{companyInfo.email}</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <MessageCircle className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">واتساب</h3>
                <p className="text-blue-100">دردشة فورية</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                href="/contact"
                className="inline-flex items-center space-x-2 space-x-reverse bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors duration-300"
              >
                <span>تواصل معنا</span>
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;