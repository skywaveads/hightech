import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'منتجات كتر بلوتر | هاي تكنولوجي مصر',
  description: 'تصفح مجموعة أجهزة كتر بلوتر وماكينات القص المتوفرة في مصر والسعودية وليبيا من شركة هاي تكنولوجي مصر',
  keywords: 'كتر بلوتر مصر, كتر بلوتر السعودية, ماكينة قص الفينيل, هاي كت, ريفينا برو',
};

// Product data
const products = [
  {
    id: 'high-cut-a3-plotter',
    name: 'هاي كت A3',
    category: 'تغذية الورق',
    description: 'كتر بلوتر مثالي للمساحات الصغيرة ومحلات الهدايا وطباعة التيشيرتات',
    image: '/images/products_hero/1.jpg',
    features: [
      'مساحة قص A3 (297 × 420 مم)',
      'دقة قص 0.025 مم',
      'سرعة قص تصل إلى 600 مم/ثانية',
      'ضغط شفرة يصل إلى 500 جرام',
      'متوافق مع أنظمة Windows و Mac',
      'اتصال USB وبلوتوث',
    ],
  },
  {
    id: 'high-cut-720-plotter',
    name: 'هاي كت 720',
    category: 'تغذية الرول',
    description: 'كتر بلوتر احترافي لمراكز الطباعة المتوسطة وشركات الإعلان والدعاية',
    image: '/images/products_hero/2.jpg',
    features: [
      'عرض قص 720 مم (72 سم)',
      'دقة قص 0.01 مم',
      'سرعة قص تصل إلى 800 مم/ثانية',
      'ضغط شفرة يصل إلى 600 جرام',
      'نظام تعقب النقاط التلقائي',
      'شاشة LCD ملونة',
      'اتصال USB وشبكة LAN',
    ],
  },
  {
    id: 'revina-pro-plotter',
    name: 'ريفينا برو',
    category: 'احترافي',
    description: 'كتر بلوتر متطور للمطابع الكبرى ومصانع الملابس ومراكز الإنتاج الصناعي',
    image: '/images/products_hero/3.jpg',
    features: [
      'عرض قص 1200 مم (120 سم)',
      'دقة قص 0.005 مم',
      'سرعة قص تصل إلى 1200 مم/ثانية',
      'ضغط شفرة يصل إلى 750 جرام',
      'نظام تعقب النقاط المتقدم مع حساسات ليزر',
      'شاشة تحكم تعمل باللمس',
      'اتصال USB وشبكة LAN وWi-Fi',
      'برنامج تصميم وقص متكامل',
    ],
  },
  {
    id: 'high-cut-a4-plotter',
    name: 'هاي كت A4',
    category: 'تغذية الورق',
    description: 'كتر بلوتر مدمج للاستخدام المنزلي والمشاريع الصغيرة',
    image: '/images/products_hero/4.jpg',
    features: [
      'مساحة قص A4 (210 × 297 مم)',
      'دقة قص 0.025 مم',
      'سرعة قص تصل إلى 500 مم/ثانية',
      'ضغط شفرة يصل إلى 350 جرام',
      'متوافق مع أنظمة Windows و Mac',
      'اتصال USB',
    ],
  },
  {
    id: 'high-cut-1200-plotter',
    name: 'هاي كت 1200',
    category: 'تغذية الرول',
    description: 'كتر بلوتر احترافي للمطابع الكبيرة ومراكز الإنتاج الضخمة',
    image: '/images/products_hero/5.jpg',
    features: [
      'عرض قص 1200 مم (120 سم)',
      'دقة قص 0.01 مم',
      'سرعة قص تصل إلى 1000 مم/ثانية',
      'ضغط شفرة يصل إلى 700 جرام',
      'نظام تعقب النقاط المتقدم',
      'شاشة LCD ملونة',
      'اتصال USB وشبكة LAN',
    ],
  },
  {
    id: 'revina-lite-plotter',
    name: 'ريفينا لايت',
    category: 'احترافي',
    description: 'كتر بلوتر متوسط للمطابع والشركات متوسطة الحجم',
    image: '/images/products_hero/1.jpg',
    features: [
      'عرض قص 900 مم (90 سم)',
      'دقة قص 0.01 مم',
      'سرعة قص تصل إلى 1000 مم/ثانية',
      'ضغط شفرة يصل إلى 650 جرام',
      'نظام تعقب النقاط المتقدم',
      'شاشة تحكم LCD',
      'اتصال USB وشبكة LAN',
    ],
  },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">منتجاتنا</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          مجموعة متكاملة من أجهزة كتر بلوتر عالية الدقة لجميع الاحتياجات والميزانيات
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full">
          جميع المنتجات
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full">
          تغذية الورق
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full">
          تغذية الرول
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full">
          احترافي
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                {product.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-navy-700">{product.name}</h3>
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>
              <div className="mb-4">
                <h4 className="font-bold text-navy-700 mb-2">المميزات:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <Link 
                href={`/products/${product.id}`} 
                className="text-blue-600 font-semibold hover:underline block text-center mt-4"
              >
                عرض التفاصيل
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-navy-700">مقارنة المنتجات</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-navy-700 text-white">
                <th className="p-4 text-right">الموديل</th>
                <th className="p-4">عرض القص</th>
                <th className="p-4">دقة القص</th>
                <th className="p-4">سرعة القص</th>
                <th className="p-4">ضغط الشفرة</th>
                <th className="p-4">السعر التقريبي</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-bold">هاي كت A4</td>
                <td className="p-4">A4 (210 × 297 مم)</td>
                <td className="p-4">0.025 مم</td>
                <td className="p-4">500 مم/ثانية</td>
                <td className="p-4">350 جرام</td>
                <td className="p-4">2,500 جنيه</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-bold">هاي كت A3</td>
                <td className="p-4">A3 (297 × 420 مم)</td>
                <td className="p-4">0.025 مم</td>
                <td className="p-4">600 مم/ثانية</td>
                <td className="p-4">500 جرام</td>
                <td className="p-4">4,500 جنيه</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-bold">هاي كت 720</td>
                <td className="p-4">720 مم (72 سم)</td>
                <td className="p-4">0.01 مم</td>
                <td className="p-4">800 مم/ثانية</td>
                <td className="p-4">600 جرام</td>
                <td className="p-4">12,000 جنيه</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-bold">هاي كت 1200</td>
                <td className="p-4">1200 مم (120 سم)</td>
                <td className="p-4">0.01 مم</td>
                <td className="p-4">1000 مم/ثانية</td>
                <td className="p-4">700 جرام</td>
                <td className="p-4">18,000 جنيه</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-bold">ريفينا لايت</td>
                <td className="p-4">900 مم (90 سم)</td>
                <td className="p-4">0.01 مم</td>
                <td className="p-4">1000 مم/ثانية</td>
                <td className="p-4">650 جرام</td>
                <td className="p-4">15,000 جنيه</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4 font-bold">ريفينا برو</td>
                <td className="p-4">1200 مم (120 سم)</td>
                <td className="p-4">0.005 مم</td>
                <td className="p-4">1200 مم/ثانية</td>
                <td className="p-4">750 جرام</td>
                <td className="p-4">25,000 جنيه</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white p-12 rounded-lg text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">هل تحتاج إلى مساعدة في اختيار الجهاز المناسب؟</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          فريقنا من الخبراء جاهز لمساعدتك في اختيار جهاز كتر بلوتر يناسب احتياجاتك وميزانيتك
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-bold text-lg"
          >
            تواصل مع مستشار مبيعات
          </a>
          <a 
            href="https://wa.me/201050703016" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-bold text-lg"
          >
            واتساب مباشر
          </a>
        </div>
      </div>
    </div>
  );
} 