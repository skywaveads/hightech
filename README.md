# HighTech Egypt Website - موقع هايتك مصر
## 🌐 [hightech-eg.net](https://hightech-eg.net)

موقع إلكتروني متقدم مع نظام أمان شامل ونظام تعليقات محسن، مبني باستخدام Next.js 14 و TypeScript.

## 🚀 الميزات الرئيسية

### 🔐 نظام الأمان المتقدم
- **مصادقة JWT محسنة** مع بصمة المتصفح
- **Rate Limiting ذكي** لمنع الهجمات
- **CAPTCHA تكيفي** يظهر عند الحاجة
- **مراقبة أمنية** في الوقت الفعلي
- **حماية CSRF** و **XSS**
- **تشفير كلمات المرور** باستخدام bcrypt

### 💬 نظام التعليقات المحسن
- **تعليقات ديناميكية** لكل منتج
- **تكامل Google Sheets** للتخزين
- **واجهة إدارية** لإدارة التعليقات
- **تصفية وبحث** متقدم
- **إشعارات فورية** للتعليقات الجديدة

### 🎨 التصميم والواجهة
- **تصميم متجاوب** يعمل على جميع الأجهزة
- **Tailwind CSS** للتصميم السريع
- **أنيميشن سلسة** باستخدام Framer Motion
- **وضع داكن/فاتح** قابل للتبديل
- **دعم اللغة العربية** الكامل

## 🛠️ التقنيات المستخدمة

### Frontend
- **Next.js 14** - إطار عمل React متقدم
- **TypeScript** - لغة برمجة مع أنواع البيانات
- **Tailwind CSS** - إطار عمل CSS
- **React Hook Form** - إدارة النماذج
- **Lucide React** - أيقونات حديثة
- **Framer Motion** - أنيميشن متقدم

### Backend
- **Next.js API Routes** - API مدمج
- **MongoDB** - قاعدة بيانات NoSQL
- **Mongoose** - ODM لـ MongoDB
- **JWT** - مصادقة آمنة
- **bcryptjs** - تشفير كلمات المرور

### الأمان
- **Helmet** - حماية HTTP headers
- **CORS** - إدارة الوصول المتقاطع
- **Rate Limiting** - حد المحاولات
- **CSRF Protection** - حماية من CSRF
- **Input Validation** - التحقق من المدخلات

## 📦 التثبيت والإعداد

### المتطلبات الأساسية
- Node.js 18+ 
- npm 8+
- MongoDB 5+
- Git

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/hightech/website.git
cd hightech-website
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
```bash
cp .env.example .env.local
```

4. **تحرير ملف البيئة**
```bash
# قم بتحرير .env.local وإضافة القيم المطلوبة
nano .env.local
```

5. **إعداد قاعدة البيانات**
```bash
npm run setup-db
```

6. **تشغيل المشروع**
```bash
npm run dev
```

7. **فتح المتصفح**
```
http://localhost:3000
```

## 🔧 الأوامر المتاحة

### التطوير
```bash
npm run dev          # تشغيل خادم التطوير
npm run build        # بناء المشروع للإنتاج
npm run start        # تشغيل المشروع المبني
npm run lint         # فحص الكود
npm run type-check   # فحص أنواع TypeScript
```

### قاعدة البيانات
```bash
npm run setup-db     # إعداد قاعدة البيانات
npm run seed-db      # إدخال بيانات تجريبية
npm run backup-db    # نسخ احتياطي
npm run migrate-db   # ترحيل البيانات
```

### الاختبار والجودة
```bash
npm test             # تشغيل الاختبارات
npm run test:watch   # اختبارات مستمرة
npm run test:coverage # تقرير التغطية
npm run test:security # اختبارات الأمان
```

## 📁 هيكل المشروع

```
hightech-website/
├── src/
│   ├── app/                    # صفحات Next.js 14
│   │   ├── admin-login/        # صفحة تسجيل الدخول
│   │   ├── api/               # API endpoints
│   │   │   ├── auth/          # مصادقة
│   │   │   └── comments/      # تعليقات
│   │   ├── globals.css        # أنماط عامة
│   │   └── layout.tsx         # تخطيط أساسي
│   ├── components/            # مكونات React
│   │   └── admin/            # مكونات الإدارة
│   ├── lib/                  # مكتبات مساعدة
│   │   ├── database.ts       # اتصال قاعدة البيانات
│   │   ├── security.ts       # وظائف الأمان
│   │   └── models/           # نماذج البيانات
│   └── middleware.ts         # حماية المسارات
├── public/                   # ملفات عامة
├── scripts/                  # سكريبت مساعدة
├── docs/                     # وثائق المشروع
├── .env.example             # مثال متغيرات البيئة
├── package.json             # تبعيات المشروع
├── tailwind.config.js       # إعدادات Tailwind
├── tsconfig.json           # إعدادات TypeScript
└── next.config.js          # إعدادات Next.js
```

