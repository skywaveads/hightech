"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Send,
  ArrowUp,
  Clock,
  Shield,
  Award,
  Truck,
  CreditCard,
  Users,
  Star,
  Globe,
  MessageCircle,
  CheckCircle,
  Heart,
  Zap,
  TrendingUp
} from 'lucide-react';
import { companyInfo, companyDescription } from '@/data/company';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const features = [
    { icon: Shield, text: 'ضمان سنتين', color: 'text-green-400' },
    { icon: Truck, text: 'توصيل سريع', color: 'text-blue-400' },
    { icon: Award, text: 'جودة معتمدة', color: 'text-yellow-400' },
    { icon: Clock, text: 'خدمة 24/7', color: 'text-purple-400' },
  ];

  const stats = [
    { icon: Users, number: '10,000+', text: 'عميل راضي' },
    { icon: Star, number: '4.9/5', text: 'تقييم العملاء' },
    { icon: Globe, number: '22', text: 'دولة نخدمها' },
    { icon: TrendingUp, number: '15+', text: 'سنة خبرة' },
  ];

  const quickLinks = [
    { name: 'عن الشركة', href: '/about' },
    { name: 'منتجاتنا', href: '/products' },
    { name: 'المدونة', href: '/blog' },
    { name: 'الصناعات', href: '/industries' },
    { name: 'الشحن والتوصيل', href: '/shipping' },
    { name: 'الإرجاع والاسترداد', href: '/returns' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  const productCategories = [
    { name: 'كتر بلوتر', href: '/products?category=cutter-plotter' },
    { name: 'مكابس حرارية', href: '/products?category=heat-press' },
    { name: 'طابعات DTF', href: '/products?category=dtf-printer' },
    { name: 'مواد خام', href: '/products?category=materials' },
    { name: 'قطع غيار', href: '/products?category=spare-parts' },
    { name: 'عروض خاصة', href: '/products?category=offers' },
  ];

  const legalLinks = [
    { name: 'الشروط والأحكام', href: '/terms' },
    { name: 'سياسة الخصوصية', href: '/privacy' },
    { name: 'سياسة الإرجاع', href: '/returns' },
    { name: 'سياسة الشحن', href: '/shipping' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* شريط الميزات العلوي */}
        <div className="border-b border-white/10 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 space-x-reverse group">
                  <div className={`p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* معلومات الشركة */}
            <div className="md:col-span-1 lg:col-span-1">
              <div className="mb-6">
                <Image
                  src="/images/logo.png"
                  alt={companyInfo.companyNameAr}
                  width={200}
                  height={45}
                  className="w-auto h-12 mb-4 filter drop-shadow-lg"
                />
                <p className="text-gray-300 leading-relaxed mb-6">
                  {companyDescription.short}
                </p>
              </div>

              {/* الإحصائيات */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <stat.icon className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                    <div className="text-xl font-bold text-white">{stat.number}</div>
                    <div className="text-xs text-gray-400">{stat.text}</div>
                  </div>
                ))}
              </div>

              {/* وسائل التواصل الاجتماعي */}
              <div className="flex space-x-4 space-x-reverse mb-8">
                {[
                  { icon: Facebook, href: 'https://www.facebook.com/hightechadv', color: 'hover:bg-blue-600' },
                  { icon: Youtube, href: 'https://www.youtube.com/@Hightechadv', color: 'hover:bg-red-600' },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/10 rounded-full text-white hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color}`}
                    aria-label={`Follow us on ${social.icon.name}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>

              {/* الروابط السريعة */}
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  روابط سريعة
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                      >
                        <CheckCircle className="h-4 w-4 mr-2 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* معلومات الاتصال والنشرة البريدية */}
            <div className="md:col-span-1 lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-green-400" />
                تواصل معنا
              </h3>
              
              {/* معلومات الاتصال */}
              <div className="space-y-4 mb-8">
                {/* جميع الفروع */}
                {companyInfo.branches.map((branch, index) => (
                  <div key={index} className="flex items-start space-x-3 space-x-reverse group">
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                      <MapPin className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white flex items-center">
                        {branch.city}
                        {branch.isPrimary && (
                          <span className="mr-2 px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded-full">
                            الفرع الرئيسي
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-300 mb-1">{branch.address}</div>
                      <a
                        href={`tel:${branch.phone}`}
                        className="text-sm text-green-400 hover:text-green-300 transition-colors duration-300 flex items-center"
                      >
                        <Phone className="h-3 w-3 ml-1" />
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                ))}
                
                {/* جميع الأرقام */}
                <div className="border-t border-white/10 pt-4">
                  <div className="text-sm font-medium text-white mb-2">أرقام الاتصال:</div>
                  {companyInfo.phones.map((phone, index) => (
                    <div key={index} className="flex items-center space-x-3 space-x-reverse group mb-2">
                      <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                        <Phone className="h-3 w-3 text-green-400" />
                      </div>
                      <a
                        href={`tel:${phone}`}
                        className={`text-sm transition-colors duration-300 ${
                          phone === companyInfo.primaryPhone
                            ? 'text-yellow-400 hover:text-yellow-300 font-medium'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {phone}
                        {phone === companyInfo.primaryPhone && (
                          <span className="mr-1 text-xs">(الرقم الأساسي)</span>
                        )}
                      </a>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse group">
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-purple-400" />
                  </div>
                  <a href={`mailto:${companyInfo.email}`} className="text-gray-300 hover:text-white transition-colors duration-300">
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              {/* النشرة البريدية */}
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                <h4 className="font-bold mb-3 flex items-center">
                  <Send className="h-4 w-4 mr-2 text-yellow-400" />
                  النشرة البريدية
                </h4>
                <p className="text-sm text-gray-300 mb-4">
                  اشترك للحصول على آخر العروض والأخبار
                </p>
                
                {isSubscribed ? (
                  <div className="flex items-center justify-center py-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-green-400 font-medium">تم الاشتراك بنجاح!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex">
                    <input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-r-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-sm"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-l-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* الهاشتاجات */}
        <div className="border-t border-white/10 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h4 className="text-lg font-bold mb-4 text-white">تابعنا على وسائل التواصل</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {companyInfo.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* الحقوق والروابط القانونية */}
        <div className="border-t border-white/10 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-center md:text-right order-2 md:order-1">
                <p className="text-sm text-gray-400 mb-2">
                  © {currentYear} {companyInfo.companyNameAr}. جميع الحقوق محفوظة.
                </p>
                <p className="text-sm text-white">
                  تم التصميم بكل <Heart className="h-4 w-4 inline text-red-400" />
                  <a
                    href="https://www.skywaveads.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-300 transition-colors duration-300 mx-1"
                  >
                    Sky Wave
                  </a>
                  +201067894321
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm order-1 md:order-2">
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4 space-x-reverse order-3">
                <div className="flex items-center space-x-2 space-x-reverse text-gray-400">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm">دفع آمن</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-gray-400">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">SSL محمي</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* زر العودة للأعلى */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 md:bottom-8 left-4 md:left-8 p-2.5 md:p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="العودة للأعلى"
      >
        <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </footer>
  );
};

export default Footer;