import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://hightech-eg.net'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin-login',
          '/products-admin',
          '/comments-admin',
          '/orders-admin',
          '/api/',
          '/test-*',
          '/_next/',
          '/private/',
          '*.json',
          '*.xml',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin-login',
          '/products-admin',
          '/comments-admin',
          '/orders-admin',
          '/api/',
          '/test-*',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin-login',
          '/products-admin',
          '/comments-admin',
          '/orders-admin',
          '/api/',
          '/test-*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}