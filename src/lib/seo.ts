import { Metadata } from 'next'
import { companyInfo, companyDescription } from '@/data/company'

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  noIndex?: boolean
  canonical?: string
}

export function generateSEO({
  title,
  description = companyDescription.medium,
  keywords = [],
  image = '/images/logo.png',
  url = '/',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noIndex = false,
  canonical
}: SEOProps = {}): Metadata {
  const baseUrl = 'https://hightech-eg.net'
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`
  
  const seoTitle = title 
    ? `${title} | ${companyInfo.companyNameAr}`
    : `${companyInfo.companyNameAr} | أجهزة كتر بلوتر وماكينات القص احترافية`

  const allKeywords = [
    ...companyInfo.mainKeywords,
    ...keywords,
    'كتر بلوتر مصر',
    'ماكينات القص السعودية',
    'أجهزة الطباعة الرقمية',
    'فينيل لاصق عالي الجودة',
    'طباعة التيشرتات',
    'لافتات إعلانية',
    'تقطيع الفينيل',
    'ماكينات الطباعة الحديثة',
    'معدات الإعلان',
    'طباعة احترافية'
  ]

  const metadata: Metadata = {
    title: seoTitle,
    description,
    keywords: allKeywords,
    authors: author ? [{ name: author }] : [{ name: companyInfo.companyName }],
    creator: companyInfo.companyName,
    publisher: companyInfo.companyName,
    alternates: {
      canonical: canonical || fullUrl,
      languages: {
        'ar-EG': fullUrl,
        'ar-SA': fullUrl,
        'ar': fullUrl,
      },
    },
    openGraph: {
      type,
      locale: 'ar_EG',
      url: fullUrl,
      title: seoTitle,
      description,
      siteName: companyInfo.companyName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || companyInfo.companyNameAr,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description,
      images: [fullImage],
      creator: '@hightechadv',
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:author': author || companyInfo.companyName,
      'article:publisher': companyInfo.companyName,
      ...(publishedTime && { 'article:published_time': publishedTime }),
      ...(modifiedTime && { 'article:modified_time': modifiedTime }),
      ...(section && { 'article:section': section }),
      ...(tags.length > 0 && { 'article:tag': tags.join(',') }),
    },
  }

  return metadata
}

export function generateProductSEO({
  productName,
  productDescription,
  productPrice,
  productImage,
  productUrl,
  availability = 'InStock',
  brand = companyInfo.companyName,
  category,
  sku,
  gtin,
}: {
  productName: string
  productDescription: string
  productPrice?: number
  productImage?: string
  productUrl: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  brand?: string
  category?: string
  sku?: string
  gtin?: string
}): Metadata {
  const keywords = [
    productName,
    category || 'كتر بلوتر',
    'ماكينات القص',
    'أجهزة الطباعة',
    'فينيل',
    'طباعة احترافية',
    brand,
    'مصر',
    'السعودية',
    'ليبيا'
  ]

  return generateSEO({
    title: productName,
    description: productDescription,
    keywords,
    image: productImage || '/images/logo.png',
    url: productUrl,
    type: 'website',
  })
}

export function generateBlogSEO({
  title,
  description,
  publishedAt,
  updatedAt,
  author,
  category,
  tags,
  slug,
  image,
}: {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  author: string
  category: string
  tags: string[]
  slug: string
  image?: string
}): Metadata {
  const keywords = [
    ...tags,
    category,
    'كتر بلوتر',
    'ماكينات القص',
    'نصائح الطباعة',
    'دليل الاستخدام',
    'تقنيات الطباعة'
  ]

  return generateSEO({
    title,
    description,
    keywords,
    image: image || '/images/logo.png',
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: publishedAt,
    modifiedTime: updatedAt || publishedAt,
    author,
    section: category,
    tags,
  })
}

export function generateJSONLD(type: string, data: Record<string, unknown>) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }
}

export function generateProductJSONLD({
  name,
  description,
  image,
  price,
  currency = 'EGP',
  availability = 'InStock',
  brand = companyInfo.companyName,
  category,
  sku,
  gtin,
  url,
  reviews = [],
  aggregateRating,
}: {
  name: string
  description: string
  image: string
  price?: number
  currency?: string
  availability?: string
  brand?: string
  category?: string
  sku?: string
  gtin?: string
  url: string
  reviews?: Array<{
    author: string
    rating: number
    comment: string
    date: string
  }>
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}) {
  const baseUrl = 'https://hightech-eg.net'
  
  return generateJSONLD('Product', {
    name,
    description,
    image: image.startsWith('http') ? image : `${baseUrl}${image}`,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    category,
    sku,
    gtin,
    url: `${baseUrl}${url}`,
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: currency,
        availability: `https://schema.org/${availability}`,
        seller: {
          '@type': 'Organization',
          name: companyInfo.companyName,
        },
      },
    }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(reviews.length > 0 && { review: reviews }),
  })
}

export function generateArticleJSONLD({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher = companyInfo.companyName,
  url,
  wordCount,
  articleSection,
  keywords,
}: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  publisher?: string
  url: string
  wordCount?: number
  articleSection?: string
  keywords?: string[]
}) {
  const baseUrl = 'https://hightech-eg.net'
  
  return generateJSONLD('Article', {
    headline,
    description,
    image: image.startsWith('http') ? image : `${baseUrl}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: publisher,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    url: `${baseUrl}${url}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${url}`,
    },
    ...(wordCount && { wordCount }),
    ...(articleSection && { articleSection }),
    ...(keywords && { keywords: keywords.join(', ') }),
  })
}

export function generateBreadcrumbJSONLD(items: Array<{ name: string; url: string }>) {
  const baseUrl = 'https://hightech-eg.net'
  
  return generateJSONLD('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  })
}

export function generateFAQJSONLD(faqs: Array<{ question: string; answer: string }>) {
  return generateJSONLD('FAQPage', {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  })
}