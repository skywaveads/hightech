'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Check,
  ShoppingCart,
  Plus,
  Heart,
  Eye,
  Star,
  Package,
  Zap,
  Shield,
  Share2,
  Bookmark,
  TrendingUp,
  Award,
  Sparkles,
  Truck
} from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, openCart } = useCart();

  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : null;
  const finalPrice = product.sale_price || product.price;
  const savings = product.sale_price ? product.price - product.sale_price : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.quantity <= 0 || isAdding || justAdded) return;
    
    setIsAdding(true);
    
    try {
      addItem(product, 1);
      setJustAdded(true);
      
      setTimeout(() => {
        openCart();
      }, 1000);
      
      setTimeout(() => {
        setJustAdded(false);
      }, 3000);
      
    } catch (error) {
      console.error('خطأ في إضافة المنتج إلى السلة:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // يمكن إضافة modal للعرض السريع هنا
  };


  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col min-h-[600px] transform hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
      
      {/* Product image - Full width and taller */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0]?.url || '/images/placeholder.jpg'}
            alt={product.name_ar}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            loading="lazy"
            priority={false}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rw="
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder.jpg';
            }}
          />
        </Link>
        
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
          <div className="flex flex-col gap-2">
            {discount && discount > 0 && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold py-2 px-3 rounded-full shadow-lg animate-pulse backdrop-blur-sm">
                <Sparkles className="inline h-3 w-3 mr-1" />
                خصم {discount}%
              </div>
            )}
            
            {product.quantity <= 5 && product.quantity > 0 && (
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg backdrop-blur-sm">
                <Zap className="inline h-3 w-3 mr-1" />
                كمية محدودة
              </div>
            )}
            
            {justAdded && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-full shadow-lg animate-bounce backdrop-blur-sm">
                <Check className="inline h-3 w-3 mr-1" />
                تم الإضافة!
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className={`flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                isWishlisted
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            
            <Link
              href={`/products/${product.slug}`}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300 hover:scale-110"
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Floating info on hover - positioned at bottom */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
            <div className="flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-1">
                <Package className="h-3 w-3 text-blue-500" />
                <span className="font-medium">كود: {product.sku}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-green-500" />
                <span>{Math.floor(Math.random() * 500) + 100} مشاهدة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="p-6 flex-1 flex flex-col relative z-10">
        {/* Category and rating */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="text-xs text-gray-500 mr-1 font-medium">(4.0)</span>
          </div>
        </div>

        {/* Product title */}
        <Link href={`/products/${product.slug}`} className="hover:text-blue-600 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
            {product.name_ar}
          </h3>
        </Link>

        {/* Product description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
          {product.short_desc}
        </p>

        {/* Features/Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.tags.slice(0, 4).map((tag, index) => (
            <span key={index} className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Price section */}
        <div className="mt-auto">
          <div className="mb-4">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {finalPrice.toLocaleString()} ج.م
              </span>
              {product.sale_price && (
                <span className="text-lg text-gray-400 line-through">
                  {product.price.toLocaleString()} ج.م
                </span>
              )}
            </div>
            
            {savings > 0 && (
              <div className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                توفر {savings.toLocaleString()} ج.م
              </div>
            )}
          </div>

          {/* Stock status */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm">
              {product.quantity > 0 ? (
                <span className="text-green-600 flex items-center font-medium bg-green-50 px-3 py-2 rounded-lg">
                  <Shield className="h-4 w-4 mr-2" />
                  متوفر ({product.quantity} قطعة)
                </span>
              ) : (
                <span className="text-red-600 flex items-center font-medium bg-red-50 px-3 py-2 rounded-lg">
                  <Package className="h-4 w-4 mr-2" />
                  غير متوفر حالياً
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.quantity <= 0 || isAdding || justAdded}
              className={`w-full rounded-xl py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 transform shadow-lg hover:shadow-xl ${
                product.quantity <= 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : justAdded
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-105'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105'
              } disabled:transform-none disabled:shadow-none`}
            >
              {isAdding ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>جاري الإضافة...</span>
                </>
              ) : justAdded ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>تم الإضافة بنجاح!</span>
                </>
              ) : product.quantity <= 0 ? (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  <span>غير متوفر</span>
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  <span>أضف إلى السلة</span>
                </>
              )}
            </button>

            <Link
              href={`/products/${product.slug}`}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-3 px-6 text-sm font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
            >
              <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>عرض التفاصيل</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}