# 🧪 دليل اختبار Vercel الشامل

هذا الدليل يوضح كيفية استخدام ملفات الاختبار المختلفة لتشخيص ومراقبة موقع HighTech على منصة Vercel.

**🌐 الدومين الرئيسي:** https://www.hightech-eg.net/

## 📋 ملفات الاختبار المتوفرة

### 1. 🚀 API Test Suite الشامل
**الملف:** `src/app/api/vercel-test-suite/route.ts`
**الرابط:** `/api/vercel-test-suite`

اختبار شامل يغطي جميع جوانب التطبيق:
- ✅ متغيرات البيئة
- ✅ API endpoints
- ✅ اتصالات قاعدة البيانات
- ✅ تكامل Google Sheets
- ✅ نظام المصادقة
- ✅ نظام الملفات
- ✅ الأداء

### 2. 🌐 واجهة الاختبار التفاعلية
**الملف:** `test-vercel-suite.html`

واجهة ويب تفاعلية باللغة العربية تتيح:
- 🎯 تشغيل الاختبارات بنقرة واحدة
- 📊 عرض النتائج بصريًا
- 📋 مراقبة Console logs
- 💡 توصيات لحل المشاكل

### 3. ⚡ اختبار سطر الأوامر
**الملف:** `test-vercel-apis.js`

أداة سطر أوامر متقدمة لاختبار APIs:
```bash
# اختبار شامل
node test-vercel-apis.js https://your-app.vercel.app

# اختبار سريع
node test-vercel-apis.js https://your-app.vercel.app --quick

# اختبار محلي
node test-vercel-apis.js http://localhost:3000
```

### 4. 🔍 فحص متغيرات البيئة
**الملف:** `src/app/api/debug/env-check/route.ts`
**الرابط:** `/api/debug/env-check`

فحص مفصل لمتغيرات البيئة وحالة النشر.

## 🎯 كيفية الاستخدام

### الطريقة الأولى: واجهة الويب (الأسهل)

1. **افتح الملف في المتصفح:**
   ```
   https://www.hightech-eg.net/test-vercel-suite.html
   ```

2. **اضغط على "تشغيل الاختبارات الشاملة"**

3. **راقب النتائج في الواجهة والـ Console**

### الطريقة الثانية: API مباشرة

1. **اختبار شامل:**
   ```
   GET https://www.hightech-eg.net/api/vercel-test-suite
   ```

2. **فحص البيئة:**
   ```
   GET https://www.hightech-eg.net/api/debug/env-check
   ```

### الطريقة الثالثة: سطر الأوامر

1. **تحميل الملف:**
   ```bash
   curl -O https://www.hightech-eg.net/test-vercel-apis.js
   ```

2. **تشغيل الاختبار:**
   ```bash
   node test-vercel-apis.js https://www.hightech-eg.net
   ```

## 📊 فهم النتائج

### نقاط الصحة (Health Score)
- **90-100%**: 🟢 ممتاز - الموقع يعمل بشكل مثالي
- **70-89%**: 🟡 جيد - بعض المشاكل البسيطة
- **50-69%**: 🟠 متوسط - مشاكل تحتاج انتباه
- **أقل من 50%**: 🔴 ضعيف - مشاكل خطيرة

### حالات الاختبار
- **✅ PASS**: الاختبار نجح
- **❌ FAIL**: الاختبار فشل
- **⚠️ WARNING**: تحذير - يعمل لكن يحتاج مراجعة

## 🔧 حل المشاكل الشائعة

### 1. متغيرات البيئة مفقودة
```
❌ Missing Google Sheets variables: GOOGLE_SHEETS_PRIVATE_KEY
```

**الحل:**
1. اذهب إلى Vercel Dashboard
2. Project Settings → Environment Variables
3. أضف المتغيرات المفقودة
4. Redeploy المشروع

### 2. خطأ في Google Sheets
```
❌ Google Sheets Connection - Error: Invalid credentials
```

**الحل:**
1. تأكد من صحة Google Service Account
2. تأكد من تفعيل Google Sheets API
3. تأكد من صيغة PRIVATE_KEY (استبدال \\n بـ \n)

### 3. خطأ في APIs
```
❌ API Endpoint: /api/products - Failed: 500 Internal Server Error
```

**الحل:**
1. فحص Vercel Function Logs
2. تأكد من صحة الكود
3. تأكد من Dependencies

### 4. مشاكل الأداء
```
⚠️ Memory Usage - Heap used: 150MB
```

**الحل:**
1. تحسين استخدام الذاكرة
2. تحسين Database queries
3. استخدام Caching

## 📋 قائمة فحص ما قبل النشر

### ✅ متغيرات البيئة
- [ ] `GOOGLE_SHEETS_PRIVATE_KEY`
- [ ] `GOOGLE_SHEETS_CLIENT_EMAIL`
- [ ] `GOOGLE_SHEETS_CLIENT_ID`
- [ ] `GOOGLE_SHEETS_SHEET_ID`
- [ ] `PRODUCTS_SHEET_ID`
- [ ] `ORDERS_SHEET_ID`
- [ ] `ADMIN_USERNAME`
- [ ] `ADMIN_PASSWORD`
- [ ] `JWT_SECRET`

### ✅ APIs الأساسية
- [ ] `/api/products` - يعمل
- [ ] `/api/debug/env-check` - يعمل
- [ ] `/api/auth/security-status` - يعمل
- [ ] `/api/vercel-test-suite` - يعمل

### ✅ الوظائف الأساسية
- [ ] عرض المنتجات
- [ ] نظام التعليقات
- [ ] نظام الطلبات
- [ ] لوحة الإدارة

## 🚨 مراقبة مستمرة

### إعداد مراقبة تلقائية
يمكنك إعداد مراقبة تلقائية باستخدام:

1. **Vercel Monitoring**
2. **GitHub Actions**
3. **Cron Jobs**

### مثال GitHub Action:
```yaml
name: Health Check
on:
  schedule:
    - cron: '0 */6 * * *'  # كل 6 ساعات
jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - name: Run Health Check
        run: |
          curl -f https://www.hightech-eg.net/api/vercel-test-suite || exit 1
```

## 📞 الدعم والمساعدة

### في حالة المشاكل:
1. **فحص Vercel Function Logs**
2. **تشغيل الاختبارات المحلية**
3. **مراجعة متغيرات البيئة**
4. **فحص Google Sheets permissions**

### معلومات مفيدة:
- **Vercel Region**: تأكد من اختيار المنطقة المناسبة
- **Function Timeout**: 10 ثواني للـ Hobby plan
- **Memory Limit**: 1024MB للـ Hobby plan

## 🎉 نصائح للأداء الأمثل

1. **استخدم Edge Functions للمحتوى الثابت**
2. **فعل Caching للبيانات**
3. **حسن Database queries**
4. **استخدم CDN للصور**
5. **راقب الأداء باستمرار**

---

**تم إنشاء هذا الدليل بواسطة Kilo Code**
**آخر تحديث: {{ current_date }}**