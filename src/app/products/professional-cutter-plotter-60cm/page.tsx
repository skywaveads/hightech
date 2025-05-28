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
  HardDrive
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import dynamic from 'next/dynamic';

// Dynamically import components
const ProductComments = dynamic(
  () => import('@/components/products/ProductComments'),
  { ssr: false }
);

export default function ProfessionalCutterPlotter60cmPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  
  const { addItem, openCart } = useCart();

  // Product data
  const product = {
    _id: 'professional-cutter-plotter-60cm',
    name_ar: 'كتر بلوتر احترافي 60 سم',
    name_en: 'Professional Cutter Plotter 60cm',
    slug: 'professional-cutter-plotter-60cm',
    short_desc: 'كتر بلوتر احترافي بعرض 60 سم مثالي للمشاريع الصغيرة والمتوسطة',
    description: `
      <div class="space-y-6">
        <p class="text-lg leading-relaxed">كتر بلوتر احترافي عالي الجودة بعرض 60 سم، مصمم خصيصاً للمشاريع الصغيرة والمتوسطة. يتميز بدقة عالية في القطع وسهولة في الاستخدام، مما يجعله الخيار الأمثل للمبتدئين والمحترفين على حد سواء.</p>
        
        <h3 class="text-xl font-bold text-gray-900 border-r-4 border-blue-600 pr-3">المميزات الرئيسية:</h3>
        <ul class="space-y-2">
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>دقة قطع عالية تصل إلى 0.1 ملم</li>
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>سرعة قطع تصل إلى 800 ملم/ثانية</li>
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>سهولة الاستخدام مع واجهة بديهية</li>
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>متوافق مع جميع أنواع الفينيل</li>
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>برنامج تشغيل متقدم مع مكتبة تصميمات</li>
          <li class="flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span>نظام تغذية تلقائي للمواد</li>
        </ul>

        <h3 class="text-xl font-bold text-gray-900 border-r-4 border-green-600 pr-3">التطبيقات:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">صناعة اللافتات</h4>
            <p class="text-sm text-gray-600">إنتاج لافتات احترافية وإعلانات خارجية</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">الاستيكرات</h4>
            <p class="text-sm text-gray-600">قطع استيكرات دقيقة للسيارات والديكور</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">الفينيل الحراري</h4>
            <p class="text-sm text-gray-600">قطع تصميمات للطباعة على الملابس</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">النماذج الأولية</h4>
            <p class="text-sm text-gray-600">إنتاج نماذج أولية للتصميمات</p>
          </div>
        </div>
      </div>
    `,
    price: 15000,
    sale_price: 12000,
    quantity: 10,
    category: 'كتر بلوتر',
    tags: ['كتر بلوتر', 'قطع', 'فينيل', '60 سم', 'احترافي'],
    sku: 'CP-60-PRO',
    images: [
      {
        url: '/uploads/c1d746b9-e03c-4307-b03a-efeceb819e61.jpg',
        alt: 'كتر بلوتر احترافي 60 سم - المنظر الأمامي'
      },
      {
        url: '/uploads/c9979185-bbb7-4aa9-a6bd-0238eee57158.jpg',
        alt: 'كتر بلوتر احترافي 60 سم - المنظر الجانبي'
      },
      {
        url: '/uploads/ef6e5c38-3b7b-48ed-8d29-52257b571034.jpg',
        alt: 'كتر بلوتر احترافي 60 سم - التفاصيل'
      }
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const specifications = [
    { label: 'عرض القطع', value: '60 سم' },
    { label: 'دقة القطع', value: '0.1 ملم' },
    { label: 'سرعة القطع', value: '800 ملم/ثانية' },
    { label: 'قوة القطع', value: '500 جرام' },
    { label: 'سماكة المادة', value: 'حتى 0.8 ملم' },
    { label: 'الاتصال', value: 'USB 2.0' },
    { label: 'البرنامج', value: 'SignMaster مجاني' },
    { label: 'الضمان', value: 'سنة واحدة' },
    { label: 'الوزن', value: '25 كيلو' },
    { label: 'الأبعاد', value: '90 × 50 × 30 سم' }
  ];

  const relatedProducts = [
    {
      _id: 'large-format-cutter-plotter-120cm',
      name_ar: 'كتر بلوتر 120 سم للمشاريع الكبيرة',
      slug: 'large-format-cutter-plotter-120cm',
      short_desc: 'كتر بلوتر بعرض 120 سم مخصص للمشاريع الكبيرة',
      price: 35000,
      images: [{ url: '/uploads/c9979185-bbb7-4aa9-a6bd-0238eee57158.jpg', alt: 'كتر بلوتر 120 سم' }]
    },
    {
      _id: 'high-quality-adhesive-vinyl',
      name_ar: 'فينيل لاصق عالي الجودة',
      slug: 'high-quality-adhesive-vinyl',
      short_desc: 'فينيل لاصق عالي الجودة متوفر بألوان متعددة',
      price: 150,
      sale_price: 120,
      images: [{ url: '/uploads/ef6e5c38-3b7b-48ed-8d29-52257b571034.jpg', alt: 'فينيل لاصق' }]
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
                  <Truck className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">شحن مجاني</p>
                    <p className="text-sm text-gray-600">للطلبات أكثر من 500 ج.م</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">ضمان سنة</p>
                    <p className="text-sm text-gray-600">ضمان شامل</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <RotateCcw className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900">إرجاع مجاني</p>
                    <p className="text-sm text-gray-600">خلال 14 يوم</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-3">هل تحتاج مساعدة؟</p>
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