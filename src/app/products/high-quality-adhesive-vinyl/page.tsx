'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
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
  ArrowLeft,
  ArrowRight,
  Package,
  Phone,
  MessageCircle,
  Info,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Settings,
  Monitor,
  Cpu,
  Palette,
  Sun,
  Droplets,
  Scissors
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import dynamic from 'next/dynamic';

// Dynamically import components
const ProductComments = dynamic(
  () => import('@/components/products/ProductComments'),
  { ssr: false }
);

export default function HighQualityAdhesiveVinylPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  
  const { addItem, openCart } = useCart();

  // Product data
  const product = {
    _id: 'high-quality-adhesive-vinyl',
    name_ar: 'فينيل لاصق عالي الجودة',
    name_en: 'High Quality Adhesive Vinyl',
    slug: 'high-quality-adhesive-vinyl',
    short_desc: 'فينيل لاصق عالي الجودة متوفر بألوان متعددة ومقاوم للعوامل الجوية',
    description: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">فينيل لاصق عالي الجودة مصنوع من مواد متينة ومقاومة للعوامل الجوية. متوفر بألوان متعددة ومناسب لجميع أنواع التطبيقات من اللافتات إلى الديكور والإعلانات.</p>
        
        <h3 class="text-xl font-bold text-gray-900 border-r-4 border-blue-600 pr-3">المميزات الرئيسية:</h3>
        <ul class="space-y-2">
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>مقاوم للماء والشمس والحرارة</li>
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>ألوان زاهية وثابتة لا تبهت</li>
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>سهل التطبيق والإزالة</li>
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>متوفر بعروض مختلفة (30، 50، 100 سم)</li>
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>لاصق قوي ومتين</li>
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>مناسب للاستخدام الداخلي والخارجي</li>
        </ul>

        <h3 class="text-xl font-bold text-gray-900 border-r-4 border-green-600 pr-3">الألوان المتوفرة:</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
            <div class="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow"></div>
            <span class="text-sm font-medium">أحمر</span>
          </div>
          <div class="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow"></div>
            <span class="text-sm font-medium">أزرق</span>
          </div>
          <div class="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <div class="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow"></div>
            <span class="text-sm font-medium">أخضر</span>
          </div>
          <div class="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div class="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow"></div>
            <span class="text-sm font-medium">أصفر</span>
          </div>
          <div class="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div class="w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow"></div>
            <span class="text-sm font-medium">بنفسجي</span>
          </div>
          <div class="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div class="w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow"></div>
            <span class="text-sm font-medium">برتقالي</span>
          </div>
          <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div class="w-6 h-6 bg-black rounded-full border-2 border-white shadow"></div>
            <span class="text-sm font-medium">أسود</span>
          </div>
          <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div class="w-6 h-6 bg-white rounded-full border-2 border-gray-300 shadow"></div>
            <span class="text-sm font-medium">أبيض</span>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-900 border-r-4 border-purple-600 pr-3">التطبيقات:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Palette class="h-5 w-5 text-blue-600" />
              اللافتات والإعلانات
            </h4>
            <p class="text-sm text-gray-600">إنتاج لافتات ملونة وإعلانات جذابة</p>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Scissors class="h-5 w-5 text-green-600" />
              الاستيكرات المخصصة
            </h4>
            <p class="text-sm text-gray-600">قطع استيكرات مخصصة للسيارات والأجهزة</p>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Monitor class="h-5 w-5 text-purple-600" />
              الديكور الداخلي
            </h4>
            <p class="text-sm text-gray-600">تزيين الجدران والأثاث والديكور</p>
          </div>
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sun class="h-5 w-5 text-orange-600" />
              الاستخدام الخارجي
            </h4>
            <p class="text-sm text-gray-600">مقاوم للعوامل الجوية والأشعة فوق البنفسجية</p>
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Award class="h-5 w-5 text-green-600" />
            جودة مضمونة
          </h3>
          <p class="text-gray-700">فينيل عالي الجودة مستورد من أفضل المصانع العالمية، مع ضمان على الجودة واللون لمدة 5 سنوات للاستخدام الخارجي.</p>
        </div>
      </div>
    `,
    price: 150,
    sale_price: 120,
    quantity: 100,
    category: 'فينيل',
    tags: ['فينيل', 'لاصق', 'ألوان', 'مقاوم', 'جودة عالية'],
    sku: 'VIN-ADH-HQ',
    images: [
      {
        url: '/uploads/ef6e5c38-3b7b-48ed-8d29-52257b571034.jpg',
        alt: 'فينيل لاصق عالي الجودة - ألوان متعددة'
      },
      {
        url: '/uploads/c1d746b9-e03c-4307-b03a-efeceb819e61.jpg',
        alt: 'فينيل لاصق عالي الجودة - التطبيق'
      },
      {
        url: '/uploads/c9979185-bbb7-4aa9-a6bd-0238eee57158.jpg',
        alt: 'فينيل لاصق عالي الجودة - النتائج'
      }
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const specifications = [
    { label: 'نوع المادة', value: 'PVC عالي الجودة' },
    { label: 'سماكة الفينيل', value: '0.1 ملم' },
    { label: 'نوع اللاصق', value: 'أكريليك دائم' },
    { label: 'مقاومة الحرارة', value: 'حتى 80 درجة مئوية' },
    { label: 'مقاومة الأشعة', value: 'UV مقاوم' },
    { label: 'العرض المتوفر', value: '30، 50، 100 سم' },
    { label: 'طول الرول', value: '50 متر' },
    { label: 'اللمعة', value: 'لامع / مطفي' },
    { label: 'مدة الضمان', value: '5 سنوات خارجي' },
    { label: 'درجة حرارة التطبيق', value: '10-40 درجة مئوية' }
  ];

  const relatedProducts = [
    {
      _id: 'professional-cutter-plotter-60cm',
      name_ar: 'كتر بلوتر احترافي 60 سم',
      slug: 'professional-cutter-plotter-60cm',
      short_desc: 'كتر بلوتر احترافي مثالي لقطع الفينيل',
      price: 15000,
      sale_price: 12000,
      images: [{ url: '/uploads/c1d746b9-e03c-4307-b03a-efeceb819e61.jpg', alt: 'كتر بلوتر 60 سم' }]
    },
    {
      _id: 'heat-transfer-paper-a4',
      name_ar: 'ورق نقل حراري A4',
      slug: 'heat-transfer-paper-a4',
      short_desc: 'ورق نقل حراري عالي الجودة للطباعة',
      price: 25,
      sale_price: 20,
      images: [{ url: '/uploads/f86567df-7c61-4a39-8fbc-37063b9a8a0a.jpg', alt: 'ورق نقل حراري' }]
    }
  ];

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
              <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
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

              {/* Quality Badge */}
              <div className="absolute top-6 left-6 z-20" style={{ marginTop: discount > 0 ? '50px' : '0' }}>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  جودة عالية
                </div>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-6 right-6 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Heart className={`h-5 w-5 transition-colors ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600 group-hover:text-red-500'}`} />
              </button>

              {/* Main Image */}
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden bg-white shadow-inner">
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
                    <span className="text-sm text-gray-600 mr-2">(4.7)</span>
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
                  <span className="text-sm text-gray-500">/ متر</span>
                </div>
                {discount > 0 && (
                  <p className="text-green-600 font-medium">
                    وفر {(product.price - product.sale_price!).toLocaleString()} ج.م لكل متر
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.quantity > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">متوفر في المخزن ({product.quantity} متر)</span>
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
                    الكمية (بالمتر)
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
                      الحد الأقصى: {product.quantity} متر
                    </span>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.quantity <= 0 || isAdding || justAdded}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    product.quantity <= 0
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : justAdded
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                  } disabled:transform-none disabled:shadow-none`}
                >
                  {isAdding ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      جاري الإضافة...
                    </>
                  ) : justAdded ? (
                    <>
                      <Check className="h-6 w-6" />
                      تم إضافة المنتج!
                    </>
                  ) : product.quantity <= 0 ? (
                    <>
                      <AlertCircle className="h-6 w-6" />
                      غير متوفر
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-6 w-6" />
                      أضف إلى السلة
                    </>
                  )}
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Droplets className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">مقاوم للماء</p>
                    <p className="text-sm text-gray-600">حماية كاملة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Sun className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">مقاوم للشمس</p>
                    <p className="text-sm text-gray-600">UV مقاوم</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">ضمان 5 سنوات</p>
                    <p className="text-sm text-gray-600">جودة مضمونة</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-3">هل تحتاج كميات كبيرة؟</p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                    <Phone className="h-4 w-4" />
                    اتصل بنا
                  </button>
                  <button className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    واتساب
                  </button>
                </div>
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
                { id: 'description', label: 'وصف المنتج', icon: Info },
                { id: 'specifications', label: 'المواصفات', icon: Settings },
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
            {activeTab === 'description' && (
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-blue-600" />
                    المواصفات التقنية
                  </h3>
                  <div className="space-y-3">
                    {specifications.slice(0, 5).map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{spec.label}</span>
                        <span className="text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-green-600" />
                    المواصفات الإضافية
                  </h3>
                  <div className="space-y-3">
                    {specifications.slice(5).map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{spec.label}</span>
                        <span className="text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <ProductComments 
                  productId={product.slug} 
                  productName={product.name_ar} 
                />
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-600" />
                منتجات ذات صلة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <Link
                    key={relatedProduct._id}
                    href={`/products/${relatedProduct.slug}`}
                    className="group block bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="aspect-square bg-white rounded-lg mb-4 overflow-hidden shadow-inner">
                      {relatedProduct.images.length > 0 && relatedProduct.images[0] ? (
                        <Image
                          src={relatedProduct.images[0].url}
                          alt={relatedProduct.images[0].alt}
                          width={200}
                          height={200}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package className="h-12 w-12" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                      {relatedProduct.name_ar}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedProduct.short_desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-blue-600">
                          {(relatedProduct.sale_price || relatedProduct.price).toLocaleString()} ج.م
                        </p>
                        {relatedProduct.sale_price && (
                          <span className="text-sm text-gray-500 line-through">
                            {relatedProduct.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}