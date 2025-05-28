export interface CaseStudy {
  id: string;
  title: string;
  titleAr: string;
  summary: string;
  summaryAr: string;
  image: string;
  url: string;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'skyline-signs',
    title: 'Skyline Signs Increases Production by 300%',
    titleAr: 'سكاي لاين للافتات تزيد الإنتاج بنسبة 300٪',
    summary: 'How a leading signage company upgraded from manual cutting to High-Cut Pro and revolutionized their workflow.',
    summaryAr: 'كيف قامت شركة رائدة في مجال اللافتات بالترقية من القص اليدوي إلى هاي كت برو وأحدثت ثورة في سير العمل.',
    image: '/images/case-studies/skyline-signs.jpg',
    url: '/case-studies/skyline-signs',
    tags: ['signage', 'large-format', 'vinyl']
  },
  {
    id: 'fashion-prints',
    title: 'Fashion Prints Reduces Material Waste by 40%',
    titleAr: 'فاشون برينتس تقلل هدر المواد بنسبة 40٪',
    summary: 'A textile printing company achieved unprecedented precision using High-Cut XL for custom apparel production.',
    summaryAr: 'حققت شركة لطباعة المنسوجات دقة غير مسبوقة باستخدام هاي كت إكس إل لإنتاج الملابس المخصصة.',
    image: '/images/case-studies/fashion-prints.jpg',
    url: '/case-studies/fashion-prints',
    tags: ['textile', 'apparel', 'heat-transfer']
  },
  {
    id: 'auto-wrap',
    title: 'Auto Wrap Masters Completes Jobs 60% Faster',
    titleAr: 'أوتو راب ماسترز تنجز الأعمال بسرعة أكبر بنسبة 60٪',
    summary: 'A vehicle wrapping specialist shares how High-Cut Laser transformed their business efficiency and quality.',
    summaryAr: 'أخصائي تغليف السيارات يشارك كيف حوّل هاي كت ليزر كفاءة وجودة أعمالهم.',
    image: '/images/case-studies/auto-wrap.jpg',
    url: '/case-studies/auto-wrap',
    tags: ['automotive', 'vehicle-wrap', 'contour-cutting']
  },
  {
    id: 'packaging-plus',
    title: 'Packaging Plus Lands Major Retail Contract',
    titleAr: 'باكيجينج بلس تحصل على عقد تجزئة كبير',
    summary: 'How precision die-cutting helped this packaging company win a contract with a multinational retail chain.',
    summaryAr: 'كيف ساعد القص الدقيق هذه الشركة المتخصصة في التعبئة والتغليف في الفوز بعقد مع سلسلة متاجر متعددة الجنسيات.',
    image: '/images/case-studies/packaging-plus.jpg',
    url: '/case-studies/packaging-plus',
    tags: ['packaging', 'retail', 'die-cutting']
  },
  {
    id: 'startup-studio',
    title: 'Startup Studio Boosts Revenue with DIY Products',
    titleAr: 'ستارت أب ستوديو يعزز الإيرادات بمنتجات الصنع الذاتي',
    summary: 'A small design studio expanded their offering with custom merchandise using High-Cut Mini.',
    summaryAr: 'قام استوديو تصميم صغير بتوسيع عروضه بمنتجات مخصصة باستخدام هاي كت ميني.',
    image: '/images/case-studies/startup-studio.jpg',
    url: '/case-studies/startup-studio',
    tags: ['small-business', 'merchandise', 'design-studio']
  }
]; 