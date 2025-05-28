const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');

// تم إضافة هذا التعليق كاختبار للتأكد من أن النظام يعمل بشكل صحيح
// This comment was added as a test to ensure the system works correctly

async function finalTest() {
  console.log('🔄 Final Google Sheets test...');
  
  try {
    // Load service account
    const serviceAccount = JSON.parse(fs.readFileSync('./google-service-account.json', 'utf8'));
    console.log('✅ Service account loaded');
    console.log('📧 Client email:', serviceAccount.client_email);
    
    // Create auth
    const serviceAccountAuth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    // Connect to sheet
    const SHEET_ID = '1HfbaI2kPNNLLvEcjZ9Lh6U5CKEfgH6fkoRd8xHwFaZY';
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    
    console.log('🔄 Connecting to sheet...');
    await doc.loadInfo();
    
    console.log('✅ Connected successfully!');
    console.log('📊 Sheet title:', doc.title);
    console.log('🔗 Sheet URL: https://docs.google.com/spreadsheets/d/1HfbaI2kPNNLLvEcjZ9Lh6U5CKEfgH6fkoRd8xHwFaZY/edit');
    
    // Get comments sheet
    let commentsSheet = doc.sheetsByTitle['comments'];
    
    if (!commentsSheet) {
      console.log('📝 Creating "comments" sheet...');
      commentsSheet = await doc.addSheet({
        title: 'comments',
        headerValues: [
          'id', 'productId', 'userName', 'userEmail', 'rating', 
          'comment', 'verified', 'helpfulCount', 'helpfulUsers', 
          'status', 'createdAt', 'updatedAt'
        ]
      });
      console.log('✅ Comments sheet created');
      
      // Add sample data
      const sampleData = [
        {
          id: 'comment_1',
          productId: 'high-tech-cutter-plotter',
          userName: 'أحمد محمد',
          userEmail: 'ahmed@example.com',
          rating: '5',
          comment: 'منتج ممتاز جداً! جودة القطع عالية والدقة مذهلة. أنصح به بشدة لأي شخص يعمل في مجال الطباعة والتصميم.',
          verified: 'true',
          helpfulCount: '12',
          helpfulUsers: 'user1,user2,user3',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'comment_2',
          productId: 'high-tech-cutter-plotter',
          userName: 'فاطمة علي',
          userEmail: 'fatima@example.com',
          rating: '4',
          comment: 'جهاز رائع وسهل الاستخدام. الوحيد العيب أن الصوت مرتفع قليلاً أثناء العمل، لكن النتائج ممتازة.',
          verified: 'false',
          helpfulCount: '8',
          helpfulUsers: 'user4,user5',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      await commentsSheet.addRows(sampleData);
      console.log('✅ Sample data added');
    } else {
      console.log('✅ Comments sheet exists');
    }
    
    // Test reading data
    const rows = await commentsSheet.getRows();
    console.log(`📊 Found ${rows.length} comments in sheet`);
    
    if (rows.length > 0) {
      console.log('📋 Sample comments:');
      rows.slice(0, 2).forEach((row, index) => {
        console.log(`  ${index + 1}. ${row.get('userName')}: ${row.get('comment')?.substring(0, 50)}...`);
      });
    }
    
    // Test adding new comment
    console.log('🔄 Testing add new comment...');
    const newComment = {
      id: 'test_' + Date.now(),
      productId: 'high-tech-cutter-plotter',
      userName: 'مختبر النظام النهائي',
      userEmail: 'final-test@example.com',
      rating: '5',
      comment: 'هذا تعليق تجريبي نهائي للتأكد من أن النظام يعمل بشكل مثالي مع Google Sheets.',
      verified: 'false',
      helpfulCount: '0',
      helpfulUsers: '',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await commentsSheet.addRow(newComment);
    console.log('✅ New comment added successfully!');
    
    console.log('\n🎉 Google Sheets database is fully functional!');
    console.log('🔗 You can view the data at: https://docs.google.com/spreadsheets/d/1HfbaI2kPNNLLvEcjZ9Lh6U5CKEfgH6fkoRd8xHwFaZY/edit');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('access')) {
      console.log('\n💡 SOLUTION: Share the Google Sheet with the service account:');
      console.log('1. Open: https://docs.google.com/spreadsheets/d/1HfbaI2kPNNLLvEcjZ9Lh6U5CKEfgH6fkoRd8xHwFaZY/edit');
      console.log('2. Click "Share" button');
      console.log('3. Add email: hightech-db@almesaly.iam.gserviceaccount.com');
      console.log('4. Give "Editor" permissions');
      console.log('5. Click "Send"');
    }
    
    return false;
  }
}

finalTest();