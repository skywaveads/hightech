"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { companyInfo } from '@/data/company';

interface AboutCTAProps {
  className?: string;
}

export const AboutCTA: React.FC<AboutCTAProps> = ({ className }) => {
  return (
    <section className={`bg-gradient-to-r from-primary to-primary/80 text-white py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            هل أنت جاهز للانضمام إلى أكثر من 3,000 محترف راضٍ؟
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            انضم إلى آلاف العملاء الراضين الذين يعتمدون على أجهزة هاي كت يوميًا لتحسين إنتاجهم وجودة منتجاتهم
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

export default AboutCTA; 