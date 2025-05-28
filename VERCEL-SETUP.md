# إعداد Vercel للموقع

## متغيرات البيئة المطلوبة

يجب إضافة المتغيرات التالية في إعدادات Vercel:

### 1. Google Sheets API
```
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[المفتاح الخاص هنا]\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@project-id.iam.gserviceaccount.com"
GOOGLE_SHEETS_SHEET_ID="your-google-sheet-id"
```

### 2. قاعدة البيانات
```
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database"
```

### 3. الأمان
```
JWT_SECRET="your-jwt-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

## خطوات الإعداد في Vercel

1. اذهب إلى لوحة تحكم Vercel
2. اختر المشروع
3. اذهب إلى Settings > Environment Variables
4. أضف كل متغير من المتغيرات أعلاه
5. أعد نشر المشروع

## حل مشكلة الصور

الصور حالياً مُتتبعة بواسطة Git LFS. لحل هذه المشكلة:

### الخيار 1: رفع الصور إلى خدمة سحابية
- استخدم Cloudinary أو AWS S3
- غيّر مسارات الصور في الكود

### الخيار 2: إزالة الصور من LFS (مؤقتاً)
```bash
# إزالة جميع الصور من LFS
git lfs untrack "public/images/**/*"
git add .gitattributes
git add public/images/
git commit -m "Remove images from LFS"
git push
```

## ملاحظات مهمة

- تأكد من أن جميع متغيرات البيئة مُكونة بشكل صحيح
- الصور الكبيرة قد تحتاج إلى تحسين قبل رفعها
- استخدم Next.js Image Optimization للأداء الأفضل