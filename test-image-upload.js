const fs = require('fs');
const path = require('path');

async function testImageUpload() {
  console.log('🧪 Testing Image Upload API...');
  
  try {
    // Create a simple test image (1x1 pixel PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x0F, 0x00, 0x00,
      0x01, 0x00, 0x01, 0x5C, 0xC2, 0x8A, 0x8E, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    // Save test image
    const testImagePath = path.join(__dirname, 'test-image.png');
    fs.writeFileSync(testImagePath, testImageBuffer);
    console.log('✅ Test image created:', testImagePath);
    
    // Create FormData
    const FormData = require('form-data');
    const form = new FormData();
    form.append('file', fs.createReadStream(testImagePath), {
      filename: 'test-image.png',
      contentType: 'image/png'
    });
    
    // Test upload
    console.log('\n📤 Testing upload to /api/upload-image...');
    const fetch = require('node-fetch');
    
    const response = await fetch('http://localhost:3000/api/upload-image', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Upload successful!');
      console.log('📷 Image URL:', result.url);
      console.log('📁 File name:', result.fileName);
    } else {
      console.log('❌ Upload failed:', result.error);
      if (result.details) {
        console.log('🔍 Details:', result.details);
      }
    }
    
    // Clean up
    fs.unlinkSync(testImagePath);
    console.log('🧹 Test image cleaned up');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run test
testImageUpload();