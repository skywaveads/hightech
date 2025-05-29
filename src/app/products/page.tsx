"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Star,
  Zap,
  Target,
  TrendingUp,
  Award,
  Users,
  Clock,
  Shield,
  Heart,
  Globe,
  BarChart3,
  Lightbulb,
  Rocket,
  MessageCircle,
  Building,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Send,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Grid,
  List,
  SlidersHorizontal,
  Package,
  Truck,
  ShoppingCart,
  Eye,
  ArrowUpDown,
  X,
  RefreshCw,
  Flame,
  Crown,
  Verified,
  Gift,
  ThumbsUp,
  Play,
  Pause,
  Volume2,
  Maximize2,
  Share2,
  Download,
  Bookmark,
  Tag,
  Percent,
  DollarSign,
  TrendingDown,
  Layers,
  Settings,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Bluetooth
} from 'lucide-react';
import { Product } from '@/types/product';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CounterAnimation from '@/components/ui/CounterAnimation';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/products/ProductCard';

// Local fallback products for instant loading
const fallbackProducts: Product[] = [
  {
    _id: '1',
    name_ar: 'هاي كت A3',
    name_en: 'High Cut A3',
    slug: 'high-cut-a3-plotter',
    short_desc: 'كتر بلوتر مثالي للمساحات الصغيرة ومحلات الهدايا',
    description: '<p>كتر بلوتر مثالي للمساحات الصغيرة ومحلات الهدايا وطباعة التيشيرتات</p>',
    price: 4500,
    sale_price: 5000,
    quantity: 15,
    category: 'cutters',
    tags: ['كتر بلوتر', 'طابعة', 'A3'],
    sku: 'HCTA3-2025',
    images: [
      {
        url: '/images/products/highcut-a3.jpg',
        alt: 'هاي كت A3'
      }
    ],
    isActive: true,
    createdAt: new Date('2023-12-01').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    _id: '2',
    name_ar: 'هاي كت 720',
    name_en: 'High Cut 720',
    slug: 'high-cut-720-plotter',
    short_desc: 'كتر بلوتر احترافي لمراكز الطباعة المتوسطة',
    description: '<p>كتر بلوتر احترافي لمراكز الطباعة المتوسطة وشركات الإعلان والدعاية</p>',
    price: 12000,
    sale_price: null,
    quantity: 8,
    category: 'cutters',
    tags: ['كتر بلوتر', 'طابعة', '720'],
    sku: 'HCT720-2025',
    images: [
      {
        url: '/images/products/highcut-720.jpg',
        alt: 'هاي كت 720'
      }
    ],
    isActive: true,
    createdAt: new Date('2023-11-15').toISOString(),
    updatedAt: new Date('2024-01-10').toISOString()
  },
  {
    _id: '4',
    name_ar: 'هاي كت A4',
    name_en: 'High Cut A4',
    slug: 'high-cut-a4-plotter',
    short_desc: 'كتر بلوتر مدمج للاستخدام المنزلي',
    description: '<p>كتر بلوتر مدمج للاستخدام المنزلي والمشاريع الصغيرة</p>',
    price: 2500,
    sale_price: null,
    quantity: 22,
    category: 'cutters',
    tags: ['كتر بلوتر', 'طابعة', 'A4'],
    sku: 'HCTA4-2025',
    images: [
      {
        url: '/images/products/highcut-a4.jpg',
        alt: 'هاي كت A4'
      }
    ],
    isActive: true,
    createdAt: new Date('2024-01-05').toISOString(),
    updatedAt: new Date('2024-01-05').toISOString()
  },
  {
    _id: '5',
    name_ar: 'مكبس حراري بريميوم برو',
    name_en: 'Premium Heat Press Pro',
    slug: 'premium-heat-press',
    short_desc: 'مكبس حراري احترافي لطباعة التيشيرتات',
    description: '<p>مكبس حراري احترافي لطباعة التيشيرتات والأقمشة بتقنية السبليميشن</p>',
    price: 8500,
    sale_price: null,
    quantity: 5,
    category: 'heat-press',
    tags: ['مكبس', 'حراري', 'سبليميشن'],
    sku: 'HTHP-2025',
    images: [
      {
        url: '/images/products/heat-press.jpg',
        alt: 'مكبس حراري بريميوم برو'
      }
    ],
    isActive: true,
    createdAt: new Date('2023-09-15').toISOString(),
    updatedAt: new Date('2023-11-20').toISOString()
  },
  {
    _id: '6',
    name_ar: 'فينيل حراري بريميوم',
    name_en: 'Premium Vinyl',
    slug: 'premium-vinyl',
    short_desc: 'فينيل حراري عالي الجودة للطباعة',
    description: '<p>فينيل حراري عالي الجودة للطباعة على الأقمشة والتيشيرتات</p>',
    price: 450,
    sale_price: 550,
    quantity: 150,
    category: 'vinyl',
    tags: ['فينيل', 'حراري', 'طباعة'],
    sku: 'RVNVI-2025',
    images: [
      {
        url: '/images/products/vinyl.jpg',
        alt: 'فينيل حراري بريميوم'
      }
    ],
    isActive: true,
    createdAt: new Date('2023-08-10').toISOString(),
    updatedAt: new Date('2023-10-15').toISOString()
  }
];

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts.filter(p => p.isActive));
  const [loading, setLoading] = useState(false); // Start with false since we have fallback data
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false); // New state for background updates
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // Removed pagination states - show all products on one page
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [featuredProductIndex, setFeaturedProductIndex] = useState(0);
  
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch products from API with progressive loading
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsUpdating(true);
        setError(null);
        
        const response = await fetch('/api/products?isActive=true');
        if (!response.ok) {
          // If API fails, keep using fallback data
          console.warn('API failed, using fallback data');
          return;
        }
        
        const data = await response.json();
        
        // Handle new API response structure
        if (data && data.success && data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
          console.log(`Products loaded from ${data.source}:`, data.products.length);
        } else if (data && Array.isArray(data) && data.length > 0) {
          // Fallback for old API response format (just in case)
          setProducts(data);
          console.log('Products loaded (legacy format):', data.length);
        } else {
          console.warn('No products found in API response, keeping fallback data');
        }
        
      } catch (err) {
        console.error('Error fetching products:', err);
        // Don't set error state, just log it and keep using fallback data
        console.warn('Using fallback data due to API error');
      } finally {
        setIsUpdating(false);
      }
    };

    // Call API immediately for faster updates
    fetchProducts();
  }, []);

  // Auto-play featured products
  useEffect(() => {
    if (isAutoPlay && products.length > 0) {
      const interval = setInterval(() => {
        setFeaturedProductIndex((prev) =>
          prev === products.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isAutoPlay, products.length]);

  // Effect to read search query from URL and update searchTerm state
  useEffect(() => {
    const queryFromUrl = searchParams.get('search');
    if (queryFromUrl) {
      setSearchTerm(decodeURIComponent(queryFromUrl));
    }
    // No 'else' needed here to clear searchTerm,
    // as the search bar on this page can be used independently.
    // Or, if you want it to clear when the URL param is removed:
    // else {
    //   setSearchTerm('');
    // }
  }, [searchParams]); // Re-run when searchParams change

  // Get unique categories and tags
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return cats;
  }, [products]);

  const allTags = useMemo(() => {
    const tags = Array.from(new Set(products.flatMap(p => p.tags)));
    return tags;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.short_desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => product.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesPrice && matchesTags;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.sale_price || a.price) - (b.sale_price || b.price);
        case 'price-high':
          return (b.sale_price || b.price) - (a.sale_price || a.price);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return 0; // Default sorting for popular
        default:
          return a.name_ar.localeCompare(b.name_ar);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, selectedTags, sortBy]);

  // Show all filtered products without pagination
  const displayedProducts = filteredProducts;

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    setTimeout(() => openCart(), 500);
  };

  const handleWhatsApp = (product: Product) => {
    const message = `مرحباً، أريد الاستفسار عن ${product.name_ar} - ${product.sku}`;
    const whatsappUrl = `https://wa.me/201234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 100000 });
    setSelectedTags([]);
    setSortBy('name');
  };

  // Remove the loading screen since we start with fallback data
  // Only show error if we have no products at all
  if (products.length === 0 && error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="text-xl">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* High Cut Cutter Plotter Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/10 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm animate-bounce">
                    <Crown className="inline h-4 w-4 mr-1" />
                    #مع_هاي_كت_مفيش_حدود
                  </div>
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    <Verified className="inline h-4 w-4 mr-1" />
                    جودة احترافية
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  كتر بلوتر
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse">
                    هاي كت
                  </span>
                  <span className="block text-2xl lg:text-3xl text-blue-100 font-medium mt-2">
                    إبداعك ليس له حدود!
                  </span>
                </h1>
                
                <div className="space-y-4 text-lg text-blue-100 leading-relaxed">
                  <p>
                    شاشة تحكم تعمل باللمس (تاتش) سهلة الاستخدام وواضحة الرؤية.
                    مواتير سيرفو Servo Motors احترافية لأعلى درجات الدقة والاستقرار في القص.
                  </p>
                  <p>
                    مواتير ستبر Stepper Motors متطورة تضمن أداءً سلسًا وفعّالًا.
                    سرعة قص تصل إلى 1000 مم/ثانية لإنجاز أعمالك بسرعة قياسية.
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">1000</div>
                  <p className="text-sm text-blue-100">مم/ثانية سرعة القص</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">1000</div>
                  <p className="text-sm text-blue-100">جم قوة الضغط</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">CCD</div>
                  <p className="text-sm text-blue-100">كاميرا مدمجة</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">Touch</div>
                  <p className="text-sm text-blue-100">شاشة لمس</p>
                </div>
              </div>

              {/* Why Choose High Cut */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-yellow-400">✅ لماذا تختار كتر بلوتر هاي كت؟</h3>
                <div className="grid grid-cols-1 gap-2 text-sm text-blue-100">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>دقة عالية وسرعة فائقة، تناسب جميع الأعمال التجارية والصناعية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>هيكل قوي ومتين مصمم ليتحمل ضغط العمل المكثف</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-400" />
                    <span>مثالي لقص جميع أنواع الفينيل والربر والاستيكرات بدقة متناهية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-400" />
                    <span>سهولة الحركة والتحكم، مع شاشة تفاعلية توفر تجربة مستخدم مميزة</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <ShoppingCart className="h-6 w-6" />
                  اطلب الآن
                </button>
                <button
                  onClick={() => window.open('https://wa.me/201050703016?text=أريد الاستفسار عن كتر بلوتر هاي كت', '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2"
                >
                  <MessageCircle className="h-6 w-6" />
                  واتساب
                </button>
              </div>
            </div>

            {/* High Cut Product Showcase with Image Slider */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform hover:scale-105 transition-all duration-500">
                <div className="relative h-96 rounded-2xl overflow-hidden bg-white/20 mb-6">
                  <Image
                    src={`/images/products_hero/${[1, 2, 4, 5][featuredProductIndex] || 1}.jpg`}
                    alt="كتر بلوتر هاي كت - أحدث التقنيات"
                    fill
                    className="object-contain p-6 transition-transform duration-700 hover:scale-110"
                    onError={(e) => {
                      // Fallback to next image if current one fails
                      const target = e.target as HTMLImageElement;
                      const availableImages = [1, 2, 4, 5];
                      const currentIndex = parseInt(target.src.split('/').pop()?.split('.')[0] || '1');
                      const currentPos = availableImages.indexOf(currentIndex);
                      if (currentPos !== -1 && currentPos < availableImages.length - 1) {
                        target.src = `/images/products_hero/${availableImages[currentPos + 1]}.jpg`;
                      } else {
                        target.src = `/images/products_hero/${availableImages[0]}.jpg`;
                      }
                    }}
                  />
                  
                  {/* Product Badge */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    <Flame className="inline h-4 w-4 mr-1" />
                    منتج مميز
                  </div>
                  
                  {/* Tech Highlights */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
                      <div className="flex items-center justify-between">
                        <span>Servo Motors</span>
                        <span>CCD Camera</span>
                        <span>Touch Screen</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    كتر بلوتر هاي كت الاحترافي
                  </h3>
                  <p className="text-blue-100">
                    قوة ضغط تصل إلى 1000 جم لتناسب جميع أنواع المواد والخامات.
                    كاميرا CCD مدمجة لتعزيز دقة تحديد وقص الرسومات.
                  </p>
                  
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-2xl font-bold text-yellow-400">
                      اتصل للسعر
                    </span>
                  </div>
                  
                  <button
                    onClick={() => window.open('https://wa.me/201050703016?text=أريد معرفة سعر كتر بلوتر هاي كت', '_blank')}
                    className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    استفسر عن السعر
                  </button>
                </div>
              </div>
              
              {/* Navigation Dots for Images */}
              <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
                {[1, 2, 4, 5].map((imageNum, index) => (
                  <button
                    key={index}
                    onClick={() => setFeaturedProductIndex(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      index === featuredProductIndex
                        ? 'bg-yellow-400 w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filters and Search Section */}
      <section id="products-section" className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Show update indicator */}
          {isUpdating && (
            <div className="mb-4 text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
                <RefreshCw className="h-4 w-4 animate-spin" />
                جاري تحديث المنتجات...
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن المنتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white shadow-sm"
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="">جميع الفئات</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="name">ترتيب أبجدي</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                  <option value="newest">الأحدث</option>
                  <option value="popular">الأكثر شعبية</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-300'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-300'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <SlidersHorizontal className="h-5 w-5" />
                فلاتر متقدمة
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                مسح الفلاتر
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 p-6 bg-white rounded-xl border border-gray-200 space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      placeholder="من"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <span>إلى</span>
                    <input
                      type="number"
                      placeholder="إلى"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <span>ج.م</span>
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">العلامات</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTags(prev => 
                            prev.includes(tag) 
                              ? prev.filter(t => t !== tag)
                              : [...prev, tag]
                          );
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {displayedProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">لا توجد منتجات</h3>
              <p className="text-gray-500">لم يتم العثور على منتجات تطابق معايير البحث</p>
              <button
                onClick={clearFilters}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                مسح الفلاتر
              </button>
            </div>
          ) : (
            <>
              <div className={`grid gap-8 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {displayedProducts.map((product, index) => (
                  <div key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Show total products count */}
              {displayedProducts.length > 0 && (
                <div className="text-center mt-12">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full">
                    <Package className="h-5 w-5" />
                    <span className="font-medium">
                      عرض جميع المنتجات ({displayedProducts.length} منتج)
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">لماذا تختار منتجاتنا؟</h2>
            <p className="text-xl text-gray-600">نقدم أفضل المنتجات بأعلى معايير الجودة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'ضمان شامل', desc: 'ضمان على جميع المنتجات' },
              { icon: Truck, title: 'شحن سريع', desc: 'توصيل في جميع أنحاء مصر' },
              { icon: Award, title: 'جودة عالية', desc: 'منتجات أصلية ومعتمدة' },
              { icon: Users, title: 'دعم فني', desc: 'فريق دعم متخصص' }
            ].map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            هل تحتاج مساعدة في الاختيار؟
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            فريقنا المتخصص جاهز لمساعدتك في اختيار المنتج المناسب لاحتياجاتك
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/201234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="h-6 w-6" />
              تواصل عبر الواتساب
            </a>
            <a
              href="tel:+201234567890"
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Phone className="h-6 w-6" />
              اتصل بنا الآن
            </a>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
