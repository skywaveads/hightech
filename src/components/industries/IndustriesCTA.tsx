"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { companyInfo } from '@/data/company';

const IndustriesCTA: React.FC = () => {
  return (
    <section id="cta" className="bg-gradient-to-r from-primary to-primary/80 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            هل أنت جاهز للقص بشكل أسرع وأدق؟
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            مع أجهزة هاي كت بلوتر، يمكنك زيادة الإنتاجية وتقليل الهدر وتحسين جودة المنتج النهائي
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="default"
              className="bg-white text-primary hover:bg-gray-100 border-2 border-white"
              asChild
            >
              <Link href="/contact">
                احصل على عرض سعر
              </Link>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
              asChild
            >
              <a 
                href={`tel:${companyInfo.phones[0]}`}
                className="flex items-center"
                aria-label="اتصل بنا الآن للحصول على مساعدة"
              >
                <Phone className="h-5 w-5 ml-2" />
                <span dir="ltr">{companyInfo.phones[0]}</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesCTA; 