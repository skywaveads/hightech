import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الصناعات | هاي تكنولوجي مصر - كتر بلوتر',
  description: 'تعرف على صناعات وتطبيقات أجهزة كتر بلوتر في مصر والسعودية وليبيا. حلول مخصصة لصناعة الإعلانات، الملابس، التعبئة والتغليف والطباعة',
  keywords: 'كتر بلوتر للإعلانات, كتر بلوتر للملابس, كتر بلوتر للطباعة, صناعات كتر بلوتر, استخدامات كتر بلوتر',
};

// Industry data
const industries = [
  {
    id: 'signmaking',
    title: 'صناعة اللافتات والإعلانات',
    description: 'أجهزة كتر بلوتر هي الحل الأمثل لشركات الدعاية والإعلان لإنتاج لافتات واستيكرات عالية الجودة بسرعة ودقة',
    image: '/images/industries/signmaking.jpg',
    benefits: [
      'قص الفينيل والملصقات بدقة متناهية',
      'إنتاج لافتات بأحجام مختلفة',
      'تصميم وقص استيكرات السيارات',
      'إنشاء لوحات إعلانية داخلية وخارجية',
    ],
    recommendedProducts: ['هاي كت 720', 'هاي كت 1200', 'ريفينا برو'],
    casestudy: {
      title: 'شركة سكاي ميديا - القاهرة',
      quote: 'منذ استخدامنا لجهاز هاي كت 1200، ارتفعت إنتاجيتنا بنسبة 40% مع تحسن جودة المنتجات وسرعة التسليم',
      person: 'أحمد علي، مدير الإنتاج',
    }
  },
  {
    id: 'apparel',
    title: 'صناعة الملابس والأزياء',
    description: 'توفر أجهزة كتر بلوتر الدقة والسرعة اللازمة لقص الأقمشة ونقل التصاميم على التيشيرتات والملابس الرياضية',
    image: '/images/industries/apparel.jpg',
    benefits: [
      'قص الفينيل الحراري بدقة عالية',
      'تصميم وقص الطباعة على التيشيرتات',
      'إنتاج الشعارات والتصاميم للملابس الرياضية',
      'تصميمات مخصصة للأزياء العصرية',
    ],
    recommendedProducts: ['هاي كت A3', 'هاي كت A4', 'هاي كت 720'],
    casestudy: {
      title: 'ستايل برو - الرياض',
      quote: 'استطعنا توسيع نطاق أعمالنا وتلبية طلبات التيشيرتات المخصصة بشكل أسرع بكثير بعد استخدام جهاز هاي كت A3',
      person: 'فهد الحربي، صاحب المشروع',
    }
  },
  {
    id: 'packaging',
    title: 'التعبئة والتغليف',
    description: 'أجهزة كتر بلوتر هي الأداة المثالية لإنتاج نماذج التعبئة والتغليف وقص الكرتون والورق المقوى بدقة',
    image: '/images/industries/packaging.jpg',
    benefits: [
      'تصميم وقص عبوات مخصصة',
      'إنتاج صناديق ومغلفات بأشكال مبتكرة',
      'قص استيكرات المنتجات بدقة',
      'تصميم نماذج أولية للعبوات',
    ],
    recommendedProducts: ['هاي كت A3', 'ريفينا لايت', 'ريفينا برو'],
    casestudy: {
      title: 'العلبة الذكية - الإسكندرية',
      quote: 'أصبحنا قادرين على إنتاج أشكال مبتكرة من العبوات بتكلفة أقل وبسرعة أكبر منذ استخدامنا لأجهزة هاي كت',
      person: 'مروة حسام، مديرة الإنتاج',
    }
  },
  {
    id: 'printing',
    title: 'صناعة الطباعة',
    description: 'تعزز أجهزة كتر بلوتر قدرات المطابع من خلال توفير حلول دقيقة لقص المطبوعات والتصميمات بعد الطباعة',
    image: '/images/industries/printing.jpg',
    benefits: [
      'قص المطبوعات بعد الطباعة الرقمية',
      'تشطيب دقيق للكروت والمنشورات',
      'إنتاج استنسل للطباعة',
      'قص الديكالات والشعارات',
    ],
    recommendedProducts: ['ريفينا لايت', 'ريفينا برو', 'هاي كت 1200'],
    casestudy: {
      title: 'برينت هاوس - طرابلس',
      quote: 'استطعنا تقليل الهدر في المواد الخام بنسبة 30% مع زيادة الإنتاجية بفضل استخدام جهاز ريفينا برو',
      person: 'محمد الجزائري، مدير المطبعة',
    }
  },
];

export default function IndustriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">الصناعات والتطبيقات</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          أجهزة كتر بلوتر من هاي تكنولوجي مصر توفر حلولًا متكاملة لمختلف الصناعات والتطبيقات
        </p>
      </div>

      {/* Industries Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {industries.map((industry) => (
          <a 
            key={industry.id} 
            href={`#${industry.id}`} 
            className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-navy-700">{industry.title}</h3>
          </a>
        ))}
      </div>

      {/* Industries Details */}
      <div className="space-y-24">
        {industries.map((industry) => (
          <div id={industry.id} key={industry.id} className="scroll-mt-20">
            {/* Industry Header */}
            <div className="relative h-80 rounded-xl overflow-hidden mb-12">
              <Image
                src={industry.image}
                alt={industry.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end">
                <div className="p-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{industry.title}</h2>
                  <p className="text-lg text-gray-200 max-w-3xl">{industry.description}</p>
                </div>
              </div>
            </div>

            {/* Industry Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold mb-6 text-navy-700">المميزات والفوائد</h3>
                <ul className="space-y-4">
                  {industry.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-green-600 ml-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <h4 className="text-xl font-bold mb-4 text-navy-700">الأجهزة الموصى بها</h4>
                  <div className="flex flex-wrap gap-2">
                    {industry.recommendedProducts.map((product, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Case Study */}
              <div>
                <div className="bg-gray-50 rounded-lg shadow-sm p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-navy-700">قصة نجاح</h3>
                  <h4 className="text-xl font-bold mb-2 text-navy-700">{industry.casestudy.title}</h4>
                  <blockquote className="border-r-4 border-blue-600 pr-4 italic text-gray-700 my-4">
                    "{industry.casestudy.quote}"
                  </blockquote>
                  <p className="text-gray-600 text-sm">{industry.casestudy.person}</p>
                </div>

                <div className="bg-blue-600 text-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4">هل تحتاج إلى مزيد من المعلومات؟</h3>
                  <p className="mb-6">
                    فريقنا من الخبراء جاهز لتقديم استشارة مجانية حول أفضل الأجهزة المناسبة لمجال عملك
                  </p>
                  <Link 
                    href="/contact" 
                    className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-bold inline-block"
                  >
                    تواصل مع مستشار المبيعات
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 rounded-lg p-12 text-center mt-20">
        <h2 className="text-3xl font-bold mb-4">نحن هنا لمساعدتك في تطوير أعمالك</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          مهما كانت احتياجاتك الصناعية، تقدم هاي تكنولوجي مصر حلول كتر بلوتر متكاملة مع دعم فني واستشارات متخصصة
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/products" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-bold text-lg"
          >
            استعراض المنتجات
          </Link>
          <Link 
            href="/contact" 
            className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-bold text-lg"
          >
            طلب استشارة مجانية
          </Link>
        </div>
      </div>
    </div>
  );
} 