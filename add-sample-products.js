const { GoogleSheetsProductsDatabase } = require('./src/lib/google-products');

async function addSampleProducts() {
  console.log('🚀 إضافة منتجات تجريبية...');
  
  const sampleProducts = [
    {
      name_ar: 'كتر بلوتر احترافي 60 سم',
      name_en: 'Professional Cutter Plotter 60cm',
      slug: 'professional-cutter-plotter-60cm',
      short_desc: 'كتر بلوتر احترافي بعرض 60 سم مثالي للمشاريع الصغيرة والمتوسطة',
      description: '<p>كتر بلوتر احترافي عالي الجودة بعرض 60 سم، مصمم خصيصاً للمشاريع الصغيرة والمتوسطة. يتميز بدقة عالية في القطع وسهولة في الاستخدام.</p><h3>المميزات:</h3><ul><li>دقة قطع عالية</li><li>سهولة الاستخدام</li><li>متوافق مع جميع أنواع الفينيل</li><li>برنامج تشغيل متقدم</li></ul>',
      price: 15000,
      sale_price: 12000,
      quantity: 10,
      category: 'كتر بلوتر',
      tags: ['كتر بلوتر', 'قطع', 'فينيل', '60 سم'],
      sku: 'CP-60-PRO',
      images: [
        {
          url: '/uploads/c1d746b9-e03c-4307-b03a-efeceb819e61.jpg',
          alt: 'كتر بلوتر احترافي 60 سم'
        }
      ],
      isActive: true
    },
    {
      name_ar: 'كتر بلوتر 120 سم للمشاريع الكبيرة',
      name_en: 'Large Format Cutter Plotter 120cm',
      slug: 'large-format-cutter-plotter-120cm',
      short_desc: 'كتر بلوتر بعرض 120 سم مخصص للمشاريع الكبيرة والإنتاج التجاري',
      description: '<p>كتر بلوتر بعرض 120 سم مصمم للمشاريع الكبيرة والإنتاج التجاري. يوفر أداء عالي وسرعة في القطع مع الحفاظ على الدقة.</p><h3>المميزات:</h3><ul><li>عرض كبير 120 سم</li><li>سرعة قطع عالية</li><li>مناسب للإنتاج التجاري</li><li>نظام تحكم متطور</li></ul>',
      price: 35000,
      sale_price: null,
      quantity: 5,
      category: 'كتر بلوتر',
      tags: ['كتر بلوتر', 'قطع كبير', 'تجاري', '120 سم'],
      sku: 'CP-120-LF',
      images: [
        {
          url: '/uploads/c9979185-bbb7-4aa9-a6bd-0238eee57158.jpg',
          alt: 'كتر بلوتر 120 سم للمشاريع الكبيرة'
        }
      ],
      isActive: true
    },
    {
      name_ar: 'فينيل لاصق عالي الجودة',
      name_en: 'High Quality Adhesive Vinyl',
      slug: 'high-quality-adhesive-vinyl',
      short_desc: 'فينيل لاصق عالي الجودة متوفر بألوان متعددة ومقاوم للعوامل الجوية',
      description: '<p>فينيل لاصق عالي الجودة مصنوع من مواد متينة ومقاومة للعوامل الجوية. متوفر بألوان متعددة ومناسب لجميع أنواع التطبيقات.</p><h3>المميزات:</h3><ul><li>مقاوم للماء والشمس</li><li>ألوان زاهية وثابتة</li><li>سهل التطبيق والإزالة</li><li>متوفر بعروض مختلفة</li></ul>',
      price: 150,
      sale_price: 120,
      quantity: 100,
      category: 'فينيل',
      tags: ['فينيل', 'لاصق', 'ألوان', 'مقاوم'],
      sku: 'VIN-ADH-HQ',
      images: [
        {
          url: '/uploads/ef6e5c38-3b7b-48ed-8d29-52257b571034.jpg',
          alt: 'فينيل لاصق عالي الجودة'
        }
      ],
      isActive: true
    },
    {
      name_ar: 'ماكينة طباعة حرارية DTF',
      name_en: 'DTF Heat Transfer Printer',
      slug: 'dtf-heat-transfer-printer',
      short_desc: 'ماكينة طباعة حرارية DTF للطباعة على الأقمشة والملابس بجودة عالية',
      description: '<p>ماكينة طباعة حرارية DTF متطورة للطباعة على الأقمشة والملابس. تتميز بجودة طباعة عالية وسهولة في الاستخدام.</p><h3>المميزات:</h3><ul><li>جودة طباعة عالية الدقة</li><li>متوافقة مع جميع أنواع الأقمشة</li><li>سرعة طباعة ممتازة</li><li>نظام حبر متطور</li></ul>',
      price: 45000,
      sale_price: 40000,
      quantity: 3,
      category: 'طباعة حرارية',
      tags: ['DTF', 'طباعة حرارية', 'أقمشة', 'ملابس'],
      sku: 'DTF-HTP-01',
      images: [
        {
          url: '/uploads/f6ee3611-d0b1-4f24-a35b-0673f87e8c1b.jpg',
          alt: 'ماكينة طباعة حرارية DTF'
        }
      ],
      isActive: true
    },
    {
      name_ar: 'مكبس حراري 40x60 سم',
      name_en: 'Heat Press Machine 40x60cm',
      slug: 'heat-press-machine-40x60',
      short_desc: 'مكبس حراري بحجم 40x60 سم مثالي لطباعة التيشيرتات والأقمشة',
      description: '<p>مكبس حراري احترافي بحجم 40x60 سم مصمم لطباعة التيشيرتات والأقمشة المختلفة. يوفر توزيع حرارة متساوي وضغط مثالي.</p><h3>المميزات:</h3><ul><li>توزيع حرارة متساوي</li><li>تحكم دقيق في درجة الحرارة</li><li>مؤقت رقمي</li><li>قاعدة مقاومة للحرارة</li></ul>',
      price: 8500,
      sale_price: null,
      quantity: 15,
      category: 'مكابس حرارية',
      tags: ['مكبس حراري', 'طباعة', 'تيشيرت', '40x60'],
      sku: 'HP-4060-01',
      images: [
        {
          url: '/uploads/f86567df-7c61-4a39-8fbc-37063b9a8a0a.jpg',
          alt: 'مكبس حراري 40x60 سم'
        }
      ],
      isActive: true
    },
    {
      name_ar: 'ورق نقل حراري A4',
      name_en: 'Heat Transfer Paper A4',
      slug: 'heat-transfer-paper-a4',
      short_desc: 'ورق نقل حراري بحجم A4 عالي الجودة للطباعة على الأقمشة الفاتحة',
      description: '<p>ورق نقل حراري عالي الجودة بحجم A4 مخصص للطباعة على الأقمشة الفاتحة. يوفر نتائج طباعة واضحة ومتينة.</p><h3>المميزات:</h3><ul><li>جودة طباعة عالية</li><li>سهل الاستخدام</li><li>مقاوم للغسيل</li><li>ألوان زاهية</li></ul>',
      price: 25,
      sale_price: 20,
      quantity: 500,
      category: 'مواد طباعة',
      tags: ['ورق نقل', 'حراري', 'A4', 'أقمشة فاتحة'],
      sku: 'HTP-A4-LF',
      images: [
        {
          url: '/uploads/c1d746b9-e03c-4307-b03a-efeceb819e61.jpg',
          alt: 'ورق نقل حراري A4'
        }
      ],
      isActive: true
    }
  ];

  try {
    for (const product of sampleProducts) {
      console.log(`📦 إضافة منتج: ${product.name_ar}`);
      await GoogleSheetsProductsDatabase.addProduct(product);
      console.log(`✅ تم إضافة: ${product.name_ar}`);
    }
    
    console.log('🎉 تم إضافة جميع المنتجات بنجاح!');
    
    // عرض المنتجات المضافة
    const allProducts = await GoogleSheetsProductsDatabase.getAllProducts();
    console.log(`📊 إجمالي المنتجات: ${allProducts.length}`);
    
  } catch (error) {
    console.error('❌ خطأ في إضافة المنتجات:', error);
  }
}

// تشغيل الدالة
addSampleProducts();