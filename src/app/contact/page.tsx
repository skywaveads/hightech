"use client";

import React, { useState, useEffect } from 'react';
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
  Heart,
  Globe,
  BarChart3,
  Lightbulb,
  Rocket,
  MessageCircle,
  Building,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Send,
  ChevronDown,
  ChevronUp,
  Headphones,
  FileText,
  Settings,
  HelpCircle,
  Navigation,
  Timer,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import { companyInfo } from '@/data/company';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CounterAnimation from '@/components/ui/CounterAnimation';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('form');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: 'اتصل بنا مباشرة',
      description: 'تحدث مع خبرائنا الآن',
      value: companyInfo.primaryPhone,
      action: `tel:${companyInfo.primaryPhone}`,
      color: 'bg-green-500',
      available: '24/7'
    },
    {
      icon: MessageCircle,
      title: 'واتساب',
      description: 'دردشة سريعة ومباشرة',
      value: 'رسالة فورية',
      action: `https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`,
      color: 'bg-green-600',
      available: 'فوري'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      description: 'للاستفسارات التفصيلية',
      value: companyInfo.email,
      action: `mailto:${companyInfo.email}`,
      color: 'bg-blue-500',
      available: '24 ساعة'
    },
    {
      icon: MapPin,
      title: 'زيارة المعرض',
      description: 'تعال وشاهد الأجهزة بنفسك',
      value: 'القاهرة - المنصورة',
      action: '#branches',
      color: 'bg-purple-500',
      available: 'يومياً'
    }
  ];

  const services = [
    { value: 'general', label: 'استفسار عام' },
    { value: 'sales', label: 'المبيعات والأسعار' },
    { value: 'support', label: 'الدعم الفني' },
    { value: 'maintenance', label: 'الصيانة' },
    { value: 'training', label: 'التدريب' },
    { value: 'partnership', label: 'الشراكات' }
  ];

  const stats = [
    { icon: Clock, number: '2', text: 'ساعة متوسط الرد', color: 'text-blue-500' },
    { icon: Users, number: '98%', text: 'معدل رضا العملاء', color: 'text-green-500' },
    { icon: Headphones, number: '24/7', text: 'دعم فني متواصل', color: 'text-purple-500' },
    { icon: CheckSquare, number: '1000+', text: 'مشكلة تم حلها', color: 'text-orange-500' },
  ];

  const faqs = [
    {
      question: 'ما هي أوقات العمل لخدمة العملاء؟',
      answer: 'نحن متاحون 24/7 عبر الواتساب والبريد الإلكتروني. أما المكاتب فتعمل من السبت إلى الخميس من 9 صباحاً حتى 6 مساءً.'
    },
    {
      question: 'كم يستغرق الرد على الاستفسارات؟',
      answer: 'نرد على الاستفسارات العاجلة خلال ساعتين، والاستفسارات العامة خلال 24 ساعة كحد أقصى.'
    },
    {
      question: 'هل تقدمون استشارة مجانية؟',
      answer: 'نعم، نقدم استشارة مجانية لمساعدتك في اختيار الجهاز المناسب لاحتياجاتك وميزانيتك.'
    },
    {
      question: 'هل يمكنني زيارة المعرض لرؤية الأجهزة؟',
      answer: 'بالطبع! لدينا معارض في القاهرة والمنصورة حيث يمكنك رؤية جميع الأجهزة وتجربتها بنفسك.'
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل الدفع نقداً، بالتحويل البنكي، بالشيكات، وبطاقات الائتمان. كما نوفر خطط تقسيط مرنة.'
    },
    {
      question: 'هل تقدمون خدمة التوصيل؟',
      answer: 'نعم، نوفر خدمة التوصيل والتركيب في جميع أنحاء مصر والدول العربية مع ضمان الجودة.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      service: 'general'
    });
    
    setIsSubmitting(false);
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
  };

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
          <div className="absolute top-40 right-32 w-6 w-6 bg-purple-400 rounded-full opacity-40 animate-float animation-delay-1000"></div>
          <div className="absolute bottom-32 left-40 w-3 h-3 bg-yellow-400 rounded-full opacity-50 animate-float animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <AnimatedSection animation="fadeInUp">
              <div className="inline-flex items-center px-6 py-3 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full mb-8">
                <MessageCircle className="h-5 w-5 text-yellow-400 mr-3" />
                <span className="text-lg font-medium">نحن هنا لمساعدتك</span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200}>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  تواصل معنا
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={400}>
              <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
                فريق خبراء هاي تكنولوجي في خدمتك على مدار الساعة لتقديم أفضل الحلول والدعم الفني
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={600}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a 
                  href={`https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="h-6 w-6 mr-3" />
                  واتساب مباشر
                  <ArrowRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a 
                  href={`tel:${companyInfo.primaryPhone}`}
                  className="group bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105"
                >
                  <Phone className="h-6 w-6 mr-3" />
                  اتصل الآن
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/60" />
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              طرق التواصل
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اختر الطريقة الأنسب لك للتواصل مع فريقنا المتخصص
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 150}
                className="group"
              >
                <a
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : '_self'}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="block bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2 h-full"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${method.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="text-lg font-semibold text-blue-600 mb-2">{method.value}</div>
                  <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    متاح {method.available}
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              خدمة عملاء متميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              أرقام تعكس التزامنا بتقديم أفضل خدمة عملاء في المنطقة
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
                    {stat.number.includes('%') || stat.number.includes('/') ? (
                      stat.number
                    ) : (
                      <CounterAnimation end={parseInt(stat.number)} />
                    )}
                  </div>
                  <p className="text-gray-600 font-medium">{stat.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              أرسل لنا رسالة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              املأ النموذج أدناه وسيتواصل معك أحد خبرائنا خلال 24 ساعة
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+20 1xxxxxxxxx"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        اسم الشركة
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="اسم شركتك (اختياري)"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        نوع الخدمة *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        {services.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        موضوع الرسالة *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="موضوع استفسارك"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      تفاصيل الرسالة *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="اكتب تفاصيل استفسارك أو طلبك هنا..."
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="h-6 w-6 mr-3" />
                          إرسال الرسالة
                          <ArrowRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section id="branches" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              فروعنا ومعارضنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              زر معارضنا لرؤية الأجهزة عن قرب والحصول على استشارة شخصية من خبرائنا
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {companyInfo.branches.map((branch, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 200}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                        <MapPin className="h-6 w-6 text-blue-500 mr-3" />
                        {branch.city}
                        {branch.isPrimary && (
                          <span className="mr-3 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                            الفرع الرئيسي
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 mb-4">{branch.address}</p>
                      <div className="space-y-2">
                        <a
                          href={`tel:${branch.phone}`}
                          className="flex items-center text-green-600 hover:text-green-700 transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {branch.phone}
                        </a>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          السبت - الخميس: 9 ص - 6 م
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <a
                      href={`tel:${branch.phone}`}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200"
                    >
                      اتصل الآن
                    </a>
                    <a
                      href={`https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200"
                    >
                      واتساب
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              إجابات على أكثر الأسئلة شيوعاً حول خدماتنا وطرق التواصل
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 50}
                className="mb-4"
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === faq.question ? null : faq.question)}
                    className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    {openFAQ === faq.question ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  {openFAQ === faq.question && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
              <span className="text-lg font-medium">نحن في انتظارك</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                لا تتردد في التواصل
              </span>
            </h2>

            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              فريقنا المتخصص جاهز لمساعدتك في اختيار الحل الأمثل لاحتياجاتك
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href={`https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-6 w-6 mr-3" />
                ابدأ المحادثة الآن
                <ArrowRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href={`tel:${companyInfo.primaryPhone}`}
                className="group bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105"
              >
                <Phone className="h-6 w-6 mr-3" />
                اتصل مباشرة
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}