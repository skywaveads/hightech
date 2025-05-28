import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import { companyInfo, companyDescription } from '@/data/company';
import WhyChoose from '@/components/WhyChoose';
import ProductRange from '@/components/ProductRange';
import VideoDemo from '@/components/VideoDemo';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import BlogSection from '@/components/BlogSection';
import LocationMaps from '@/components/LocationMaps';
import SEO from '@/components/ui/SEO';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ParticleBackground from '@/components/ui/ParticleBackground';
import CounterAnimation from '@/components/ui/CounterAnimation';
import { 
  Zap, 
  Target, 
  Shield, 
  Headphones, 
  Star, 
  Users, 
  Award, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Clock,
  Heart
} from 'lucide-react';

// Define industry data
const industries = [
  {
    id: 'signage',
    title: 'صناعة اللافتات والاستيكرات',
    image: '/images/industries/stickers.jpg',
    description: 'أجهزة كتر بلوتر مثالية لإنتاج اللافتات واستيكرات الفينيل للإعلانات',
    link: '/industries#signmaking',
    keywords: ['sign making equipment', 'vinyl signage cutter', 'sign shop plotter']
  },
  {
    id: 'textile',
    title: 'طباعة التيشيرتات والملابس',
    image: '/images/industries/print_shirts.jpg',
    description: 'قص الفينيل الحراري والأقمشة لإنتاج الملابس والتصميمات المطبوعة',
    link: '/industries#apparel',
    keywords: ['textile cutting plotter', 'heat transfer vinyl cutter', 'fabric plotter']
  },
  {
    id: 'automotive',
    title: 'تغليف السيارات',
    image: '/images/industries/car_films.png',
    description: 'إنتاج استيكرات وتصميمات دقيقة لتغليف وزخرفة السيارات',
    link: '/industries#automotive',
    keywords: ['car wrap cutter', 'automotive vinyl plotter', 'vehicle graphics cutter']
  },
  {
    id: 'advertising',
    title: 'اللافتات والإعلانات',
    image: '/images/industries/banner.png',
    description: 'قص وتشكيل اللافتات الإعلانية والبانرات بدقة عالية لحملات تسويقية مؤثرة',
    link: '/industries#advertising',
    keywords: ['advertising plotter', 'banner cutting machine', 'outdoor signage cutter']
  }
];

// Define product features with enhanced design
const features = [
  {
    id: 'servo',
    title: 'محركات سيرفو عالية السرعة',
    description: 'سرعة قصوى تصل إلى 1200 ملم/ثانية مع دقة فائقة للإنتاج السريع',
    icon: <Zap className="h-12 w-12 text-white" />,
    color: 'from-blue-500 to-cyan-500',
    keywords: ['servo motor plotter', 'high speed vinyl cutter', 'fast cutting plotter']
  },
  {
    id: 'precision',
    title: 'دقة ميكرونية',
    description: 'دقة قطع 0.01 ملم لتفاصيل دقيقة وتصميمات معقدة بجودة استثنائية',
    icon: <Target className="h-12 w-12 text-white" />,
    color: 'from-purple-500 to-pink-500',
    keywords: ['micron accuracy cutter', 'precision vinyl plotter', 'high-precision cutting machine']
  },
  {
    id: 'chassis',
    title: 'هيكل متين طويل العمر',
    description: 'هيكل معدني قوي مصمم للعمل المستمر في بيئات الإنتاج الصناعية',
    icon: <Shield className="h-12 w-12 text-white" />,
    color: 'from-green-500 to-emerald-500',
    keywords: ['durable cutting plotter', 'industrial vinyl cutter', 'built-to-last chassis']
  },
  {
    id: 'support',
    title: 'دعم فني مدى الحياة',
    description: 'خدمة عملاء متميزة وضمان شامل مع دعم فني متواصل طوال عمر الجهاز',
    icon: <Headphones className="h-12 w-12 text-white" />,
    color: 'from-orange-500 to-red-500',
    keywords: ['plotter lifetime support', 'vinyl cutter service center', 'cutting plotter technical support']
  }
];

// Enhanced statistics
const statistics = [
  {
    id: 'customers',
    value: 5000,
    suffix: '+',
    title: 'عميل راضٍ',
    description: 'في مصر والسعودية وليبيا',
    icon: <Users className="h-8 w-8 text-white" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'experience',
    value: 15,
    suffix: '+',
    title: 'سنة خبرة',
    description: 'في مجال أجهزة القص',
    icon: <Award className="h-8 w-8 text-white" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'projects',
    value: 10000,
    suffix: '+',
    title: 'مشروع منجز',
    description: 'بأعلى معايير الجودة',
    icon: <TrendingUp className="h-8 w-8 text-white" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'satisfaction',
    value: 98,
    suffix: '%',
    title: 'رضا العملاء',
    description: 'تقييم متميز من عملائنا',
    icon: <Star className="h-8 w-8 text-white" />,
    color: 'from-yellow-500 to-orange-500'
  }
];

