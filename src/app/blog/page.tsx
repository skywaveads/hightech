"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
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
  BookOpen,
  PenTool,
  Tag,
  User,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Rss,
  TrendingDown
} from 'lucide-react';
import { companyInfo } from '@/data/company';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CounterAnimation from '@/components/ui/CounterAnimation';

interface BlogPost {
  slug: string;
  titleAr: string;
  descriptionAr: string;
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  tagsAr: string[];
  author: {
    nameAr: string;
    image: string;
    bio: string;
  };
  excerpt?: string;
  featured?: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data for demonstration
  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockPosts: BlogPost[] = [
          {
            slug: 'boost-production-speed-with-servo-cutter-plotter',
            titleAr: 'كيف تحسّن سرعة الإنتاج بالكتر بلوتر باستخدام محركات السيرفو',
            descriptionAr: 'تعلم كيفية تحقيق أقصى قدر من الإنتاجية وسرعة القص باستخدام الكتر بلوتر المزود بمحركات السيرفو لإنتاج اللافتات والفينيل الاحترافي في 2025',
            coverImage: '/images/blog/boost_production_speed_with_servo_cutter_plotter.png',
            publishedAt: '2025-05-22',
            readingTime: 14,
            tagsAr: ['محركات سيرفو', 'كتر بلوتر', 'كفاءة الإنتاج', 'قص الفينيل', 'سرعة القص'],
            author: {
              nameAr: 'محمد صالح',
              image: '/images/author/Mohamed_Saleh.png',
              bio: 'خبير في أجهزة كتر بلوتر'
            },
            featured: true
          },
          {
            slug: 'best-speed-and-pressure-settings-for-cutter-plotter',
            titleAr: 'إعدادات السرعة والضغط المثالية لمختلف المواد على الكتر بلوتر في 2025',
            descriptionAr: 'دليل شامل لتحسين إعدادات قاطع الفينيل للحصول على قصّات مثالية على مختلف المواد باستخدام أحدث التقنيات في 2025',
            coverImage: '/images/blog/best_speed_and_pressure_settings_for_cutter_plotter.png',
            publishedAt: '2025-05-08',
            readingTime: 15,
            tagsAr: ['إعدادات الكتر بلوتر', 'قص الفينيل', 'قوة القص', 'إعدادات الشفرة', 'إعدادات المواد'],
            author: {
              nameAr: 'سارة السيد',
              image: '/images/author/Sara_ElSayed.png',
              bio: 'مستشارة تقنية'
            },
            featured: true
          },
          {
            slug: 'advertising-shop-business-guide-egypt',
            titleAr: 'أسرار النجاح في مشروع محل دعاية وإعلان باستخدام كتر بلوتر في مصر',
            descriptionAr: 'دليل شامل لبدء وإدارة مشروع ناجح للدعاية والإعلان واللافتات في مصر باستخدام تقنية كتر بلوتر مع رؤى للسوق المحلي',
            coverImage: '/images/blog/advertising_shop_business_guide_egypt.png',
            publishedAt: '2025-06-25',
            readingTime: 17,
            tagsAr: ['محل دعاية وإعلان', 'مصر', 'كتر بلوتر', 'مشروع لافتات', 'قص الفينيل', 'القاهرة', 'دليل مشاريع'],
            author: {
              nameAr: 'عمر حسان',
              image: '/images/author/Omar_Hassan.png',
              bio: 'خبير في مشاريع الدعاية والإعلان'
            },
            featured: true
          },
          {
            slug: 'what-is-a-cutter-plotter-complete-guide',
            titleAr: 'ما هو جهاز كتر بلوتر؟ دليل شامل للمبتدئين',
            descriptionAr: 'تعرف على كل ما تحتاج لمعرفته حول أجهزة كتر بلوتر، من الأساسيات إلى التطبيقات المتقدمة',
            coverImage: '/images/blog/what_is_a_cutter_plotter_complete_guide.png',
            publishedAt: '2024-12-15',
            readingTime: 8,
            tagsAr: ['كتر بلوتر', 'دليل المبتدئين', 'تعليمي'],
            author: {
              nameAr: 'محمد صالح',
              image: '/images/author/Mohamed_Saleh.png',
              bio: 'خبير في أجهزة كتر بلوتر'
            },
            featured: true
          },
          {
            slug: 'best-cutter-plotter-for-small-businesses-saudi-2025',
            titleAr: 'أفضل أجهزة كتر بلوتر للشركات الصغيرة في السعودية 2025',
            descriptionAr: 'مراجعة شاملة لأفضل أجهزة كتر بلوتر المناسبة للشركات الصغيرة والمتوسطة',
            coverImage: '/images/blog/best_cutter_plotter_for_small_businesses_saudi_2025.png',
            publishedAt: '2024-12-10',
            readingTime: 12,
            tagsAr: ['كتر بلوتر', 'الشركات الصغيرة', 'السعودية'],
            author: {
              nameAr: 'سارة السيد',
              image: '/images/author/Sara_ElSayed.png',
              bio: 'مستشارة تقنية'
            },
            featured: true
          },
          {
            slug: 'start-t-shirt-printing-business-with-htv-and-cutter-plotter',
            titleAr: 'كيفية بدء مشروع طباعة التيشيرتات باستخدام الفينيل الحراري وكتر بلوتر',
            descriptionAr: 'دليل خطوة بخطوة لبدء مشروع مربح في طباعة التيشيرتات',
            coverImage: '/images/blog/start_t_shirt_printing_business_with_htv_and_cutter_plotter.png',
            publishedAt: '2024-12-05',
            readingTime: 15,
            tagsAr: ['طباعة التيشيرتات', 'فينيل حراري', 'مشاريع'],
            author: {
              nameAr: 'عمر حسان',
              image: '/images/author/Omar_Hassan.png',
              bio: 'رائد أعمال'
            },
            featured: true
          },
          {
            slug: 'vinyl-types-comparison-for-cutter-plotter-egypt',
            titleAr: 'مقارنة أنواع الفينيل لأجهزة كتر بلوتر في مصر',
            descriptionAr: 'دليل شامل لأنواع الفينيل المختلفة واستخداماتها',
            coverImage: '/images/blog/vinyl_types_comparison_for_cutter_plotter_egypt.png',
            publishedAt: '2024-11-28',
            readingTime: 10,
            tagsAr: ['فينيل', 'مقارنة', 'مصر'],
            author: {
              nameAr: 'محمد صالح',
              image: '/images/author/Mohamed_Saleh.png',
              bio: 'خبير في أجهزة كتر بلوتر'
            }
          },
          {
            slug: 'cutter-plotter-maintenance-common-mistakes',
            titleAr: 'صيانة كتر بلوتر: الأخطاء الشائعة وكيفية تجنبها',
            descriptionAr: 'تعلم كيفية الحفاظ على جهازك وتجنب الأخطاء المكلفة',
            coverImage: '/images/blog/cutter_plotter_maintenance_common_mistakes.png',
            publishedAt: '2024-11-20',
            readingTime: 7,
            tagsAr: ['صيانة', 'نصائح', 'كتر بلوتر'],
            author: {
              nameAr: 'سارة السيد',
              image: '/images/author/Sara_ElSayed.png',
              bio: 'مستشارة تقنية'
            }
          },
          {
            slug: 'trending-vinyl-designs-2025-cutter-plotter',
            titleAr: 'أحدث تصاميم الفينيل الرائجة 2025 لكتر بلوتر',
            descriptionAr: 'اكتشف أحدث الاتجاهات في تصاميم الفينيل لهذا العام',
            coverImage: '/images/blog/trending_vinyl_designs_2025_cutter_plotter.png',
            publishedAt: '2024-11-15',
            readingTime: 6,
            tagsAr: ['تصاميم', 'اتجاهات', '2025'],
            author: {
              nameAr: 'عمر حسان',
              image: '/images/author/Omar_Hassan.png',
              bio: 'رائد أعمال'
            }
          },
          {
            slug: 't-shirt-printing-business-guide-saudi-arabia',
            titleAr: 'دليل شامل لبدء مشروع طباعة التيشيرتات في السعودية 2025',
            descriptionAr: 'كل ما تحتاج لمعرفته لبدء مشروع ناجح في طباعة التيشيرتات بالمملكة العربية السعودية',
            coverImage: '/images/blog/t_shirt_printing_business_guide_saudi_arabia.png',
            publishedAt: '2024-11-10',
            readingTime: 18,
            tagsAr: ['طباعة التيشيرتات', 'السعودية', 'مشاريع', 'ريادة أعمال'],
            author: {
              nameAr: 'عمر حسان',
              image: '/images/author/Omar_Hassan.png',
              bio: 'رائد أعمال'
            }
          },
          {
            slug: 'vehicle-wrapping-trends-egypt-saudi-2025',
            titleAr: 'اتجاهات تغليف السيارات في مصر والسعودية 2025',
            descriptionAr: 'أحدث الاتجاهات والتقنيات في مجال تغليف السيارات باستخدام كتر بلوتر',
            coverImage: '/images/blog/vehicle_wrapping_trends_egypt_saudi_2025.png',
            publishedAt: '2024-11-05',
            readingTime: 13,
            tagsAr: ['تغليف السيارات', 'مصر', 'السعودية', 'اتجاهات 2025'],
            author: {
              nameAr: 'محمد صالح',
              image: '/images/author/Mohamed_Saleh.png',
              bio: 'خبير في أجهزة كتر بلوتر'
            }
          },
          {
            slug: 'vehicle-wrap-guide-using-cutter-plotter',
            titleAr: 'دليل تغليف السيارات باستخدام كتر بلوتر',
            descriptionAr: 'دليل شامل لتعلم تقنيات تغليف السيارات الاحترافية',
            coverImage: '/images/blog/vehicle_wrap_guide_using_cutter_plotter.png',
            publishedAt: '2024-10-28',
            readingTime: 16,
            tagsAr: ['تغليف السيارات', 'دليل تعليمي', 'كتر بلوتر'],
            author: {
              nameAr: 'سارة السيد',
              image: '/images/author/Sara_ElSayed.png',
              bio: 'مستشارة تقنية'
            }
          },
          {
            slug: 'pricing-strategies-for-vinyl-products',
            titleAr: 'استراتيجيات التسعير لمنتجات الفينيل والقص',
            descriptionAr: 'كيفية تحديد أسعار تنافسية ومربحة لخدمات القص والفينيل',
            coverImage: '/images/blog/pricing_strategies_for_vinyl_products.png',
            publishedAt: '2024-10-20',
            readingTime: 11,
            tagsAr: ['تسعير', 'استراتيجيات', 'فينيل', 'أعمال'],
            author: {
              nameAr: 'عمر حسان',
              image: '/images/author/Omar_Hassan.png',
              bio: 'رائد أعمال'
            }
          },
          {
            slug: 'import-cutter-plotter-equipment-libya',
            titleAr: 'دليل استيراد معدات كتر بلوتر في ليبيا',
            descriptionAr: 'كل ما تحتاج لمعرفته حول استيراد أجهزة كتر بلوتر والمعدات ذات الصلة في ليبيا',
            coverImage: '/images/blog/import_cutter_plotter_equipment_libya.png',
            publishedAt: '2024-10-15',
            readingTime: 14,
            tagsAr: ['استيراد', 'ليبيا', 'كتر بلوتر', 'معدات'],
            author: {
              nameAr: 'محمد صالح',
              image: '/images/author/Mohamed_Saleh.png',
              bio: 'خبير في أجهزة كتر بلوتر'
            }
          },
          {
            slug: 'how-to-cut-professional-stickers-with-a-cutter-plotter',
            titleAr: 'كيفية قطع ملصقات احترافية باستخدام كتر بلوتر',
            descriptionAr: 'تعلم تقنيات قطع الملصقات الاحترافية والحصول على نتائج مثالية',
            coverImage: '/images/blog/how_to_cut_professional_stickers_with_a_cutter_plotter.png',
            publishedAt: '2024-10-08',
            readingTime: 9,
            tagsAr: ['ملصقات', 'قطع احترافي', 'تقنيات', 'كتر بلوتر'],
            author: {
              nameAr: 'سارة السيد',
              image: '/images/author/Sara_ElSayed.png',
              bio: 'مستشارة تقنية'
            }
          },
          {
            slug: 'cutter-plotter-vs-laser-cutter',
            titleAr: 'مقارنة شاملة: كتر بلوتر مقابل قاطع الليزر',
            descriptionAr: 'مقارنة تفصيلية بين تقنيات القطع المختلفة لمساعدتك في اختيار الأنسب',
            coverImage: '/images/blog/cutter_plotter_vs_laser_cutter.png',
            publishedAt: '2024-09-30',
            readingTime: 12,
            tagsAr: ['مقارنة', 'كتر بلوتر', 'قاطع ليزر', 'تقنيات القطع'],
            author: {
              nameAr: 'محمد صالح',
              image: '/images/author/Mohamed_Saleh.png',
              bio: 'خبير في أجهزة كتر بلوتر'
            }
          },
          {
            slug: 'cutter-plotter-in-architectural-models',
            titleAr: 'استخدام كتر بلوتر في صناعة النماذج المعمارية',
            descriptionAr: 'كيفية استخدام تقنية كتر بلوتر في إنتاج نماذج معمارية دقيقة ومفصلة',
            coverImage: '/images/blog/cutter_plotter_in_architectural_models.png',
            publishedAt: '2024-09-22',
            readingTime: 10,
            tagsAr: ['نماذج معمارية', 'هندسة', 'تطبيقات متخصصة', 'كتر بلوتر'],
            author: {
              nameAr: 'سارة السيد',
              image: '/images/author/Sara_ElSayed.png',
              bio: 'مستشارة تقنية'
            }
          },
          {
            slug: 'cutter-plotter-applications-libya',
            titleAr: 'تطبيقات كتر بلوتر في السوق الليبي',
            descriptionAr: 'استكشاف الفرص والتطبيقات المختلفة لأجهزة كتر بلوتر في ليبيا',
            coverImage: '/images/blog/cutter_plotter_applications_libya.png',
            publishedAt: '2024-09-15',
            readingTime: 13,
            tagsAr: ['ليبيا', 'تطبيقات', 'فرص استثمار', 'كتر بلوتر'],
            author: {
              nameAr: 'عمر حسان',
              image: '/images/author/Omar_Hassan.png',
              bio: 'رائد أعمال'
            }
          },
          {
            slug: 'choosing-the-right-htv-for-sportswear',
            titleAr: 'اختيار الفينيل الحراري المناسب للملابس الرياضية',
            descriptionAr: 'دليل شامل لاختيار أفضل أنواع الفينيل الحراري للملابس الرياضية',
            coverImage: '/images/blog/choosing_the_right_htv_for_sportswear.png',
            publishedAt: '2024-09-08',
            readingTime: 8,
            tagsAr: ['فينيل حراري', 'ملابس رياضية', 'HTV', 'طباعة نسيج'],
            author: {
              nameAr: 'محمد صالح',
              image: '/images/author/Mohamed_Saleh.png',
              bio: 'خبير في أجهزة كتر بلوتر'
            }
          }
        ];
        
