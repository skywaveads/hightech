'use client';

import React, { useState, useEffect } from 'react';
import './product-page.css';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Check, 
  Truck, 
  Shield, 
  RotateCcw, 
  Award,
  Zap,
  Target,
  Eye,
  ArrowLeft,
  ArrowRight,
  Package,
  Clock,
  Phone,
  MessageCircle,
  Info,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import dynamic from 'next/dynamic';

// Dynamically import components
const ProductComments = dynamic(
  () => import('@/components/products/ProductComments'),
  { ssr: false }
);

interface ProductPageProps {
  params: { productId: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('specifications');
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  
  const { addItem, openCart } = useCart();

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        // First try to get all products and find by slug
        const allProductsResponse = await fetch('/api/products');
        if (allProductsResponse.ok) {
          const allProducts = await allProductsResponse.json();
          const productData = allProducts.find((p: Product) =>
            p.slug === params.productId && p.isActive
          );
          
          if (productData) {
            setProduct(productData);
            
            // Load related products
            const related = allProducts
              .filter((p: Product) =>
                p.isActive &&
                p.category === productData.category &&
                p._id !== productData._id
              )
              .slice(0, 4);
            setRelatedProducts(related);

            // Load random products (excluding current product)
            const availableProducts = allProducts.filter((p: Product) =>
              p.isActive && p._id !== productData._id
            );
            
            // Shuffle and get 3 random products
            const shuffled = availableProducts.sort(() => 0.5 - Math.random());
            const randomSelection = shuffled.slice(0, 3);
            setRandomProducts(randomSelection);
          } else {
            notFound();
          }
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error loading product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المنتج...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const handleAddToCart = async () => {
    if (product.quantity <= 0 || isAdding || justAdded) return;
    
    setIsAdding(true);
    
    try {
      addItem(product, quantity);
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const discount = product.sale_price ? 
    Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <ol className="flex items-center text-sm space-x-2 space-x-reverse">
            <li>
              <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                الرئيسية
              </Link>
            </li>
            <li className="text-gray-400">
              <ChevronLeft className="h-4 w-4" />
            </li>
            <li>
              <Link href="/products" className="text-gray-500 hover:text-blue-600 transition-colors">
                المنتجات
              </Link>
            </li>
            <li className="text-gray-400">
              <ChevronLeft className="h-4 w-4" />
            </li>
            <li>
              <span className="text-blue-600 font-medium">
                {product.name_ar}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Images */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-6 left-6 z-20">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    خصم {discount}%
                  </div>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-6 right-6 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Heart className={`h-5 w-5 transition-colors ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600 group-hover:text-red-500'}`} />
              </button>

              {/* Main Image */}
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden bg-white shadow-inner">
                {product.images.length > 0 ? (
                  <>
                    <Image
                      src={product.images[currentImageIndex]?.url || '/images/placeholder.jpg'}
                      alt={product.images[currentImageIndex]?.alt || product.name_ar}
                      fill
                      className="object-contain p-6 transition-transform duration-500 hover:scale-105"
                      priority
                    />
                    
                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                          <ArrowLeft className="h-5 w-5 text-gray-700 group-hover:text-blue-600" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                          <ArrowRight className="h-5 w-5 text-gray-700 group-hover:text-blue-600" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <Package className="h-16 w-16 mb-4" />
                    <p>لا توجد صورة</p>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex mt-6 space-x-3 space-x-reverse overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'border-blue-500 shadow-lg scale-105' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Full Product Description - Added under images in the left column */}
              <div className="bg-white p-8 lg:p-12 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="h-6 w-6 text-blue-600" />
                  وصف المنتج التفصيلي
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12">
              {/* Product Title & Rating */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name_ar}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 mr-2">(4.8)</span>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <Share2 className="h-4 w-4" />
                    مشاركة
                  </button>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.short_desc}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {(product.sale_price || product.price).toLocaleString()} ج.م
                  </span>
                  {product.sale_price && (
                    <span className="text-xl text-gray-500 line-through">
                      {product.price.toLocaleString()} ج.م
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <p className="text-green-600 font-medium">
                    وفر {(product.price - product.sale_price!).toLocaleString()} ج.م
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.quantity > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">متوفر في المخزن ({product.quantity} قطعة)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">غير متوفر حالياً</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              {product.quantity > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    الكمية
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 font-medium min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      الحد الأقصى: {product.quantity}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mb-8 space-y-4">
                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.quantity <= 0 || isAdding || justAdded}
                  className={`w-full py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-500 flex items-center justify-center gap-4 relative overflow-hidden group ${
                    product.quantity <= 0
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : justAdded
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl scale-105'
                      : 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-red-600 text-white shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 hover:-translate-y-1'
                  } disabled:transform-none disabled:shadow-none`}
                >
                  {/* Animated Background */}
                  {product.quantity > 0 && !justAdded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  )}
                  
                  {/* Sparkle Effects */}
                  {product.quantity > 0 && !justAdded && (
                    <>
                      <Sparkles className="absolute top-2 left-4 h-4 w-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                      <Sparkles className="absolute bottom-2 right-6 h-3 w-3 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
                    </>
                  )}
                  
                  <div className="relative z-10 flex items-center gap-4">
                    {isAdding ? (
                      <>
                        <div className="animate-spin rounded-full h-7 w-7 border-b-3 border-white"></div>
                        <span className="text-xl">جاري الإضافة...</span>
                      </>
                    ) : justAdded ? (
                      <>
                        <Check className="h-7 w-7 animate-bounce" />
                        <span className="text-xl">تم إضافة المنتج بنجاح!</span>
                      </>
                    ) : product.quantity <= 0 ? (
                      <>
                        <AlertCircle className="h-7 w-7" />
                        <span className="text-xl">غير متوفر حالياً</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-7 w-7 group-hover:animate-bounce" />
                        <span className="text-xl">أضف إلى السلة - {((product.sale_price || product.price) * quantity).toLocaleString()} ج.م</span>
                      </>
                    )}
                  </div>
                </button>

                {/* Secondary Action Buttons */}
                <div className="grid grid-cols-1 gap-4"> {/* Changed to grid-cols-1 */}
                  {/* WhatsApp Inquiry Button */}
                  <button
                    onClick={() => {
                      const message = `مرحباً، أريد الاستفسار عن ${product.name_ar} - ${product.sku}`;
                      const whatsappUrl = `https://wa.me/201234567890?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <MessageCircle className="h-6 w-6" />
                    استفسار
                  </button>
                </div>

                {/* Additional Action Buttons - Removed as per request */}
              </div>

              {/* Enhanced Features */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  مميزات الخدمة
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="group p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Truck className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-blue-900">شحن مجاني</p>
                        <p className="text-sm text-blue-700">للطلبات أكثر من 500 ج.م</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-green-900">ضمان سنة كاملة</p>
                        <p className="text-sm text-green-700">ضمان شامل ضد عيوب التصنيع</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-orange-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <RotateCcw className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-orange-900">استبدال مجاني</p>
                        <p className="text-sm text-orange-700">خلال 14 يوم من الاستلام</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-purple-900">دعم فني 24/7</p>
                        <p className="text-sm text-purple-700">خدمة عملاء متاحة دائماً</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-5 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-indigo-900">تغليف آمن</p>
                        <p className="text-sm text-indigo-700">حماية كاملة أثناء الشحن</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-teal-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-teal-900">جودة معتمدة</p>
                        <p className="text-sm text-teal-700">منتجات أصلية 100%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Contact & Support */}
              <div className="border-t border-gray-200 pt-8">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    تحتاج مساعدة؟ نحن هنا لخدمتك
                  </h3>
                  <p className="text-gray-600">فريق الدعم الفني متاح 24/7 للإجابة على استفساراتك</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Support */}
                  <button
                    onClick={() => window.open('tel:+201234567890', '_self')}
                    className="group p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-900">اتصل بنا الآن</p>
                        <p className="text-sm text-blue-700">+20 123 456 7890</p>
                        <p className="text-xs text-blue-600">متاح 24/7</p>
                      </div>
                    </div>
                  </button>

                  {/* WhatsApp Support */}
                  <button
                    onClick={() => {
                      const message = `مرحباً، أحتاج مساعدة بخصوص ${product.name_ar}`;
                      window.open(`https://wa.me/201234567890?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="group p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl hover:from-green-100 hover:to-green-200 hover:border-green-300 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-900">واتساب</p>
                        <p className="text-sm text-green-700">رد فوري</p>
                        <p className="text-xs text-green-600">الأسرع في الرد</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Additional Quick Actions - Removed as per request */}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'specifications', label: 'المواصفات', icon: Award },
                { id: 'reviews', label: 'التقييمات', icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">المواصفات التقنية</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">الفئة</span>
                      <span className="text-gray-900">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">رقم المنتج</span>
                      <span className="text-gray-900">{product.sku}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">الوزن</span>
                      <span className="text-gray-900">5 كيلو</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">الأبعاد</span>
                      <span className="text-gray-900">50 × 30 × 20 سم</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <ProductComments 
                  productId={product.slug || product._id.toString()} 
                  productName={product.name_ar} 
                />
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Related Products */}

        {/* Explore More Products Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <Sparkles className="h-8 w-8 text-purple-600" />
                استكشف منتجات أخرى
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                اكتشف مجموعة واسعة من المنتجات عالية الجودة التي تلبي احتياجاتك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Category Cards */}
              <Link
                href="/products?category=cutters"
                className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    أجهزة القطع
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    مجموعة متنوعة من أجهزة القطع المتطورة لجميع احتياجاتك
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    <span>استكشف الآن</span>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </div>
                </div>
              </Link>

              <Link
                href="/products?category=vinyl"
                className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    الفينيل والخامات
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    خامات عالية الجودة للحصول على أفضل النتائج في مشاريعك
                  </p>
                  <div className="mt-4 flex items-center text-green-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    <span>استكشف الآن</span>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </div>
                </div>
              </Link>

              <Link
                href="/products?category=accessories"
                className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    الإكسسوارات
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    إكسسوارات وقطع غيار لتحسين أداء أجهزتك
                  </p>
                  <div className="mt-4 flex items-center text-orange-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    <span>استكشف الآن</span>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Random Products Gallery */}
            {randomProducts.length > 0 && (
              <div className="mt-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Target className="h-6 w-6 text-blue-600" />
                    منتجات مختارة لك
                  </h3>
                  <p className="text-gray-600">مجموعة مختارة من أفضل منتجاتنا</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {randomProducts.map((randomProduct) => {
                    const randomDiscount = randomProduct.sale_price ?
                      Math.round(((randomProduct.price - randomProduct.sale_price) / randomProduct.price) * 100) : 0;
                    const randomFinalPrice = randomProduct.sale_price || randomProduct.price;
                    
                    return (
                      <div
                        key={randomProduct._id}
                        className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1"
                      >
                        {/* Discount Badge */}
                        {randomDiscount > 0 && (
                          <div className="absolute top-3 left-3 z-10">
                            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                              -{randomDiscount}%
                            </div>
                          </div>
                        )}

                        {/* Quick Action Buttons */}
                        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                          </button>
                        </div>

                        <Link href={`/products/${randomProduct.slug}`} className="block">
                          {/* Product Image */}
                          <div className="aspect-square bg-gray-50 p-4 overflow-hidden">
                            {randomProduct.images.length > 0 && randomProduct.images[0] ? (
                              <Image
                                src={randomProduct.images[0].url}
                                alt={randomProduct.images[0].alt}
                                width={200}
                                height={200}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Package className="h-12 w-12" />
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="p-4">
                            {/* Category */}
                            <div className="mb-2">
                              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                {randomProduct.category}
                              </span>
                            </div>

                            {/* Title */}
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                              {randomProduct.name_ar}
                            </h4>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                              {randomProduct.short_desc}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                              <span className="text-xs text-gray-500">(4.0)</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg font-bold text-blue-600">
                                {randomFinalPrice.toLocaleString()} ج.م
                              </span>
                              {randomProduct.sale_price && (
                                <span className="text-sm text-gray-500 line-through">
                                  {randomProduct.price.toLocaleString()} ج.م
                                </span>
                              )}
                            </div>

                            {/* Add to Cart Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addItem(randomProduct, 1);
                                openCart();
                              }}
                              disabled={randomProduct.quantity <= 0}
                              className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                                randomProduct.quantity <= 0
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                              }`}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              أضف للسلة
                            </button>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>عرض جميع المنتجات</span>
                <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}