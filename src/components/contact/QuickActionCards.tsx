"use client";

import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { companyInfo } from '@/data/company';

const QuickActionCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Phone Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:scale-105">
        <div className="bg-primary/10 p-6 flex justify-center">
          <div className="bg-primary rounded-full p-4 text-white">
            <Phone size={28} />
          </div>
        </div>
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">اتصل بنا مباشرة</h3>
          <p className="text-gray-600 mb-4">متاحين للرد على استفساراتكم من السبت إلى الخميس</p>
          <a
            href={`tel:${companyInfo.primaryPhone}`}
            className="block text-lg font-bold text-primary hover:underline mb-2"
            dir="ltr"
          >
            {companyInfo.primaryPhone}
          </a>
          <span className="text-sm text-gray-500">{companyInfo.workingHours}</span>

          <button
            onClick={() => window.location.href = `tel:${companyInfo.primaryPhone}`}
            className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center"
          >
            <Phone className="h-4 w-4 ml-2" />
            اتصل الآن
          </button>
        </div>
      </div>

      {/* WhatsApp Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:scale-105">
        <div className="bg-green-50 p-6 flex justify-center">
          <div className="bg-[#25D366] rounded-full p-4 text-white">
            <MessageCircle size={28} />
          </div>
        </div>
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">تواصل عبر واتساب</h3>
          <p className="text-gray-600 mb-4">احصل على رد سريع لجميع استفساراتك وطلباتك</p>
          <a
            href={`https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg font-bold text-[#25D366] hover:underline"
            dir="ltr"
          >
            WhatsApp الدعم الفني
          </a>

          <a
            href={`https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full bg-[#25D366] text-white py-2 px-4 rounded-md hover:bg-[#25D366]/90 transition-colors flex items-center justify-center"
          >
            <MessageCircle className="h-4 w-4 ml-2" />
            مراسلة عبر واتساب
          </a>
        </div>
      </div>

      {/* Email Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:scale-105">
        <div className="bg-blue-50 p-6 flex justify-center">
          <div className="bg-blue-500 rounded-full p-4 text-white">
            <Mail size={28} />
          </div>
        </div>
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">راسلنا عبر البريد</h3>
          <p className="text-gray-600 mb-4">نرد على جميع رسائل البريد الإلكتروني خلال 24 ساعة</p>
          <a 
            href={`mailto:${companyInfo.email}`}
            className="block text-lg font-bold text-blue-500 hover:underline mb-2"
          >
            {companyInfo.email}
          </a>
          <a 
            href={`mailto:${companyInfo.salesEmail}`}
            className="block text-sm text-blue-500 hover:underline"
          >
            {companyInfo.salesEmail}
          </a>

          <a
            href={`mailto:${companyInfo.email}`}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <Mail className="h-4 w-4 ml-2" />
            إرسال بريد إلكتروني
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCards; 