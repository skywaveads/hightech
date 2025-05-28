"use client";

import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { companyInfo } from '@/data/company';
import { Button } from '@/components/ui/button';

const ContactBanner = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            هل تحتاج إلى عرض سعر؟
          </h2>
          <p className="text-xl mb-8">
            اتصل بنا الآن للحصول على عرض سعر خاص لجهاز كتر بلوتر يناسب احتياجاتك
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="default"
              className="bg-white text-primary hover:bg-gray-100"
              asChild
            >
              <a href={`tel:${companyInfo.phones[0]}`} className="flex items-center">
                <Phone className="h-5 w-5 ml-2" />
                <span className="font-bold" dir="ltr">{companyInfo.phones[0]}</span>
              </a>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="#contact-form">
                ملء نموذج التواصل
              </Link>
            </Button>
          </div>
          
          <p className="mt-6 text-white/80 text-sm">
            فريقنا متاح للرد على استفساراتكم خلال ساعات العمل: {companyInfo.workingHours}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner; 