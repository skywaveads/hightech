const fetch = require('node-fetch');

async function testProductsAPI() {
  console.log('🧪 Testing Products API...');
  
  try {
    // Test getting all products from API
    console.log('\n📋 Testing GET /api/products...');
    const response = await fetch('http://localhost:3000/api/products');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products = await response.json();
    console.log(`✅ Found ${products.length} products from API`);
    
    if (products.length > 0) {
      console.log('📦 First product:', {
        id: products[0]._id,
        name: products[0].name_ar,
        price: products[0].price,
        images: products[0].images?.length || 0
      });
      
      // Check if images have Google Drive URLs
      const googleDriveImages = products.filter(p => 
        p.images && p.images.some(img => img.url && img.url.includes('drive.google.com'))
      );
      
      console.log(`📸 Products with Google Drive images: ${googleDriveImages.length}`);
      
      if (googleDriveImages.length > 0) {
        console.log('🔗 Sample Google Drive image URL:', googleDriveImages[0].images[0].url);
      }
    } else {
      console.log('⚠️ No products found in database');
    }
    
    console.log('\n🎉 API test completed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the development server is running with: npm run dev');
    }
  }
}

// Run test
testProductsAPI();