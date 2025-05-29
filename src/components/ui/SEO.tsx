"use client";

import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { companyInfo, companyDescription } from '@/data/company';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  productData?: {
    name: string;
    description: string;
    image: string;
    price?: string;
    priceCurrency?: string;
    sku?: string;
  };
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = companyDescription.medium,
  keywords = companyInfo.mainKeywords,
  ogImage = '/images/logo.png',
  canonicalUrl = companyInfo.website,
  ogType = 'website',
  productData,
}) => {
  // Format title to ensure it's not too long (≤ 60 chars)
  const formattedTitle = title 
    ? `${title} | ${companyInfo.companyNameAr}`
    : `${companyInfo.companyNameAr} | أجهزة كتر بلوتر وماكينات القص`;
  
  // Prepare Organization JSON-LD
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': companyInfo.companyName,
    'alternateName': companyInfo.companyNameAr,
    'url': companyInfo.website,
    'logo': `${companyInfo.website}/images/logo.png`,
    'description': description,
    'foundingDate': companyInfo.foundedYear,
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': companyInfo.phones[0],
        'contactType': 'customer service',
        'availableLanguage': ['Arabic', 'English'],
      }
    ],
    'sameAs': [
      companyInfo.socialMedia.facebook,
      companyInfo.socialMedia.instagram,
      companyInfo.socialMedia.twitter,
      companyInfo.socialMedia.youtube
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Cairo',
      'addressCountry': 'Egypt',
      'streetAddress': companyInfo.branches[0].address
    }
  };

  // Prepare Product JSON-LD if product data is provided
  const productJsonLd = productData ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': productData.name,
    'description': productData.description,
    'image': productData.image,
    'brand': {
      '@type': 'Brand',
      'name': companyInfo.brandName
    },
    'offers': {
      '@type': 'Offer',
      'price': productData.price,
      'priceCurrency': productData.priceCurrency || 'EGP',
      'seller': {
        '@type': 'Organization',
        'name': companyInfo.companyName
      }
    }
  } : null;

  return (
    <>
      <Head>
        <title>{formattedTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={formattedTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="ar_EG" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={formattedTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* JSON-LD Organization Schema */}
      <Script 
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      
      {/* JSON-LD Product Schema (if product data exists) */}
      {productData && (
        <Script 
          id="product-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
    </>
  );
};

export default SEO; 