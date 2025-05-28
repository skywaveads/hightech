'use client';

import { usePathname } from 'next/navigation';
import HeaderWrapper from "@/components/layout/HeaderWrapper";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import CartSidebar from '@/components/cart/CartSidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // صفحات الإدارة التي لا تحتاج navbar و footer
  const adminPages = ['/admin-login', '/products-admin', '/comments-admin', '/orders-admin'];
  const isAdminPage = adminPages.includes(pathname);

  return (
    <AuthProvider>
      <CartProvider>
        {!isAdminPage && <HeaderWrapper />}
        <main className="min-h-screen">{children}</main>
        {!isAdminPage && <Footer />}
        {!isAdminPage && <FloatingWhatsApp />}
        {!isAdminPage && <CartSidebar />}
      </CartProvider>
    </AuthProvider>
  );
}
