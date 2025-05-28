'use client';

// الواردات
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// الترويسة الرئيسية للموقع
export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // التحقق مما إذا كان المسار نشطًا
  const isActive = (path: string) => pathname === path;
  
  // قائمة الروابط
  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المنتجات', path: '/products' },
    { name: 'من نحن', path: '/about' },
    { name: 'الأسئلة الشائعة', path: '/faq' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* الشعار */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="هاي تكنولوجي" 
              width={40} 
              height={40} 
              className="ml-2"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold">هاي تكنولوجي</span>
              <span className="text-xs text-gray-500">لأجهزة الطباعة والقص</span>
            </div>
          </Link>

          {/* القائمة في الشاشات الكبيرة */}
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* رابط تسجيل الدخول */}
            <Link
              href="/admin-login"
              className="mr-4 px-3 py-2 text-sm text-gray-800 hover:text-blue-700 flex items-center"
            >
              <span>تسجيل دخول</span>
            </Link>
          </nav>

          {/* زر القائمة على الأجهزة المحمولة */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* قائمة الأجهزة المحمولة */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* رابط تسجيل الدخول للهاتف */}
              <Link
                href="/admin-login"
                className="px-3 py-2 text-sm text-gray-800 hover:text-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                تسجيل دخول
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 