#!/usr/bin/env node

/**
 * Vercel API Test Suite
 * اختبار شامل لـ APIs على منصة Vercel
 * 
 * Usage:
 * node test-vercel-apis.js [base-url]
 * 
 * Example:
 * node test-vercel-apis.js https://your-app.vercel.app
 * node test-vercel-apis.js http://localhost:3000
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const DEFAULT_BASE_URL = 'https://www.hightech-eg.net';
const TIMEOUT = 30000; // 30 seconds

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

// Test configuration
const testSuites = [
    {
        name: 'Environment & Health Check',
        tests: [
            { endpoint: '/api/debug/env-check', description: 'Environment Variables Check' },
            { endpoint: '/api/vercel-test-suite', description: 'Complete Test Suite' }
        ]
    },
    {
        name: 'Authentication APIs',
        tests: [
            { endpoint: '/api/auth/security-status', description: 'Security Status' },
            { endpoint: '/api/auth/me', description: 'Current User Info', expectError: true }
        ]
    },
    {
        name: 'Product APIs',
        tests: [
            { endpoint: '/api/products', description: 'Get All Products' },
            { endpoint: '/api/products/1', description: 'Get Product by ID' }
        ]
    },
    {
        name: 'Comment APIs',
        tests: [
            { endpoint: '/api/comments/high-tech-cutter-plotter', description: 'Get Product Comments' }
        ]
    },
    {
        name: 'Admin APIs',
        tests: [
            { endpoint: '/api/orders/admin', description: 'Admin Orders', expectError: true },
            { endpoint: '/api/comments/admin', description: 'Admin Comments', expectError: true }
        ]
    }
];

class VercelAPITester {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || DEFAULT_BASE_URL;
        this.results = [];
        this.startTime = Date.now();
        
        console.log(`${colors.cyan}🚀 Vercel API Test Suite${colors.reset}`);
        console.log(`${colors.blue}📍 Base URL: ${this.baseUrl}${colors.reset}`);
        console.log(`${colors.yellow}⏰ Started at: ${new Date().toLocaleString('ar-EG')}${colors.reset}\n`);
    }

    async makeRequest(endpoint, options = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(endpoint, this.baseUrl);
            const isHttps = url.protocol === 'https:';
            const client = isHttps ? https : http;
            
            const requestOptions = {
                hostname: url.hostname,
                port: url.port || (isHttps ? 443 : 80),
                path: url.pathname + url.search,
                method: options.method || 'GET',
                headers: {
                    'User-Agent': 'Vercel-API-Tester/1.0',
                    'Accept': 'application/json',
                    ...options.headers
                },
                timeout: TIMEOUT
            };

            const req = client.request(requestOptions, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    try {
                        const jsonData = data ? JSON.parse(data) : {};
                        resolve({
                            status: res.statusCode,
                            statusText: res.statusMessage,
                            headers: res.headers,
                            data: jsonData,
                            rawData: data
                        });
                    } catch (error) {
                        resolve({
                            status: res.statusCode,
                            statusText: res.statusMessage,
                            headers: res.headers,
                            data: null,
                            rawData: data,
                            parseError: error.message
                        });
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            if (options.body) {
                req.write(JSON.stringify(options.body));
            }

            req.end();
        });
    }

    async testEndpoint(endpoint, description, expectError = false) {
        const startTime = Date.now();
        
        try {
            console.log(`${colors.blue}🔄 Testing: ${description}${colors.reset}`);
            console.log(`   ${colors.cyan}→ ${endpoint}${colors.reset}`);
            
            const response = await this.makeRequest(endpoint);
            const duration = Date.now() - startTime;
            
            const isSuccess = expectError ? 
                (response.status >= 400) : 
                (response.status >= 200 && response.status < 400);
            
            const result = {
                endpoint,
                description,
                success: isSuccess,
                status: response.status,
                statusText: response.statusText,
                duration,
                expectError,
                data: response.data,
                parseError: response.parseError
            };
            
            if (isSuccess) {
                console.log(`   ${colors.green}✅ Success: ${response.status} ${response.statusText} (${duration}ms)${colors.reset}`);
                if (response.data && typeof response.data === 'object') {
                    this.logResponseSummary(response.data);
                }
            } else {
                console.log(`   ${colors.red}❌ Failed: ${response.status} ${response.statusText} (${duration}ms)${colors.reset}`);
                if (response.parseError) {
                    console.log(`   ${colors.yellow}⚠️  Parse Error: ${response.parseError}${colors.reset}`);
                }
            }
            
            this.results.push(result);
            return result;
            
        } catch (error) {
            const duration = Date.now() - startTime;
            console.log(`   ${colors.red}❌ Error: ${error.message} (${duration}ms)${colors.reset}`);
            
            const result = {
                endpoint,
                description,
                success: false,
                error: error.message,
                duration,
                expectError
            };
            
            this.results.push(result);
            return result;
        }
    }

    logResponseSummary(data) {
        if (data.status) {
            console.log(`   ${colors.magenta}📊 Status: ${data.status}${colors.reset}`);
        }
        
        if (data.healthScore) {
            console.log(`   ${colors.magenta}💚 Health Score: ${data.healthScore}${colors.reset}`);
        }
        
        if (data.message) {
            console.log(`   ${colors.magenta}💬 Message: ${data.message}${colors.reset}`);
        }
        
        if (Array.isArray(data) && data.length > 0) {
            console.log(`   ${colors.magenta}📦 Items: ${data.length}${colors.reset}`);
        }
        
        if (data.total !== undefined) {
            console.log(`   ${colors.magenta}🔢 Total: ${data.total}${colors.reset}`);
        }
        
        if (data.testSuites && Array.isArray(data.testSuites)) {
            const totalTests = data.testSuites.reduce((sum, suite) => sum + suite.summary.total, 0);
            const passedTests = data.testSuites.reduce((sum, suite) => sum + suite.summary.passed, 0);
            console.log(`   ${colors.magenta}🧪 Tests: ${passedTests}/${totalTests} passed${colors.reset}`);
        }
    }

    async runTestSuite(suite) {
        console.log(`\n${colors.bright}${colors.white}📋 ${suite.name}${colors.reset}`);
        console.log(`${colors.white}${'='.repeat(50)}${colors.reset}`);
        
        const suiteResults = [];
        
        for (const test of suite.tests) {
            const result = await this.testEndpoint(
                test.endpoint, 
                test.description, 
                test.expectError
            );
            suiteResults.push(result);
            
            // Small delay between tests
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        const passed = suiteResults.filter(r => r.success).length;
        const total = suiteResults.length;
        
        console.log(`\n${colors.bright}📊 Suite Summary: ${passed}/${total} tests passed${colors.reset}`);
        
        return {
            name: suite.name,
            results: suiteResults,
            summary: { passed, total, failed: total - passed }
        };
    }

    async runAllTests() {
        console.log(`${colors.bright}🎯 Running ${testSuites.length} test suites...${colors.reset}\n`);
        
        const allResults = [];
        
        for (const suite of testSuites) {
            const suiteResult = await this.runTestSuite(suite);
            allResults.push(suiteResult);
        }
        
        this.printFinalSummary(allResults);
        return allResults;
    }

    printFinalSummary(allResults) {
        const totalDuration = Date.now() - this.startTime;
        
        console.log(`\n${colors.bright}${colors.cyan}🎉 FINAL SUMMARY${colors.reset}`);
        console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);
        
        let totalTests = 0;
        let totalPassed = 0;
        let totalFailed = 0;
        
        allResults.forEach(suite => {
            totalTests += suite.summary.total;
            totalPassed += suite.summary.passed;
            totalFailed += suite.summary.failed;
            
            const status = suite.summary.failed === 0 ? 
                `${colors.green}✅ PASSED` : 
                `${colors.red}❌ FAILED`;
            
            console.log(`${status} ${suite.name}: ${suite.summary.passed}/${suite.summary.total}${colors.reset}`);
        });
        
        const successRate = Math.round((totalPassed / totalTests) * 100);
        const healthColor = successRate >= 80 ? colors.green : 
                           successRate >= 60 ? colors.yellow : colors.red;
        
        console.log(`\n${colors.bright}📊 Overall Results:${colors.reset}`);
        console.log(`   ${colors.white}Total Tests: ${totalTests}${colors.reset}`);
        console.log(`   ${colors.green}Passed: ${totalPassed}${colors.reset}`);
        console.log(`   ${colors.red}Failed: ${totalFailed}${colors.reset}`);
        console.log(`   ${healthColor}Success Rate: ${successRate}%${colors.reset}`);
        console.log(`   ${colors.blue}Duration: ${totalDuration}ms${colors.reset}`);
        
        // Recommendations
        console.log(`\n${colors.bright}💡 Recommendations:${colors.reset}`);
        
        if (successRate >= 90) {
            console.log(`   ${colors.green}🎉 Excellent! Your Vercel deployment is healthy.${colors.reset}`);
        } else if (successRate >= 70) {
            console.log(`   ${colors.yellow}⚠️  Good, but some issues need attention.${colors.reset}`);
        } else {
            console.log(`   ${colors.red}❌ Multiple issues detected. Review failed tests.${colors.reset}`);
        }
        
        // List failed tests
        const failedTests = this.results.filter(r => !r.success);
        if (failedTests.length > 0) {
            console.log(`\n${colors.bright}🔍 Failed Tests:${colors.reset}`);
            failedTests.forEach(test => {
                console.log(`   ${colors.red}❌ ${test.description} (${test.endpoint})${colors.reset}`);
                if (test.error) {
                    console.log(`      ${colors.yellow}Error: ${test.error}${colors.reset}`);
                } else if (test.status) {
                    console.log(`      ${colors.yellow}Status: ${test.status} ${test.statusText}${colors.reset}`);
                }
            });
        }
        
        console.log(`\n${colors.cyan}🏁 Test completed at: ${new Date().toLocaleString('ar-EG')}${colors.reset}`);
    }

    // Quick health check method
    async quickHealthCheck() {
        console.log(`${colors.bright}⚡ Quick Health Check${colors.reset}\n`);
        
        const criticalEndpoints = [
            { endpoint: '/api/debug/env-check', description: 'Environment Check' },
            { endpoint: '/api/products', description: 'Products API' }
        ];
        
        for (const test of criticalEndpoints) {
            await this.testEndpoint(test.endpoint, test.description);
        }
        
        const passed = this.results.filter(r => r.success).length;
        const total = this.results.length;
        
        console.log(`\n${colors.bright}⚡ Quick Check: ${passed}/${total} critical tests passed${colors.reset}`);
        
        if (passed === total) {
            console.log(`${colors.green}✅ Your Vercel deployment appears healthy!${colors.reset}`);
        } else {
            console.log(`${colors.red}❌ Issues detected. Run full test suite for details.${colors.reset}`);
        }
    }
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    const baseUrl = args[0] || DEFAULT_BASE_URL;
    const isQuickCheck = args.includes('--quick') || args.includes('-q');
    
    const tester = new VercelAPITester(baseUrl);
    
    try {
        if (isQuickCheck) {
            await tester.quickHealthCheck();
        } else {
            await tester.runAllTests();
        }
        
        // Exit with appropriate code
        const failedTests = tester.results.filter(r => !r.success).length;
        process.exit(failedTests > 0 ? 1 : 0);
        
    } catch (error) {
        console.error(`${colors.red}💥 Fatal Error: ${error.message}${colors.reset}`);
        process.exit(1);
    }
}

// Handle command line execution
if (require.main === module) {
    // Show usage if help requested
    if (process.argv.includes('--help') || process.argv.includes('-h')) {
        console.log(`
${colors.cyan}Vercel API Test Suite${colors.reset}

${colors.bright}Usage:${colors.reset}
  node test-vercel-apis.js [base-url] [options]

${colors.bright}Arguments:${colors.reset}
  base-url    Base URL of your application (default: http://localhost:3000)

${colors.bright}Options:${colors.reset}
  --quick, -q    Run quick health check only
  --help, -h     Show this help message

${colors.bright}Examples:${colors.reset}
  node test-vercel-apis.js
  node test-vercel-apis.js https://your-app.vercel.app
  node test-vercel-apis.js http://localhost:3000 --quick
  node test-vercel-apis.js https://your-app.vercel.app -q

${colors.bright}Exit Codes:${colors.reset}
  0    All tests passed
  1    Some tests failed or error occurred
        `);
        process.exit(0);
    }
    
    main();
}

module.exports = VercelAPITester;