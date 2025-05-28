const fetch = require('node-fetch');

async function testDirectAPI() {
  try {
    console.log('Testing API with detailed logging...');
    
    // First test - simple comment
    const response = await fetch('http://localhost:3000/api/comments/rush-cutter-plotter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User Detailed',
        email: 'testdetailed@example.com',
        comment: 'This is a detailed test comment to see what happens',
        rating: 5,
        title: 'Test Title'
      })
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Raw response:', responseText);
    
    try {
      const data = JSON.parse(responseText);
      console.log('Parsed response:', data);
    } catch (parseError) {
      console.log('Could not parse response as JSON');
    }
    
    if (!response.ok) {
      console.error('Request failed with status:', response.status);
    }
    
  } catch (error) {
    console.error('Test error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
  }
}

testDirectAPI();