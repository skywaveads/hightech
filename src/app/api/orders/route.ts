import { NextRequest, NextResponse } from 'next/server';
import { initializeOrdersSheet, addOrderToSheet } from '@/lib/google-orders';
import { Order, OrderItem, CustomerInfo } from '@/types/order';
import { CartItem } from '@/contexts/CartContext';

// تهيئة ورقة الطلبات
export async function GET() {
  try {
    const result = await initializeOrdersSheet();
    return NextResponse.json(result);
  } catch (error) {
    console.error('خطأ في تهيئة ورقة الطلبات:', error);
    return NextResponse.json(
      { success: false, message: 'فشل في تهيئة ورقة الطلبات' },
      { status: 500 }
    );
  }
}

// إنشاء طلب جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, cartItems } = body;

    // التحقق من صحة البيانات
    if (!customer || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { success: false, message: 'بيانات الطلب غير مكتملة' },
        { status: 400 }
      );
    }

    // التحقق من الحقول المطلوبة
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'country', 'city', 'address'];
    for (const field of requiredFields) {
      if (!customer[field] || customer[field].trim() === '') {
        return NextResponse.json(
          { success: false, message: `حقل ${field} مطلوب` },
          { status: 400 }
        );
      }
    }

    // تحويل عناصر السلة إلى عناصر الطلب
    const orderItems: OrderItem[] = cartItems.map((item: CartItem) => ({
      productId: item.product._id,
      productName: item.product.name_ar,
      productNameEn: item.product.name_en || item.product.name_ar,
      price: item.product.price,
      quantity: item.quantity,
      total: item.product.price * item.quantity,
      image: item.product.images[0]?.url || '',
    }));

    // حساب المجاميع
    const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
    const shipping = calculateShipping(customer.country, subtotal);
    const total = subtotal + shipping;

    // إنشاء رقم الطلب
    const orderNumber = generateOrderNumber();

    // إنشاء كائن الطلب
    const order: Order = {
      id: `order_${Date.now()}`,
      orderNumber,
      customer: customer as CustomerInfo,
      items: orderItems,
      subtotal,
      shipping,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // حفظ الطلب في Google Sheets
    const result = await addOrderToSheet(order);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'تم استلام طلبك بنجاح',
        orderNumber,
        order,
      });
    } else {
      throw new Error(result.message);
    }

  } catch (error) {
    console.error('خطأ في إنشاء الطلب:', error);
    return NextResponse.json(
      { success: false, message: 'فشل في إنشاء الطلب' },
      { status: 500 }
    );
  }
}

// دالة لحساب تكلفة الشحن
function calculateShipping(country: string, subtotal: number): number {
  // حساب تكلفة الشحن
  if (subtotal >= 5000) {
    return 0;
  }

  // أسعار الشحن حسب الدولة
  const shippingRates: { [key: string]: number } = {
    'مصر': 50,
    'السعودية': 100,
    'الإمارات العربية المتحدة': 120,
    'الكويت': 100,
    'قطر': 100,
    'البحرين': 100,
    'عُمان': 120,
    'الأردن': 80,
    'لبنان': 80,
    'سوريا': 80,
    'العراق': 150,
    'فلسطين': 80,
    'ليبيا': 150,
    'تونس': 150,
    'الجزائر': 150,
    'المغرب': 150,
    'السودان': 200,
    'اليمن': 200,
    'الصومال': 250,
    'جيبوتي': 250,
    'جزر القمر': 300,
    'موريتانيا': 200,
  };

  return shippingRates[country] || 150; // سعر افتراضي
}

// دالة لإنشاء رقم الطلب
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  
  return `HT${year}${month}${day}${random}`;
}