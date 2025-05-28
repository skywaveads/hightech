# إعداد Vercel للموقع

## متغيرات البيئة المطلوبة

يجب إضافة المتغيرات التالية في إعدادات Vercel:

### 1. Google Service Account (مطلوب لجميع خدمات Google)
```
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8tveHOnsrm6bn\nUtrBZELQ74EjbMp6gdPH8ZGCunjukSM31dWilyePCmV2mHAuUQ8iGpeojLuJgZcP\nbEMZxmRRIh/dW45nj94R1kh6zBe8T/+n+xxNgbF+txisXhtE0oOHdjxmgocKJ1fp\nnEZsraU2XOLlWYKFH8Z17qgHxJSOLvtbNgD4ENrTjHGmSqYzVKhjXQiLMJ+C1vuC\nwwSMv9xuRCB3sCj24GMK6dbkt25qs66uaIpQaCz2x3BNdo/4ilFw1I5VMD8p2NZy\n18DLgkMEZxolsNb9fLuq3d0fqWgZqPXv5NMcmazJ2R8EzlSFHgsN+0QChZqw4ylJ\nPTeULIYDAgMBAAECggEALF1bPchK0oqqJzG8ScC3UIUtt9VImJpS3mt1COWrrnIi\ndGrp6Wpdm2wXRFU78jeONjdINhC3ufDkQXTzJWkVhlleYly20rPowgq9SVkXr2aj\nNKt9EN+PibmjrEoHYRuYXk02j+bZtlJfgYUCrWP5NhmKId70JzW8I1dy2zikr/QF\n71dxmUDJaI1+Vo91pKmJXubI8FBIZZ8uXyKTTkHMZUxkRlIL+Cl/tmb8OktO4amK\nNVqJjNBlLC1RDH/s2qr4WJ86k47//Du1hfuMWo+yhH8ZQMldR+GDLEC7jjdQHn/S\nLp0uvZ4aS5B7USqHLXIC6iyl5D1+K8QJdroWDityeQKBgQDtTmrUYIJ4PPezwt4W\nFIepv7Etyom72byGbubZxqMRwfPktX6XG6EQHzxZlDAEZ46VG1t6MrE1FT+SRItw\nmN7unsAtB/28IcwI6DaeepADbqRrsQDzby3mlRM2mfYJGwtRKPNu4z3NY1mo2zrP\nii5y8BcCL4h4SqyTatJyHGY5fwKBgQDLlKNp3A6McBVzIgTtO74W+WgIB26AABxe\nRoGFO7Nvv+xyJZ4MtdqeE1x+VxESw1mKpZk4EkAull6F/Zp/J3HHWmcj5JuUznby\n5iXwUT6YxojHjDAttU8H5nRmoqGJZrtGZFrt5/XnHZuk29VYe8WZm+4PMpcBti6F\n3yfYsCkNfQKBgGMvY3dg3ydiVCXOTQTtj8ZjWKrK/MaHO0T1FYfwfjft2QK+2SpP\nYgJbC95lEazFm9K2nIV2qpqFRwzbmWx2eLdDow8vR95aQe13IV0b3RWSKSbZ1Ivq\n7ER0CpPHxg4IP7KsaxLt5+bwn4j0GKCmIMPplbRUKbYdgAQdodgQBqoBAoGBAJ5D\n5qqUdgb9198S0muvpz7rE9IyHNiLvYIZI/X1DLFSrjmrPuy4r8V2XdCmVVKV5dWg\nmbX6kkTlh4R5PJOfkZeek1JXFhCgVd7Nxy7FqnlQ1uLy/D18l30XzuQ/iH9uCydV\nO096pjPPU8HdWUWZq2uYyoCsHrMo85AFhU+y26dtAoGANXUmVuM6t1TZtRH7gJkY\nt52s4zgsyAXj6moUBJhXfukJx8PDe/eBPN2Gmde1RhY+nqxf0swsPT8uMJqqJvp2\njfm/1dx4sqmXTGCj4Vz7SFszEDty81XJIw8R9r89tf0pI/GpiepfoYCn1vHHhs8w\nuVqbrLfnKdZ032OOig7vsvU=\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_CLIENT_EMAIL="hightech-db@almesaly.iam.gserviceaccount.com"
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
ADMIN_USERNAME="admin@hightech.com"
ADMIN_PASSWORD="StrongP@ss123"
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