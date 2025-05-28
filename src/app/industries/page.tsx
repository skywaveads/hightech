"use client";

import React, { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Zap, 
  Target, 
  TrendingUp,
  Award,
  Users,
  Clock,
  Shield,
  ChevronDown,
  ChevronUp,
  Play,
  Sparkles,
  Globe,
  BarChart3,
  Lightbulb,
  Rocket,
  Heart,
  MessageCircle
} from 'lucide-react';
import { industries, industryFAQs } from '@/data/industries';
import { companyInfo } from '@/data/company';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CounterAnimation from '@/components/ui/CounterAnimation';

export default function IndustriesPage() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Users, number: '2500+', text: 'عميل في الصناعات المختلفة', color: 'text-blue-500' },
    { icon: Award, number: '15+', text: 'سنة خبرة متخصصة', color: 'text-green-500' },
    { icon: Globe, number: '22', text: 'دولة نخدمها', color: 'text-purple-500' },
    { icon: TrendingUp, number: '98%', text: 'معدل رضا العملاء', color: 'text-orange-500' },
  ];

  const features = [
    {
      icon: Target,
      title: 'دقة استثنائية',
      description: 'تقنية قطع متطورة بدقة تصل إلى 0.01 مم',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'سرعة عالية',
      description: 'إنتاجية تصل إلى 1200 مم/ثانية',
      color: 'bg-green-500'
    },
    {
      icon: Shield,
      title: 'موثوقية تامة',
      description: 'ضمان شامل وصيانة مدى الحياة',
      color: 'bg-purple-500'
    },
    {
      icon: Lightbulb,
      title: 'تقنية ذكية',
      description: 'أنظمة تحكم متقدمة وواجهات سهلة',
      color: 'bg-orange-500'
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/industries/banner.png"
            alt="صناعات كتر بلوتر"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/70 to-purple-900/80"></div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-float"></div>
          <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full opacity-40 animate-float animation-delay-1000"></div>
          <div className="absolute bottom-32 left-40 w-3 h-3 bg-yellow-400 rounded-full opacity-50 animate-float animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <AnimatedSection animation="fadeInUp">
              <div className="inline-flex items-center px-6 py-3 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full mb-8">
                <Sparkles className="h-5 w-5 text-yellow-400 mr-3" />
                <span className="text-lg font-medium">حلول متخصصة لكل صناعة</span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200}>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  صناعات كتر بلوتر
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={400}>
              <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
                نقدم حلول قطع متطورة مصممة خصيصاً لتلبية احتياجات كل صناعة بدقة وكفاءة استثنائية
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={600}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  href="/products"
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Rocket className="h-6 w-6 mr-3" />
                  استكشف منتجاتنا
                  <ArrowRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/contact"
                  className="group bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="h-6 w-6 mr-3" />
                  تواصل معنا
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/60" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              أرقام تتحدث عن نفسها
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ثقة آلاف العملاء في جميع أنحاء العالم تجعلنا الخيار الأول في مجال أجهزة كتر بلوتر
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 100}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.color} bg-opacity-10 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <CounterAnimation end={parseInt(stat.number.replace(/\D/g, ''))} suffix={stat.number.replace(/\d/g, '')} />
                  </div>
                  <p className="text-gray-600 font-medium">{stat.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              لماذا نحن الأفضل؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              تقنيات متطورة وخبرة عميقة تجعل أجهزتنا الخيار الأمثل لجميع الصناعات
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 150}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2 h-full">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              الصناعات التي نخدمها
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              حلول متخصصة ومصممة خصيصاً لتلبية احتياجات كل صناعة بأعلى معايير الجودة والدقة
            </p>
          </AnimatedSection>

          {/* Industry Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {industries.map((industry, index) => (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeIndustry === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {industry.titleAr}
              </button>
            ))}
          </div>

          {/* Active Industry Content */}
          <AnimatedSection key={activeIndustry} animation="fadeInUp" className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-6">
                  <Star className="h-4 w-4 mr-2" />
                  <span className="font-medium">صناعة متخصصة</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {industries[activeIndustry]?.titleAr}
                </h3>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {industries[activeIndustry]?.descriptionAr}
                </p>

                <div className="space-y-4 mb-8">
                  {industries[activeIndustry]?.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{benefit.titleAr}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/products"
                    className="group bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-all duration-300"
                  >
                    <Target className="h-5 w-5 mr-2" />
                    اختر الجهاز المناسب
                    <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link 
                    href="/contact"
                    className="group border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-all duration-300"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    استشارة مجانية
                  </Link>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-2 shadow-xl">
                    <Image
                      src={industries[activeIndustry]?.image || '/images/placeholder.jpg'}
                      alt={industries[activeIndustry]?.titleAr || 'صناعة'}
                      width={600}
                      height={400}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              إجابات شاملة على أكثر الأسئلة شيوعاً حول أجهزة كتر بلوتر في مختلف الصناعات
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            {industryFAQs.slice(0, 8).map((faq, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 50}
                className="mb-4"
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === faq.questionAr ? null : faq.questionAr)}
                    className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.questionAr}</span>
                    {openFAQ === faq.questionAr ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  {openFAQ === faq.questionAr && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answerAr}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
              <Heart className="h-5 w-5 text-red-400 mr-3" />
              <span className="text-lg font-medium">ابدأ رحلتك معنا اليوم</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                جاهز لتطوير عملك؟
              </span>
            </h2>

            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              انضم إلى آلاف العملاء الذين يثقون في أجهزة هاي كت لتحقيق أهدافهم في مختلف الصناعات
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Rocket className="h-6 w-6 mr-3" />
                احصل على استشارة مجانية
                <ArrowRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href={`https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="h-6 w-6 mr-3 text-green-400" />
                واتساب مباشر
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}