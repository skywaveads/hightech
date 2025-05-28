const fetch = require('node-fetch');

async function testSingleProduct() {
  console.log('🧪 Testing single product addition...');
  
  try {
    const product = {
      name_ar: 'كاتر بلوتر هاي كت HC-720',
      name_en: 'Hi-Cut HC-720 Cutting Plotter',
      slug: 'hi-cut-hc-720-test',
      short_desc: 'كاتر بلوتر احترافي بعرض 72 سم',
      description: 'كاتر بلوتر هاي كت HC-720 احترافي',
      price: 15000,
      sale_price: 13500,
      quantity: 5,
      category: 'cutters',
      tags: ['كاتر بلوتر', 'هاي كت'],
      sku: 'HC-720-TEST',
      images: [
        {
          url: 'https://drive.google.com/uc?export=view&id=1z-ZzGtpTOInqn1kkmEi_tB7yZ6wXOrz4',
          alt: 'كاتر بلوتر هاي كت HC-720'
        }
      ],
      isActive: true
    };
    
    console.log('➕ Adding product...');
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
    console.log(`✅ Product added with ID: ${addedProduct._id}`);
    
    // Test getting all products
    console.log('\n📋 Getting all products...');
    const getResponse = await fetch('http://localhost:3000/api/products');
    const products = await getResponse.json();
    console.log(`✅ Total products: ${products.length}`);
    
    if (products.length > 0) {
      console.log('📦 Products found:');
      products.forEach((p, index) => {
        console.log(`  ${index + 1}. ${p.name_ar} (ID: ${p._id})`);
        if (p.images && p.images.length > 0) {
          console.log(`     Image: ${p.images[0].url}`);
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testSingleProduct();