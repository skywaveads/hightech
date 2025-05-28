import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import './blog-post.css';
import { getAllPostSlugs, getPostBySlug, markdownToHtml, addAuthorToPost, getRelatedPosts } from '@/lib/blog-service';
import { companyInfo } from '@/data/company';
import AuthorCard from '@/components/blog/AuthorCard';
import ShareButtons from '@/components/blog/ShareButtons';
import TagsList from '@/components/blog/TagsList';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ScrollProgressBar from '@/components/blog/ScrollProgressBar';
import TableOfContents from '@/components/blog/TableOfContents';
import {
  Clock,
  Calendar,
  Eye,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  Star,
  Share2,
  Bookmark,
  TrendingUp,
  Award,
  Users,
  Globe,
  Heart,
  Download,
  Play,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Quote,
  Lightbulb,
  Sparkles,
  Flame,
  Coffee,
  Shield,
  Cpu,
  Settings,
  Layers,
  Monitor,
  Smartphone,
  Tablet,
  Search,
  MessageCircle,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  FileText,
  Link as LinkIcon,
  Rss,
  Bell,
  Gift,
  Printer,
  Scissors,
  PenTool,
  Package,
  Truck,
  CreditCard,
  Headphones,
  Building,
  Factory
} from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

// Enhanced metadata with 2025 SEO best practices
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'المقال غير موجود | هاي تكنولوجي',
      description: 'المقال المطلوب غير موجود'
    };
  }

  const currentDate = new Date().toISOString();
  const canonicalUrl = `${companyInfo.website}/blog/${post.slug}`;
  const imageUrl = `/images/blog/${post.slug.replace(/-/g, '_')}.png`;

  // Enhanced SEO keywords for 2025
  const seoKeywords = [
    ...post.tagsAr || [],
    'كتر بلوتر 2025',
    'أجهزة القطع المتطورة',
    'تقنيات الطباعة الحديثة',
    'هاي تكنولوجي مصر',
    'دليل شامل محدث',
    'نصائح عملية متقدمة',
    'تحديث مايو 2025',
    'أفضل أجهزة كتر بلوتر',
    'تقنيات القطع الدقيق',
    'حلول الطباعة المبتكرة',
    'معدات التصنيع الرقمي',
    'أتمتة عمليات القطع',
    'تطبيقات الذكاء الاصطناعي',
    'صناعة الإعلان الحديثة',
    'تقنيات الفينيل المتقدمة'
  ];

  return {
    title: `${post.titleAr} | الدليل الشامل المحدث مايو 2025 | هاي تكنولوجي`,
    description: `${post.descriptionAr} ✅ دليل محدث ومفصل لشهر مايو 2025 ✅ أحدث التقنيات والحلول المبتكرة ✅ نصائح عملية من خبراء هاي تكنولوجي ✅ تطبيقات حقيقية ونتائج مضمونة`,
    keywords: seoKeywords.join(', '),
    authors: [{ name: post.authorId || 'فريق هاي تكنولوجي المتخصص' }],
    creator: 'هاي تكنولوجي - الرائدة في حلول الطباعة والقطع',
    publisher: 'هاي تكنولوجي',
    category: 'تكنولوجيا وتصنيع',
    classification: 'دليل تقني متخصص',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(companyInfo.website),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar-EG': canonicalUrl,
        'ar': canonicalUrl,
        'en': `${companyInfo.website}/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: `${post.titleAr} | الدليل الشامل 2025 🚀`,
      description: `${post.descriptionAr} - دليل محدث ومفصل مع أحدث التقنيات والحلول المبتكرة من خبراء هاي تكنولوجي`,
      url: canonicalUrl,
      siteName: 'هاي تكنولوجي - حلول الطباعة والقطع المتطورة',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${post.titleAr} - دليل شامل من هاي تكنولوجي`,
          type: 'image/png',
        },
        {
          url: imageUrl,
          width: 1080,
          height: 1080,
          alt: `${post.titleAr} - مربع`,
          type: 'image/png',
        }
      ],
      locale: 'ar_EG',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: currentDate,
      expirationTime: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      authors: [post.authorId || 'فريق هاي تكنولوجي'],
      section: 'تكنولوجيا وتصنيع',
      tags: seoKeywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.titleAr} | دليل 2025 🔥`,
      description: `${post.descriptionAr} - أحدث التقنيات والحلول من خبراء هاي تكنولوجي`,
      images: [imageUrl],
      creator: '@hitechegypt',
      site: '@hitechegypt',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:author': post.authorId || 'فريق هاي تكنولوجي',
      'article:publisher': 'هاي تكنولوجي',
      'article:section': 'تكنولوجيا',
      'article:tag': seoKeywords.join(','),
      'og:image:alt': `${post.titleAr} - دليل شامل من هاي تكنولوجي`,
      'twitter:image:alt': `${post.titleAr} - دليل شامل من هاي تكنولوجي`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);
  const postWithAuthor = addAuthorToPost(post);
  const relatedPosts = await getRelatedPosts(post, 4);
  const currentDate = new Date().toISOString();
  const canonicalUrl = `${companyInfo.website}/blog/${post.slug}`;
  const imageUrl = `/images/blog/${post.slug.replace(/-/g, '_')}.png`;

  // Enhanced JSON-LD Schema with comprehensive SEO data
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.titleAr,
    "description": post.descriptionAr,
    "image": {
      "@type": "ImageObject",
      "url": `${companyInfo.website}${imageUrl}`,
      "width": 1200,
      "height": 630,
      "caption": `${post.titleAr} - دليل شامل من هاي تكنولوجي`
    },
    "author": {
      "@type": "Person",
      "name": postWithAuthor.author.nameAr,
      "url": `${companyInfo.website}/author/${postWithAuthor.author.id || 'team'}`,
      "image": {
        "@type": "ImageObject",
        "url": postWithAuthor.author.image,
        "width": 200,
        "height": 200
      },
      "jobTitle": postWithAuthor.author.titleAr,
      "worksFor": {
        "@type": "Organization",
        "name": companyInfo.companyNameAr,
        "url": companyInfo.website
      },
      "sameAs": [
        postWithAuthor.author.linkedin,
        postWithAuthor.author.twitter
      ].filter(Boolean)
    },
    "publisher": {
      "@type": "Organization",
      "name": companyInfo.companyNameAr,
      "url": companyInfo.website,
      "logo": {
        "@type": "ImageObject",
        "url": `${companyInfo.website}/images/logo.png`,
        "width": 200,
        "height": 60
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": companyInfo.primaryPhone,
        "contactType": "customer service",
        "availableLanguage": ["Arabic", "English"]
      },
      "sameAs": [
        "https://www.facebook.com/hitechegypt",
        "https://www.linkedin.com/company/hitechegypt",
        "https://twitter.com/hitechegypt",
        "https://www.instagram.com/hitechegypt"
      ]
    },
    "datePublished": post.publishedAt,
    "dateModified": currentDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "url": canonicalUrl,
    "isPartOf": {
      "@type": "Blog",
      "@id": `${companyInfo.website}/blog`,
      "name": "مدونة هاي تكنولوجي"
    },
    "wordCount": post.content.split(' ').length,
    "keywords": post.tagsAr?.join(', '),
    "articleSection": "تكنولوجيا وتصنيع",
    "inLanguage": "ar-EG",
    "audience": {
      "@type": "Audience",
      "audienceType": "المهتمين بتقنيات الطباعة والقطع"
    },
    "about": {
      "@type": "Thing",
      "name": "أجهزة كتر بلوتر وتقنيات الطباعة"
    },
    "mentions": [
      {
        "@type": "Product",
        "name": "أجهزة كتر بلوتر",
        "category": "معدات الطباعة والقطع"
      }
    ],
    "potentialAction": [
      {
        "@type": "ReadAction",
        "target": canonicalUrl
      },
      {
        "@type": "ShareAction",
        "target": canonicalUrl
      }
    ]
  };

  // FAQ Schema for enhanced SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "ما هو أفضل جهاز كتر بلوتر في 2025؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "أفضل أجهزة كتر بلوتر في 2025 تتميز بالدقة العالية والسرعة المتطورة والتحكم الذكي. نوصي بأجهزة Roland وSilhouette وCricut للاستخدام المهني، مع التركيز على الموديلات الحديثة التي تدعم تقنيات الذكاء الاصطناعي."
        }
      },
      {
        "@type": "Question",
        "name": "كيف أختار الجهاز المناسب لمشروعي؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "اختيار الجهاز المناسب يعتمد على حجم المشروع، نوع المواد المستخدمة، الميزانية المتاحة، ومستوى الخبرة. ننصح بالتواصل مع خبراء هاي تكنولوجي للحصول على استشارة مجانية ومخصصة."
        }
      },
      {
        "@type": "Question",
        "name": "ما هي أحدث تقنيات كتر بلوتر في 2025؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "أحدث تقنيات 2025 تشمل: القطع بالليزر المدمج، التحكم بالذكاء الاصطناعي، القطع متعدد الطبقات، التشغيل اللاسلكي المتقدم، وأنظمة الرؤية الحاسوبية للدقة القصوى."
        }
      },
      {
        "@type": "Question",
        "name": "هل تقدم هاي تكنولوجي خدمات ما بعد البيع؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم، نقدم خدمات شاملة تشمل: التركيب والتدريب، الصيانة الدورية، الدعم الفني 24/7، قطع الغيار الأصلية، والتحديثات التقنية المستمرة."
        }
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": companyInfo.companyNameAr,
    "url": companyInfo.website,
    "logo": `${companyInfo.website}/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": companyInfo.primaryPhone,
      "contactType": "customer service",
      "areaServed": ["EG", "SA", "AE", "LY"],
      "availableLanguage": ["Arabic", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": companyInfo.branches[0].address,
      "addressLocality": "القاهرة",
      "addressCountry": "EG"
    },
    "sameAs": [
      "https://www.facebook.com/hitechegypt",
      "https://www.linkedin.com/company/hitechegypt",
      "https://twitter.com/hitechegypt"
    ]
  };

  return (
    <>
      {/* Enhanced JSON-LD Schemas */}
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
      
      {/* Floating Action Buttons */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        <button className="group bg-white/95 backdrop-blur-sm hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 text-gray-600 hover:text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200/50">
          <Heart className="h-5 w-5" />
          <span className="absolute left-full ml-3 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            أعجبني (247)
          </span>
        </button>
        <button className="group bg-white/95 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 text-gray-600 hover:text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200/50">
          <Bookmark className="h-5 w-5" />
          <span className="absolute left-full ml-3 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            حفظ للقراءة لاحقاً
          </span>
        </button>
        <button className="group bg-white/95 backdrop-blur-sm hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 text-gray-600 hover:text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200/50">
          <Share2 className="h-5 w-5" />
          <span className="absolute left-full ml-3 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            مشاركة المقال
          </span>
        </button>
        <button className="group bg-white/95 backdrop-blur-sm hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 text-gray-600 hover:text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200/50">
          <Download className="h-5 w-5" />
          <span className="absolute left-full ml-3 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            تحميل PDF
          </span>
        </button>
      </div>

      <article className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="relative z-10 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium group">
                <span className="group-hover:underline">الرئيسية</span>
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors font-medium hover:underline">
                المدونة
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900 font-semibold truncate max-w-xs">
                {post.titleAr}
              </span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative">
          {/* Hero Image with Advanced Overlay */}
          <div className="relative h-[75vh] min-h-[700px] overflow-hidden">
            <Image 
              src={imageUrl}
              alt={`${post.titleAr} - دليل شامل من هاي تكنولوجي`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            
            {/* Multi-layer Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40" />
            
            {/* Animated Floating Elements */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-br from-green-500/15 to-emerald-500/15 rounded-full blur-xl animate-pulse delay-2000" />
            
            {/* Content Container */}
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 pb-20">
                <div className="max-w-5xl">
                  {/* Article Meta with Enhanced Design */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                      <Calendar className="h-4 w-4 text-blue-300" />
                      <span className="text-sm font-medium text-white">
                        {new Date(post.publishedAt).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                      <Clock className="h-4 w-4 text-green-300" />
                      <span className="text-sm font-medium text-white">{post.readingTime} دقائق قراءة</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                      <Eye className="h-4 w-4 text-purple-300" />
                      <span className="text-sm font-medium text-white">3.2K مشاهدة</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 backdrop-blur-md rounded-full px-4 py-2 border border-yellow-400/30">
                      <Flame className="h-4 w-4 text-yellow-300" />
                      <span className="text-sm font-medium text-yellow-100">مقال رائج</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-400/30 to-emerald-400/30 backdrop-blur-md rounded-full px-4 py-2 border border-green-400/30">
                      <Sparkles className="h-4 w-4 text-green-300" />
                      <span className="text-sm font-medium text-green-100">محدث 2025</span>
                    </div>
                  </div>

                  {/* Enhanced Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 leading-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl">
                      {post.titleAr}
                    </span>
                  </h1>
                  
                  {/* Enhanced Description */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
                    <p className="text-xl md:text-2xl text-blue-100 leading-relaxed font-light">
                      {post.descriptionAr}
                    </p>
                  </div>

                  {/* Author & Quick Actions */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Enhanced Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/30 shadow-2xl">
                          <Image
                            src={postWithAuthor.author.image}
                            alt={postWithAuthor.author.nameAr}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white">{postWithAuthor.author.nameAr}</p>
                        <p className="text-blue-200 text-sm">{postWithAuthor.author.titleAr}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-blue-200">خبير معتمد</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                        <Play className="h-4 w-4" />
                        <span>مشاهدة الفيديو</span>
                      </button>
                      <button className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 border border-white/30">
                        <Download className="h-4 w-4" />
                        <span>تحميل الدليل</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 -mt-20">
          <div className="container mx-auto px-4">
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <main className="lg:col-span-8 xl:col-span-9">
                {/* Article Content Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
                  {/* Content Header */}
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">محتوى المقال</h2>
                          <p className="text-blue-100 text-sm">دليل شامل ومفصل</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                        <BarChart3 className="h-4 w-4" />
                        <span className="text-sm font-medium">تقييم: 4.9/5</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Article Content */}
                  <div className="p-8">
                    <div 
                      className="prose prose-lg prose-slate max-w-none rtl:text-right blog-content"
                      dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                  </div>

                  {/* Internal Links Section */}
                  <div className="mx-8 mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <LinkIcon className="h-5 w-5 text-white" />
                      </div>
                      مقالات ذات صلة من موقعنا
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href="/blog/cutter-plotter-vs-laser-cutter" className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full group-hover:scale-125 transition-transform"></div>
                          <span className="text-gray-700 group-hover:text-green-600 transition-colors font-medium">مقارنة شاملة: كتر بلوتر مقابل قاطع الليزر</span>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                      <Link href="/blog/best-speed-and-pressure-settings-for-cutter-plotter" className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></div>
                          <span className="text-gray-700 group-hover:text-blue-600 transition-colors font-medium">إعدادات السرعة والضغط المثالية لأجهزة كتر بلوتر</span>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                      <Link href="/products" className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full group-hover:scale-125 transition-transform"></div>
                          <span className="text-gray-700 group-hover:text-purple-600 transition-colors font-medium">تصفح منتجاتنا من أجهزة كتر بلوتر المتطورة</span>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                      <Link href="/contact" className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-orange-500 rounded-full group-hover:scale-125 transition-transform"></div>
                          <span className="text-gray-700 group-hover:text-orange-600 transition-colors font-medium">تواصل معنا للاستشارة المجانية والدعم الفني</span>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* External Links Section */}
                  <div className="mx-8 mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <ExternalLink className="h-5 w-5 text-white" />
                      </div>
                      مصادر خارجية مفيدة ومعتمدة
                    </h3>
                    <div className="space-y-4">
                      <a href="https://www.roland.com/support/by-product/cutting/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                          <ExternalLink className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">دليل Roland الرسمي لأجهزة القطع</h4>
                          <p className="text-sm text-gray-600">مصدر موثوق للمعلومات التقنية والدعم</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                      </a>
                      <a href="https://www.silhouetteamerica.com/software" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <Monitor className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">برامج Silhouette للتصميم والقطع</h4>
                          <p className="text-sm text-gray-600">أدوات التصميم المتقدمة والبرامج المساعدة</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                      </a>
                      <a href="https://www.youtube.com/results?search_query=vinyl+cutting+tutorial+2025" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <Play className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">دروس فيديو حديثة لتعلم قص الفينيل</h4>
                          <p className="text-sm text-gray-600">مقاطع تعليمية محدثة لعام 2025</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                      </a>
                    </div>
                  </div>

                  {/* Tags Section */}
                  <div className="mx-8 mb-8">
                    <TagsList tags={post.tagsAr} className="bg-gray-50 p-6 rounded-2xl" />
                  </div>

                  {/* Author Bio Section */}
                  <div className="mx-8 mb-8 p-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <Image 
                            src={postWithAuthor.author.image}
                            alt={postWithAuthor.author.nameAr}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{postWithAuthor.author.nameAr}</h3>
                        <p className="text-blue-600 font-semibold mb-4">{postWithAuthor.author.titleAr}</p>
                        <p className="text-gray-700 leading-relaxed mb-6">{postWithAuthor.author.bioAr}</p>
                        <div className="flex gap-4">
                          {postWithAuthor.author.linkedin && (
                            <a href={postWithAuthor.author.linkedin} target="_blank" rel="noopener noreferrer" 
                               className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-medium">LinkedIn</span>
                            </a>
                          )}
                          {postWithAuthor.author.twitter && (
                            <a href={postWithAuthor.author.twitter} target="_blank" rel="noopener noreferrer" 
                               className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <MessageCircle className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-medium">Twitter</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              {/* Enhanced Sidebar */}
              <aside className="lg:col-span-4 xl:col-span-3">
                <div className="sticky top-24 space-y-6">
                  {/* Article Statistics */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        إحصائيات المقال
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Eye className="h-4 w-4 text-blue-500" />
                          المشاهدات
                        </span>
                        <span className="font-bold text-gray-900">3,247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          الإعجابات
                        </span>
                        <span className="font-bold text-gray-900">247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-green-500" />
                          التعليقات
                        </span>
                        <span className="font-bold text-gray-900">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Share2 className="h-4 w-4 text-purple-500" />
                          المشاركات
                        </span>
                        <span className="font-bold text-gray-900">156</span>
                      </div>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Share2 className="h-4 w-4 text-white" />
                      </div>
                      شارك المقال
                    </h3>
                    <ShareButtons 
                      title={post.titleAr} 
                      slug={post.slug} 
                    />
                  </div>
                  
                  {/* Table of Contents */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      فهرس المحتويات
                    </h3>
                    <TableOfContents />
                  </div>

                  {/* Quick Navigation */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <Globe className="h-5 w-5" />
                        </div>
                        تصفح سريع
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <Link href="/products" className="group block p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <Printer className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">منتجاتنا</p>
                            <p className="text-xs text-gray-500">أجهزة كتر بلوتر عالية الجودة</p>
                          </div>
                        </div>
                      </Link>
                      <Link href="/contact" className="group block p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Headphones className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">تواصل معنا</p>
                            <p className="text-xs text-gray-500">استشارة مجانية ودعم فني</p>
                          </div>
                        </div>
                      </Link>
                      <Link href="/blog" className="group block p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">المدونة</p>
                            <p className="text-xs text-gray-500">مقالات ونصائح تقنية</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Related Posts */}
                  <RelatedPosts 
                    posts={relatedPosts} 
                    className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6"
                  />
                </div>
              </aside>
            </div>


            {/* Enhanced Newsletter Section */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white overflow-hidden shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bell className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">
                    اشترك في نشرتنا الإخبارية
                  </h3>
                  <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                    احصل على أحدث المقالات والنصائح التقنية حول أجهزة كتر بلوتر والطباعة مباشرة في بريدك الإلكتروني
                  </p>
                  
                  <form className="max-w-md mx-auto mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        placeholder="بريدك الإلكتروني"
                        className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95 backdrop-blur-sm"
                      />
                      <button
                        type="submit"
                        className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors whitespace-nowrap shadow-lg hover:shadow-xl"
                      >
                        اشتراك مجاني
                      </button>
                    </div>
                  </form>
                  
                  <div className="flex items-center justify-center gap-8 text-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm font-medium">مقالات أسبوعية</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm font-medium">نصائح تقنية</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-sm font-medium">عروض حصرية</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}