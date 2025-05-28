"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  User, 
  Heart,
  ChevronDown,
  Menu,
  X,
  ShoppingBag,
  Truck,
  Shield,
  Award,
  Clock
} from 'lucide-react';
import { companyInfo } from '@/data/company';
import CartIcon from '@/components/cart/CartIcon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter(); // Moved router up
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to handle navigation and close mobile menu
  const handleMobileNav = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  // تتبع التمرير لتغيير شكل الهيدر
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // قراءة البحث من URL وتحديث الـ state
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl && pathname === '/products') {
      setSearchQuery(decodeURIComponent(searchFromUrl));
    } else if (pathname !== '/products') {
      setSearchQuery('');
    }
  }, [searchParams, pathname]);

  // إغلاق القائمة عند تغيير الصفحة
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProductsDropdownOpen(false);
  }, [pathname]);

  const isActivePage = (path: string) => {
    return pathname === path;
  };

  const productCategories = [
    { name: 'كتر بلوتر', href: '/products?category=cutters', icon: '🖨️' },
    { name: 'مكابس حرارية', href: '/products?category=heat-press', icon: '🔥' },
    { name: 'فينيل حراري', href: '/products?category=vinyl', icon: '🎨' },
    { name: 'ملحقات وقطع غيار', href: '/products?category=accessories', icon: '🔧' },
  ];

  // وظيفة البحث
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchUrl = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      
      // إذا كنا بالفعل في صفحة المنتجات، نحدث URL فقط
      if (pathname === '/products') {
        router.replace(searchUrl);
      } else {
        // إذا لم نكن في صفحة المنتجات، ننتقل إليها
        router.push(searchUrl);
      }
      
      setIsMenuOpen(false);
    }
  };

  // البحث عند الضغط على Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <>
      {/* الهيدر الرئيسي */}
      <header className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white shadow-lg">
        {/* خلفية متحركة مثل الفوتر */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          {/* الصف الأول - اللوجو والبحث والأيقونات */}
          <div className="flex justify-between items-center py-4">
            {/* اللوجو */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image 
                  src="/images/logo.png" 
                  alt={companyInfo.companyNameAr} 
                  width={220} 
                  height={50} 
                  className="w-auto h-12 transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
              </div>
            </Link>

            {/* شريط البحث - مخفي في الموبايل */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="ابحث عن المنتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 border-2 border-white/20 rounded-full focus:border-yellow-400 focus:outline-none transition-colors duration-300 bg-white/10 focus:bg-white/20 text-white placeholder-gray-300"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* الأيقونات والأزرار */}
            <div className="flex items-center space-x-4 space-x-reverse">

              {/* أيقونة السلة */}
              <CartIcon />

              {/* زر القائمة للموبايل */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* الصف الثاني - القائمة الرئيسية */}
          <nav className="hidden lg:flex items-center justify-between py-3 border-t border-white/20">
            <div className="flex items-center space-x-8 space-x-reverse">
              <Link
                href="/"
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  isActivePage('/')
                    ? 'text-yellow-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                الرئيسية
                {isActivePage('/') && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                )}
              </Link>

              <Link
                href="/about"
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  isActivePage('/about')
                    ? 'text-yellow-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                عن الشركة
                {isActivePage('/about') && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                )}
              </Link>

              {/* قائمة المنتجات المنسدلة */}
              <div 
                className="relative"
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                <button
                  className={`flex items-center space-x-1 space-x-reverse px-4 py-2 font-medium transition-all duration-300 ${
                    pathname.startsWith('/products')
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>المنتجات</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {pathname.startsWith('/products') && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                )}

                {/* القائمة المنسدلة */}
                <div className={`absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 z-[9999] ${
                  isProductsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-3">
                      {productCategories.map((category, index) => (
                        <Link
                          key={index}
                          href={category.href}
                          className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 group"
                        >
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                            {category.icon}
                          </span>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                            {category.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href="/products"
                        className="flex items-center justify-center space-x-2 space-x-reverse w-full py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>عرض جميع المنتجات</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/industries"
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  isActivePage('/industries')
                    ? 'text-yellow-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                الصناعات
                {isActivePage('/industries') && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                )}
              </Link>

              <Link
                href="/blog"
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  isActivePage('/blog')
                    ? 'text-yellow-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                المدونة
                {isActivePage('/blog') && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
                )}
              </Link>

            </div>

            {/* معلومات إضافية وزر الاتصال */}
            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="flex items-center space-x-4 space-x-reverse text-sm text-white">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span>جودة معتمدة</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span>خدمة 24/7</span>
                </div>
              </div>
              
              <Link
                href="/contact"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-medium px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                اتصل بنا
              </Link>
            </div>
          </nav>
        </div>

        {/* القائمة المنسدلة للموبايل */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden relative z-50 ${
          isMenuOpen ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <div className="border-t border-white/20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            {/* شريط البحث للموبايل */}
            <div className="p-4 border-b border-white/20">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن المنتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 border border-white/20 rounded-full focus:border-yellow-400 focus:outline-none bg-white/10 text-white placeholder-gray-300"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 transition-colors duration-300"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* روابط القائمة */}
            <nav className="p-4 space-y-2">
              <Link
                href="/"
                onClick={(e) => { e.preventDefault(); handleMobileNav('/'); }}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  isActivePage('/')
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                الرئيسية
              </Link>
              
              <Link
                href="/about"
                onClick={(e) => { e.preventDefault(); handleMobileNav('/about'); }}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  isActivePage('/about')
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                عن الشركة
              </Link>
              
              <Link
                href="/products"
                onClick={(e) => { e.preventDefault(); handleMobileNav('/products'); }}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  pathname.startsWith('/products')
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                المنتجات
              </Link>
              
              <Link
                href="/industries"
                onClick={(e) => { e.preventDefault(); handleMobileNav('/industries'); }}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  isActivePage('/industries')
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                الصناعات
              </Link>
              
              <Link
                href="/blog"
                onClick={(e) => { e.preventDefault(); handleMobileNav('/blog'); }}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  isActivePage('/blog')
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                المدونة
              </Link>
              
              <Link
                href="/contact"
                onClick={(e) => { e.preventDefault(); handleMobileNav('/contact'); }}
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-4 py-3 rounded-lg mt-4"
              >
                اتصل بنا
              </Link>
            </nav>

            {/* معلومات الاتصال للموبايل */}
            <div className="p-4 border-t border-white/20">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 space-x-reverse text-white">
                  <Phone className="h-4 w-4" />
                  <span>{companyInfo.primaryPhone}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-white">
                  <Mail className="h-4 w-4" />
                  <span>{companyInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;