## 🔐 الأمان

### إعدادات الأمان الافتراضية
- **JWT** مع انتهاء صلاحية 2 ساعة
- **Rate Limiting**: 5 محاولات لكل مستخدم، 10 لكل IP
- **CAPTCHA** بعد 3 محاولات فاشلة
- **تشفير bcrypt** مع 12 جولة
- **HTTPS** إجباري في الإنتاج

### حسابات الإدارة الافتراضية
```
البريد الإلكتروني: admin@hightech.com
كلمة المرور: Admin123!@#
```

**⚠️ تحذير**: قم بتغيير كلمة المرور الافتراضية فوراً!

## 🌐 النشر

### Vercel (موصى به)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker build -t hightech-website .
docker run -p 3000:3000 hightech-website
```

### خادم تقليدي
```bash
npm run build
npm start
```

## 📊 المراقبة والتحليل

### السجلات
- **Winston** لتسجيل الأحداث
- **Morgan** لسجلات HTTP
- **أحداث أمنية** مفصلة

### التحليلات
- **Google Analytics** (اختياري)
- **تحليل الأداء** مدمج
- **مراقبة الأخطاء** مع Sentry

## 🤝 المساهمة

### إرشادات المساهمة
1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

### معايير الكود
- استخدم **TypeScript** لجميع الملفات
- اتبع **ESLint** و **Prettier** rules
- اكتب **اختبارات** للميزات الجديدة
- وثق **API endpoints** الجديدة

## 🐛 الإبلاغ عن الأخطاء

### أخطاء الأمان
- **لا تنشر** أخطاء الأمان علناً
- راسل: security@hightech.com
- استخدم **PGP** للرسائل الحساسة

### أخطاء عامة
- استخدم **GitHub Issues**
- قدم **خطوات إعادة الإنتاج**
- أرفق **سجلات الأخطاء**

## 📚 الوثائق

### وثائق مفصلة
- [دليل النظام الأمني](./SECURITY_SYSTEM_GUIDE.md)
- [دليل نظام التعليقات](./UPDATED_COMMENTS_GUIDE.md)
- [دليل API](./docs/API.md)
- [دليل النشر](./docs/DEPLOYMENT.md)

### أمثلة الاستخدام
- [أمثلة API](./docs/examples/)
- [مكونات مخصصة](./docs/components/)
- [خطافات React](./docs/hooks/)

## 🔄 التحديثات

### إصدارات حديثة
- **v1.0.0** - الإصدار الأول مع النظام الأمني
- **v1.1.0** - تحسينات نظام التعليقات
- **v1.2.0** - واجهة إدارية محسنة

### خارطة الطريق
- [ ] مصادقة ثنائية العامل
- [ ] تطبيق جوال
- [ ] تحليلات متقدمة
- [ ] تكامل مع منصات التواصل

## 📞 الدعم

### قنوات الدعم
- **البريد الإلكتروني**: support@hightech.com
- **Discord**: [رابط الخادم](https://discord.gg/hightech)
- **Telegram**: [@hightech_support](https://t.me/hightech_support)

### ساعات الدعم
- **الأحد - الخميس**: 9:00 - 17:00 (GMT+3)
- **الطوارئ**: 24/7 للعملاء المميزين

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 🙏 شكر وتقدير

### المساهمون
- **فريق التطوير**: تطوير النظام الأساسي
- **فريق الأمان**: تطوير النظام الأمني
- **فريق التصميم**: واجهة المستخدم

### مكتبات مفتوحة المصدر
- Next.js فريق التطوير
- Tailwind CSS فريق التطوير
- مجتمع React
- مجتمع TypeScript

---

**تم تطوير هذا المشروع بـ ❤️ من فريق HighTech**

للمزيد من المعلومات، زر موقعنا: [https://hightech.com](https://hightech.com)
