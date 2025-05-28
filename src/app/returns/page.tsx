import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Package, Clock, Shield, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'سياسة الإرجاع والاستبدال - هاي تكنولوجي',
  description: 'تعرف على سياسة الإرجاع والاستبدال في هاي تكنولوجي وكيفية إرجاع المنتجات',
};

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: 1,
      title: 'تواصل معنا',
      description: 'اتصل بنا خلال 14 يوم من تاريخ الاستلام',
      icon: Phone
    },
    {
      step: 2,
      title: 'تأكيد الطلب',
      description: 'سنراجع طلب الإرجاع ونؤكد الموافقة',
      icon: CheckCircle
    },
    {
      step: 3,
      title: 'تغليف المنتج',
      description: 'قم بتغليف المنتج في العبوة الأصلية',
      icon: Package
    },
    {
      step: 4,
      title: 'الشحن',
      description: 'سنرسل مندوب لاستلام المنتج من عندك',
      icon: ArrowRight
    }
  ];

  const returnConditions = [
    'المنتج في حالته الأصلية دون استخدام',
    'العبوة الأصلية والملحقات متوفرة',
    'لم يمر أكثر من 14 يوم على الاستلام',
    'فاتورة الشراء متوفرة',
    'المنتج غير مخصص أو معدل'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
              <Package className="h-5 w-5 text-yellow-400 mr-3" />
              <span className="text-lg font-medium">سياسة الإرجاع والاستبدال</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                إرجاع سهل ومضمون
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              نضمن لك حق الإرجاع والاستبدال خلال 14 يوم من تاريخ الاستلام مع ضمان استرداد كامل للمبلغ
            </p>
          </div>
        </div>
      </section>

      {/* Return Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              خطوات الإرجاع
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              عملية إرجاع بسيطة وسريعة في 4 خطوات فقط
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnSteps.map((step, index) => (
              <div key={step.step} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                شروط الإرجاع
              </h2>
              <p className="text-xl text-gray-600">
                يجب توفر الشروط التالية لقبول طلب الإرجاع
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {returnConditions.map((condition, index) => (
                <div key={index} className="flex items-start bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-gray-700 font-medium">{condition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Refund Policy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                سياسة الاسترداد
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">استرداد كامل</h3>
                <p className="text-gray-600">
                  نضمن استرداد كامل للمبلغ المدفوع في حالة الإرجاع المقبول
                </p>
              </div>

              <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">خلال 7 أيام</h3>
                <p className="text-gray-600">
                  سيتم استرداد المبلغ خلال 7 أيام عمل من تاريخ استلام المنتج
                </p>
              </div>

              <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">توصيل سريع</h3>
                <p className="text-gray-600">
                  نتحمل تكلفة شحن الإرجاع في حالة عيب المنتج أو خطأ في الطلب
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
              <div className="flex items-start mb-6">
                <AlertCircle className="h-8 w-8 text-orange-500 flex-shrink-0 mt-1 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ملاحظات مهمة</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>• المنتجات المخصصة أو المعدلة حسب الطلب غير قابلة للإرجاع</p>
                    <p>• في حالة تلف المنتج أثناء الشحن، يرجى التواصل معنا فوراً</p>
                    <p>• يتم فحص المنتجات المرتجعة للتأكد من حالتها قبل الاسترداد</p>
                    <p>• تكلفة الشحن الأصلية غير قابلة للاسترداد إلا في حالة عيب المنتج</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              هل تحتاج مساعدة في الإرجاع؟
            </h2>
            <p className="text-xl mb-12 text-blue-100">
              فريق خدمة العملاء جاهز لمساعدتك في عملية الإرجاع
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <Phone className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">اتصل بنا</h3>
                <p className="text-blue-100 mb-4">متاح 24/7 لخدمتك</p>
                <a href="tel:01050703016" className="text-yellow-400 font-bold text-lg">
                  01050703016
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <Mail className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">راسلنا</h3>
                <p className="text-blue-100 mb-4">سنرد خلال ساعات</p>
                <a href="mailto:info@hightech-eg.com" className="text-yellow-400 font-bold">
                  info@hightech-eg.com
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-4 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Package className="h-6 w-6 mr-3" />
                طلب إرجاع
              </Link>
              
              <Link 
                href="/products"
                className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                تصفح المنتجات
                <ArrowRight className="h-5 w-5 mr-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}