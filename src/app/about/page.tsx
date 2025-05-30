"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  TrendingUp,
  Award,
  Users,
  Shield,
  Heart,
  Globe,
  Lightbulb,
  Rocket,
  MessageCircle,
  Building,
  Calendar,
  Sparkles,
  Eye,
  Compass,
  Trophy,
  Users as HandshakeIcon,
  Leaf,
  ChevronDown
} from 'lucide-react';
import { companyInfo } from '@/data/company';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CounterAnimation from '@/components/ui/CounterAnimation';

export default function AboutPage() {
  // const [activeTab, setActiveTab] = useState('mission'); // Unused
  // const [isVisible, setIsVisible] = useState(false); // Unused

  // useEffect(() => { // Unused
  //   setIsVisible(true);
  // }, []);

  const stats = [
    { icon: Calendar, number: '6+', text: 'سنوات من الخبرة', color: 'text-blue-500' },
    { icon: Users, number: '3000+', text: 'عميل راضٍ', color: 'text-green-500' },
    { icon: Globe, number: '22', text: 'دولة نخدمها', color: 'text-purple-500' },
    { icon: Award, number: '15+', text: 'جائزة وشهادة', color: 'text-orange-500' },
  ];

  const milestones = [
    {
      year: '2019',
      title: 'تأسيس الشركة',
      description: 'بداية رحلتنا في القاهرة مع رؤية واضحة لتطوير صناعة كتر بلوتر',
      icon: Rocket,
      color: 'bg-blue-500'
    },
    {
      year: '2020',
      title: 'التوسع الإقليمي',
      description: 'دخول السوق السعودي والإماراتي مع شراكات استراتيجية',
      icon: Globe,
      color: 'bg-green-500'
    },
    {
      year: '2021',
      title: 'الابتكار التقني',
      description: 'إطلاق أول مركز خدمة متخصص وتطوير حلول مخصصة',
      icon: Lightbulb,
      color: 'bg-purple-500'
    },
    {
      year: '2022',
      title: 'القيادة السوقية',
      description: 'أصبحنا الشريك الأول لأكثر من 2000 شركة في المنطقة',
      icon: Trophy,
      color: 'bg-orange-500'
    },
    {
      year: '2023',
      title: 'التحول الرقمي',
      description: 'إطلاق منصة رقمية متكاملة للخدمات والدعم الفني',
      icon: Zap,
      color: 'bg-pink-500'
    },
    {
      year: '2024',
      title: 'الاستدامة',
      description: 'تبني ممارسات صديقة للبيئة وحلول مستدامة',
      icon: Leaf,
      color: 'bg-teal-500'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'الدقة والجودة',
      description: 'نلتزم بأعلى معايير الجودة في كل منتج وخدمة نقدمها',
      color: 'bg-blue-500'
    },
    {
      icon: HandshakeIcon,
      title: 'الثقة والشفافية',
      description: 'نبني علاقات طويلة الأمد مع عملائنا على أساس الثقة المتبادلة',
      color: 'bg-green-500'
    },
    {
      icon: Lightbulb,
      title: 'الابتكار المستمر',
      description: 'نسعى دائماً لتطوير حلول جديدة تلبي احتياجات السوق المتغيرة',
      color: 'bg-purple-500'
    },
    {
      icon: Heart,
      title: 'خدمة العملاء',
      description: 'رضا عملائنا هو أولويتنا القصوى في كل ما نقوم به',
      color: 'bg-red-500'
    }
  ];

  const team = [
    {
      name: 'محمد صالح',
      position: 'المؤسس والرئيس التنفيذي',
      image: '/images/author/Mohamed_Saleh.png',
      description: 'خبرة 15 عام في مجال التكنولوجيا والأعمال'
    },
    {
      name: 'سارة السيد',
      position: 'مديرة التطوير التقني',
      image: '/images/author/Sara_ElSayed.png',
      description: 'متخصصة في تطوير الحلول التقنية المبتكرة'
    },
    {
      name: 'عمر حسان',
      position: 'مدير المبيعات الإقليمي',
      image: '/images/author/Omar_Hassan.png',
      description: 'خبير في تطوير الأسواق الإقليمية والشراكات'
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
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
                <Building className="h-5 w-5 text-yellow-400 mr-3" />
                <span className="text-lg font-medium">رحلة 6 سنوات من النجاح</span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200}>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  عن هاي تكنولوجي
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={400}>
              <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
                من القاهرة إلى العالم العربي، نقود ثورة تقنية في مجال أجهزة كتر بلوتر بخبرة تمتد لأكثر من 6 سنوات
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={600}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  href="/products"
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Rocket className="h-6 w-6 mr-3" />
                  اكتشف منتجاتنا
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
              أرقام تحكي قصة نجاحنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              إنجازات حققناها بفضل ثقة عملائنا وتفاني فريقنا المتميز
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

      {/* Company Story Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-blue-600/10 backdrop-blur-sm border border-blue-400/20 rounded-full mb-8">
              <Sparkles className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-lg font-medium text-blue-800">قصة نجاح ملهمة</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              كيف بدأت مغامرتنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              من حلم بسيط في القاهرة إلى شركة رائدة تخدم العالم العربي
            </p>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Story Content */}
              <AnimatedSection animation="fadeInLeft" className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">البداية المتواضعة</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    في عام 2019، بدأت رحلتنا من مكتب صغير في القاهرة برؤية واضحة: تقديم أجهزة كتر بلوتر عالية الجودة للسوق العربي. كان فريقنا المؤسس يضم ثلاثة أشخاص فقط، لكن الحلم كان كبيراً والعزيمة أكبر.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">النمو والتوسع</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    خلال السنوات الأولى، واجهنا تحديات كبيرة في فهم احتياجات السوق وبناء الثقة مع العملاء. لكن التزامنا بالجودة والخدمة المتميزة ساعدنا على كسب ثقة أول 100 عميل، ثم 500، وصولاً إلى آلاف العملاء اليوم.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">الانتشار الإقليمي</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    اليوم، نفخر بخدمة أكثر من 3000 عميل في 22 دولة عربية. من المشاريع الصغيرة إلى المؤسسات الكبرى، نقدم حلولاً متكاملة تساعد عملاءنا على تحقيق أهدافهم وتطوير أعمالهم.
                  </p>
                </div>
              </AnimatedSection>

              {/* Visual Elements */}
              <AnimatedSection animation="fadeInRight" className="relative">
                <div className="relative">
                  {/* Main Image Placeholder */}
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center text-white">
                      <Building className="h-24 w-24 mx-auto mb-6 opacity-80" />
                      <h4 className="text-2xl font-bold mb-4">من القاهرة للعالم العربي</h4>
                      <p className="text-lg opacity-90">
                        6 سنوات من النمو المستمر والابتكار
                      </p>
                    </div>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">2019</div>
                      <div className="text-sm text-gray-600">سنة التأسيس</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">3000+</div>
                      <div className="text-sm text-gray-600">عميل راضٍ</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Key Achievements */}
            <AnimatedSection animation="fadeInUp" delay={400} className="mt-16">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-3xl font-bold text-center mb-8">إنجازات رئيسية في رحلتنا</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">أول شركة</h4>
                    <p className="opacity-90">متخصصة في كتر بلوتر بالمنطقة</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HandshakeIcon className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">شراكات قوية</h4>
                    <p className="opacity-90">مع أكبر الموردين العالميين</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">ضمان شامل</h4>
                    <p className="opacity-90">على جميع منتجاتنا وخدماتنا</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              رحلة النمو والتطور
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              من البداية المتواضعة إلى الريادة الإقليمية، تعرف على محطات مسيرتنا
            </p>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <AnimatedSection 
                  key={index} 
                  animation="fadeInUp" 
                  delay={index * 150}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2 h-full">
                    <div className="flex items-center mb-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${milestone.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <milestone.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{milestone.year}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              رؤيتنا ومهمتنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نحو مستقبل أفضل في عالم التكنولوجيا والابتكار
            </p>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <AnimatedSection animation="fadeInLeft" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-full border border-blue-100 group-hover:border-blue-200 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">رؤيتنا</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    أن نكون الشركة الرائدة في الشرق الأوسط وشمال أفريقيا في مجال أجهزة كتر بلوتر والحلول التقنية المتطورة، ونساهم في تطوير الصناعات الإبداعية والتصنيعية في المنطقة.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="text-gray-700">الريادة الإقليمية في التكنولوجيا</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="text-gray-700">تمكين الشركات والمؤسسات</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="text-gray-700">الابتكار المستمر والتطوير</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" className="group">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 h-full border border-green-100 group-hover:border-green-200 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Compass className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">مهمتنا</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    نقدم أجهزة كتر بلوتر عالية الجودة وحلول تقنية متكاملة مع دعم فني متميز، لنساعد عملاءنا على تحقيق أهدافهم وتطوير أعمالهم بكفاءة وفعالية.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">منتجات عالية الجودة والدقة</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">دعم فني شامل ومتميز</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">حلول مخصصة لكل عميل</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              قيمنا الأساسية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              المبادئ التي توجه عملنا وتحدد هويتنا كشركة رائدة
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 150}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2 h-full text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-blue-600/10 backdrop-blur-sm border border-blue-400/20 rounded-full mb-8">
              <Users className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-lg font-medium text-blue-800">فريق متميز</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              فريق القيادة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              خبراء متميزون يقودون مسيرة النجاح والابتكار في عالم التكنولوجيا
            </p>
          </AnimatedSection>

          {/* Centered Team Grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
              {team.map((member, index) => (
                <AnimatedSection
                  key={index}
                  animation="fadeInUp"
                  delay={index * 150}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2 text-center h-full">
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              // Fallback to icon if image fails to load
                              const target = e.currentTarget;
                              const fallback = target.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                              if (target && fallback) {
                                target.style.display = 'none';
                                fallback.style.display = 'flex';
                              }
                            }}
                          />
                          <div className="fallback-icon w-full h-full rounded-full bg-gray-200 flex items-center justify-center absolute inset-0" style={{display: 'none'}}>
                            <Users className="h-16 w-16 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Professional Badge */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          قائد متميز
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                        <p className="text-blue-600 font-semibold text-lg mb-3">{member.position}</p>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">{member.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Team Stats */}
          <AnimatedSection animation="fadeInUp" delay={600} className="mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">سنوات خبرة مجمعة</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
                  <div className="text-gray-600">شهادة مهنية</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-gray-600">التزام بالتميز</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
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
              <span className="text-lg font-medium">انضم إلى عائلة هاي تكنولوجي</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                جاهز لبدء رحلتك معنا؟
              </span>
            </h2>

            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              اكتشف كيف يمكن لخبرتنا وتقنياتنا المتطورة أن تساعدك في تحقيق أهدافك وتطوير عملك
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Rocket className="h-6 w-6 mr-3" />
                ابدأ معنا اليوم
                <ArrowRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href={`https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="h-6 w-6 mr-3 text-green-400" />
                تحدث معنا الآن
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}