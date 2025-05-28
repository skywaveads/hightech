# تكامل Google Sheets و Google Drive

تم تحديث النظام ليستخدم Google Sheets كقاعدة بيانات للمنتجات و Google Drive لتخزين الصور.

## 🔧 الإعداد المطلوب

### 1. إنشاء Google Service Account

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروع جديد أو اختر مشروع موجود
3. فعّل APIs التالية:
   - Google Sheets API
   - Google Drive API
4. أنشئ Service Account:
   - اذهب إلى IAM & Admin > Service Accounts
   - انقر "Create Service Account"
   - أدخل اسم الحساب
   - أنشئ مفتاح JSON وحمّله

### 2. إعداد Google Sheets

1. أنشئ Google Sheet جديد أو استخدم الموجود:
   - رابط الشيت: https://docs.google.com/spreadsheets/d/1RXql2CacN5haqIEq7DM3ZgSLj8ml_KR8PzRJbjDb-As/edit
2. شارك الشيت مع Service Account email
3. تأكد من وجود الأعمدة التالية:
   ```
   _id | name_ar | name_en | slug | short_desc | description | price | sale_price | quantity | category | tags | sku | images | isActive | createdAt | updatedAt
   ```

### 3. إعداد Google Drive

1. أنشئ مجلد في Google Drive أو استخدم الموجود:
   - رابط المجلد: https://drive.google.com/drive/u/2/folders/1q1tt-HIQOE3gthmNq_Kl1SX1FkuEZ1Si
2. شارك المجلد مع Service Account email
3. امنح صلاحيات "Editor"

### 4. متغيرات البيئة

أضف المتغيرات التالية إلى ملف `.env.local`:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
GOOGLE_SHEETS_SHEET_ID="1HfbaI2kPNNLLvEcjZ9Lh6U5CKEfgH6fkoRd8xHwFaZY"

# Products Google Sheets Configuration
PRODUCTS_SHEET_ID="1RXql2CacN5haqIEq7DM3ZgSLj8ml_KR8PzRJbjDb-As"

# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID="1q1tt-HIQOE3gthmNq_Kl1SX1FkuEZ1Si"
```

### 5. ملف Service Account

ضع ملف `google-service-account.json` في جذر المشروع:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

## 🚀 الميزات الجديدة

### 1. إدارة المنتجات عبر Google Sheets

- **إضافة منتجات**: يتم حفظها مباشرة في Google Sheets
- **تحديث المنتجات**: تحديث فوري في الشيت
- **حذف المنتجات**: حذف من الشيت
- **البحث والفلترة**: يعمل مع البيانات من الشيت

### 2. رفع الصور على Google Drive

- **رفع تلقائي**: الصور ترفع على Google Drive
- **روابط مباشرة**: يتم إنشاء روابط مباشرة للصور
- **تخزين آمن**: الصور محفوظة في مجلد مخصص
- **صلاحيات عامة**: الصور قابلة للعرض للجمهور

### 3. تخزين روابط الصور

- **في Google Sheets**: يتم حفظ روابط الصور مفصولة بفاصلة
- **استرجاع تلقائي**: يتم تحويل الروابط إلى مصفوفة صور
- **عرض متعدد**: دعم عرض عدة صور لكل منتج

## 📁 هيكل البيانات

### Google Sheets - Products

| العمود | النوع | الوصف |
|--------|-------|-------|
| _id | string | معرف المنتج |
| name_ar | string | اسم المنتج بالعربية |
| name_en | string | اسم المنتج بالإنجليزية |
| slug | string | الرابط المختصر |
| short_desc | string | وصف مختصر |
| description | string | وصف مفصل (HTML) |
| price | number | السعر |
| sale_price | number | سعر التخفيض |
| quantity | number | الكمية |
| category | string | التصنيف |
| tags | string | الكلمات المفتاحية (مفصولة بفاصلة) |
| sku | string | رمز المنتج |
| images | string | روابط الصور (مفصولة بفاصلة) |
| isActive | boolean | حالة النشاط |
| createdAt | datetime | تاريخ الإنشاء |
| updatedAt | datetime | تاريخ التحديث |

### مثال على بيانات الصور

```
https://drive.google.com/uc?export=view&id=1ABC123,https://drive.google.com/uc?export=view&id=2DEF456
```

## 🔄 APIs المحدثة

### 1. Products API

- `GET /api/products` - جلب جميع المنتجات من Google Sheets
- `POST /api/products` - إضافة منتج جديد إلى Google Sheets
- `GET /api/products/[id]` - جلب منتج محدد
- `PUT /api/products/[id]` - تحديث منتج
- `DELETE /api/products/[id]` - حذف منتج

### 2. Image Upload API

- `POST /api/upload-image` - رفع صورة إلى Google Drive
  - يقبل: FormData مع ملف الصورة
  - يرجع: رابط الصورة على Google Drive

## 🛠️ الملفات المحدثة

### ملفات جديدة:
- `src/lib/google-products.ts` - إدارة المنتجات عبر Google Sheets
- `src/app/api/upload-image/route.ts` - API رفع الصور

### ملفات محدثة:
- `src/app/api/products/route.ts` - استخدام Google Sheets
- `src/app/api/products/[id]/route.ts` - استخدام Google Sheets
- `src/components/admin/ProductForm.tsx` - رفع الصور على Google Drive
- `src/app/products/page.tsx` - جلب البيانات من Google Sheets
- `src/app/products/[productId]/page.tsx` - جلب البيانات من Google Sheets

## 🔒 الأمان

- **Service Account**: استخدام حساب خدمة آمن
- **صلاحيات محدودة**: الوصول فقط للشيتس والمجلدات المحددة
- **تشفير البيانات**: المفاتيح محفوظة في متغيرات البيئة
- **التحقق من الملفات**: فحص نوع وحجم الصور قبل الرفع

## 🚨 ملاحظات مهمة

1. **النسخ الاحتياطي**: Google Sheets يحفظ تاريخ التغييرات تلقائياً
2. **الحد الأقصى للملفات**: 5MB لكل صورة
3. **أنواع الملفات المدعومة**: JPEG, PNG, WebP
4. **الأداء**: التخزين السحابي قد يكون أبطأ من التخزين المحلي
5. **الاتصال**: يتطلب اتصال إنترنت للوصول للبيانات

## 🔧 استكشاف الأخطاء

### خطأ في الاتصال بـ Google Sheets:
```
Error: Google Sheets credentials not configured
```
**الحل**: تأكد من وجود متغيرات البيئة أو ملف service account

### خطأ في رفع الصور:
```
Error: Failed to upload image to Google Drive
```
**الحل**: تأكد من صلاحيات Service Account على مجلد Google Drive

### خطأ في الوصول للشيت:
```
Error: The caller does not have permission
```
**الحل**: شارك الشيت مع email الخاص بـ Service Account

## 📞 الدعم

للمساعدة في الإعداد أو حل المشاكل، تواصل مع فريق التطوير.