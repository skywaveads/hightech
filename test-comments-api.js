const fetch = require('node-fetch');

async function testAddComment() {
  try {
    console.log('Testing comment API...');
    
    const response = await fetch('http://localhost:3000/api/comments/rush-cutter-plotter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        comment: 'This is a test comment for the API',
        rating: 5
      })
    });
    
    console.log('Response status:', response.status);
    const data = await response.text();
    console.log('Response data:', data);
    
    if (!response.ok) {
      console.error('Error response:', data);
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testAddComment();