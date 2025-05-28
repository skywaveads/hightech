"use client";

import React from 'react';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ReactNode;
  fileName: string;
  fileType: string;
  fileSize: string;
}

const resources: Resource[] = [
  {
    id: 'user-manual',
    title: 'User Manual',
    titleAr: 'دليل المستخدم',
    description: 'Comprehensive guide for High-Cut plotters setup and usage',
    descriptionAr: 'دليل شامل لإعداد واستخدام أجهزة هاي كت',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    fileName: 'high-cut-manual-arabic.pdf',
    fileType: 'PDF',
    fileSize: '4.2 MB'
  },
  {
    id: 'quick-start',
    title: 'Quick Start Guide',
    titleAr: 'دليل البدء السريع',
    description: 'Step-by-step guide to get your device up and running',
    descriptionAr: 'دليل خطوة بخطوة لتشغيل جهازك بسرعة',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    fileName: 'high-cut-quick-start-guide.pdf',
    fileType: 'PDF',
    fileSize: '1.8 MB'
  },
  {
    id: 'software',
    title: 'Design Software',
    titleAr: 'برنامج التصميم',
    description: 'Latest version of High-Design software with Arabic interface',
    descriptionAr: 'أحدث إصدار من برنامج هاي ديزاين مع واجهة عربية',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    fileName: 'high-design-v3.2.exe',
    fileType: 'EXE',
    fileSize: '245 MB'
  },
  {
    id: 'driver',
    title: 'Device Drivers',
    titleAr: 'برامج التشغيل',
    description: 'Latest drivers for all High-Cut models',
    descriptionAr: 'أحدث برامج التشغيل لجميع موديلات هاي كت',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    fileName: 'high-cut-drivers-2023.zip',
    fileType: 'ZIP',
    fileSize: '32 MB'
  },
  {
    id: 'templates',
    title: 'Design Templates',
    titleAr: 'قوالب التصميم',
    description: 'Ready-to-use templates for common applications',
    descriptionAr: 'قوالب جاهزة للاستخدام للتطبيقات الشائعة',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    fileName: 'high-cut-templates.zip',
    fileType: 'ZIP',
    fileSize: '56 MB'
  },
  {
    id: 'material-guide',
    title: 'Material Settings Guide',
    titleAr: 'دليل إعدادات المواد',
    description: 'Recommended settings for different materials',
    descriptionAr: 'الإعدادات الموصى بها لمختلف المواد',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    fileName: 'high-cut-material-settings.pdf',
    fileType: 'PDF',
    fileSize: '3.5 MB'
  }
];

const Resources: React.FC = () => {
  return (
    <Section id="resources" background="light">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          مصادر التعلم والموارد
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          حمّل الأدلة والبرامج والقوالب لتحقيق أقصى استفادة من جهاز هاي كت
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{resource.titleAr}</h3>
                <p className="text-gray-600 text-sm">{resource.descriptionAr}</p>
              </div>
              <div>{resource.icon}</div>
            </div>
            <div className="border-t pt-4 mt-4 flex justify-between items-center">
              <div className="text-sm">
                <span className="text-gray-600">{resource.fileType} • {resource.fileSize}</span>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/downloads/${resource.fileName}`} download>
                  تنزيل
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">هل تحتاج إلى مزيد من المساعدة؟</p>
        <Button variant="default" asChild>
          <Link href="/support">
            مركز المساعدة والدعم الفني
          </Link>
        </Button>
      </div>
    </Section>
  );
};

export default Resources; 