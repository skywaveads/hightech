const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');

async function testSheetAccess() {
  console.log('🔄 Testing Google Sheets access...');
  
  try {
    // Load service account
const path = require('path');
const serviceAccountPath = path.join(__dirname, 'google-service-account.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    console.log('✅ Service account loaded');
    console.log('📧 Client email:', serviceAccount.client_email);
    
    // Create auth
    const serviceAccountAuth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    console.log('✅ JWT auth created');
    
    // Connect to sheet
    const SHEET_ID = '1HfbaI2kPNNLLvEcjZ9Lh6U5CKEfgH6fkoRd8xHwFaZY';
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    
    console.log('🔄 Connecting to sheet...');
    await doc.loadInfo();
    
    console.log('✅ Connected successfully!');
    console.log('📊 Sheet title:', doc.title);
    console.log('📁 Sheets count:', doc.sheetCount);
    
    // List sheets
    console.log('📋 Available sheets:');
    Object.values(doc.sheetsByIndex).forEach((sheet, index) => {
      console.log(`  ${index + 1}. ${sheet.title}`);
    });
    
    // Check for comments sheet
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
    } else {
      console.log('✅ Comments sheet exists');
    }
    
    // Test adding a row
    console.log('🔄 Testing add row...');
    await commentsSheet.addRow({
      id: 'test_' + Date.now(),
      productId: 'high-tech-cutter-plotter',
      userName: 'اختبار النظام',
      userEmail: 'test@example.com',
      rating: '5',
      comment: 'هذا تعليق تجريبي للتأكد من عمل النظام',
      verified: 'false',
      helpfulCount: '0',
      helpfulUsers: '',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    console.log('✅ Test row added successfully!');
    console.log('🎉 Google Sheets is working correctly!');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('Unable to parse')) {
      console.log('💡 Private key format issue');
    } else if (error.message.includes('access')) {
      console.log('💡 Access denied. Please share the sheet with:');
      console.log('   hightech-db@almesaly.iam.gserviceaccount.com');
      console.log('   Give it "Editor" permissions');
    } else if (error.message.includes('not found')) {
      console.log('💡 Sheet not found. Check the Sheet ID');
    }
    
    return false;
  }
}

testSheetAccess();