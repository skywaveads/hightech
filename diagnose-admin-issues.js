#!/usr/bin/env node

/**
 * أداة تشخيص مشاكل صفحات الإدارة على Vercel
 * تتحقق من جميع المشاكل المحتملة التي تمنع عمل صفحات الإدارة
 */

const https = require('https');
const http = require('http');

class AdminDiagnostics {
    constructor(baseUrl) {
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        this.authToken = null;
        this.results = [];
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = {
            'info': '🔍',
            'success': '✅',
            'error': '❌',
            'warning': '⚠️'
        }[type] || '📝';
        
        const logMessage = `[${timestamp}] ${prefix} ${message}`;
        console.log(logMessage);
        this.results.push({ timestamp, type, message });
    }

    async makeRequest(path, options = {}) {
        return new Promise((resolve, reject) => {
            const url = `${this.baseUrl}${path}`;
            const urlObj = new URL(url);
            const isHttps = urlObj.protocol === 'https:';
            const client = isHttps ? https : http;

            const requestOptions = {
                hostname: urlObj.hostname,
                port: urlObj.port || (isHttps ? 443 : 80),
                path: urlObj.pathname + urlObj.search,
                method: options.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'AdminDiagnostics/1.0',
                    'X-Requested-With': 'XMLHttpRequest',
                    ...options.headers
                }
            };

            if (this.authToken) {
                requestOptions.headers['Authorization'] = `Bearer ${this.authToken}`;
                requestOptions.headers['Cookie'] = `auth-token=${this.authToken}`;
            }

            const req = client.request(requestOptions, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);
                        resolve({
                            status: res.statusCode,
                            headers: res.headers,
                            data: jsonData,
                            ok: res.statusCode >= 200 && res.statusCode < 300
                        });
                    } catch (e) {
                        resolve({
                            status: res.statusCode,
                            headers: res.headers,
                            data: data,
                            ok: res.statusCode >= 200 && res.statusCode < 300,
                            parseError: e.message
                        });
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            if (options.body) {
                req.write(JSON.stringify(options.body));
            }

            req.end();
        });
    }

    async testBasicConnectivity() {
        this.log('اختبار الاتصال الأساسي بالموقع...');
        
        try {
            const response = await this.makeRequest('/');
            if (response.ok) {
                this.log('الاتصال بالموقع الرئيسي نجح', 'success');
                return true;
            } else {
                this.log(`فشل الاتصال بالموقع الرئيسي: HTTP ${response.status}`, 'error');
                return false;
            }
        } catch (error) {
            this.log(`خطأ في الاتصال: ${error.message}`, 'error');
            return false;
        }
    }

    async testAuthEndpoints() {
        this.log('اختبار نقاط المصادقة...');
        
        // اختبار /api/auth/me
        try {
            const meResponse = await this.makeRequest('/api/auth/me');
            this.log(`/api/auth/me - HTTP ${meResponse.status}: ${JSON.stringify(meResponse.data)}`, 
                     meResponse.ok ? 'success' : 'warning');
        } catch (error) {
            this.log(`خطأ في /api/auth/me: ${error.message}`, 'error');
        }

        // اختبار /api/auth/login
        try {
            const loginResponse = await this.makeRequest('/api/auth/login', {
                method: 'POST',
                body: { email: 'test@test.com', password: 'test' }
            });
            this.log(`/api/auth/login - HTTP ${loginResponse.status}: ${JSON.stringify(loginResponse.data)}`, 
                     loginResponse.status === 401 ? 'success' : 'warning');
        } catch (error) {
            this.log(`خطأ في /api/auth/login: ${error.message}`, 'error');
        }
    }

    async testAdminAPIEndpoints() {
        this.log('اختبار نقاط API للإدارة...');
        
        const endpoints = [
            '/api/products',
            '/api/comments/admin',
            '/api/orders/admin'
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await this.makeRequest(endpoint);
                this.log(`${endpoint} - HTTP ${response.status}: ${response.data?.error || 'OK'}`, 
                         response.ok ? 'success' : (response.status === 401 ? 'warning' : 'error'));
            } catch (error) {
                this.log(`خطأ في ${endpoint}: ${error.message}`, 'error');
            }
        }
    }

    async testGoogleSheetsIntegration() {
        this.log('اختبار تكامل Google Sheets...');
        
        try {
            const response = await this.makeRequest('/api/test-all-sheets-operations');
            if (response.ok) {
                this.log('اختبار Google Sheets نجح', 'success');
                this.log(`تفاصيل: ${JSON.stringify(response.data, null, 2)}`);
            } else {
                this.log(`فشل اختبار Google Sheets: ${response.data?.error || 'خطأ غير معروف'}`, 'error');
            }
        } catch (error) {
            this.log(`خطأ في اختبار Google Sheets: ${error.message}`, 'error');
        }
    }

    async testEnvironmentVariables() {
        this.log('اختبار متغيرات البيئة...');
        
        try {
            const response = await this.makeRequest('/api/debug/env-check');
            if (response.ok) {
                this.log('فحص متغيرات البيئة نجح', 'success');
                this.log(`النتائج: ${JSON.stringify(response.data, null, 2)}`);
            } else {
                this.log(`فشل فحص متغيرات البيئة: ${response.data?.error || 'خطأ غير معروف'}`, 'error');
            }
        } catch (error) {
            this.log(`خطأ في فحص متغيرات البيئة: ${error.message}`, 'error');
        }
    }

    async testCRUDOperations() {
        this.log('اختبار عمليات CRUD...');
        
        // اختبار إنشاء منتج
        try {
            const createResponse = await this.makeRequest('/api/products', {
                method: 'POST',
                body: {
                    name_ar: 'منتج تجريبي',
                    name_en: 'Test Product',
                    description_ar: 'وصف تجريبي',
                    description_en: 'Test description',
                    price: 100,
                    quantity: 10,
                    category: 'test',
                    sku: 'TEST-' + Date.now(),
                    isActive: true
                }
            });
            
            if (createResponse.ok) {
                this.log('إنشاء منتج تجريبي نجح', 'success');
                const productId = createResponse.data._id || createResponse.data.id;
                
                // اختبار تحديث المنتج
                if (productId) {
                    try {
                        const updateResponse = await this.makeRequest(`/api/products/${productId}`, {
                            method: 'PUT',
                            body: { price: 150 }
                        });
                        
                        if (updateResponse.ok) {
                            this.log('تحديث المنتج نجح', 'success');
                        } else {
                            this.log(`فشل تحديث المنتج: ${updateResponse.data?.error}`, 'error');
                        }
                    } catch (error) {
                        this.log(`خطأ في تحديث المنتج: ${error.message}`, 'error');
                    }
                    
                    // اختبار حذف المنتج
                    try {
                        const deleteResponse = await this.makeRequest(`/api/products/${productId}`, {
                            method: 'DELETE'
                        });
                        
                        if (deleteResponse.ok) {
                            this.log('حذف المنتج نجح', 'success');
                        } else {
                            this.log(`فشل حذف المنتج: ${deleteResponse.data?.error}`, 'error');
                        }
                    } catch (error) {
                        this.log(`خطأ في حذف المنتج: ${error.message}`, 'error');
                    }
                }
            } else {
                this.log(`فشل إنشاء منتج تجريبي: ${createResponse.data?.error}`, 'error');
            }
        } catch (error) {
            this.log(`خطأ في اختبار CRUD: ${error.message}`, 'error');
        }
    }

    async runFullDiagnostics() {
        this.log('🚀 بدء التشخيص الشامل لصفحات الإدارة...');
        this.log(`الموقع المستهدف: ${this.baseUrl}`);
        
        // اختبار الاتصال الأساسي
        const basicConnectivity = await this.testBasicConnectivity();
        if (!basicConnectivity) {
            this.log('فشل الاتصال الأساسي - توقف التشخيص', 'error');
            return this.generateReport();
        }

        // اختبار نقاط المصادقة
        await this.testAuthEndpoints();
        
        // اختبار نقاط API للإدارة
        await this.testAdminAPIEndpoints();
        
        // اختبار متغيرات البيئة
        await this.testEnvironmentVariables();
        
        // اختبار Google Sheets
        await this.testGoogleSheetsIntegration();
        
        // اختبار عمليات CRUD
        await this.testCRUDOperations();
        
        this.log('🏁 انتهى التشخيص الشامل');
        return this.generateReport();
    }

    generateReport() {
        const errors = this.results.filter(r => r.type === 'error').length;
        const warnings = this.results.filter(r => r.type === 'warning').length;
        const successes = this.results.filter(r => r.type === 'success').length;
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 تقرير التشخيص النهائي');
        console.log('='.repeat(60));
        console.log(`✅ نجح: ${successes}`);
        console.log(`⚠️  تحذيرات: ${warnings}`);
        console.log(`❌ أخطاء: ${errors}`);
        console.log('='.repeat(60));
        
        if (errors > 0) {
            console.log('\n🔥 الأخطاء المكتشفة:');
            this.results.filter(r => r.type === 'error').forEach(r => {
                console.log(`   • ${r.message}`);
            });
        }
        
        if (warnings > 0) {
            console.log('\n⚠️  التحذيرات:');
            this.results.filter(r => r.type === 'warning').forEach(r => {
                console.log(`   • ${r.message}`);
            });
        }
        
        console.log('\n💡 التوصيات:');
        if (errors > 0) {
            console.log('   • يوجد أخطاء تحتاج إلى إصلاح فوري');
            console.log('   • تحقق من إعدادات Vercel ومتغيرات البيئة');
            console.log('   • تأكد من صحة إعدادات Google Sheets API');
        } else if (warnings > 0) {
            console.log('   • النظام يعمل بشكل أساسي لكن يحتاج تحسينات');
            console.log('   • راجع التحذيرات أعلاه للتحسين');
        } else {
            console.log('   • النظام يعمل بشكل ممتاز! 🎉');
        }
        
        return {
            summary: { errors, warnings, successes },
            details: this.results
        };
    }
}

// تشغيل التشخيص
async function main() {
    const args = process.argv.slice(2);
    const baseUrl = args[0] || 'https://your-site.vercel.app';
    
    if (!baseUrl || baseUrl === 'https://your-site.vercel.app') {
        console.log('❌ يرجى تحديد رابط الموقع على Vercel');
        console.log('الاستخدام: node diagnose-admin-issues.js https://your-site.vercel.app');
        process.exit(1);
    }
    
    const diagnostics = new AdminDiagnostics(baseUrl);
    await diagnostics.runFullDiagnostics();
}

// تشغيل إذا تم استدعاء الملف مباشرة
if (require.main === module) {
    main().catch(console.error);
}

module.exports = AdminDiagnostics;