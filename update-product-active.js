const fetch = require('node-fetch');

async function updateProductActive() {
  console.log('🔄 Updating product to be active...');
  
  try {
    // First get the product
    console.log('\n📋 Getting current product...');
    const getResponse = await fetch('http://localhost:3000/api/products');
    const products = await getResponse.json();
    
    if (products.length === 0) {
      console.log('❌ No products found');
      return;
    }
    
    const product = products[0];
    console.log(`📦 Found product: ${product.name_ar} (Active: ${product.isActive})`);
    
    // Update the product to be active
    const updatedProduct = {
      ...product,
      isActive: true
    };
    
    console.log('\n🔄 Updating product...');
    const updateResponse = await fetch(`http://localhost:3000/api/products/${product._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    
    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(`Failed to update product: ${errorData.error}`);
    }
    
    const result = await updateResponse.json();
    console.log(`✅ Product updated successfully`);
    
    // Verify the update
    console.log('\n🔍 Verifying update...');
    const verifyResponse = await fetch('http://localhost:3000/api/products');
    const updatedProducts = await verifyResponse.json();
    
    if (updatedProducts.length > 0) {
      const verifiedProduct = updatedProducts[0];
      console.log(`📦 Verified product: ${verifiedProduct.name_ar} (Active: ${verifiedProduct.isActive})`);
      
      if (verifiedProduct.isActive) {
        console.log('🎉 Product is now active and should appear on the website!');
      } else {
        console.log('⚠️ Product is still not active. There might be an issue with the update.');
      }
    }
    
  } catch (error) {
    console.error('❌ Update failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the development server is running with: npm run dev');
    }
  }
}

updateProductActive();