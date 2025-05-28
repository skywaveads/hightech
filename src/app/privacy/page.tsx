'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  FileText,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Globe,
  Users,
  Heart,
  Star,
  Award,
  Zap,
  Target,
  Sparkles,
  Crown,
  Verified,
  Database,
  Server,
  BookOpen,
  ScrollText,
  UserCheck,
  ShieldCheck,
  AlertCircle,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Printer,
  Share2,
  Bookmark,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  SortAsc,
  List,
  Grid,
  Layers,
  Settings,
  HelpCircle,
  MessageCircle,
  Send,
  Copy,
  Check,
  Key,
  Fingerprint,
  Smartphone,
  Laptop,
  Wifi,
  Cloud,
  HardDrive,
  Monitor,
  Cpu,
  Activity,
  BarChart3,
  TrendingUp,
  PieChart,
  LineChart
} from 'lucide-react';

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);
  const [lastUpdated] = useState(new Date('2024-01-15'));
  const [readingProgress, setReadingProgress] = useState(0);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [copiedSection, setCopiedSection] = useState('');

  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const privacyData = [
    {
      id: 'overview',
      title: 'نظرة عامة على الخصوصية',
      icon: Shield,
      content: [
        {
          subtitle: 'التزامنا بالخصوصية',
          text: 'نحن في هايتك مصر نؤمن بأن خصوصيتك حق أساسي. هذه السياسة توضح كيف نجمع ونستخدم ونحمي معلوماتك الشخصية عند استخدام موقعنا وخدماتنا.'
        },
        {
          subtitle: 'الشفافية الكاملة',
          text: 'نلتزم بالشفافية الكاملة حول ممارسات البيانات لدينا. سنوضح لك بوضوح ما نجمعه، ولماذا نجمعه، وكيف نستخدمه، ومع من نشاركه.'
        },
        {
          subtitle: 'حقوقك في البيانات',
          text: 'لديك الحق في الوصول إلى بياناتك الشخصية وتصحيحها وحذفها. كما يمكنك طلب نقل بياناتك أو الاعتراض على معالجتها في أي وقت.'
        }
      ]
    },
    {
      id: 'collection',
      title: 'جمع المعلومات',
      icon: Database,
      content: [
        {
          subtitle: 'المعلومات التي نجمعها',
          text: 'نجمع المعلومات التي تقدمها لنا مباشرة مثل الاسم والبريد الإلكتروني ورقم الهاتف وعنوان التسليم عند إنشاء حساب أو تقديم طلب.'
        },
        {
          subtitle: 'المعلومات التقنية',
          text: 'نجمع تلقائياً معلومات تقنية مثل عنوان IP ونوع المتصفح ونظام التشغيل وصفحات الموقع التي تزورها لتحسين تجربة المستخدم.'
        },
        {
          subtitle: 'ملفات تعريف الارتباط',
          text: 'نستخدم ملفات تعريف الارتباط (Cookies) لتذكر تفضيلاتك وتحسين أداء الموقع. يمكنك التحكم في هذه الملفات من خلال إعدادات المتصفح.'
        }
      ]
    },
    {
      id: 'usage',
      title: 'استخدام المعلومات',
      icon: Activity,
      content: [
        {
          subtitle: 'معالجة الطلبات',
          text: 'نستخدم معلوماتك الشخصية لمعالجة طلباتك وتنفيذ عمليات الشراء والتواصل معك بشأن حالة الطلب والتسليم.'
        },
        {
          subtitle: 'تحسين الخدمات',
          text: 'نحلل بيانات الاستخدام لفهم كيفية تفاعل العملاء مع موقعنا وخدماتنا لتطوير وتحسين تجربة المستخدم باستمرار.'
        },
        {
          subtitle: 'التواصل التسويقي',
          text: 'قد نرسل لك عروضاً خاصة ونشرات إخبارية حول منتجاتنا الجديدة، ولكن فقط إذا وافقت على ذلك. يمكنك إلغاء الاشتراك في أي وقت.'
        }
      ]
    },
    {
      id: 'sharing',
      title: 'مشاركة المعلومات',
      icon: Users,
      content: [
        {
          subtitle: 'عدم البيع للأطراف الثالثة',
          text: 'نحن لا نبيع أو نؤجر أو نتاجر في معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية. معلوماتك محمية ومحترمة.'
        },
        {
          subtitle: 'مقدمو الخدمات',
          text: 'قد نشارك معلومات محدودة مع مقدمي خدمات موثوقين مثل شركات الشحن ومعالجات الدفع لتنفيذ طلباتك بكفاءة.'
        },
        {
          subtitle: 'المتطلبات القانونية',
          text: 'قد نكشف عن معلوماتك إذا كان ذلك مطلوباً قانونياً أو لحماية حقوقنا أو حقوق الآخرين أو للامتثال لأوامر المحكمة.'
        }
      ]
    },
    {
      id: 'security',
      title: 'أمان البيانات',
      icon: Lock,
      content: [
        {
          subtitle: 'التشفير المتقدم',
          text: 'نستخدم تشفير SSL 256-bit لحماية جميع البيانات المنقولة بين جهازك وخوادمنا. هذا نفس مستوى الأمان المستخدم في البنوك.'
        },
        {
          subtitle: 'الحماية الفيزيائية',
          text: 'خوادمنا محمية في مراكز بيانات آمنة مع أنظمة مراقبة على مدار الساعة وضوابط وصول صارمة ونسخ احتياطية منتظمة.'
        },
        {
          subtitle: 'التحديثات الأمنية',
          text: 'نقوم بتحديث أنظمة الأمان بانتظام ونجري اختبارات أمنية دورية للتأكد من حماية بياناتك من التهديدات الجديدة.'
        }
      ]
    },
    {
      id: 'retention',
      title: 'الاحتفاظ بالبيانات',
      icon: HardDrive,
      content: [
        {
          subtitle: 'فترات الاحتفاظ',
          text: 'نحتفظ بمعلوماتك الشخصية طالما كان حسابك نشطاً أو حسب الحاجة لتقديم الخدمات أو الامتثال للالتزامات القانونية.'
        },
        {
          subtitle: 'حذف البيانات',
          text: 'عند إغلاق حسابك أو طلب حذف بياناتك، سنقوم بحذف معلوماتك الشخصية بشكل آمن خلال 30 يوماً، باستثناء ما يتطلبه القانون.'
        },
        {
          subtitle: 'الأرشفة الآمنة',
          text: 'البيانات المحفوظة لأغراض قانونية أو تنظيمية يتم أرشفتها بشكل آمن مع وصول محدود وحماية إضافية.'
        }
      ]
    },
    {
      id: 'rights',
      title: 'حقوقك',
      icon: UserCheck,
      content: [
        {
          subtitle: 'الحق في الوصول',
          text: 'يمكنك طلب نسخة من جميع المعلومات الشخصية التي نحتفظ بها عنك. سنقدم لك هذه المعلومات في تنسيق قابل للقراءة خلال 30 يوماً.'
        },
        {
          subtitle: 'الحق في التصحيح',
          text: 'إذا كانت معلوماتك غير صحيحة أو غير مكتملة، يمكنك طلب تصحيحها أو تحديثها. سنقوم بذلك فوراً بعد التحقق من صحة المعلومات الجديدة.'
        },
        {
          subtitle: 'الحق في الحذف',
          text: 'يمكنك طلب حذف معلوماتك الشخصية في أي وقت. سنحذف بياناتك خلال 30 يوماً، باستثناء ما نحتاج للاحتفاظ به لأغراض قانونية.'
        }
      ]
    },
    {
      id: 'cookies',
      title: 'ملفات تعريف الارتباط',
      icon: Monitor,
      content: [
        {
          subtitle: 'أنواع ملفات تعريف الارتباط',
          text: 'نستخدم ملفات تعريف ارتباط ضرورية لتشغيل الموقع، وملفات تحليلية لفهم الاستخدام، وملفات وظيفية لتذكر تفضيلاتك.'
        },
        {
          subtitle: 'إدارة ملفات تعريف الارتباط',
          text: 'يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح. لاحظ أن تعطيل بعض الملفات قد يؤثر على وظائف الموقع.'
        },
        {
          subtitle: 'ملفات الطرف الثالث',
          text: 'قد نستخدم خدمات طرف ثالث مثل Google Analytics التي تضع ملفات تعريف ارتباط خاصة بها وفقاً لسياسات الخصوصية الخاصة بها.'
        }
      ]
    },
    {
      id: 'children',
      title: 'خصوصية الأطفال',
      icon: Heart,
      content: [
        {
          subtitle: 'حماية الأطفال',
          text: 'موقعنا وخدماتنا مخصصة للبالغين فقط. نحن لا نجمع عمداً معلومات شخصية من الأطفال دون سن 18 عاماً.'
        },
        {
          subtitle: 'إشراف الوالدين',
          text: 'إذا علمنا أننا جمعنا معلومات من طفل دون موافقة والديه، سنحذف هذه المعلومات فوراً ونتخذ خطوات لمنع حدوث ذلك مرة أخرى.'
        },
        {
          subtitle: 'الإبلاغ عن المخالفات',
          text: 'إذا كنت والداً وتعتقد أن طفلك قدم معلومات شخصية لنا، يرجى التواصل معنا فوراً وسنتخذ الإجراءات اللازمة.'
        }
      ]
    },
    {
      id: 'updates',
      title: 'تحديثات السياسة',
      icon: AlertCircle,
      content: [
        {
          subtitle: 'التحديثات الدورية',
          text: 'قد نحدث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية.'
        },
        {
          subtitle: 'الإشعار بالتغييرات',
          text: 'سنخطرك بأي تغييرات مهمة في سياسة الخصوصية عبر البريد الإلكتروني أو من خلال إشعار بارز على موقعنا قبل 30 يوماً من سريان التغييرات.'
        },
        {
          subtitle: 'مراجعة التحديثات',
          text: 'ننصحك بمراجعة سياسة الخصوصية بانتظام للبقاء على اطلاع على كيفية حماية معلوماتك. استمرار استخدامك للموقع يعني موافقتك على السياسة المحدثة.'
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const copySection = async (sectionId: string) => {
    const section = privacyData.find(s => s.id === sectionId);
    if (section) {
      const text = section.content.map(item => `${item.subtitle}: ${item.text}`).join('\n\n');
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(''), 2000);
    }
  };

  const filteredSections = privacyData.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.some(item => 
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
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
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center text-sm space-x-2 space-x-reverse mb-8">
              <Link href="/" className="text-purple-200 hover:text-white transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="h-4 w-4 text-purple-300" />
              <span className="text-white font-medium">سياسة الخصوصية</span>
            </nav>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Shield className="h-12 w-12 text-green-400" />
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Lock className="h-12 w-12 text-purple-300" />
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Eye className="h-12 w-12 text-blue-400" />
              </div>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              سياسة الخصوصية
            </h1>
            
            <p className="text-xl lg:text-2xl text-purple-100 leading-relaxed max-w-3xl mx-auto">
              نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية وفقاً لأعلى معايير الأمان والشفافية
            </p>

            <div className="flex items-center justify-center gap-6 text-purple-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>آخر تحديث: {lastUpdated.toLocaleDateString('ar-EG')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>وقت القراءة: 12 دقيقة</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{privacyData.length} أقسام</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowTableOfContents(!showTableOfContents)}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
              >
                <List className="h-5 w-5" />
                فهرس المحتويات
              </button>
              <button
                onClick={() => window.print()}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
              >
                <Printer className="h-5 w-5" />
                طباعة
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'سياسة الخصوصية - هايتك مصر',
                      url: window.location.href
                    });
                  }
                }}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
              >
                <Share2 className="h-5 w-5" />
                مشاركة
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Table of Contents Sidebar */}
      {showTableOfContents && (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">فهرس المحتويات</h3>
            <button
              onClick={() => setShowTableOfContents(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
          <nav className="space-y-2">
            {privacyData.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                  activeSection === section.id
                    ? 'bg-purple-50 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setShowTableOfContents(false)}
              >
                <section.icon className="h-4 w-4" />
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في سياسة الخصوصية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-900 mb-4">التزامنا بحماية خصوصيتك</h3>
                <p className="text-green-800 text-lg leading-relaxed">
                  خصوصيتك مهمة جداً بالنسبة لنا. نحن نطبق أعلى معايير الأمان والشفافية لحماية معلوماتك الشخصية. 
                  هذه السياسة توضح بالتفصيل كيف نتعامل مع بياناتك وحقوقك في التحكم بها.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {filteredSections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <section.icon className="h-8 w-8 text-purple-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copySection(section.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="نسخ القسم"
                      >
                        {copiedSection === section.id ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {expandedSections.includes(section.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedSections.includes(section.id) && (
                    <div className="space-y-6 animate-fade-in">
                      {section.content.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-6 border border-gray-100"
                        >
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-purple-600" />
                            {item.subtitle}
                          </h3>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">أسئلة حول الخصوصية؟</h2>
                <p className="text-xl text-purple-100">
                  فريق حماية البيانات لدينا جاهز للإجابة على جميع استفساراتك
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="tel:+201234567890"
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="h-8 w-8 mx-auto mb-4 text-green-400" />
                  <h3 className="font-bold mb-2">اتصل بنا</h3>
                  <p className="text-purple-100">+20 123 456 7890</p>
                </a>
                
                <a
                  href="mailto:privacy@hightech-egypt.com"
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="h-8 w-8 mx-auto mb-4 text-blue-400" />
                  <h3 className="font-bold mb-2">راسلنا</h3>
                  <p className="text-purple-100">privacy@hightech-egypt.com</p>
                </a>
                
                <a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="h-8 w-8 mx-auto mb-4 text-green-400" />
                  <h3 className="font-bold mb-2">واتساب</h3>
                  <p className="text-purple-100">تواصل فوري</p>
                </a>
              </div>
            </div>
          </div>

          {/* Back to Top */}
          <div className="text-center mt-12">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="h-5 w-5 rotate-90" />
              العودة إلى الأعلى
            </button>
          </div>
        </div>
      </main>

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
      `}</style>
    </div>
  );
}