const { initializeOrdersSheet } = require('./src/lib/google-orders.ts');

async function testOrdersSheet() {
  try {
    console.log('🔄 بدء تهيئة ورقة الطلبات...');
    
    const result = await initializeOrdersSheet();
    
    if (result.success) {
      console.log('✅ تم تهيئة ورقة الطلبات بنجاح!');
      console.log('📋 الرسالة:', result.message);
    } else {
      console.log('❌ فشل في تهيئة ورقة الطلبات');
    }
    
  } catch (error) {
    console.error('❌ خطأ في تهيئة ورقة الطلبات:', error.message);
  }
}

// تشغيل الاختبار
testOrdersSheet();