# نظام إدارة الطلبات - هاي تكنولوجي

## 📋 نظرة عامة

تم إنشاء نظام متكامل لإدارة الطلبات يتضمن:
- صفحة checkout كاملة مع فورم شامل
- تكامل مع Google Sheets لحفظ الطلبات
- حساب تكلفة الشحن حسب الدولة
- دعم جميع الدول العربية (22 دولة)

## 🚀 الميزات الرئيسية

### 1. صفحة الـ Checkout (`/checkout`)
- **فورم شامل** لبيانات العميل
- **التحقق من صحة البيانات** مع رسائل خطأ واضحة
- **اختيار الدولة** مع تحديد رمز الهاتف تلقائياً
- **حساب الشحن الذكي** (مجاني للطلبات فوق 5000 ج.م)
- **صفحة نجاح** تعرض رقم الطلب

### 2. تكامل Google Sheets
- **حفظ تلقائي** لجميع الطلبات
- **تهيئة تلقائية** لورقة الطلبات مع العناوين
- **بيانات شاملة** تشمل تفاصيل العميل والمنتجات

### 3. نظام الشحن
- **أسعار متدرجة** حسب الدولة
- **شحن مجاني** للطلبات فوق 5000 ج.م
- **دعم جميع الدول العربية**

## 📊 بيانات Google Sheets

### أعمدة ورقة الطلبات:
```
A: رقم الطلب
B: تاريخ الطلب  
C: الاسم الأول
D: الاسم الأخير
E: البريد الإلكتروني
F: رقم الهاتف
G: الدولة
H: رمز الدولة
I: رمز الهاتف
J: المدينة
K: العنوان
L: الرمز البريدي
M: ملاحظات
N: المنتجات
O: الكميات
P: الأسعار
Q: المجموع الفرعي
R: الشحن
S: المجموع الكلي
T: حالة الطلب
U: تاريخ التحديث
```

## 🌍 الدول المدعومة

### دول الخليج العربي:
- السعودية (100 ج.م)
- الإمارات العربية المتحدة (120 ج.م)
- الكويت (100 ج.م)
- قطر (100 ج.م)
- البحرين (100 ج.م)
- عُمان (120 ج.م)

### دول المشرق العربي:
- مصر (50 ج.م)
- الأردن (80 ج.م)
- لبنان (80 ج.م)
- سوريا (80 ج.م)
- العراق (150 ج.م)
- فلسطين (80 ج.م)

### دول المغرب العربي:
- ليبيا (150 ج.م)
- تونس (150 ج.م)
- الجزائر (150 ج.م)
- المغرب (150 ج.م)
- موريتانيا (200 ج.م)

### دول أخرى:
- السودان (200 ج.م)
- اليمن (200 ج.م)
- الصومال (250 ج.م)
- جيبوتي (250 ج.م)
- جزر القمر (300 ج.م)

## 🔧 الإعداد والتكوين

### 1. متغيرات البيئة المطلوبة:
```env
# Google Sheets للطلبات
ORDERS_SHEET_ID="17MRkrcJA5Fxxn-cZ5NIUGSxnBYDWaBMlPZVvwrAPX0Y"

# مصادقة Google
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
GOOGLE_SHEETS_CLIENT_EMAIL="hightech-db@almesaly.iam.gserviceaccount.com"

# أو استخدام JSON كامل
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

### 2. تهيئة ورقة الطلبات:
```bash
# تهيئة تلقائية عبر API
curl http://localhost:3000/api/orders

# أو باستخدام ملف الاختبار
node test-orders-init.js
```

## 📝 استخدام النظام

### 1. إضافة منتجات للسلة:
- انتقل لصفحة المنتجات `/products`
- اختر المنتجات المطلوبة
- أضفها للسلة

### 2. إتمام الطلب:
- انقر على "إتمام الطلب" في السلة
- املأ بيانات العميل في `/checkout`
- اختر الدولة (يتم تحديد رمز الهاتف تلقائياً)
- أرسل الطلب

### 3. تأكيد الطلب:
- يتم عرض رقم الطلب
- يتم حفظ الطلب في Google Sheets
- يتم إرسال تأكيد للعميل

## 🔗 الروابط المهمة

- **صفحة الـ Checkout:** `http://localhost:3000/checkout`
- **Google Sheets للطلبات:** [رابط الورقة](https://docs.google.com/spreadsheets/d/17MRkrcJA5Fxxn-cZ5NIUGSxnBYDWaBMlPZVvwrAPX0Y/edit)
- **API الطلبات:** `http://localhost:3000/api/orders`

## 🧪 الاختبار

### ملفات الاختبار المتاحة:
```bash
# تهيئة ورقة الطلبات
node test-orders-init.js

# إنشاء طلب تجريبي
node test-checkout.js
```

### مثال على طلب تجريبي:
```javascript
const orderData = {
  customer: {
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'ahmed@example.com',
    phone: '01234567890',
    country: 'مصر',
    city: 'القاهرة',
    address: 'شارع التحرير، وسط البلد'
  },
  cartItems: [
    {
      product: {
        _id: 'product-1',
        name_ar: 'كاتر بلوتر',
        price: 15000
      },
      quantity: 1
    }
  ]
};
```

## 📊 تتبع الطلبات

### حالات الطلب:
- `pending` - في انتظار المراجعة
- `confirmed` - تم تأكيد الطلب
- `processing` - قيد التجهيز
- `shipped` - تم الشحن
- `delivered` - تم التسليم
- `cancelled` - تم الإلغاء

### رقم الطلب:
- تنسيق: `HT + YY + MM + DD + XXXX`
- مثال: `HT2505275762`
  - `HT` = هاي تكنولوجي
  - `25` = سنة 2025
  - `05` = شهر مايو
  - `27` = يوم 27
  - `5762` = رقم عشوائي

## 🔒 الأمان

- **التحقق من البيانات** على مستوى الخادم والعميل
- **مصادقة Google Sheets** آمنة
- **تشفير البيانات الحساسة**
- **حماية من CSRF**

## 🚀 التطوير المستقبلي

### ميزات مقترحة:
- [ ] إشعارات البريد الإلكتروني
- [ ] تتبع الطلبات للعملاء
- [ ] لوحة تحكم للطلبات
- [ ] تكامل مع أنظمة الدفع
- [ ] تقارير المبيعات

---

**تم إنشاء هذا النظام بواسطة:** Kilo Code  
**التاريخ:** مايو 2025  
**الإصدار:** 1.0.0