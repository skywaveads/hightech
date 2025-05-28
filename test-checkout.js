// اختبار إنشاء طلب تجريبي
async function testCheckout() {
  try {
    console.log('🔄 بدء اختبار إنشاء طلب...');
    
    // بيانات العميل التجريبية
    const customerData = {
      firstName: 'أحمد',
      lastName: 'محمد',
      email: 'ahmed@example.com',
      phone: '01234567890',
      country: 'مصر',
      countryCode: 'EG',
      dialCode: '+20',
      city: 'القاهرة',
      address: 'شارع التحرير، وسط البلد',
      postalCode: '11511',
      notes: 'يرجى التوصيل في المساء'
    };
    
    // منتجات تجريبية
    const cartItems = [
      {
        product: {
          _id: 'test-product-1',
          name_ar: 'كاتر بلوتر هاي كت',
          name_en: 'High Cut Plotter',
          price: 15000,
          images: [{ url: '/images/test.jpg', alt: 'Test Product' }]
        },
        quantity: 1
      },
      {
        product: {
          _id: 'test-product-2',
          name_ar: 'مكبس حراري',
          name_en: 'Heat Press',
          price: 8000,
          images: [{ url: '/images/test2.jpg', alt: 'Test Product 2' }]
        },
        quantity: 2
      }
    ];
    
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: customerData,
        cartItems: cartItems,
      }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ تم إنشاء الطلب بنجاح!');
      console.log('📋 رقم الطلب:', result.orderNumber);
      console.log('💰 المجموع الكلي:', result.order.total, 'ج.م');
      console.log('🚚 تكلفة الشحن:', result.order.shipping, 'ج.م');
    } else {
      console.log('❌ فشل في إنشاء الطلب');
      console.log('📋 الرسالة:', result.message);
    }
    
  } catch (error) {
    console.error('❌ خطأ في اختبار الطلب:', error.message);
  }
}

// تشغيل الاختبار
testCheckout();