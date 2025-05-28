const fetch = require('node-fetch');

async function testCommentsAPI() {
  console.log('🔄 Testing Comments API...');
  
  const baseUrl = 'http://localhost:3000';
  const productId = 'cutter-plotter-rush';
  
  try {
    // Test GET comments
    console.log('\n📥 Testing GET comments...');
    const getResponse = await fetch(`${baseUrl}/api/comments/${productId}`);
    const getResult = await getResponse.json();
    
    console.log('GET Response Status:', getResponse.status);
    console.log('GET Response:', JSON.stringify(getResult, null, 2));
    
    // Test POST comment
    console.log('\n📤 Testing POST comment...');
    const testComment = {
      name: 'أحمد محمد',
      email: 'ahmed.test@example.com',
      comment: 'هذا تعليق تجريبي للتأكد من عمل API بشكل صحيح. المنتج ممتاز جداً!',
      stars: 5
    };
    
    const postResponse = await fetch(`${baseUrl}/api/comments/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testComment)
    });
    
    const postResult = await postResponse.json();
    
    console.log('POST Response Status:', postResponse.status);
    console.log('POST Response:', JSON.stringify(postResult, null, 2));
    
    if (postResponse.status === 201) {
      console.log('✅ Comment added successfully!');
      
      // Test GET again to see the new comment
      console.log('\n📥 Testing GET comments again to see new comment...');
      const getResponse2 = await fetch(`${baseUrl}/api/comments/${productId}`);
      const getResult2 = await getResponse2.json();
      
      console.log('GET Response Status:', getResponse2.status);
      console.log('Total comments:', getResult2.total);
      console.log('Comments count:', getResult2.comments?.length || 0);
      
      if (getResult2.comments && getResult2.comments.length > 0) {
        console.log('Latest comment:', getResult2.comments[0]);
      }
    } else {
      console.log('❌ Failed to add comment');
    }
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.error('Full error:', error);
  }
}

// Check if server is running first
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000');
    return response.status < 500;
  } catch (error) {
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Server is not running on http://localhost:3000');
    console.log('Please start the server first with: npm run dev');
    return;
  }
  
  console.log('✅ Server is running');
  await testCommentsAPI();
}

main();
