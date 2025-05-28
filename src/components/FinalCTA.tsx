"use client";

import React from 'react';
import Link from 'next/link';
import { Phone, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';
import { companyInfo } from '@/data/company';

const FinalCTA: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Header with Icon */}
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-yellow-400 mr-3" />
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              هل أنت جاهز لتقليص وقت الإنتاج؟
            </h2>
            <Sparkles className="h-8 w-8 text-yellow-400 ml-3" />
          </div>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200 leading-relaxed">
            استثمر في جهاز كتر بلوتر هاي كت واحصل على أعلى مستويات الدقة والسرعة مع ضمان 5 سنوات
          </p>
          
          {/* Enhanced Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            {/* Call Button */}
            <a
              href={`tel:${companyInfo.primaryPhone}`}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Phone className="h-6 w-6 mr-3 relative z-10 group-hover:animate-bounce" />
              <span className="relative z-10">اتصل الآن</span>
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </a>
            
            {/* Quote Button */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-full shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <HelpCircle className="h-6 w-6 mr-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">احصل على عرض سعر</span>
              <div className="absolute inset-0 rounded-full border-2 border-white/50 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
            </Link>
          </div>
          
          {/* WhatsApp Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
            <p className="text-xl mb-4 text-gray-200">
              أو تواصل معنا عبر واتساب
            </p>
            <a
              href={`https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`}
              className="group inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
            >
              <MessageCircle className="h-6 w-6 mr-3 group-hover:animate-pulse" />
              <span className="text-lg">{companyInfo.primaryPhone}</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-yellow-400 mb-1">5 سنوات</div>
              <div className="text-sm text-gray-300">ضمان شامل</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
              <div className="text-sm text-gray-300">دعم فني</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-blue-400 mb-1">5000+</div>
              <div className="text-sm text-gray-300">عميل راضٍ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;