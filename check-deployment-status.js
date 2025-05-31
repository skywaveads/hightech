const https = require('https');

console.log('🔍 فحص حالة النشر على Vercel...\n');

// فحص الصفحة الرئيسية
function checkMainSite() {
    return new Promise((resolve) => {
        const options = {
            hostname: 'www.hightech-eg.net',
            port: 443,
            path: '/',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        };

        const req = https.request(options, (res) => {
            console.log(`📊 الصفحة الرئيسية: ${res.statusCode} ${res.statusMessage}`);
            console.log(`📅 آخر تعديل: ${res.headers['last-modified'] || 'غير محدد'}`);
            console.log(`🔄 Cache Control: ${res.headers['cache-control'] || 'غير محدد'}`);
            
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (data.includes('Vercel Security Checkpoint')) {
                    console.log('⚠️  الموقع محجوب بواسطة Vercel Security Checkpoint');
                } else if (data.includes('HighTech')) {
                    console.log('✅ الموقع يعمل بشكل طبيعي');
                } else {
                    console.log('❓ حالة غير معروفة');
                }
                resolve();
            });
        });

        req.on('error', (err) => {
            console.log(`❌ خطأ في الاتصال: ${err.message}`);
            resolve();
        });

        req.setTimeout(10000, () => {
            console.log('⏰ انتهت مهلة الاتصال');
            req.destroy();
            resolve();
        });

        req.end();
    });
}

// فحص API بسيط
function checkAPI() {
    return new Promise((resolve) => {
        const options = {
            hostname: 'www.hightech-eg.net',
            port: 443,
            path: '/api/auth/security-status',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        };

        const req = https.request(options, (res) => {
            console.log(`\n🔌 API Status: ${res.statusCode} ${res.statusMessage}`);
            
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode === 200) {
                        const result = JSON.parse(data);
                        console.log('✅ API يعمل بشكل طبيعي');
                        console.log(`📋 البيانات: ${JSON.stringify(result, null, 2)}`);
                    } else {
                        console.log(`❌ API لا يعمل: ${data.substring(0, 200)}...`);
                    }
                } catch (err) {
                    console.log(`❌ خطأ في تحليل استجابة API: ${err.message}`);
                }
                resolve();
            });
        });

        req.on('error', (err) => {
            console.log(`❌ خطأ في API: ${err.message}`);
            resolve();
        });

        req.setTimeout(10000, () => {
            console.log('⏰ انتهت مهلة API');
            req.destroy();
            resolve();
        });

        req.end();
    });
}

async function main() {
    await checkMainSite();
    await checkAPI();
    
    console.log('\n📝 التوصيات:');
    console.log('1. انتظر بضع دقائق قبل المحاولة مرة أخرى');
    console.log('2. تحقق من Vercel Dashboard للتأكد من النشر');
    console.log('3. قد تحتاج إلى إعادة النشر إذا كانت التغييرات لم تطبق');
    console.log('4. تحقق من Domain Settings في Vercel');
}

main().catch(console.error);