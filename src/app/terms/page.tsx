'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Shield,
  FileText,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Globe,
  Users,
  Lock,
  Eye,
  Heart,
  Star,
  Award,
  Zap,
  Target,
  Sparkles,
  Crown,
  Verified,
  Scale,
  Gavel,
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
  Check
} from 'lucide-react';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['general']);
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

  const termsData = [
    {
      id: 'general',
      title: 'الأحكام العامة',
      icon: FileText,
      content: [
        {
          subtitle: 'قبول الشروط',
          text: 'باستخدام موقعنا الإلكتروني أو خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.'
        },
        {
          subtitle: 'تعديل الشروط',
          text: 'نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت دون إشعار مسبق. التعديلات تصبح سارية المفعول فور نشرها على الموقع.'
        },
        {
          subtitle: 'الأهلية القانونية',
          text: 'يجب أن تكون بالغاً وتتمتع بالأهلية القانونية الكاملة لاستخدام خدماتنا. إذا كنت تمثل شركة أو مؤسسة، يجب أن تكون مخولاً قانونياً للموافقة على هذه الشروط نيابة عنها.'
        }
      ]
    },
    {
      id: 'services',
      title: 'الخدمات والمنتجات',
      icon: Award,
      content: [
        {
          subtitle: 'وصف الخدمات',
          text: 'نقدم مجموعة واسعة من أجهزة الكتر بلوتر والمعدات ذات الصلة، بالإضافة إلى خدمات الدعم الفني والصيانة. جميع المنتجات المعروضة على موقعنا متوفرة حسب المخزون.'
        },
        {
          subtitle: 'دقة المعلومات',
          text: 'نبذل قصارى جهدنا لضمان دقة المعلومات المتعلقة بالمنتجات والأسعار، لكننا لا نضمن خلوها من الأخطاء. في حالة وجود خطأ، سنقوم بتصحيحه في أقرب وقت ممكن.'
        },
        {
          subtitle: 'توفر المنتجات',
          text: 'جميع المنتجات متوفرة حسب المخزون. في حالة عدم توفر منتج بعد تأكيد الطلب، سنتواصل معك لاقتراح بدائل مناسبة أو إلغاء الطلب واسترداد المبلغ.'
        }
      ]
    },
    {
      id: 'orders',
      title: 'الطلبات والدفع',
      icon: ShieldCheck,
      content: [
        {
          subtitle: 'تأكيد الطلبات',
          text: 'جميع الطلبات تخضع لتأكيدنا وقبولنا. نحتفظ بالحق في رفض أي طلب لأي سبب، بما في ذلك عدم توفر المنتج أو مشاكل في معلومات الدفع.'
        },
        {
          subtitle: 'الأسعار والرسوم',
          text: 'جميع الأسعار معروضة بالجنيه المصري وتشمل ضريبة القيمة المضافة حيثما ينطبق. رسوم الشحن والتوصيل تُحسب بناءً على الموقع الجغرافي ووزن الطلب.'
        },
        {
          subtitle: 'طرق الدفع',
          text: 'نقبل الدفع نقداً عند التسليم، التحويل البنكي، والدفع الإلكتروني عبر البطاقات الائتمانية. جميع المعاملات المالية محمية بأحدث تقنيات الأمان.'
        }
      ]
    },
    {
      id: 'shipping',
      title: 'الشحن والتسليم',
      icon: Target,
      content: [
        {
          subtitle: 'مناطق التسليم',
          text: 'نقوم بالتوصيل إلى جميع أنحاء جمهورية مصر العربية. أوقات التسليم تختلف حسب الموقع الجغرافي وتتراوح من 1-5 أيام عمل للمدن الرئيسية.'
        },
        {
          subtitle: 'رسوم الشحن',
          text: 'رسوم الشحن تُحسب بناءً على وزن الطلب والمسافة. الطلبات التي تزيد قيمتها عن 500 جنيه مصري تتمتع بشحن مجاني داخل القاهرة الكبرى.'
        },
        {
          subtitle: 'التسليم والاستلام',
          text: 'يجب أن يكون شخص مخول متواجد في عنوان التسليم لاستلام الطلب. في حالة عدم التمكن من التسليم، سنحاول التواصل لإعادة جدولة التسليم.'
        }
      ]
    },
    {
      id: 'warranty',
      title: 'الضمان والإرجاع',
      icon: Shield,
      content: [
        {
          subtitle: 'ضمان المنتجات',
          text: 'جميع منتجاتنا تأتي مع ضمان من الشركة المصنعة. مدة الضمان تختلف حسب نوع المنتج وتتراوح من سنة إلى ثلاث سنوات.'
        },
        {
          subtitle: 'سياسة الإرجاع',
          text: 'يمكن إرجاع المنتجات خلال 14 يوماً من تاريخ الاستلام، شريطة أن تكون في حالتها الأصلية مع جميع الملحقات والتغليف الأصلي.'
        },
        {
          subtitle: 'شروط الإرجاع',
          text: 'المنتجات المستخدمة أو التالفة بسبب سوء الاستخدام لا تخضع لسياسة الإرجاع. يتحمل العميل تكلفة الشحن في حالة الإرجاع لأسباب غير متعلقة بعيوب في المنتج.'
        }
      ]
    },
    {
      id: 'liability',
      title: 'المسؤولية والتعويض',
      icon: Scale,
      content: [
        {
          subtitle: 'حدود المسؤولية',
          text: 'مسؤوليتنا محدودة بقيمة المنتج المشترى. لا نتحمل مسؤولية أي أضرار غير مباشرة أو تبعية قد تنتج عن استخدام منتجاتنا.'
        },
        {
          subtitle: 'استخدام المنتجات',
          text: 'العميل مسؤول عن الاستخدام الآمن والصحيح للمنتجات وفقاً لتعليمات الشركة المصنعة. أي استخدام خاطئ قد يؤدي إلى إلغاء الضمان.'
        },
        {
          subtitle: 'التعويض',
          text: 'في حالة ثبوت عيب في المنتج، نلتزم بإصلاحه أو استبداله أو رد قيمته حسب طبيعة العيب وشروط الضمان.'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'الخصوصية وحماية البيانات',
      icon: Lock,
      content: [
        {
          subtitle: 'جمع البيانات',
          text: 'نجمع المعلومات الضرورية لتنفيذ طلباتك وتحسين خدماتنا، بما في ذلك معلومات الاتصال وتفاصيل الطلبات وتفضيلات التسوق.'
        },
        {
          subtitle: 'استخدام البيانات',
          text: 'نستخدم بياناتك لمعالجة الطلبات، تقديم الدعم الفني، إرسال التحديثات المهمة، وتحسين تجربة التسوق. لا نشارك بياناتك مع أطراف ثالثة دون موافقتك.'
        },
        {
          subtitle: 'أمان البيانات',
          text: 'نطبق أعلى معايير الأمان لحماية بياناتك الشخصية والمالية. جميع المعاملات مشفرة باستخدام تقنية SSL المتقدمة.'
        }
      ]
    },
    {
      id: 'intellectual',
      title: 'الملكية الفكرية',
      icon: Crown,
      content: [
        {
          subtitle: 'حقوق الطبع والنشر',
          text: 'جميع المحتويات على موقعنا، بما في ذلك النصوص والصور والتصاميم، محمية بحقوق الطبع والنشر ولا يجوز استخدامها دون إذن كتابي مسبق.'
        },
        {
          subtitle: 'العلامات التجارية',
          text: 'جميع العلامات التجارية والشعارات المعروضة على الموقع هي ملك لأصحابها المعنيين. استخدام هذه العلامات دون إذن يعتبر انتهاكاً لحقوق الملكية الفكرية.'
        },
        {
          subtitle: 'المحتوى المقدم من المستخدمين',
          text: 'بتقديم أي محتوى على موقعنا (مثل التقييمات أو التعليقات)، فإنك تمنحنا حقاً غير حصري لاستخدام هذا المحتوى لأغراض التسويق والترويج.'
        }
      ]
    },
    {
      id: 'termination',
      title: 'إنهاء الخدمة',
      icon: AlertTriangle,
      content: [
        {
          subtitle: 'إنهاء الحساب',
          text: 'نحتفظ بالحق في إنهاء أو تعليق حسابك في أي وقت إذا انتهكت هذه الشروط والأحكام أو إذا اشتبهنا في نشاط احتيالي.'
        },
        {
          subtitle: 'آثار الإنهاء',
          text: 'عند إنهاء الحساب، ستفقد الوصول إلى جميع الخدمات المرتبطة بالحساب. الطلبات المؤكدة والمدفوعة ستبقى سارية وفقاً لشروطها الأصلية.'
        },
        {
          subtitle: 'البقاء النافذ',
          text: 'الأحكام المتعلقة بالمسؤولية والتعويض والملكية الفكرية تبقى سارية حتى بعد إنهاء الخدمة.'
        }
      ]
    },
    {
      id: 'contact',
      title: 'التواصل والدعم',
      icon: MessageCircle,
      content: [
        {
          subtitle: 'خدمة العملاء',
          text: 'فريق خدمة العملاء متاح للمساعدة من السبت إلى الخميس من 9 صباحاً إلى 6 مساءً. يمكنك التواصل معنا عبر الهاتف أو البريد الإلكتروني أو الواتساب.'
        },
        {
          subtitle: 'الشكاوى والاقتراحات',
          text: 'نرحب بجميع الشكاوى والاقتراحات لتحسين خدماتنا. سيتم الرد على جميع الاستفسارات خلال 24 ساعة من استلامها.'
        },
        {
          subtitle: 'معلومات الاتصال',
          text: 'العنوان: القاهرة، مصر | الهاتف: +20 123 456 7890 | البريد الإلكتروني: info@hightech-egypt.com | الواتساب: +20 123 456 7890'
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
    const section = termsData.find(s => s.id === sectionId);
    if (section) {
      const text = section.content.map(item => `${item.subtitle}: ${item.text}`).join('\n\n');
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(''), 2000);
    }
  };

  const filteredSections = termsData.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.some(item => 
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
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
              <Link href="/" className="text-blue-200 hover:text-white transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="h-4 w-4 text-blue-300" />
              <span className="text-white font-medium">الشروط والأحكام</span>
            </nav>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Scale className="h-12 w-12 text-yellow-400" />
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <FileText className="h-12 w-12 text-blue-300" />
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Shield className="h-12 w-12 text-green-400" />
              </div>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              الشروط والأحكام
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              اقرأ شروط وأحكام استخدام موقعنا وخدماتنا بعناية لضمان تجربة آمنة ومريحة
            </p>

            <div className="flex items-center justify-center gap-6 text-blue-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>آخر تحديث: {lastUpdated.toLocaleDateString('ar-EG')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>وقت القراءة: 15 دقيقة</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{termsData.length} أقسام</span>
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
                      title: 'الشروط والأحكام - هايتك مصر',
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
            {termsData.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-700 font-medium'
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
                placeholder="ابحث في الشروط والأحكام..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">تنبيه مهم</h3>
                <p className="text-amber-800 text-lg leading-relaxed">
                  هذه الشروط والأحكام تشكل اتفاقية قانونية ملزمة بينك وبين شركتنا. 
                  يرجى قراءتها بعناية قبل استخدام خدماتنا. استخدامك لموقعنا يعني موافقتك على جميع هذه الشروط.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
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
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <section.icon className="h-8 w-8 text-blue-600" />
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
                          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100"
                        >
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
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
          <div className="mt-16 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">هل لديك أسئلة؟</h2>
                <p className="text-xl text-blue-100">
                  فريقنا القانوني جاهز للإجابة على جميع استفساراتك
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="tel:+201234567890"
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="h-8 w-8 mx-auto mb-4 text-green-400" />
                  <h3 className="font-bold mb-2">اتصل بنا</h3>
                  <p className="text-blue-100">+20 123 456 7890</p>
                </a>
                
                <a
                  href="mailto:legal@hightech-egypt.com"
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="h-8 w-8 mx-auto mb-4 text-blue-400" />
                  <h3 className="font-bold mb-2">راسلنا</h3>
                  <p className="text-blue-100">legal@hightech-egypt.com</p>
                </a>
                
                <a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="h-8 w-8 mx-auto mb-4 text-green-400" />
                  <h3 className="font-bold mb-2">واتساب</h3>
                  <p className="text-blue-100">تواصل فوري</p>
                </a>
              </div>
            </div>
          </div>

          {/* Back to Top */}
          <div className="text-center mt-12">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
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