const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');

// Load service account credentials
const serviceAccount = JSON.parse(fs.readFileSync('./google-service-account.json', 'utf8'));

async function testExistingSheet() {
  console.log('🔄 Testing connection to existing Google Sheet...');
  
  const SHEET_ID = '1HfbaI2kPNNLLvEcjZ9Lh6U5CKEfgH6fkoRd8xHwFaZY';
  
  try {
    const serviceAccountAuth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    console.log('✅ Successfully connected to Google Sheet!');
    console.log('📊 Sheet title:', doc.title);
    console.log('📁 Number of sheets:', doc.sheetCount);
    
    // List all sheets
    console.log('📋 Available sheets:');
    Object.values(doc.sheetsByIndex).forEach((sheet, index) => {
      console.log(`  ${index + 1}. ${sheet.title} (${sheet.rowCount} rows, ${sheet.columnCount} columns)`);
    });
    
    // Check if 'comments' sheet exists
    let commentsSheet = doc.sheetsByTitle['comments'];
    
    if (!commentsSheet) {
      console.log('📝 "comments" sheet not found. Creating it...');
      
      // Create comments sheet
      commentsSheet = await doc.addSheet({
        title: 'comments',
        headerValues: [
          'id',
          'productId',
          'userName', 
          'userEmail',
          'rating',
          'comment',
          'verified',
          'helpfulCount',
          'helpfulUsers',
          'status',
          'createdAt',
          'updatedAt'
        ]
      });
      
      console.log('✅ Created "comments" sheet with headers');
      
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
      console.log('✅ Added sample comments data');
    } else {
      console.log('✅ "comments" sheet already exists');
      
      // Load existing data
      const rows = await commentsSheet.getRows();
      console.log(`📊 Found ${rows.length} existing comments`);
      
      if (rows.length > 0) {
        console.log('📋 Sample comments:');
        rows.slice(0, 3).forEach((row, index) => {
          console.log(`  ${index + 1}. ${row.get('userName')}: ${row.get('comment')?.substring(0, 50)}...`);
        });
      }
    }
    
    console.log('\n🎉 Google Sheets database is ready!');
    console.log('🔗 Sheet URL:', `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error connecting to Google Sheet:', error);
    
    if (error.message.includes('Unable to parse')) {
      console.log('💡 Check your service account private key format');
    } else if (error.message.includes('access')) {
      console.log('💡 Make sure the service account has access to the sheet');
      console.log('💡 Share the sheet with: hightech-db@almesaly.iam.gserviceaccount.com');
    } else if (error.message.includes('not found')) {
      console.log('💡 Check your sheet ID');
    }
    
    return false;
  }
}

testExistingSheet().catch(console.error);