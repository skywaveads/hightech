import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'اتصل بنا | هاي تكنولوجي مصر - كتر بلوتر',
  description: 'تواصل مع شركة هاي تكنولوجي مصر للحصول على استشارة مجانية حول أجهزة كتر بلوتر. فروعنا في القاهرة، المنصورة، الرياض وطرابلس',
  keywords: 'رقم كتر بلوتر مصر, عنوان هاي تكنولوجي, اتصل بنا, كتر بلوتر مصر, كتر بلوتر السعودية',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">تواصل معنا</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          نحن هنا لمساعدتك في اختيار الجهاز المناسب لاحتياجاتك وتقديم الدعم الفني اللازم
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Phone */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-navy-700">اتصل بنا</h3>
          <p className="text-gray-600 mb-4">متاحين للرد على استفساراتكم من السبت إلى الخميس، 9 صباحًا - 6 مساءً</p>
          <div className="text-lg font-bold text-blue-600">
            <p className="mb-1">01050703016</p>
            <p className="mb-1">01063313614</p>
            <p>01100009407</p>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-navy-700">البريد الإلكتروني</h3>
          <p className="text-gray-600 mb-4">راسلنا على البريد الإلكتروني وسنرد عليك في خلال 24 ساعة</p>
          <div className="text-lg font-bold text-blue-600">
            <p className="mb-1">info@hightechnologyegypt.com</p>
            <p>sales@hightechnologyegypt.com</p>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.881 11.881 0 005.7 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-navy-700">واتساب</h3>
          <p className="text-gray-600 mb-4">تواصل معنا مباشرة عبر الواتساب للرد السريع على استفساراتكم</p>
          <a href="https://wa.me/201050703016" className="text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded inline-flex items-center justify-center">
            تواصل عبر الواتساب
          </a>
        </div>
      </div>

      {/* Branches */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-navy-700">فروعنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cairo Branch */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.675167369411!2d31.34789731553594!3d30.0805147818521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e0f1b83c741%3A0xbcaceb7c49c3c878!2sGesr%20Al%20Suez%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1652224591025!5m2!1sen!2seg"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-navy-700">فرع القاهرة - جسر السويس</h3>
              <p className="text-gray-600 mb-4">
                القاهرة - جسر السويس - مول ABC - الدور الثاني
              </p>
              <div className="flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>السبت - الخميس: 9 صباحًا - 6 مساءً</span>
              </div>
            </div>
          </div>

          {/* Cairo Tawfiqia Branch */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.9695325302893!2d31.23971711553502!3d30.045660881881408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c36cc6ef63%3A0x190745ab269ca520!2sAl%20Tawfiqia%2C%20Abdeen%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1652224691025!5m2!1sen!2seg"
                className="absolute inset-0 w-full h-full border-0" 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-navy-700">فرع القاهرة - التوفيقية</h3>
              <p className="text-gray-600 mb-4">
                القاهرة - التوفيقية - المجمع التجاري
              </p>
              <div className="flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>السبت - الخميس: 9 صباحًا - 6 مساءً</span>
              </div>
            </div>
          </div>

          {/* Mansoura Branch */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.719430418915!2d31.36489151556249!3d31.037899581524757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79db8d3316af7%3A0xb2e451187cbd8ac!2sMansoura%20University%2C%20Mansoura%2C%20Dakahlia%20Governorate!5e0!3m2!1sen!2seg!4v1652224791025!5m2!1sen!2seg" 
                className="absolute inset-0 w-full h-full border-0" 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-navy-700">فرع المنصورة</h3>
              <p className="text-gray-600 mb-4">
                المنصورة - حي الجامعة - شارع جيهان
              </p>
              <div className="flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>السبت - الخميس: 9 صباحًا - 6 مساءً</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-navy-700">ارسل لنا رسالة</h2>
        <form className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">الاسم</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="الاسم بالكامل"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">البريد الإلكتروني</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="البريد الإلكتروني"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">رقم الهاتف</label>
              <input 
                type="tel" 
                id="phone" 
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="رقم الهاتف"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">الموضوع</label>
              <select 
                id="subject" 
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">اختر الموضوع</option>
                <option value="استفسار عن منتج">استفسار عن منتج</option>
                <option value="طلب عرض سعر">طلب عرض سعر</option>
                <option value="دعم فني">دعم فني</option>
                <option value="شكوى">شكوى</option>
                <option value="اقتراح">اقتراح</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">الرسالة</label>
            <textarea 
              id="message" 
              rows={5} 
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="اكتب رسالتك هنا..."
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md inline-block"
            >
              إرسال الرسالة
            </button>
          </div>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-navy-700">الأسئلة الشائعة</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold mb-2">ما هي طرق الدفع المتاحة؟</h3>
            <p className="text-gray-600">
              نوفر العديد من طرق الدفع المختلفة بما في ذلك الدفع النقدي عند الاستلام، التحويل البنكي، فوري، وبطاقات الائتمان.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold mb-2">هل توفرون خدمة التوصيل لجميع المحافظات؟</h3>
            <p className="text-gray-600">
              نعم، نوفر خدمة التوصيل لجميع محافظات مصر والمدن الرئيسية في السعودية وليبيا.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold mb-2">هل تقدمون خدمات التدريب على استخدام الأجهزة؟</h3>
            <p className="text-gray-600">
              نعم، نقدم دورات تدريبية مجانية لعملائنا على كيفية استخدام أجهزة كتر بلوتر والبرامج المرتبطة بها بعد الشراء.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold mb-2">كم مدة الضمان على الأجهزة؟</h3>
            <p className="text-gray-600">
              تتمتع جميع أجهزتنا بضمان لمدة عام كامل يشمل قطع الغيار والصيانة، مع إمكانية تمديد الضمان مقابل رسوم إضافية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 