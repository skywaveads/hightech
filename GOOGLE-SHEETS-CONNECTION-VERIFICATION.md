# تحقق من اتصال قاعدة بيانات Google Sheets

## ✅ حالة الاتصال الحالية

### 1. متغيرات البيئة المطلوبة
جميع متغيرات البيئة التالية **يجب** أن تكون مُعرَّفة في Vercel:

```bash
# Google Service Account Credentials
GOOGLE_SHEETS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----
GOOGLE_SHEETS_CLIENT_EMAIL=hightech-db@almesaly.iam.gserviceaccount.com
GOOGLE_SHEETS_CLIENT_ID=114198547894103249322

# Google Sheets IDs
GOOGLE_SHEETS_SHEET_ID=1HfbaI2kPNNLLvEcjZ9Lh6U5CKEfgH6fkoRd8xHwFaZY
PRODUCTS_SHEET_ID=1RXql2CacN5haqIEq7DM3ZgSLj8ml_KR8PzRJbjDb-As
ORDERS_SHEET_ID=17MRkrcJA5Fxxn-cZ5NIUGSxnBYDWaBMlPZVvwrAPX0Y

# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID=1q1tt-HIQOE3gthmNq_Kl1SX1FkuEZ1Si
```

### 2. الملفات المُحدَّثة للتوافق مع Vercel

#### ✅ [`src/lib/database.ts`](src/lib/database.ts:1)
- يتحقق من وجود متغيرات البيئة المطلوبة
- يستخدم `GoogleSheetsDatabase` للعمليات
- يتعامل مع الأخطاء بشكل صحيح

#### ✅ [`src/lib/google-sheets.ts`](src/lib/google-sheets.ts:1)
- **تم إصلاح**: استبدال `require('bcryptjs')` بـ `import('bcryptjs')`
- يستخدم `google-spreadsheet` و `google-auth-library`
- يدعم جميع عمليات التعليقات (إضافة، قراءة، تحديث، حذف)

#### ✅ [`src/lib/google-orders.ts`](src/lib/google-orders.ts:1)
- يستخدم `googleapis` للتعامل مع Google Sheets
- يدعم جميع عمليات الطلبات (إضافة، قراءة، تحديث حالة)
- يتعامل مع تهيئة الورقة تلقائياً

#### ✅ [`src/lib/google-products.ts`](src/lib/google-products.ts:1)
- **تم إصلاح**: استبدال `require('stream')` بـ `import { Readable } from 'stream'`
- يدعم رفع الصور إلى Google Drive
- يدعم إدارة المنتجات في Google Sheets

### 3. API Routes المُتحققة

#### ✅ [`src/app/api/comments/[productId]/route.ts`](src/app/api/comments/[productId]/route.ts:1)
- يستخدم `CommentDatabase.getCommentsByProductId()` و `CommentDatabase.addComment()`
- يتعامل مع التحقق من صحة البيانات
- يدعم الترقيم والترتيب

#### ✅ [`src/app/api/orders/route.ts`](src/app/api/orders/route.ts:1)
- يستخدم `initializeOrdersSheet()` و `addOrderToSheet()`
- يحسب تكلفة الشحن تلقائياً
- ينشئ أرقام طلبات فريدة

### 4. نقاط التحقق الرئيسية

#### 🔍 التحقق من الاتصال
```javascript
// في src/lib/database.ts
if (!GOOGLE_SHEETS_SHEET_ID || !GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_PRIVATE_KEY) {
  console.warn('⚠️ Google Sheets credentials not fully configured');
  return { comments: [], total: 0 }; // إرجاع نتائج فارغة بدلاً من خطأ
}
```

#### 🔍 معالجة الأخطاء
```javascript
// في src/lib/google-sheets.ts
try {
  const sheet = await getWorksheet();
  // العمليات...
} catch (error) {
  console.error('[GoogleSheets] Error:', error);
  throw error; // إعادة رمي الخطأ مع تسجيله
}
```

#### 🔍 التخزين المؤقت
```javascript
// في src/lib/google-sheets.ts
let worksheet = null;
let worksheetCacheTime = 0;
const WORKSHEET_CACHE_DURATION = 5 * 60 * 1000; // 5 دقائق
```

### 5. اختبار الاتصال

#### اختبار التعليقات:
```bash
# GET - جلب التعليقات
curl https://your-domain.vercel.app/api/comments/product-1

# POST - إضافة تعليق
curl -X POST https://your-domain.vercel.app/api/comments/product-1 \
  -H "Content-Type: application/json" \
  -d '{"name":"أحمد","email":"ahmed@example.com","comment":"تعليق تجريبي","rating":5}'
```

#### اختبار الطلبات:
```bash
# GET - تهيئة ورقة الطلبات
curl https://your-domain.vercel.app/api/orders

# POST - إنشاء طلب جديد
curl -X POST https://your-domain.vercel.app/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customer":{"firstName":"أحمد","lastName":"محمد","email":"ahmed@example.com","phone":"01234567890","country":"مصر","city":"القاهرة","address":"شارع التحرير"},"cartItems":[{"product":{"_id":"1","name_ar":"منتج تجريبي","price":100},"quantity":2}]}'
```

### 6. مراقبة الأداء

#### سجلات مفيدة للمراقبة:
```javascript
console.log('[GoogleSheets] Configuration loaded from environment variables');
console.log('[GoogleSheets] Using the first worksheet found');
console.log('[GoogleSheets] Comment added successfully');
console.log('[GoogleOrders] Order saved successfully');
```

#### علامات التحذير:
```javascript
console.warn('[GoogleSheets] Missing required environment variables');
console.warn('[GoogleSheets] No headers found, setting up...');
console.error('[GoogleSheets] Error loading worksheet');
```

### 7. الأمان والأداء

#### ✅ الأمان:
- جميع المفاتيح الخاصة محفوظة في متغيرات البيئة
- لا توجد مفاتيح مكشوفة في الكود
- التحقق من صحة البيانات قبل الحفظ

#### ✅ الأداء:
- تخزين مؤقت للـ worksheet لمدة 5 دقائق
- معالجة الأخطاء بدون توقف الخدمة
- تسجيل مفصل للمراقبة

### 8. استكشاف الأخطاء

#### مشاكل شائعة وحلولها:

1. **خطأ: "Google Sheets credentials not configured"**
   - تأكد من إضافة جميع متغيرات البيئة في Vercel
   - تحقق من صحة تنسيق `GOOGLE_SHEETS_PRIVATE_KEY`

2. **خطأ: "Worksheet not found"**
   - تأكد من صحة `GOOGLE_SHEETS_SHEET_ID`
   - تحقق من صلاحيات Service Account

3. **خطأ: "Permission denied"**
   - تأكد من مشاركة Google Sheets مع Service Account Email
   - تحقق من صلاحيات التحرير

### 9. الخطوات التالية

1. **نشر التحديثات على Vercel**
2. **إضافة متغيرات البيئة المطلوبة**
3. **اختبار جميع API endpoints**
4. **مراقبة السجلات للتأكد من عدم وجود أخطاء**
5. **اختبار وظائف التعليقات والطلبات**

## ✅ الخلاصة

جميع ملفات Google Sheets محدثة ومتوافقة مع Vercel Edge Runtime. الاتصال يجب أن يعمل بشكل صحيح بعد إضافة متغيرات البيئة المطلوبة في Vercel.