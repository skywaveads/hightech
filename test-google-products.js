const { GoogleSheetsProductsDatabase } = require('./src/lib/google-products.ts');

async function testGoogleProducts() {
  console.log('🧪 Testing Google Products Database...');
  
  try {
    // Test getting all products
    console.log('\n📋 Testing getAllProducts...');
    const products = await GoogleSheetsProductsDatabase.getAllProducts();
    console.log(`✅ Found ${products.length} products`);
    
    if (products.length > 0) {
      console.log('📦 First product:', {
        id: products[0]._id,
        name: products[0].name_ar,
        price: products[0].price
      });
    }
    
    // Test adding a new product
    console.log('\n➕ Testing addProduct...');
    const newProduct = {
      name_ar: 'منتج تجريبي',
      name_en: 'Test Product',
      slug: 'test-product-' + Date.now(),
      short_desc: 'وصف مختصر للمنتج التجريبي',
      description: 'وصف مفصل للمنتج التجريبي',
      price: 100,
      sale_price: 80,
      quantity: 10,
      category: 'cutters',
      tags: ['تجريبي', 'اختبار'],
      sku: 'TEST-' + Date.now(),
      images: ['https://example.com/image1.jpg'],
      isActive: true
    };
    
    const addedProduct = await GoogleSheetsProductsDatabase.addProduct(newProduct);
    console.log('✅ Product added with ID:', addedProduct._id);
    
    // Test getting product by ID
    console.log('\n🔍 Testing getProductById...');
    const foundProduct = await GoogleSheetsProductsDatabase.getProductById(addedProduct._id);
    if (foundProduct) {
      console.log('✅ Product found:', foundProduct.name_ar);
    } else {
      console.log('❌ Product not found');
    }
    
    // Test updating product
    console.log('\n✏️ Testing updateProduct...');
    const updateData = {
      name_ar: 'منتج تجريبي محدث',
      price: 120
    };
    const updateSuccess = await GoogleSheetsProductsDatabase.updateProduct(addedProduct._id, updateData);
    console.log('✅ Product updated:', updateSuccess);
    
    // Test deleting product
    console.log('\n🗑️ Testing deleteProduct...');
    const deleteSuccess = await GoogleSheetsProductsDatabase.deleteProduct(addedProduct._id);
    console.log('✅ Product deleted:', deleteSuccess);
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
testGoogleProducts();