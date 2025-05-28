const fetch = require('node-fetch');

async function resetAndSeed() {
  console.log('🔄 Resetting and seeding products...');
  
  try {
    // First, let's add a fresh product to test
    const testProduct = {
      name_ar: 'كاتر بلوتر هاي كت HC-720 الجديد',
      name_en: 'Hi-Cut HC-720 New Cutting Plotter',
      slug: 'hi-cut-hc-720-new-' + Date.now(),
      short_desc: 'كاتر بلوتر احترافي جديد بعرض 72 سم',
      description: 'كاتر بلوتر هاي كت HC-720 الجديد - احترافي ومتطور',
      price: 16000,
      sale_price: 14500,
      quantity: 3,
      category: 'cutters',
      tags: ['كاتر بلوتر', 'هاي كت', 'جديد'],
      sku: 'HC-720-NEW-' + Date.now(),
      images: [
        {
          url: 'https://drive.google.com/uc?export=view&id=1z-ZzGtpTOInqn1kkmEi_tB7yZ6wXOrz4',
          alt: 'كاتر بلوتر هاي كت HC-720 الجديد'
        }
      ],
      isActive: true
    };
    
    console.log('➕ Adding fresh product...');
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testProduct),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to add product: ${errorData.error}`);
    }
    
    const addedProduct = await response.json();
    console.log(`✅ Product added with ID: ${addedProduct._id}`);
    
    // Wait a moment for the data to be saved
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test getting all products
    console.log('\n📋 Getting all products...');
    const getResponse = await fetch('http://localhost:3000/api/products');
    const products = await getResponse.json();
    console.log(`✅ Total products: ${products.length}`);
    
    if (products.length > 0) {
      console.log('📦 Products found:');
      products.forEach((p, index) => {
        console.log(`  ${index + 1}. ${p.name_ar} (ID: ${p._id})`);
        console.log(`     Price: ${p.price} EGP`);
        console.log(`     Category: ${p.category}`);
        console.log(`     Active: ${p.isActive}`);
        if (p.images && p.images.length > 0) {
          console.log(`     Image: ${p.images[0].url}`);
        }
        console.log('');
      });
    }
    
    console.log('\n🎉 Reset and seed completed successfully!');
    
  } catch (error) {
    console.error('❌ Reset and seed failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the development server is running with: npm run dev');
    }
  }
}

resetAndSeed();