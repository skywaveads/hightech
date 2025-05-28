const { LocalStorageDatabase } = require('./src/lib/local-storage');

async function testLocalStorage() {
  try {
    console.log('Testing LocalStorage for comments...');
    
    // Test adding a comment
    const commentData = {
      productId: 'rush-cutter-plotter',
      userName: 'Test User',
      userEmail: 'test@example.com',
      comment: 'This is a test comment',
      rating: 5,
      status: 'pending',
      verified: false,
      helpful: {
        count: 0,
        users: []
      }
    };
    
    console.log('Adding comment:', commentData);
    const newComment = await LocalStorageDatabase.addComment(commentData);
    console.log('Comment added successfully:', newComment);
    
    // Test getting comments
    console.log('Getting comments for product: rush-cutter-plotter');
    const result = await LocalStorageDatabase.getCommentsByProductId('rush-cutter-plotter');
    console.log('Comments retrieved:', result);
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testLocalStorage();