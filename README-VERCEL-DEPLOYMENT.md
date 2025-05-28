# دليل النشر على Vercel - موقع هاي تك للإعلان

## نظرة عامة

هذا الدليل يوضح كيفية نشر موقع هاي تك للإعلان على منصة Vercel باستخدام الدومين `hightech-eg.net`.

## متطلبات ما قبل النشر

### 1. إعداد متغيرات البيئة

قم بإنشاء ملف `.env.local` مع المتغيرات التالية:

```env
# Database
DATABASE_URL="your_database_connection_string"

# Google Sheets API
GOOGLE_SHEETS_PRIVATE_KEY="your_google_sheets_private_key"
GOOGLE_SHEETS_CLIENT_EMAIL="your_service_account_email"
GOOGLE_SPREADSHEET_ID="your_spreadsheet_id"

# Authentication
JWT_SECRET="your_jwt_secret_key"
ADMIN_PASSWORD="your_admin_password"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"

# Domain
NEXT_PUBLIC_DOMAIN="https://hightech-eg.net"
```

### 2. إعداد Google Sheets

1. إنشاء مشروع في Google Cloud Console
2. تفعيل Google Sheets API
3. إنشاء Service Account وتحميل مفتاح JSON
4. مشاركة Google Sheets مع Service Account email

### 3. إعداد قاعدة البيانات

يمكن استخدام إحدى الخيارات التالية:
- **Vercel Postgres** (موصى به)
- **PlanetScale**
- **Supabase**
- **MongoDB Atlas**

## خطوات النشر

### 1. ربط المشروع بـ Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# ربط المشروع
vercel link
```

### 2. إعداد متغيرات البيئة في Vercel

```bash
# إضافة متغيرات البيئة
vercel env add DATABASE_URL
vercel env add GOOGLE_SHEETS_PRIVATE_KEY
vercel env add GOOGLE_SHEETS_CLIENT_EMAIL
vercel env add GOOGLE_SPREADSHEET_ID
vercel env add JWT_SECRET
vercel env add ADMIN_PASSWORD
vercel env add NEXT_PUBLIC_GA_ID
vercel env add NEXT_PUBLIC_GTM_ID
vercel env add NEXT_PUBLIC_DOMAIN
```

### 3. النشر

```bash
# نشر للإنتاج
vercel --prod
```

## إعداد الدومين المخصص

### 1. في لوحة تحكم Vercel

1. اذهب إلى Project Settings
2. اختر Domains
3. أضف `hightech-eg.net`
4. أضف `www.hightech-eg.net`

### 2. إعداد DNS

أضف السجلات التالية في إعدادات DNS الخاصة بالدومين:

```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## تحسينات الأداء

### 1. إعدادات Vercel

تم تكوين الملف `vercel.json` مع:
- تحسين Cache Headers
- Security Headers
- Redirects للروابط القديمة
- تحسين Functions

### 2. تحسين الصور

```javascript
// في next.config.js
images: {
  formats: ['image/webp', 'image/avif'],
  domains: ['hightech-eg.net'],
  minimumCacheTTL: 31536000
}
```

### 3. تحسين Bundle

```javascript
// تفعيل SWC Minification
swcMinify: true,

// ضغط البيانات
compress: true,

// تحسين webpack
webpack: (config) => {
  config.optimization.splitChunks = {
    chunks: 'all'
  }
  return config
}
```

## مراقبة الأداء

### 1. Vercel Analytics

```bash
# تفعيل Analytics
vercel analytics enable
```

### 2. Core Web Vitals

تم إعداد تتبع Core Web Vitals في:
- `src/lib/analytics.ts`
- `src/app/layout.tsx`

### 3. Error Monitoring

```javascript
// في src/lib/analytics.ts
export const trackError = (error_message, error_location) => {
  event({
    action: 'javascript_error',
    category: 'error',
    label: `${error_location}: ${error_message}`,
  })
}
```

## الأمان

### 1. Security Headers

تم تكوين Headers الأمان في `vercel.json`:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

### 2. حماية API Routes

```javascript
// في src/middleware.ts
export function middleware(request) {
  // حماية مسارات الإدارة
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // التحقق من الصلاحيات
  }
}
```

### 3. Rate Limiting

```javascript
// إضافة Rate Limiting للـ API
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100 // 100 طلب كحد أقصى
}
```

## النسخ الاحتياطي

### 1. قاعدة البيانات

```bash
# نسخ احتياطي يومي
vercel env add BACKUP_SCHEDULE="0 2 * * *"
```

### 2. Google Sheets

- نسخ احتياطي تلقائي في Google Drive
- تصدير البيانات بصيغة CSV

### 3. الملفات المرفوعة

```javascript
// رفع الصور على Vercel Blob
import { put } from '@vercel/blob'

export async function uploadImage(file) {
  const blob = await put(file.name, file, {
    access: 'public',
  })
  return blob.url
}
```

## مراقبة الموقع

### 1. Uptime Monitoring

```bash
# إعداد مراقبة الموقع
vercel monitor add https://hightech-eg.net
```

### 2. Performance Monitoring

- Google PageSpeed Insights
- GTmetrix
- WebPageTest

### 3. SEO Monitoring

- Google Search Console
- Google Analytics
- Bing Webmaster Tools

## استكشاف الأخطاء

### 1. مشاكل شائعة

#### خطأ في البناء
```bash
# فحص الأخطاء
vercel logs
```

#### مشاكل البيئة
```bash
# فحص متغيرات البيئة
vercel env ls
```

#### مشاكل الدومين
```bash
# فحص إعدادات DNS
nslookup hightech-eg.net
```

### 2. تصحيح الأخطاء

```javascript
// تفعيل Debug Mode
export const config = {
  runtime: 'nodejs18.x',
  maxDuration: 30
}
```

## التحديثات

### 1. التحديث التلقائي

```bash
# ربط مع GitHub للتحديث التلقائي
vercel git connect
```

### 2. Preview Deployments

```bash
# إنشاء نسخة تجريبية
vercel
```

### 3. Rollback

```bash
# العودة لنسخة سابقة
vercel rollback [deployment-url]
```

## الصيانة

### 1. تنظيف Cache

```bash
# مسح Cache
vercel --force
```

### 2. تحديث Dependencies

```bash
# تحديث الحزم
npm update
vercel --prod
```

### 3. مراجعة الأداء

- مراجعة شهرية للأداء
- تحليل تقارير Analytics
- تحسين Core Web Vitals

## الدعم

### 1. وثائق Vercel

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)

### 2. المجتمع

- [Vercel Discord](https://discord.gg/vercel)
- [Next.js GitHub](https://github.com/vercel/next.js)

### 3. الدعم التقني

- Vercel Support (للخطط المدفوعة)
- GitHub Issues للمشاكل التقنية

## الخلاصة

تم إعداد موقع هاي تك للإعلان للنشر على Vercel بأفضل الممارسات للأداء والأمان والسيو. الموقع جاهز للنشر على الدومين `hightech-eg.net` مع جميع التحسينات المطلوبة.