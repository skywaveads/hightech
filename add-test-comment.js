const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

async function addTestComment() {
  console.log('🔄 Adding test comment to Google Sheets...');
  
  try {
    // Load service account
    const serviceAccountPath = path.join(__dirname, 'google-service-account.json');
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    console.log('✅ Service account loaded');
    
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
    
    // Get comments sheet
    let commentsSheet = doc.sheetsByTitle['comments'];
    
    if (!commentsSheet) {
      console.log('❌ Comments sheet not found');
      return false;
    }
    
    console.log('✅ Comments sheet found');
    
    // Add multiple test comments with the correct column structure
    const testComments = [
      {
        id: 'comment_' + Date.now() + '_1',
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        comment: 'منتج ممتاز جداً! جودة القطع عالية والدقة مذهلة. أنصح به بشدة لأي شخص يعمل في مجال الطباعة والتصميم.',
        timestamp: new Date().toISOString(),
        stars: '5'
      },
      {
        id: 'comment_' + (Date.now() + 1000) + '_2',
        name: 'فاطمة علي',
        email: 'fatima@example.com',
        comment: 'جهاز رائع وسهل الاستخدام. الوحيد العيب أن الصوت مرتفع قليلاً أثناء العمل، لكن النتائج ممتازة.',
        timestamp: new Date().toISOString(),
        stars: '4'
      },
      {
        id: 'comment_' + (Date.now() + 2000) + '_3',
        name: 'محمد السعيد',
        email: 'mohamed@example.com',
        comment: 'استخدمه في مشروعي التجاري منذ 6 أشهر. موثوق جداً ولم يتعطل أبداً. خدمة العملاء ممتازة أيضاً.',
        timestamp: new Date().toISOString(),
        stars: '5'
      },
      {
        id: 'comment_' + (Date.now() + 3000) + '_4',
        name: 'سارة أحمد',
        email: 'sara@example.com',
        comment: 'سعر مناسب مقارنة بالجودة. التوصيل كان سريع والتعامل مع فريق المبيعات كان ممتاز.',
        timestamp: new Date().toISOString(),
        stars: '4'
      },
      {
        id: 'comment_' + (Date.now() + 4000) + '_5',
        name: 'خالد عبدالله',
        email: 'khaled@example.com',
        comment: 'جهاز احترافي بكل معنى الكلمة. دقة في القطع وسرعة في الأداء. أنصح به للمحترفين.',
        timestamp: new Date().toISOString(),
        stars: '5'
      }
    ];
    
    console.log('🔄 Adding test comments...');
    
    for (let i = 0; i < testComments.length; i++) {
      const comment = testComments[i];
      await commentsSheet.addRow(comment);
      console.log(`✅ Added comment ${i + 1}: ${comment.name} - ${comment.stars} stars`);
      
      // Small delay between additions
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('🎉 All test comments added successfully!');
    console.log(`📊 Added ${testComments.length} comments to the sheet`);
    console.log('🔗 You can view them at: https://docs.google.com/spreadsheets/d/1HfbaI2kPNNLLvEcjZ9Lh6U5CKEfgH6fkoRd8xHwFaZY/edit');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('❌ Full error:', error);
    return false;
  }
}

addTestComment();
