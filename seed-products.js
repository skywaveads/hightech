const fetch = require('node-fetch');

// Sample products with Google Drive image URLs
const sampleProducts = [
  {
    name_ar: 'كاتر بلوتر هاي كت HC-720',
    name_en: 'Hi-Cut HC-720 Cutting Plotter',
    slug: 'hi-cut-hc-720',
    short_desc: 'كاتر بلوتر احترافي بعرض 72 سم مع دقة عالية وسرعة فائقة',
    description: 'كاتر بلوتر هاي كت HC-720 هو الحل الأمثل للمشاريع الصغيرة والمتوسطة. يتميز بدقة عالية في القطع وسهولة الاستخدام مع برنامج FlexiSign المرفق.',
    price: 15000,
    sale_price: 13500,
    quantity: 5,
    category: 'cutters',
    tags: ['كاتر بلوتر', 'هاي كت', 'قطع الفينيل'],
    sku: 'HC-720-001',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1z-ZzGtpTOInqn1kkmEi_tB7yZ6wXOrz4',
        alt: 'كاتر بلوتر هاي كت HC-720'
      }
    ],
    isActive: true
  },
  {
    name_ar: 'كاتر بلوتر ريفينا برو RV-1350',
    name_en: 'Redsail Vinyl Cutter RV-1350',
    slug: 'redsail-rv-1350',
    short_desc: 'كاتر بلوتر ريفينا برو بعرض 135 سم للمشاريع الكبيرة',
    description: 'كاتر بلوتر ريفينا برو RV-1350 مصمم للاستخدام التجاري المكثف. يدعم عرض قطع حتى 135 سم مع نظام تحكم متقدم.',
    price: 25000,
    sale_price: null,
    quantity: 3,
    category: 'cutters',
    tags: ['ريفينا', 'كاتر بلوتر كبير', 'تجاري'],
    sku: 'RV-1350-001',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1ABC123def456ghi789jkl',
        alt: 'كاتر بلوتر ريفينا برو RV-1350'
      }
    ],
    isActive: true
  },
  {
    name_ar: 'مكبس حراري 38×38 سم',
    name_en: 'Heat Press Machine 38x38cm',
    slug: 'heat-press-38x38',
    short_desc: 'مكبس حراري احترافي لطباعة التيشيرتات والأقمشة',
    description: 'مكبس حراري عالي الجودة بمساحة 38×38 سم، مثالي لطباعة التيشيرتات والأقمشة باستخدام الفينيل الحراري.',
    price: 8500,
    sale_price: 7500,
    quantity: 8,
    category: 'heat-press',
    tags: ['مكبس حراري', 'طباعة تيشيرتات', 'فينيل حراري'],
    sku: 'HP-38-001',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1XYZ789abc123def456ghi',
        alt: 'مكبس حراري 38×38 سم'
      }
    ],
    isActive: true
  },
  {
    name_ar: 'فينيل حراري PU - أبيض',
    name_en: 'PU Heat Transfer Vinyl - White',
    slug: 'pu-vinyl-white',
    short_desc: 'فينيل حراري عالي الجودة باللون الأبيض - لفة 50 سم',
    description: 'فينيل حراري من نوع PU عالي الجودة، سهل القطع والنقل، مقاوم للغسيل والحرارة.',
    price: 120,
    sale_price: 100,
    quantity: 25,
    category: 'vinyl',
    tags: ['فينيل حراري', 'أبيض', 'PU'],
    sku: 'PU-WHITE-50',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1DEF456ghi789jkl123mno',
        alt: 'فينيل حراري PU أبيض'
      }
    ],
    isActive: true
  },
  {
    name_ar: 'حبر إيكو سولفنت - أسود',
    name_en: 'Eco Solvent Ink - Black',
    slug: 'eco-solvent-ink-black',
    short_desc: 'حبر إيكو سولفنت عالي الجودة للطباعة الخارجية',
    description: 'حبر إيكو سولفنت مقاوم للعوامل الجوية، مثالي للطباعة على الفينيل والبانر.',
    price: 450,
    sale_price: null,
    quantity: 15,
    category: 'ink',
    tags: ['حبر', 'إيكو سولفنت', 'أسود'],
    sku: 'ECO-INK-BK',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1GHI789jkl123mno456pqr',
        alt: 'حبر إيكو سولفنت أسود'
      }
    ],
    isActive: true
  }
];

async function seedProducts() {
  console.log('🌱 Seeding products to Google Sheets...');
  
  try {
    for (let i = 0; i < sampleProducts.length; i++) {
      const product = sampleProducts[i];
      console.log(`\n➕ Adding product ${i + 1}/${sampleProducts.length}: ${product.name_ar}`);
      
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add product: ${errorData.error}`);
      }
      
      const addedProduct = await response.json();
      console.log(`✅ Added product with ID: ${addedProduct._id}`);
    }
    
    console.log('\n🎉 All products seeded successfully!');
    
    // Test getting all products
    console.log('\n📋 Verifying products...');
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    console.log(`✅ Total products in database: ${products.length}`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the development server is running with: npm run dev');
    }
  }
}

// Run seeding
seedProducts();