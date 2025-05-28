const fetch = require('node-fetch');

async function testProductDetails() {
  console.log('🔍 Testing product details...');
  
  try {
    // Test getting all products
    console.log('\n📋 Getting all products...');
    const getResponse = await fetch('http://localhost:3000/api/products');
    const products = await getResponse.json();
    console.log(`✅ Total products: ${products.length}`);
    
    if (products.length > 0) {
      console.log('\n📦 Product details:');
      products.forEach((p, index) => {
        console.log(`\n  ${index + 1}. Product Details:`);
        console.log(`     ID: ${p._id}`);
        console.log(`     Name (AR): ${p.name_ar}`);
        console.log(`     Name (EN): ${p.name_en}`);
        console.log(`     Price: ${p.price} EGP`);
        console.log(`     Sale Price: ${p.sale_price || 'N/A'}`);
        console.log(`     Category: ${p.category}`);
        console.log(`     Quantity: ${p.quantity}`);
        console.log(`     SKU: ${p.sku}`);
        console.log(`     Active: ${p.isActive}`);
        console.log(`     Tags: ${p.tags ? p.tags.join(', ') : 'None'}`);
        console.log(`     Images: ${p.images ? p.images.length : 0}`);
        if (p.images && p.images.length > 0) {
          p.images.forEach((img, imgIndex) => {
            console.log(`       Image ${imgIndex + 1}: ${img.url}`);
          });
        }
        console.log(`     Created: ${p.createdAt}`);
        console.log(`     Updated: ${p.updatedAt}`);
      });
      
      // Check if any products are active
      const activeProducts = products.filter(p => p.isActive === true);
      console.log(`\n✅ Active products: ${activeProducts.length}`);
      
      if (activeProducts.length === 0) {
        console.log('⚠️  No active products found! This might be why products don\'t show on the website.');
      }
    } else {
      console.log('⚠️ No products found in database');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the development server is running with: npm run dev');
    }
  }
}

testProductDetails();