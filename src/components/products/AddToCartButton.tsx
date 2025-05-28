'use client';

import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, openCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (product.quantity <= 0) return;
    
    setIsAdding(true);
    
    try {
      // إضافة المنتج إلى السلة
      addItem(product, quantity);
      
      // إظهار رسالة نجاح
      setJustAdded(true);
      
      // فتح السلة بعد ثانية واحدة
      setTimeout(() => {
        openCart();
      }, 1000);
      
      // إخفاء رسالة النجاح بعد 3 ثوان
      setTimeout(() => {
        setJustAdded(false);
      }, 3000);
      
    } catch (error) {
      console.error('خطأ في إضافة المنتج إلى السلة:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (product.quantity <= 0) {
    return (
      <div className={`${className}`}>
        <button 
          disabled
          className="w-full bg-gray-400 text-white py-3 px-8 rounded-lg cursor-not-allowed flex items-center justify-center"
        >
          <ShoppingCart className="h-5 w-5 ml-2" />
          غير متوفر
        </button>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* محدد الكمية */}
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            الكمية:
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            
            <input
              type="number"
              id="quantity"
              min="1"
              max={product.quantity}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-16 text-center py-2 border-0 focus:outline-none focus:ring-0"
            />
            
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.quantity}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          متوفر: {product.quantity} قطعة
        </div>
      </div>

      {/* زر إضافة إلى السلة */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || justAdded}
        className={`w-full py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center font-medium ${
          justAdded
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105'
        } disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
      >
        {isAdding ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
            جاري الإضافة...
          </>
        ) : justAdded ? (
          <>
            <Check className="h-5 w-5 ml-2" />
            تم الإضافة بنجاح!
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5 ml-2" />
            إضافة إلى السلة
          </>
        )}
      </button>

      {/* رسالة تأكيد */}
      {justAdded && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm text-center">
            ✅ تم إضافة {quantity} من {product.name_ar} إلى السلة
          </p>
        </div>
      )}
    </div>
  );
}