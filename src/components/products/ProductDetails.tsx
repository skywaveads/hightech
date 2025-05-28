'use client';

import React from 'react';
import { BadgeCheck, Truck, ShieldCheck, Star } from 'lucide-react';
import { Product } from '@/types/product';
import AddToCartButton from './AddToCartButton';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  // تنسيق السعر
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name_ar}</h1>
      <div className="text-sm text-gray-500 mb-4">
        {product.name_en} | SKU: {product.sku}
      </div>
      
      <div className="mb-6">
        <p className="text-gray-700 font-bold">{product.short_desc}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-baseline mb-2">
            <span className="text-3xl font-bold text-green-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-green-200">
              {formatPrice(product.price)}
            </span>
            {product.sale_price && product.sale_price < product.price && (
              <span className="text-lg text-gray-500 line-through mr-3">
                {formatPrice(product.sale_price)}
              </span>
            )}
          </div>
          
          {/* Stock status */}
          <div className="flex items-center">
            {product.quantity > 0 ? (
              <span className="text-green-600 flex items-center text-sm">
                <BadgeCheck className="h-4 w-4 mr-1" />
                متوفر للشحن الفوري ({product.quantity} قطعة)
              </span>
            ) : (
              <span className="text-red-600 text-sm">
                غير متوفر حالياً
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Add to cart section */}
      <div className="border-t border-b border-gray-100 py-6 my-4">
        <AddToCartButton product={product} />
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <div className="bg-primary-50 p-2 rounded-full mr-3">
            <Truck className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">توصيل سريع</h4>
            <p className="text-sm text-gray-500">للطلبات أكثر من 500 جنيه</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-primary-50 p-2 rounded-full mr-3">
            <ShieldCheck className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">ضمان شامل</h4>
            <p className="text-sm text-gray-500">ضمان لمدة سنة كاملة</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-primary-50 p-2 rounded-full mr-3">
            <Star className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">جودة عالية</h4>
            <p className="text-sm text-gray-500">منتجات أصلية معتمدة</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-primary-50 p-2 rounded-full mr-3">
            <BadgeCheck className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">دعم فني</h4>
            <p className="text-sm text-gray-500">دعم فني متخصص 24/7</p>
          </div>
        </div>
      </div>

      {/* Category and Tags */}
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-700">التصنيف: </span>
          <span className="text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        {product.tags && product.tags.length > 0 && (
          <div>
            <span className="text-sm font-medium text-gray-700">العلامات: </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detailed Description */}
      {product.description && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">وصف مفصل للمنتج:</h2>
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700 whitespace-pre-wrap">
            {product.description}
          </div>
        </div>
      )}
    </div>
  );
}