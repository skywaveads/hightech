# إعداد Vercel للموقع

## متغيرات البيئة المطلوبة

يجب إضافة المتغيرات التالية في إعدادات Vercel:

### 1. Google Service Account (مطلوب لجميع خدمات Google)
```
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[المفتاح الخاص هنا]\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@project-id.iam.gserviceaccount.com"
```

### 2. Google Sheets IDs
```
# Sheet ID العام (مثلاً للتعليقات أو بيانات أخرى)
GOOGLE_SHEETS_SHEET_ID="1HfbaI2kPNNLLvEcjZ9Lh6U5CKEfgH6fkoRd8xHwFaZY"

# Sheet ID للمنتجات
PRODUCTS_SHEET_ID="1RXql2CacN5haqIEq7DM3ZgSLj8ml_KR8PzRJbjDb-As"

# Sheet ID للطلبات (مهم جداً لنظام الطلبات)
# تأكد من إنشاء هذا الـ Sheet ووضع الـ ID الخاص به هنا
ORDERS_SHEET_ID="your-google-sheet-id-for-orders" 
```

### 3. Google Drive (لتخزين صور المنتجات المرفوعة)
```
GOOGLE_DRIVE_FOLDER_ID="1q1tt-HIQOE3gthmNq_Kl1SX1FkuEZ1Si" 
# هذا هو المجلد الذي سيتم رفع صور المنتجات إليه
```

### 4. إعدادات المدير (Admin)
```
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password-for-admin" 
JWT_SECRET="your-strong-jwt-secret-key-for-sessions" 
```

### 5. إعدادات NextAuth (للمصادقة)
```
NEXTAUTH_SECRET="your-very-strong-nextauth-secret-for-app-security"
# يجب أن يكون عنوان URL الخاص بنطاق Vercel الخاص بك
NEXTAUTH_URL="https://your-project-name.vercel.app" 
```

### 6. إعدادات البريد الإلكتروني (لنموذج الاتصال)
```
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-gmail-app-password" 
# تأكد من استخدام "App Password" إذا كانت المصادقة الثنائية مفعلة لحساب Gmail
```

## خطوات الإعداد في Vercel

1.  اذهب إلى لوحة تحكم Vercel.
2.  اختر المشروع الخاص بك.
3.  اذهب إلى **Settings** > **Environment Variables**.
4.  أضف كل متغير من المتغيرات المذكورة أعلاه مع قيمته الصحيحة.
5.  **مهم جداً**: بعد إضافة جميع المتغيرات، قم بإعادة نشر (Redeploy) أحدث Commit من الفرع الرئيسي (main/master) ليتم تطبيق التغييرات.

## ملاحظات مهمة حول الصور

-   **الصور الحالية**: جميع صور الموقع (الشعار، صور المدونة، صور المنتجات الافتراضية، إلخ) تم تحويلها من Git LFS إلى ملفات Git عادية. هذا يعني أنها ستعمل مباشرة بعد النشر على Vercel دون الحاجة إلى أي إعدادات إضافية للصور الموجودة مسبقًا في الكود.
-   **صور المنتجات المرفوعة**: نظام رفع صور المنتجات من لوحة التحكم يستخدم Google Drive. تأكد من أن `GOOGLE_DRIVE_FOLDER_ID` صحيح وأن حساب الخدمة لديه صلاحيات الكتابة في هذا المجلد.
-   **تحسين الصور**: استخدم مكون `next/image` قدر الإمكان لتحسين أداء تحميل الصور تلقائيًا بواسطة Next.js.

## استكشاف الأخطاء وإصلاحها

-   **قاعدة البيانات لا تعمل**: تأكد من أن جميع متغيرات `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEETS_CLIENT_EMAIL`, وجميع `*_SHEET_ID` صحيحة وأن حساب الخدمة لديه صلاحيات الوصول لهذه الـ Sheets.
-   **الصور لا تظهر (الصور المرفوعة)**: تحقق من `GOOGLE_DRIVE_FOLDER_ID` وصلاحيات حساب الخدمة.
-   **تسجيل الدخول للمدير لا يعمل**: تحقق من `ADMIN_USERNAME`, `ADMIN_PASSWORD`, و `JWT_SECRET`.
-   **نموذج الاتصال لا يرسل رسائل**: تحقق من إعدادات `SMTP_*` وأن حساب Gmail يسمح بالوصول من تطبيقات أقل أمانًا أو أنك تستخدم App Password.