"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y, Keyboard, EffectFade, Parallax } from 'swiper/modules';
import { companyInfo } from '@/data/company';
import type { Swiper as SwiperType } from 'swiper';
import { 
  Play, 
  ArrowRight, 
  Star, 
  Award, 
  Zap, 
  Shield,
  Phone,
  MessageCircle,
  Sparkles
} from 'lucide-react';

// Import required Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  altText: string;
  features: string[];
  cta: {
    primary: string;
    secondary: string;
  };
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: '/images/home/slider1.jpg',
    title: 'قوة قطع بلا حدود',
    subtitle: 'مع هاي كت مفيش حدود',
    description: 'تقنية السيرفو موتور المتطورة لقص دقيق بسرعة 1200 ملم/ثانية',
    altText: 'جهاز كتر بلوتر هاي كت في بيئة عمل مهنية',
    features: ['سرعة فائقة', 'دقة ميكرونية', 'تقنية متطورة'],
    cta: {
      primary: 'احصل على عرض سعر',
      secondary: 'شاهد العرض التوضيحي'
    }
  },
  {
    id: 2,
    image: '/images/home/slider2.jpg',
    title: 'دقة متناهية في القص',
    subtitle: 'لتصميمات احترافية بدون حدود',
    description: 'دقة قطع 0.01 ملم مع هيكل معدني متين للعمل المستمر',
    altText: 'كتر بلوتر هاي كت يقص الفينيل بدقة عالية',
    features: ['دقة 0.01 ملم', 'هيكل متين', 'عمل مستمر'],
    cta: {
      primary: 'تواصل معنا',
      secondary: 'اكتشف المنتجات'
    }
  },
  {
    id: 3,
    image: '/images/home/slider3.jpg',
    title: 'نتائج مثالية في كل مرة',
    subtitle: 'ثقة آلاف العملاء في منتجاتنا',
    description: 'دعم فني مدى الحياة وضمان شامل مع خدمة عملاء متميزة',
    altText: 'عميل يعرض منتج نهائي من كتر بلوتر هاي كت',
    features: ['دعم مدى الحياة', 'ضمان شامل', 'خدمة متميزة'],
    cta: {
      primary: 'ابدأ مشروعك',
      secondary: 'قصص النجاح'
    }
  }
];

export const HeroSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [realIndex, setRealIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // التعامل مع حالات الـ loop
  const handleSlideChange = (swiper: SwiperType) => {
    setIsAnimating(true);
    const realIdx = swiper.realIndex;
    setRealIndex(realIdx);
    setActiveIndex(realIdx);
    
    // ضمان انتهاء التحريك قبل إظهار النصوص
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section 
      className="relative text-white w-full overflow-hidden" 
      aria-label="صور عرض منتجات هاي كت"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div 
          className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        ></div>
        <div 
          className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full opacity-40 animate-float animation-delay-1000"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 15}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-32 left-40 w-3 h-3 bg-yellow-400 rounded-full opacity-50 animate-float animation-delay-2000"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * -10}px)`
          }}
        ></div>
      </div>

      <div className="max-w-[1920px] mx-auto relative">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, A11y, Keyboard, EffectFade, Parallax]}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          parallax={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          keyboard={{ enabled: true }}
          onSlideChange={handleSlideChange}
          loop={true}
          a11y={{
            prevSlideMessage: 'الشريحة السابقة',
            nextSlideMessage: 'الشريحة التالية',
            firstSlideMessage: 'الشريحة الأولى',
            lastSlideMessage: 'الشريحة الأخيرة',
          }}
          className="w-full h-auto"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="!flex items-center justify-center relative">
              <div className="relative w-full">
                {/* Background Image with Parallax */}
                <img
                  src={slide.image}
                  alt={slide.altText}
                  className="w-full h-auto object-contain"
                  data-swiper-parallax="-23%"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-start justify-center text-right p-6 pr-12 z-10">
                  <div className="max-w-3xl mr-auto">
                    {/* Badge */}
                    <div 
                      className={`inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full mb-6 transition-all duration-1000 ${realIndex === index && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      data-swiper-parallax="-100"
                    >
                      <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
                      <span className="text-sm font-medium text-blue-100">
                        الرائد في مجال أجهزة كتر بلوتر
                      </span>
                    </div>

                    {/* Main Title */}
                    <h1
                      className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight transition-all duration-1000 delay-200 ${realIndex === index && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      data-swiper-parallax="-200"
                    >
                      <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-gradient">
                        {slide.title}
                      </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                      className={`text-lg md:text-xl lg:text-2xl mb-4 text-blue-100 font-medium transition-all duration-1000 delay-400 ${realIndex === index && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      data-swiper-parallax="-300"
                    >
                      {slide.subtitle}
                    </p>

                    {/* Description */}
                    <p 
                      className={`text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${realIndex === index && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      data-swiper-parallax="-400"
                    >
                      {slide.description}
                    </p>

                    {/* Features */}
                    <div
                      className={`flex flex-wrap justify-start gap-4 mb-8 transition-all duration-1000 delay-700 ${realIndex === index && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      data-swiper-parallax="-500"
                    >
                      {slide.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                          <Star className="h-4 w-4 text-yellow-400 mr-2" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div
                      className={`flex flex-col sm:flex-row gap-4 justify-start items-start transition-all duration-1000 delay-900 ${realIndex === index && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      data-swiper-parallax="-600"
                    >
                      <Link 
                        href="/contact" 
                        className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover-lift animate-pulse-glow"
                        aria-label={slide.cta.primary}
                      >
                        <Phone className="h-5 w-5 mr-3" />
                        {slide.cta.primary}
                        <ArrowRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      
                      <Link 
                        href={`https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105"
                        aria-label="تواصل عبر واتساب"
                      >
                        <MessageCircle className="h-5 w-5 mr-3 text-green-400" />
                        واتساب
                        <ArrowRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </section>
  );
};

export default HeroSlider;