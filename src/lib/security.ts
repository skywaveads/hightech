import crypto from 'crypto';

// معدلات الحد الأقصى للمحاولات
export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5, // 5 محاولات كحد أقصى
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 دقيقة
  CAPTCHA_THRESHOLD: 3, // إظهار CAPTCHA بعد 3 محاولات فاشلة
  IP_BLOCK_DURATION: 60 * 60 * 1000, // ساعة واحدة لحظر IP
};

// تخزين محاولات تسجيل الدخول في الذاكرة (في الإنتاج يفضل استخدام Redis)
const loginAttempts = new Map<string, {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
  requiresCaptcha: boolean;
}>();

const ipAttempts = new Map<string, {
  count: number;
  lastAttempt: number;
  blockedUntil?: number;
}>();

// تنظيف البيانات القديمة كل 30 دقيقة
setInterval(() => {
  const now = Date.now();
  
  // تنظيف محاولات تسجيل الدخول
  for (const [key, data] of Array.from(loginAttempts.entries())) {
    if (data.lockedUntil && data.lockedUntil < now) {
      loginAttempts.delete(key);
    }
  }
  
  // تنظيف محاولات IP
  for (const [ip, data] of Array.from(ipAttempts.entries())) {
    if (data.blockedUntil && data.blockedUntil < now) {
      ipAttempts.delete(ip);
    }
  }
}, 30 * 60 * 1000);

// فحص معدل المحاولات للمستخدم
export function checkUserRateLimit(email: string): {
  allowed: boolean;
  remainingAttempts: number;
  lockedUntil?: number;
  requiresCaptcha: boolean;
} {
  const now = Date.now();
  const userAttempts = loginAttempts.get(email);
  
  if (!userAttempts) {
    return {
      allowed: true,
      remainingAttempts: RATE_LIMITS.LOGIN_ATTEMPTS,
      requiresCaptcha: false
    };
  }
  
  // فحص إذا كان المستخدم محظور
  if (userAttempts.lockedUntil && userAttempts.lockedUntil > now) {
    return {
      allowed: false,
      remainingAttempts: 0,
      lockedUntil: userAttempts.lockedUntil,
      requiresCaptcha: true
    };
  }
  
  // إعادة تعيين العداد إذا انتهت فترة الحظر
  if (userAttempts.lockedUntil && userAttempts.lockedUntil <= now) {
    loginAttempts.delete(email);
    return {
      allowed: true,
      remainingAttempts: RATE_LIMITS.LOGIN_ATTEMPTS,
      requiresCaptcha: false
    };
  }
  
  const remainingAttempts = RATE_LIMITS.LOGIN_ATTEMPTS - userAttempts.count;
  
  return {
    allowed: remainingAttempts > 0,
    remainingAttempts: Math.max(0, remainingAttempts),
    requiresCaptcha: userAttempts.count >= RATE_LIMITS.CAPTCHA_THRESHOLD
  };
}

// فحص معدل المحاولات لـ IP
export function checkIPRateLimit(ip: string): {
  allowed: boolean;
  blockedUntil?: number;
} {
  const now = Date.now();
  const attempts = ipAttempts.get(ip);
  
  if (!attempts) {
    return { allowed: true };
  }
  
  // فحص إذا كان IP محظور
  if (attempts.blockedUntil && attempts.blockedUntil > now) {
    return {
      allowed: false,
      blockedUntil: attempts.blockedUntil
    };
  }
  
  // إعادة تعيين العداد إذا انتهت فترة الحظر
  if (attempts.blockedUntil && attempts.blockedUntil <= now) {
    ipAttempts.delete(ip);
    return { allowed: true };
  }
  
  return { allowed: true };
}

// تسجيل محاولة فاشلة للمستخدم
export function recordFailedAttempt(email: string): void {
  const now = Date.now();
  const userAttempts = loginAttempts.get(email) || {
    count: 0,
    lastAttempt: now,
    requiresCaptcha: false
  };
  
  userAttempts.count++;
  userAttempts.lastAttempt = now;
  userAttempts.requiresCaptcha = userAttempts.count >= RATE_LIMITS.CAPTCHA_THRESHOLD;
  
  // حظر المستخدم إذا تجاوز الحد الأقصى
  if (userAttempts.count >= RATE_LIMITS.LOGIN_ATTEMPTS) {
    userAttempts.lockedUntil = now + RATE_LIMITS.LOCKOUT_DURATION;
  }
  
  loginAttempts.set(email, userAttempts);
}

