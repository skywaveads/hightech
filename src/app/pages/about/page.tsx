import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عن شركة هاي تكنولوجي مصر | كتر بلوتر مصر والسعودية وليبيا',
  description: 'تعرف على شركة هاي تكنولوجي مصر، الشركة الرائدة في مجال بيع وصيانة أجهزة كتر بلوتر في مصر والسعودية وليبيا',
  keywords: 'كتر بلوتر مصر, كتر بلوتر السعودية, ماكينة قص الفينيل, شركة هاي تكنولوجي',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">عن شركة هاي تكنولوجي مصر</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          شركة رائدة في مجال توريد وصيانة أجهزة كتر بلوتر وماكينات القص في الشرق الأوسط وشمال أفريقيا
        </p>
      </div>

      {/* Company History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-navy-700">تاريخنا</h2>
          <p className="text-gray-700 mb-4">
            تأسست شركة هاي تكنولوجي مصر في عام 2019 في القاهرة بهدف توفير أحدث تقنيات القص والطباعة للسوق المصري والعربي.
          </p>
          <p className="text-gray-700 mb-4">
            بدأنا بفرع واحد في القاهرة، وسرعان ما توسعنا لنصل إلى المنصورة والرياض وطرابلس، مقدمين خدماتنا لأكثر من 500 عميل في مختلف الصناعات.
          </p>
          <p className="text-gray-700">
            اليوم، نفخر بكوننا الوكيل الحصري لأجهزة هاي كت وريفينا في مصر والسعودية وليبيا، مع فريق دعم فني متكامل يضم أكثر من 20 مهندس متخصص.
          </p>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="/images/about-history.jpg"
            alt="تاريخ شركة هاي تكنولوجي مصر"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 md:order-1 relative h-[400px]">
          <Image
            src="/images/about-mission.jpg"
            alt="رؤية شركة هاي تكنولوجي مصر"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-bold mb-6 text-navy-700">مهمتنا ورؤيتنا</h2>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-navy-700">مهمتنا</h3>
            <p className="text-gray-700">
              جعل تقنيات القص الدقيقة في متناول الشركات الصغيرة والمتوسطة في الشرق الأوسط وشمال أفريقيا، مع توفير دعم فني محلي على أعلى مستوى.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3 text-navy-700">رؤيتنا</h3>
            <p className="text-gray-700">
              أن نكون الشريك الأول لكل من يحتاج إلى حلول القص والطباعة في المنطقة، من خلال تقديم منتجات عالية الجودة وخدمة عملاء استثنائية.
            </p>
          </div>
        </div>
      </div>

      {/* Branches Map */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-navy-700">فروعنا</h2>
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <Image
            src="/images/branches-map.jpg"
            alt="خريطة فروع شركة هاي تكنولوجي في مصر والسعودية وليبيا"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
              <div className="bg-navy-700/80 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">القاهرة</h3>
                <p>جسر السويس - مول ABC</p>
                <p>التوفيقية - المجمع التجاري</p>
              </div>
              <div className="bg-navy-700/80 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">المنصورة</h3>
                <p>حي الجامعة</p>
              </div>
              <div className="bg-navy-700/80 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">الرياض</h3>
                <p>شارع العليا</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">هل أنت مستعد للارتقاء بأعمالك؟</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          تواصل معنا اليوم للحصول على استشارة مجانية واكتشف كيف يمكن لأجهزتنا تحسين إنتاجيتك وجودة منتجاتك
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-bold text-lg"
          >
            تواصل معنا
          </a>
          <a 
            href="/products" 
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-bold text-lg"
          >
            تصفح منتجاتنا
          </a>
        </div>
      </div>
    </div>
  );
} 