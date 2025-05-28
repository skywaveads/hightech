"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { caseStudies } from '@/data/caseStudies';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CaseStudies: React.FC = () => {
  return (
    <Section id="case-studies" background="dark">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          قصص نجاح عملائنا
        </h2>
        <p className="text-xl max-w-3xl mx-auto">
          تعرف على قصص نجاح العملاء الذين استخدموا أجهزة هاي كت لتطوير أعمالهم
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="case-studies-swiper pb-14"
      >
        {caseStudies.map((study) => (
          <SwiperSlide key={study.id}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl h-full">
              <div className="relative h-48">
                <Image
                  src={study.image}
                  alt={study.titleAr}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col h-64">
                <h3 className="text-xl font-bold mb-2">{study.titleAr}</h3>
                <p className="text-gray-300 mb-4 flex-grow">{study.summaryAr}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag) => (
                    <span key={tag} className="bg-blue-900 text-blue-100 px-2 py-1 rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="mt-auto self-start" asChild>
                  <Link href={study.url}>
                    اقرأ القصة كاملة
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-12">
        <Button variant="default" size="lg" asChild>
          <Link href="/case-studies">
            جميع قصص النجاح
          </Link>
        </Button>
      </div>
    </Section>
  );
};

export default CaseStudies; 