// تسجيل محاولة فاشلة لـ IP
export function recordFailedIPAttempt(ip: string): void {
  const now = Date.now();
  const attempts = ipAttempts.get(ip) || {
    count: 0,
    lastAttempt: now
  };
  
  attempts.count++;
  attempts.lastAttempt = now;
  
  // حظر IP إذا تجاوز الحد الأقصى (أكثر صرامة)
  if (attempts.count >= RATE_LIMITS.LOGIN_ATTEMPTS * 2) {
    attempts.blockedUntil = now + RATE_LIMITS.IP_BLOCK_DURATION;
  }
  
  ipAttempts.set(ip, attempts);
}

// مسح محاولات المستخدم عند نجاح تسجيل الدخول
export function clearUserAttempts(email: string): void {
  loginAttempts.delete(email);
}

// إنشاء بصمة المتصفح
export function generateBrowserFingerprint(userAgent: string, acceptLanguage: string, ip: string): string {
  const data = `${userAgent}|${acceptLanguage}|${ip}`;
  return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16);
}

// التحقق من قوة كلمة المرور
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;
  
  // الطول
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
  }
  
  // الأحرف الكبيرة
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('يجب أن تحتوي على حرف كبير واحد على الأقل');
  }
  
  // الأحرف الصغيرة
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('يجب أن تحتوي على حرف صغير واحد على الأقل');
  }
  
  // الأرقام
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('يجب أن تحتوي على رقم واحد على الأقل');
  }
  
  // الرموز الخاصة
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push('يجب أن تحتوي على رمز خاص واحد على الأقل');
  }
  
  // كلمات مرور شائعة
  const commonPasswords = ['password', '123456', 'admin', 'qwerty', 'letmein'];
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    score -= 2;
    feedback.push('تجنب استخدام كلمات مرور شائعة');
  }
  
  return {
    isValid: score >= 4,
    score: Math.max(0, score),
    feedback
  };
}

// إنشاء رمز CSRF
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// التحقق من رمز CSRF
export function verifyCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length === 64;
}

// تشفير البيانات الحساسة
export function encryptSensitiveData(data: string, key: string): string {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// فك تشفير البيانات الحساسة
export function decryptSensitiveData(encryptedData: string, key: string): string {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// تسجيل أحداث الأمان
export interface SecurityEvent {
  type: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'ACCOUNT_LOCKED' | 'IP_BLOCKED' | 'SUSPICIOUS_ACTIVITY';
  email?: string;
  ip: string;
  userAgent: string;
  timestamp: number;
  details?: any;
}

const securityEvents: SecurityEvent[] = [];

export function logSecurityEvent(event: SecurityEvent): void {
  securityEvents.push(event);
  
  // الاحتفاظ بآخر 1000 حدث فقط
  if (securityEvents.length > 1000) {
    securityEvents.splice(0, securityEvents.length - 1000);
  }
  
  // طباعة الأحداث المهمة
  if (event.type === 'ACCOUNT_LOCKED' || event.type === 'IP_BLOCKED') {
    console.warn(`[SECURITY] ${event.type}:`, event);
  }
}

// الحصول على أحداث الأمان الأخيرة
export function getRecentSecurityEvents(limit: number = 50): SecurityEvent[] {
  return securityEvents.slice(-limit);
}

// فحص النشاط المشبوه
export function detectSuspiciousActivity(ip: string, userAgent: string): boolean {
  const recentEvents = securityEvents.filter(event => 
    event.ip === ip && 
    Date.now() - event.timestamp < 60 * 60 * 1000 // آخر ساعة
  );
  
  // أكثر من 10 محاولات في الساعة
  if (recentEvents.length > 10) {
    return true;
  }
  
  // تغيير User Agent متكرر من نفس IP
  const userAgents = new Set(recentEvents.map(e => e.userAgent));
  if (userAgents.size > 3) {
    return true;
  }
  
  return false;
}
