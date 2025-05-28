const { GoogleSheetsDatabase } = require('./src/lib/google-sheets');

async function testGoogleSheetsDirect() {
  try {
    console.log('Testing Google Sheets directly...');
    
    const commentData = {
      productId: 'rush-cutter-plotter',
      userName: 'Test User Direct',
      userEmail: 'testdirect@example.com',
      comment: 'This is a direct test comment',
      rating: 5,
      title: 'Test Title',
      pros: ['Good quality'],
      cons: ['Expensive'],
      status: 'pending',
      verified: false,
      helpful: {
        count: 0,
        users: []
      }
    };
    
    console.log('Adding comment directly to Google Sheets...');
    const result = await GoogleSheetsDatabase.addComment(commentData);
    console.log('Success! Comment added:', result);
    
  } catch (error) {
    console.error('Direct test error:', error);
    console.error('Error stack:', error.stack);
  }
}

testGoogleSheetsDirect();