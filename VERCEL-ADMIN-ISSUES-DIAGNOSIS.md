# تشخيص مشاكل صفحات الإدارة على Vercel

## 📋 ملخص المشكلة

المستخدم يؤكد أن الموقع يعمل على Vercel لكن **جميع أوامر صفحات الإدارة لا تعمل**. هذا يشمل:
- حذف المنتجات والتعديل عليها من `/products-admin`
- جميع عمليات التعديل على Google Sheets من صفحات الإدارة
- صفحات `/orders-admin` و `/comments-admin`

## 🔍 التحليل الفني

### 1. المشاكل المحتملة المكتشفة

#### أ) مشاكل المصادقة
- **المشكلة**: قد تكون المصادقة لا تعمل بشكل صحيح على Vercel
- **الأعراض**: عدم قدرة المستخدمين على الوصول لصفحات الإدارة
- **الحل**: تم إصلاح نظام المصادقة في [`src/lib/auth.ts`](src/lib/auth.ts)

#### ب) مشاكل Google Sheets API
- **المشكلة**: اتصال Google Sheets قد يفشل على Vercel
- **الأعراض**: فشل عمليات الحذف والتحديث
- **المتغيرات المطلوبة**:
  - `GOOGLE_SHEETS_SHEET_ID` (للتعليقات)
  - `PRODUCTS_SHEET_ID` (للمنتجات)
  - `ORDERS_SHEET_ID` (للطلبات)
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_PRIVATE_KEY`

#### ج) مشاكل متغيرات البيئة
- **المشكلة**: متغيرات البيئة قد تكون غير مُعرَّفة بشكل صحيح على Vercel
- **الحل**: التحقق من إعدادات Vercel Environment Variables

### 2. الملفات المتأثرة

#### صفحات الإدارة:
- [`src/app/products-admin/page.tsx`](src/app/products-admin/page.tsx) - إدارة المنتجات
- [`src/app/comments-admin/page.tsx`](src/app/comments-admin/page.tsx) - إدارة التعليقات  
- [`src/app/orders-admin/page.tsx`](src/app/orders-admin/page.tsx) - إدارة الطلبات

#### API Routes:
- [`src/app/api/products/[id]/route.ts`](src/app/api/products/[id]/route.ts) - عمليات المنتجات
- [`src/app/api/comments/admin/[id]/route.ts`](src/app/api/comments/admin/[id]/route.ts) - عمليات التعليقات
- [`src/app/api/orders/admin/[orderNumber]/route.ts`](src/app/api/orders/admin/[orderNumber]/route.ts) - عمليات الطلبات

#### Google Sheets Integration:
- [`src/lib/google-sheets.ts`](src/lib/google-sheets.ts) - تكامل التعليقات
- [`src/lib/google-products.ts`](src/lib/google-products.ts) - تكامل المنتجات
- [`src/lib/google-orders.ts`](src/lib/google-orders.ts) - تكامل الطلبات

## 🛠️ الحلول المقترحة

### 1. التحقق من متغيرات البيئة على Vercel

```bash
# في Vercel Dashboard > Settings > Environment Variables
# تأكد من وجود هذه المتغيرات:

JWT_SECRET=your-jwt-secret
GOOGLE_SHEETS_SHEET_ID=your-comments-sheet-id
PRODUCTS_SHEET_ID=your-products-sheet-id  
ORDERS_SHEET_ID=your-orders-sheet-id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 2. اختبار المصادقة

استخدم أداة التشخيص المرفقة:

```bash
# افتح test-vercel-admin.html في المتصفح
# أو استخدم:
node diagnose-admin-issues.js https://your-site.vercel.app
```

### 3. التحقق من Google Sheets API

#### أ) التأكد من صحة Service Account:
```javascript
// اختبار الاتصال
const response = await fetch('/api/test-all-sheets-operations');
const result = await response.json();
console.log(result);
```

#### ب) التحقق من أذونات Google Sheets:
- تأكد أن Service Account له صلاحية Editor على جميع الـ Sheets
- تحقق من أن Sheet IDs صحيحة

### 4. إصلاح مشاكل CORS

إذا كانت المشكلة متعلقة بـ CORS، أضف هذا في [`next.config.js`](next.config.js):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type,Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

## 🔧 أدوات التشخيص المتوفرة

### 1. أداة التشخيص الشاملة
- **الملف**: [`test-vercel-admin.html`](test-vercel-admin.html)
- **الاستخدام**: افتح في المتصفح واختبر جميع العمليات
- **المميزات**: 
  - اختبار المصادقة
  - اختبار عمليات CRUD
  - اختبار Google Sheets
  - تقرير شامل

### 2. أداة سطر الأوامر
- **الملف**: [`diagnose-admin-issues.js`](diagnose-admin-issues.js)
- **الاستخدام**: `node diagnose-admin-issues.js https://your-site.vercel.app`
- **المميزات**:
  - تشخيص تلقائي
  - تقرير مفصل
  - اختبار جميع النقاط

### 3. API التشخيص
- **النقطة**: [`/api/test-all-sheets-operations`](src/app/api/test-all-sheets-operations/route.ts)
- **الاستخدام**: `GET /api/test-all-sheets-operations`
- **المميزات**: اختبار شامل لجميع عمليات Google Sheets

## 📊 خطة العمل المقترحة

### المرحلة 1: التشخيص الفوري
1. ✅ استخدام [`test-vercel-admin.html`](test-vercel-admin.html) لاختبار الموقع
2. ✅ تشغيل [`diagnose-admin-issues.js`](diagnose-admin-issues.js) للتحليل التلقائي
3. ✅ فحص متغيرات البيئة في Vercel Dashboard

### المرحلة 2: الإصلاح
1. 🔧 إصلاح متغيرات البيئة المفقودة
2. 🔧 إعادة نشر الموقع على Vercel
3. 🔧 اختبار العمليات مرة أخرى

### المرحلة 3: التحقق
1. ✅ اختبار تسجيل الدخول للإدارة
2. ✅ اختبار إضافة/تعديل/حذف المنتجات
3. ✅ اختبار إدارة التعليقات والطلبات
4. ✅ التأكد من تحديث Google Sheets

## 🚨 نقاط مهمة

### 1. مشاكل شائعة على Vercel:
- **متغيرات البيئة**: يجب إعادة النشر بعد تحديثها
- **Google Private Key**: يجب تنسيقها بشكل صحيح مع `\n`
- **Timeouts**: Vercel له حدود زمنية للـ API calls

### 2. تحقق من Vercel Logs:
```bash
# في Vercel Dashboard > Functions > View Function Logs
# ابحث عن أخطاء في API calls
```

### 3. اختبار محلي أولاً:
```bash
# تأكد أن كل شيء يعمل محلياً قبل النشر
npm run dev
# اختبر صفحات الإدارة محلياً
```

## 📞 الخطوات التالية

1. **فوري**: استخدم أدوات التشخيص المرفقة لتحديد المشكلة بدقة
2. **قصير المدى**: إصلاح متغيرات البيئة وإعادة النشر
3. **طويل المدى**: تحسين نظام المراقبة والتنبيهات

---

**ملاحظة**: جميع الأدوات والحلول جاهزة للاستخدام. يرجى البدء بـ [`test-vercel-admin.html`](test-vercel-admin.html) لتشخيص سريع للمشكلة.