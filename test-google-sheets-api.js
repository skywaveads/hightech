const fetch = require('node-fetch');

async function testGoogleSheetsAPI() {
  try {
    console.log('Testing Google Sheets API...');
    
    const response = await fetch('http://localhost:3000/api/test-google-sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test: 'google-sheets'
      })
    });
    
    console.log('Response status:', response.status);
    const data = await response.text();
    console.log('Response data:', data);
    
    try {
      const parsed = JSON.parse(data);
      console.log('Parsed response:', JSON.stringify(parsed, null, 2));
    } catch (parseError) {
      console.log('Could not parse response as JSON');
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testGoogleSheetsAPI();