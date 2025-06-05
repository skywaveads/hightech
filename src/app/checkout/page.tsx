'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { arabCountries, Country } from '@/data/countries';
import { OrderFormData } from '@/types/order';
import { trackCheckoutInitiation, trackOrderCompletion } from '@/lib/order-tracking';
import FacebookTracker from '@/components/tracking/FacebookTracker';
import {
  ShoppingCart,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Truck,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    countryCode: '',
    dialCode: '',
    city: '',
    address: '',
    postalCode: '',
    notes: '',
  });

  // التحقق من وجود منتجات في السلة وتتبع بدء الشراء
  useEffect(() => {
    if (items.length === 0 && !showSuccess) {
      router.push('/products');
    } else if (items.length > 0) {
      // تتبع بدء عملية الشراء
      trackCheckoutInitiation(items);
    }
  }, [items, router, showSuccess]);

  // حساب تكلفة الشحن
  const calculateShipping = (country: string, subtotal: number): number => {
    if (subtotal >= 5000) return 0;
    
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

    return shippingRates[country] || 150;
  };

  const subtotal = getTotalPrice();
  const shipping = selectedCountry ? calculateShipping(selectedCountry.name, subtotal) : 0;
  const total = subtotal + shipping;

  // التعامل مع تغيير الدولة
  const handleCountryChange = (countryCode: string) => {
    const country = arabCountries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      setFormData(prev => ({
        ...prev,
        country: country.name,
        countryCode: country.code,
        dialCode: country.dialCode,
      }));
      // إزالة خطأ الدولة إذا كان موجوداً
      if (errors.country) {
        setErrors(prev => ({ ...prev, country: '' }));
      }
    }
  };

  // التعامل مع تغيير الحقول
  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // إزالة الخطأ عند الكتابة
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // التحقق من صحة البيانات
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'الاسم الأول مطلوب';
    if (!formData.lastName.trim()) newErrors.lastName = 'الاسم الأخير مطلوب';
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!formData.country) newErrors.country = 'الدولة مطلوبة';
    if (!formData.city.trim()) newErrors.city = 'المدينة مطلوبة';
    if (!formData.address.trim()) newErrors.address = 'العنوان مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // إرسال الطلب
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: formData,
          cartItems: items,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // تتبع إتمام الشراء
        await trackOrderCompletion({
          orderId: result.orderNumber,
          items: items,
          total: getTotalPrice(),
          currency: 'EGP',
          customerEmail: formData.email,
          customerPhone: formData.phone,
        });

        setOrderNumber(result.orderNumber);
        setShowSuccess(true);
        clearCart();
      } else {
        throw new Error(result.message || 'فشل في إرسال الطلب');
      }
    } catch (error) {
      console.error('خطأ في إرسال الطلب:', error);
      alert('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // صفحة النجاح
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">تم استلام طلبك!</h1>
            <p className="text-gray-600">شكراً لك على ثقتك في هاي تكنولوجي</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">رقم الطلب</p>
            <p className="text-lg font-bold text-blue-600">{orderNumber}</p>
          </div>
          
          <div className="text-sm text-gray-600 mb-6">
            <p>سيتم التواصل معك خلال 24 ساعة لتأكيد الطلب وترتيب الشحن</p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => router.push('/products')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              متابعة التسوق
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <FacebookTracker
        contentName="Checkout Page"
        contentCategory="checkout"
        contentId="checkout-main"
        value={getTotalPrice()}
        currency="EGP"
      />
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الطلب</h1>
          <p className="text-gray-600">أكمل بياناتك لإتمام عملية الشراء</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* نموذج البيانات */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* بيانات العميل */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  البيانات الشخصية
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم الأول *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="أدخل الاسم الأول"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم الأخير *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="أدخل الاسم الأخير"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      البريد الإلكتروني *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="example@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الهاتف *
                    </label>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="h-full px-3 py-2 border border-r-0 rounded-r-lg border-gray-300 bg-gray-50 text-sm"
                        >
                          <option value="">اختر</option>
                          {arabCountries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.flag} {country.dialCode}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123456789"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* عنوان الشحن */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  عنوان الشحن
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الدولة *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        value={formData.countryCode}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.country ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">اختر الدولة</option>
                        {arabCountries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      المدينة *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="أدخل المدينة"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    العنوان التفصيلي *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="أدخل العنوان التفصيلي (الشارع، رقم المبنى، الحي...)"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الرمز البريدي (اختياري)
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ملاحظات إضافية (اختياري)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="أي ملاحظات أو تعليمات خاصة للتوصيل..."
                  />
                </div>
              </div>

              {/* زر الإرسال */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      جاري إرسال الطلب...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      إتمام الطلب
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ملخص الطلب */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                ملخص الطلب
              </h2>

              {/* المنتجات */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product._id} className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.images[0]?.url || '/images/placeholder.jpg'}
                        alt={item.product.name_ar}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name_ar}
                      </h3>
                      <p className="text-sm text-gray-500">
                        الكمية: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {(item.product.price * item.quantity).toLocaleString()} ج.م
                    </div>
                  </div>
                ))}
              </div>

              {/* المجاميع */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المجموع الفرعي:</span>
                  <span className="font-medium">{subtotal.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    الشحن:
                  </span>
                  <span className="font-medium">
                    {shipping === 0 ? 'مجاني' : `${shipping.toLocaleString()} ج.م`}
                  </span>
                </div>
                {shipping === 0 && subtotal >= 5000 && (
                  <div className="flex items-center text-xs text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    خدمة توصيل موثوقة
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>المجموع الكلي:</span>
                  <span className="text-blue-600">{total.toLocaleString()} ج.م</span>
                </div>
              </div>

              {/* معلومات الشحن */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">معلومات مهمة:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• سيتم التواصل معك خلال 24 ساعة</li>
                      <li>• الدفع عند الاستلام متاح</li>
                      <li>• ضمان على جميع المنتجات</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}