// Define testimonials
const testimonials = [
  {
    id: 1,
    text: 'جهاز كتر بلوتر هاي كت غير طريقة عملنا للأفضل. سرعة قص عالية مع دقة لا مثيل لها، وفر علينا الكثير من الوقت والخامات.',
    name: 'أحمد محمود',
    company: 'شركة سكاي للإعلانات',
    image: '/images/testimonials/ahmed.jpg',
    rating: 5
  },
  {
    id: 2,
    text: 'الدعم الفني المتميز من فريق هاي تكنولوجي مصر كان سببًا رئيسيًا في اختيارنا لهم. الجهاز يعمل بكفاءة عالية منذ سنوات.',
    name: 'محمد علي',
    company: 'ستايل برينت للدعاية',
    image: '/images/testimonials/mohamed.jpg',
    rating: 5
  },
  {
    id: 3,
    text: 'الآن نستطيع تنفيذ تصميمات معقدة بدقة متناهية وفي وقت قياسي. جهاز هاي كت هو أفضل استثمار قمنا به لتطوير أعمالنا.',
    name: 'خالد حسن',
    company: 'ديزاين هب',
    image: '/images/testimonials/khaled.jpg',
    rating: 5
  }
];

export default function HomePage() {
  // كلمات مفتاحية محسّنة لـ SEO
  const enhancedKeywords = [
    ...companyInfo.mainKeywords,
    'كتر بلوتر مصر',
    'vinyl cutter Egypt',
    'servo motor plotter',
    'industrial cutting machine',
    'أجهزة قص الفينيل',
    'ماكينة قص الاستيكر',
    'plotter prices Egypt',
    'أسعار البلوتر في مصر'
  ];
  
  // وصف محسّن لـ SEO
  const enhancedDescription = `أفضل أجهزة كتر بلوتر في مصر - هاي كت بتقنية السيرفو موتور للقص الدقيق بسرعة 1200 مم/ثانية. وكيل حصري في مصر والسعودية وليبيا لأجهزة القص الصناعية عالية الدقة. ${companyDescription.short}`;

  return (
    <>
      <SEO 
        title="أجهزة كتر بلوتر وماكينات القص بتقنية عالية"
        description={enhancedDescription}
        keywords={enhancedKeywords}
      />
      
      {/* Hero Section with Particle Background */}
      <div className="relative">
        <ParticleBackground />
        <HeroSlider />
      </div>

      {/* Statistics Section */}
      <AnimatedSection className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              أرقام تتحدث عن نفسها
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              نفخر بثقة عملائنا وإنجازاتنا المتميزة في مجال أجهزة كتر بلوتر
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {statistics.map((stat, index) => (
              <AnimatedSection 
                key={stat.id} 
                animation="scaleIn" 
                delay={index * 200}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group">
                  <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    <CounterAnimation
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2000}
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{stat.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{stat.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Section */}
      <WhyChoose />

      {/* Enhanced Features Section */}
      <AnimatedSection className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden" id="features">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-bounce animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-yellow-500 mr-2 md:mr-3" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
                ميزات أجهزة كتر بلوتر من هاي كت
              </h2>
              <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-yellow-500 ml-2 md:ml-3" />
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              تقنيات متطورة وميزات استثنائية تجعل أجهزتنا الخيار الأمثل للمحترفين
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <AnimatedSection 
                key={feature.id} 
                animation="fadeInUp" 
                delay={index * 150}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-3">
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  
                  <div className="p-6 md:p-8">
                    {/* Icon with Animation */}
                    <div className="flex justify-center mb-4 md:mb-6">
                      <div className={`p-3 md:p-4 rounded-2xl bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {React.cloneElement(feature.icon, { className: "h-8 w-8 md:h-12 md:w-12 text-white" })}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Hover Effect */}
                    <div className="mt-4 md:mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-center text-blue-600 font-medium text-sm md:text-base">
                        <span>اكتشف المزيد</span>
                        <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Product Range Section */}
      <ProductRange />
      
      {/* Video Demo Section */}
      <VideoDemo />

      {/* Enhanced Industries Section */}
      <AnimatedSection className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" id="industries">
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              الصناعات والتطبيقات
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              أجهزة كتر بلوتر هاي كت تقدم حلولًا متكاملة لمختلف الصناعات والتطبيقات
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {industries.map((industry, index) => (
              <AnimatedSection 
                key={industry.id} 
                animation="fadeInUp" 
                delay={index * 150}
              >
                <Link 
                  href={industry.link}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={industry.image}
                      alt={`صناعة ${industry.title} باستخدام كتر بلوتر هاي كت`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                      <h3 className="text-white text-lg md:text-xl font-bold mb-1 md:mb-2">{industry.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">{industry.description}</p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors text-sm md:text-base">
                      <span>اكتشف المزيد</span>
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
      

      {/* Blog Section */}
      <BlogSection />

      {/* Location Maps Section */}
      <LocationMaps />
      
      {/* FAQ Section */}
      <FAQ />
      
      {/* Final CTA Section */}
      <FinalCTA />

    </>
  );
}
