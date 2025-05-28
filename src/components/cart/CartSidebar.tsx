'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();

  // تنسيق السعر
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // إذا لم تكن السلة مفتوحة، لا تعرض شيئاً
  if (!isOpen) return null;

  return (
    <>
      {/* خلفية شفافة */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* السلة */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* رأس السلة */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                سلة التسوق ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* محتوى السلة */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              // السلة فارغة
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  السلة فارغة
                </h3>
                <p className="text-gray-500 mb-6">
                  لم تقم بإضافة أي منتجات بعد
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  تصفح المنتجات
                </Link>
              </div>
            ) : (
              // عناصر السلة
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 space-x-reverse bg-gray-50 rounded-lg p-3">
                    {/* صورة المنتج */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        {item.product.images && item.product.images.length > 0 && item.product.images[0] ? (
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.images[0].alt || item.product.name_ar}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* تفاصيل المنتج */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name_ar}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {item.product.name_en}
                      </p>
                      
                      {/* السعر */}
                      <div className="flex items-center mt-1">
                        {item.product.sale_price && item.product.sale_price < item.product.price ? (
                          <>
                            <span className="text-sm font-semibold text-red-600">
                              {formatPrice(item.product.sale_price)}
                            </span>
                            <span className="text-xs text-gray-400 line-through mr-2">
                              {formatPrice(item.product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(item.product.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* أزرار التحكم */}
                    <div className="flex flex-col items-center space-y-2">
                      {/* أزرار الكمية */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-3 w-3 text-gray-600" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>

                      {/* زر الحذف */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* زر مسح السلة */}
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full text-red-600 hover:text-red-700 text-sm font-medium py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    مسح جميع العناصر
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ذيل السلة - الإجمالي وأزرار العمل */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              {/* الإجمالي */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">
                  الإجمالي:
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* أزرار العمل */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  إتمام الطلب
                  <ArrowRight className="h-4 w-4 mr-2" />
                </Link>
                
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center block"
                >
                  متابعة التسوق
                </Link>
              </div>

              {/* معلومات إضافية */}
              <div className="mt-3 text-xs text-gray-500 text-center">
                <p>✅ خدمة توصيل موثوقة</p>
                <p>🔒 دفع آمن ومضمون</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}