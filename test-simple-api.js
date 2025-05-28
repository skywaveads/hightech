const fetch = require('node-fetch');

async function testSimpleAPI() {
  try {
    console.log('Testing simple API...');
    
    const response = await fetch('http://localhost:3000/api/test-comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test: 'data',
        message: 'Hello from test'
      })
    });
    
    console.log('Response status:', response.status);
    const data = await response.text();
    console.log('Response data:', data);
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testSimpleAPI();