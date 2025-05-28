"use client";

import React from 'react';
import Section from '@/components/ui/Section';

interface StatsItemProps {
  label: string;
  labelAr?: string;
  value: string;
}

interface StatsGridProps {
  items: StatsItemProps[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 my-10">
      {items.map((item, index) => (
        <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{item.value}</div>
          <div className="text-gray-700 font-medium">{item.labelAr || item.label}</div>
        </div>
      ))}
    </div>
  );
};

const WhyChoose: React.FC = () => {
  const stats = [
    { label: 'Max Speed', labelAr: 'السرعة القصوى', value: '1200 mm/s' },
    { label: 'Micron Accuracy', labelAr: 'دقة ميكرونية', value: '0.01 mm' },
    { label: 'Active Clients', labelAr: 'عملاء نشطون', value: '3K+' },
    { label: 'Years Warranty', labelAr: 'سنوات الضمان', value: '5' }
  ];

  const reasons = [
    { 
      title: 'جودة المكونات العالمية',
      description: 'نستخدم فقط مكونات عالية الجودة من أشهر الموردين العالميين لضمان الأداء المتفوق والموثوقية على المدى الطويل.'
    },
    { 
      title: 'الدعم الفني المحلي',
      description: 'فريق الدعم الفني المتخصص متوفر في مصر وجميع بلدان المنطقة لضمان استجابة سريعة وحلول فعالة.'
    },
    { 
      title: 'خبرة أكثر من 15 عامًا',
      description: 'نقدم خبرتنا الواسعة في مجال أجهزة القص والتقطيع مع خدمات استشارية متكاملة لمساعدتك على اختيار الحل الأمثل.'
    },
    { 
      title: 'برامج مخصصة بالعربية',
      description: 'نوفر برامج تشغيل وتصميم بواجهة عربية سهلة الاستخدام مع تدريب شامل مجاني لكل عميل.'
    }
  ];

  return (
    <Section id="why" background="light">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          لماذا تختار <span className="text-primary-600">هاي كت</span>؟
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          تميزنا بالتكنولوجيا المتقدمة والدعم المحلي يجعلنا الخيار الأول في مصر والشرق الأوسط لأجهزة الكتر بلوتر
        </p>
      </div>

      <StatsGrid items={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {reasons.map((reason, index) => (
          <div key={index} className="flex h-full bg-white rounded-lg p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
            <div className="mt-1 mr-4 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-700">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WhyChoose; 