        setPosts(mockPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Categories
  const categories = useMemo(() => {
    const allTags = posts.flatMap(post => post.tagsAr);
    const tagCounts: Record<string, number> = {};
    
    allTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag, count]) => ({ name: tag, count }));

    return [
      { name: 'الكل', count: posts.length },
      ...topTags
    ];
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Category filter
    if (selectedCategory !== 'الكل') {
      filtered = filtered.filter(post => 
        post.tagsAr.includes(selectedCategory)
      );
    }

    // Sort
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'reading-time':
        filtered.sort((a, b) => a.readingTime - b.readingTime);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return filtered;
  }, [posts, selectedCategory, sortBy]);

  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const stats = [
    { icon: BookOpen, number: posts.length.toString(), text: 'مقال منشور', color: 'text-blue-500' },
    { icon: Users, number: '50K+', text: 'قارئ شهرياً', color: 'text-green-500' },
    { icon: Tag, number: categories.length.toString(), text: 'تصنيف', color: 'text-purple-500' },
    { icon: Award, number: '4.8', text: 'تقييم المحتوى', color: 'text-orange-500' },
  ];

  const sortOptions = [
    { id: 'newest', name: 'الأحدث', icon: Clock },
    { id: 'oldest', name: 'الأقدم', icon: Clock },
    { id: 'reading-time', name: 'وقت القراءة', icon: BookOpen },
    { id: 'popular', name: 'الأكثر شعبية', icon: TrendingUp },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المقالات...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <AnimatedSection animation="fadeInUp">
              <div className="inline-flex items-center px-6 py-3 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full mb-8">
                <BookOpen className="h-5 w-5 text-yellow-400 mr-3" />
                <span className="text-lg font-medium">مدونة هاي تكنولوجي</span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200}>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  أحدث المقالات والأخبار
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={400}>
              <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
                اكتشف عالم كتر بلوتر من خلال مقالاتنا المتخصصة ونصائح الخبراء والدروس التعليمية
              </p>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection 
                key={index} 
                animation="fadeInUp" 
                delay={index * 100}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color} bg-opacity-10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.number.includes('+') || stat.number.includes('.') ? (
                      stat.number
                    ) : (
                      <CounterAnimation end={parseInt(stat.number)} />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                المقالات المميزة
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                أهم المقالات التي يجب عليك قراءتها في عالم كتر بلوتر
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <AnimatedSection 
                  key={post.slug} 
                  animation="fadeInUp" 
                  delay={index * 150}
                  className="group"
                >
                  <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2 overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={post.coverImage}
                        alt={post.titleAr}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          مميز
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden relative">
                            <Image
                              src={post.author.image}
                              alt={post.author.nameAr}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="mr-2 text-sm text-gray-600">{post.author.nameAr}</span>
                        </div>
                        <div className="flex items-center mr-auto text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readingTime} دقائق
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>
                          {post.titleAr}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.descriptionAr}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tagsAr.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                        >
                          اقرأ المزيد
                          <ArrowRight className="h-4 w-4 mr-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-blue-600" />
                  تصفية المقالات
                </h2>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">التصنيفات</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-right px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.name
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          {category.name}
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            selectedCategory === category.name
                              ? 'bg-white/20 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {category.count}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <Rss className="h-4 w-4 mr-2 text-blue-600" />
                    النشرة البريدية
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    اشترك للحصول على آخر المقالات
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="بريدك الإلكتروني"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-l-lg hover:bg-blue-700 transition-colors">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Area */}
            <div className="lg:w-3/4">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    عرض <span className="font-medium text-gray-900">{filteredPosts.length}</span> من أصل {posts.length} مقال
                  </div>

                  <div className="flex items-center gap-4">
                    {/* View Mode */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        <Grid className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Articles Grid/List */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد مقالات</h3>
                  <p className="text-gray-600 mb-6">لم نجد مقالات تطابق معايير البحث الخاصة بك</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('الكل');
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    مسح جميع الفلاتر
                  </button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1'
                }`}>
                  {filteredPosts.map((post, index) => (
                    <AnimatedSection 
                      key={post.slug} 
                      animation="fadeInUp" 
                      delay={index * 50}
                      className="group"
                    >
                      <article className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-1 overflow-hidden ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}>
                        <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-video'}`}>
                          <Image
                            src={post.coverImage}
                            alt={post.titleAr}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="p-6 flex-1">
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden relative">
                                <Image
                                  src={post.author.image}
                                  alt={post.author.nameAr}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="mr-2 text-sm text-gray-600">{post.author.nameAr}</span>
                            </div>
                            <div className="flex items-center mr-auto text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.readingTime} دقائق
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            <Link href={`/blog/${post.slug}`}>
                              {post.titleAr}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.descriptionAr}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {post.tagsAr.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                            >
                              اقرأ المزيد
                              <ArrowRight className="h-4 w-4 mr-1" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
              <MessageCircle className="h-5 w-5 text-yellow-400 mr-3" />
              <span className="text-lg font-medium">هل لديك سؤال؟</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                نحن هنا لمساعدتك
              </span>
            </h2>

            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              فريقنا من الخبراء جاهز للإجابة على جميع استفساراتك حول كتر بلوتر والطباعة الرقمية
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-6 w-6 mr-3" />
                تواصل معنا
                <ArrowRight className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href={`https://wa.me/${companyInfo.primaryPhone.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105"
              >
                <Phone className="h-6 w-6 mr-3" />
                اتصل الآن
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}