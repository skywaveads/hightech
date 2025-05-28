'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartIcon() {
  const { totalItems, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-white hover:text-yellow-400 transition-colors"
      aria-label="فتح سلة التسوق"
    >
      <ShoppingCart className="h-6 w-6" />
      
      {/* عداد العناصر */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[1.25rem] animate-pulse">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
      
      {/* تأثير النقر */}
      <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 scale-0 transition-all duration-200 hover:opacity-10 hover:scale-110" />
    </button>
  );
}