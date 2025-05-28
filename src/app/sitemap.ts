import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hightech-eg.net'
  const currentDate = new Date().toISOString()

  // الصفحات الرئيسية
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/returns`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // صفحات المنتجات
  const productPages = [
    {
      url: `${baseUrl}/products/professional-cutter-plotter-60cm`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/large-format-cutter-plotter-120cm`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/high-quality-adhesive-vinyl`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // مقالات المدونة
  const blogPosts = [
    'what-is-a-cutter-plotter-complete-guide',
    'vinyl-types-comparison-for-cutter-plotter-egypt',
    't-shirt-printing-business-guide-saudi-arabia',
    'best-cutter-plotter-for-small-businesses-saudi-2025',
    'advertising-shop-business-guide-egypt',
    'best-speed-and-pressure-settings-for-cutter-plotter',
    'boost-production-speed-with-servo-cutter-plotter',
    'choosing-the-right-htv-for-sportswear',
    'cutter-plotter-applications-libya',
    'cutter-plotter-in-architectural-models',
    'cutter-plotter-maintenance-common-mistakes',
    'cutter-plotter-vs-laser-cutter',
    'how-to-cut-professional-stickers-with-a-cutter-plotter',
    'import-cutter-plotter-equipment-libya',
    'pricing-strategies-for-vinyl-products',
    'start-t-shirt-printing-business-with-htv-and-cutter-plotter',
    'trending-vinyl-designs-2025-cutter-plotter',
    'vehicle-wrap-guide-using-cutter-plotter',
    'vehicle-wrapping-trends-egypt-saudi-2025',
  ].map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...mainPages, ...productPages, ...blogPosts]
}