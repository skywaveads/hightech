// اختبار تهيئة ورقة الطلبات عبر API
async function testOrdersInit() {
  try {
    console.log('🔄 بدء تهيئة ورقة الطلبات عبر API...');
    
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'GET',
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ تم تهيئة ورقة الطلبات بنجاح!');
      console.log('📋 الرسالة:', result.message);
    } else {
      console.log('❌ فشل في تهيئة ورقة الطلبات');
      console.log('📋 الرسالة:', result.message);
    }
    
  } catch (error) {
    console.error('❌ خطأ في تهيئة ورقة الطلبات:', error.message);
  }
}

// تشغيل الاختبار
testOrdersInit();